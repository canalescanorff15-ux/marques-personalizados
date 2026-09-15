import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const read=(file)=>fs.readFileSync(path.join(root,file),'utf8');
const exists=(file)=>fs.existsSync(path.join(root,file));
const failures=[];
const assert=(ok,msg)=>{if(!ok)failures.push(msg);};

// Netlify permanece somente como trilha de rollback durante a migração para Workers.
assert(exists('netlify.toml'),'netlify.toml de rollback ausente');
assert(exists('NETLIFY.md'),'NETLIFY.md de rollback ausente');
assert(exists('.nvmrc'),'.nvmrc ausente');
assert(exists('package-lock.json'),'package-lock.json ausente');

const toml=read('netlify.toml');
assert(/command\s*=\s*["'][^"']*npm run check:netlify[^"']*npm run check:env -- --production[^"']*npm run build[^"']*["']/.test(toml),'Netlify rollback deve manter contrato, preflight de produção e build');
assert(/publish\s*=\s*["']\.next["']/.test(toml),'Netlify rollback deve publicar .next');
assert(/NODE_VERSION\s*=\s*["']22\.23\.2["']/.test(toml),'Node do Netlify rollback deve seguir platform-contract');
assert(/NETLIFY_NEXT_SKEW_PROTECTION\s*=\s*["']true["']/.test(toml),'Skew protection do rollback deve permanecer habilitada');
assert(!/\/\*\s+\/index\.html\s+200/.test(toml),'Rewrite SPA global é incompatível com Next.js híbrido');

const nextConfig=read('next.config.ts');
assert(!/output\s*:\s*["']export["']/.test(nextConfig),'Projeto não pode usar output: export');

const upload=read('app/api/admin/upload/route.ts');
assert(/PutObjectCommand/.test(upload),'Upload deve continuar usando storage remoto');
assert(/runtime\s*=\s*["']nodejs["']/.test(upload),'Upload deve declarar runtime nodejs compatível');
assert(!/writeFile|writeFileSync|createWriteStream/.test(upload),'Upload não pode persistir arquivos no filesystem do runtime');
assert(upload.includes("code:'STORAGE_NOT_CONFIGURED'"),'Upload deve sinalizar storage ausente com código estável');
assert(upload.includes('can_use_external_url:true'),'Upload deve orientar fallback seguro por URL externa');
assert(upload.includes('Cloudflare R2 nas variáveis e segredos do ambiente de produção'),'Upload deve orientar a infraestrutura R2 sem acoplar à hospedagem legada');

const storage=read('lib/storage.ts');
for(const key of ['S3_ENDPOINT','S3_BUCKET','S3_ACCESS_KEY_ID','S3_SECRET_ACCESS_KEY','S3_PUBLIC_BASE_URL'])assert(storage.includes(key),`Storage não lê ${key}`);
assert(/forcePathStyle\s*:\s*true/.test(storage),'Storage S3 deve manter path-style compatível com R2');

assert(exists('lib/storage-diagnostic.ts'),'Diagnóstico de capacidade do R2 ausente');
assert(exists('app/api/admin/storage/diagnostic/route.ts'),'Endpoint administrativo de diagnóstico do R2 ausente');
const diagnostic=read('lib/storage-diagnostic.ts');
for(const command of ['PutObjectCommand','HeadObjectCommand','ListObjectsV2Command','DeleteObjectCommand'])assert(diagnostic.includes(command),`Diagnóstico R2 não prova ${command}`);
for(const stage of ["'put'","'head'","'list'","'delete'","'confirm_delete'","'cleanup_delete'"])assert(diagnostic.includes(stage),`Diagnóstico R2 sem etapa ${stage}`);
assert(diagnostic.includes('catalog/_diagnostic/'),'Diagnóstico R2 deve usar namespace efêmero isolado dentro de catalog/');
assert(diagnostic.includes('AbortController'),'Diagnóstico R2 deve limitar cada operação externa por timeout cancelável');
assert(!/S3_SECRET_ACCESS_KEY|S3_ACCESS_KEY_ID/.test(diagnostic),'Diagnóstico R2 não deve manipular nem expor credenciais diretamente');
const diagnosticRoute=read('app/api/admin/storage/diagnostic/route.ts');
assert(diagnosticRoute.includes('isAdmin()'),'Diagnóstico R2 deve exigir sessão administrativa');
assert(diagnosticRoute.includes('sameOriginRequest(request)'),'Diagnóstico R2 deve exigir same-origin');
assert(diagnosticRoute.includes("runtime='nodejs'"),'Diagnóstico R2 deve declarar runtime nodejs compatível');
assert(diagnosticRoute.includes("'cache-control':'private, no-store'"),'Resposta do diagnóstico R2 deve ser privada e sem cache');

const manager=read('components/admin/MediaManager.tsx');
const picker=read('components/admin/MediaPicker.tsx');
assert(manager.includes('Cloudflare R2 nas variáveis e segredos do Worker'),'MediaManager deve orientar Workers + R2');
assert(manager.includes("'/api/admin/storage/diagnostic'"),'MediaManager deve oferecer teste real da conexão R2');
assert(manager.includes('Testar R2'),'MediaManager deve expor ação clara de diagnóstico R2');
assert(picker.includes('Cloudflare R2 nas variáveis e segredos do Worker'),'MediaPicker deve orientar Workers + R2');
assert(!/RunSite/i.test(manager+picker),'UI administrativa de mídia não deve citar a plataforma legada');
assert(!/Netlify/i.test(manager+picker),'UI administrativa de mídia não deve depender do Netlify');

const env=read('.env.example');
for(const key of ['DATABASE_URL','SESSION_SECRET','PRIVACY_HASH_SECRET','ADMIN_PASSWORD_HASH','ADMIN_TOTP_SECRET','S3_ENDPOINT','S3_BUCKET','S3_ACCESS_KEY_ID','S3_SECRET_ACCESS_KEY','S3_PUBLIC_BASE_URL','BACKUP_S3_BUCKET'])assert(env.includes(`${key}=`),`.env.example não documenta ${key}`);
assert(env.includes('Cloudflare R2'),'.env.example deve documentar R2');

const pkg=JSON.parse(read('package.json'));
assert(pkg.scripts?.['check:netlify']==='node scripts/netlify-r2-contract-check.mjs','package.json não registra check:netlify de rollback');
assert(String(pkg.scripts?.verify||'').includes('check:cloudflare'),'verify não inclui o contrato primário Cloudflare');
assert(String(pkg.scripts?.verify||'').includes('check:netlify'),'verify não preserva o contrato de rollback Netlify');

const ci=read('.github/workflows/ci.yml');
assert(ci.includes('npm run check:netlify'),'CI não preserva check:netlify de rollback');

if(failures.length){
  console.error(`Legacy Netlify/R2 Contract: FALHOU (${failures.length})`);
  for(const f of failures)console.error(`- ${f}`);
  process.exit(1);
}
console.log('Legacy Netlify/R2 Contract: OK — Netlify preservado somente como rollback; R2 continua S3-compatible e a UI aponta para Cloudflare Workers.');
