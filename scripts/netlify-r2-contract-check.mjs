import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const read=(file)=>fs.readFileSync(path.join(root,file),'utf8');
const exists=(file)=>fs.existsSync(path.join(root,file));
const failures=[];
const assert=(ok,msg)=>{if(!ok)failures.push(msg);};

assert(exists('netlify.toml'),'netlify.toml ausente');
assert(exists('NETLIFY.md'),'NETLIFY.md ausente');
assert(exists('.nvmrc'),'.nvmrc ausente');
assert(exists('package-lock.json'),'package-lock.json ausente');

const toml=read('netlify.toml');
assert(/command\s*=\s*["'][^"']*npm run check:netlify[^"']*npm run check:env -- --production[^"']*npm run build[^"']*["']/.test(toml),'Netlify deve executar contrato, preflight de produção e build');
assert(/publish\s*=\s*["']\.next["']/.test(toml),'Netlify deve publicar .next');
assert(/NODE_VERSION\s*=\s*["']22\.23\.2["']/.test(toml),'Node do Netlify deve seguir platform-contract');
assert(/NETLIFY_NEXT_SKEW_PROTECTION\s*=\s*["']true["']/.test(toml),'Skew protection deve estar habilitada');
assert(!/\/\*\s+\/index\.html\s+200/.test(toml),'Rewrite SPA global é incompatível com Next.js híbrido');

const nextConfig=read('next.config.ts');
assert(!/output\s*:\s*["']export["']/.test(nextConfig),'Projeto não pode usar output: export');

const upload=read('app/api/admin/upload/route.ts');
assert(/PutObjectCommand/.test(upload),'Upload deve continuar usando storage remoto');
assert(/runtime\s*=\s*["']nodejs["']/.test(upload),'Upload deve rodar em runtime nodejs');
assert(!/writeFile|writeFileSync|createWriteStream/.test(upload),'Upload não pode persistir arquivos no filesystem do runtime');
assert(upload.includes("code:'STORAGE_NOT_CONFIGURED'"),'Upload deve sinalizar storage ausente com código estável');
assert(upload.includes('can_use_external_url:true'),'Upload deve orientar fallback seguro por URL externa');
assert(upload.includes('Cloudflare R2 no Netlify'),'Upload deve orientar a infraestrutura oficial');

const storage=read('lib/storage.ts');
for(const key of ['S3_ENDPOINT','S3_BUCKET','S3_ACCESS_KEY_ID','S3_SECRET_ACCESS_KEY','S3_PUBLIC_BASE_URL'])assert(storage.includes(key),`Storage não lê ${key}`);
assert(/forcePathStyle\s*:\s*true/.test(storage),'Storage S3 deve manter path-style compatível com R2');

const manager=read('components/admin/MediaManager.tsx');
const picker=read('components/admin/MediaPicker.tsx');
assert(manager.includes('Cloudflare R2 nas variáveis do Netlify'),'MediaManager deve orientar Netlify + R2');
assert(picker.includes('Cloudflare R2 nas variáveis do Netlify'),'MediaPicker deve orientar Netlify + R2');
assert(!/RunSite/i.test(manager+picker),'UI administrativa de mídia não deve citar a plataforma legada');

const env=read('.env.example');
for(const key of ['DATABASE_URL','SESSION_SECRET','PRIVACY_HASH_SECRET','ADMIN_PASSWORD_HASH','ADMIN_TOTP_SECRET','S3_ENDPOINT','S3_BUCKET','S3_ACCESS_KEY_ID','S3_SECRET_ACCESS_KEY','S3_PUBLIC_BASE_URL','BACKUP_S3_BUCKET'])assert(env.includes(`${key}=`),`.env.example não documenta ${key}`);
assert(env.includes('Cloudflare R2'),'.env.example deve documentar R2');

const pkg=JSON.parse(read('package.json'));
assert(pkg.scripts?.['check:netlify']==='node scripts/netlify-r2-contract-check.mjs','package.json não registra check:netlify');
assert(String(pkg.scripts?.verify||'').includes('check:netlify'),'verify não inclui check:netlify');

const ci=read('.github/workflows/ci.yml');
assert(ci.includes('npm run check:netlify'),'CI não executa check:netlify');

if(failures.length){
  console.error(`Netlify/R2 Contract: FALHOU (${failures.length})`);
  for(const f of failures)console.error(`- ${f}`);
  process.exit(1);
}
console.log('Netlify/R2 Contract: OK — Next.js híbrido + Neon + storage S3-compatible fail-safe e pronto para ativação do Cloudflare R2.');
