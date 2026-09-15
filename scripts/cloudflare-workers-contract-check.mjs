import fs from 'node:fs';

const failures=[];
const read=file=>fs.readFileSync(file,'utf8');
const exists=file=>fs.existsSync(file);
const assert=(ok,msg)=>{if(!ok)failures.push(msg);};

assert(exists('wrangler.jsonc'),'wrangler.jsonc ausente');
assert(exists('vite.config.ts'),'vite.config.ts ausente');
assert(exists('CLOUDFLARE.md'),'CLOUDFLARE.md ausente');

const wrangler=read('wrangler.jsonc');
assert(/"name"\s*:\s*"merlin-encantos-em-papel"/.test(wrangler),'Worker deve usar o nome merlin-encantos-em-papel');
assert(/"nodejs_compat"/.test(wrangler),'Workers precisa de nodejs_compat para o runtime atual');
assert(/"main"\s*:\s*"vinext\/server\/fetch-handler"/.test(wrangler),'entrypoint vinext do Worker ausente');
assert(/"directory"\s*:\s*"dist\/client"/.test(wrangler),'Static Assets devem sair de dist/client');
assert(/"binding"\s*:\s*"ASSETS"/.test(wrangler),'binding ASSETS ausente');
assert(/"CF_VERSION_METADATA"/.test(wrangler),'version metadata do Worker ausente');
assert(!/<your-[^>]+>/.test(wrangler),'wrangler.jsonc ainda contém placeholder obrigatório');
assert(!/VINEXT_KV_CACHE/.test(wrangler),'KV não deve ser obrigatório enquanto o app não usa data cache persistente');
assert(!/"images"\s*:/.test(wrangler),'Cloudflare Images não deve ser obrigatório na primeira publicação gratuita');
const date=wrangler.match(/"compatibility_date"\s*:\s*"(\d{4}-\d{2}-\d{2})"/)?.[1];
assert(Boolean(date)&&date>='2025-04-01','compatibility_date deve habilitar o nodejs_compat moderno');

const vite=read('vite.config.ts');
for(const token of ['vinext','@cloudflare/vite-plugin','cdnAdapter','cache: { cdn: cdnAdapter() }'])assert(vite.includes(token),`vite.config.ts sem ${token}`);
assert(!vite.includes('kvDataAdapter'),'Vite não deve exigir KV sem uso real de data cache');
assert(!vite.includes('imagesOptimizer'),'Vite não deve consumir transformações do Cloudflare Images por padrão');

const pkg=JSON.parse(read('package.json'));
for(const dep of ['vinext','@vinext/cloudflare'])assert(pkg.dependencies?.[dep],`dependência ausente: ${dep}`);
for(const dep of ['vite','@vitejs/plugin-react','@vitejs/plugin-rsc','@cloudflare/vite-plugin','wrangler'])assert(pkg.devDependencies?.[dep],`devDependency ausente: ${dep}`);
assert(pkg.type==='module','package.json deve usar type=module para Vite/vinext');
assert(pkg.scripts?.['build:vinext']==='vinext build','build:vinext deve usar vinext build');
assert(pkg.scripts?.['deploy:vinext']==='vinext-cloudflare deploy','deploy:vinext deve usar o deploy oficial do @vinext/cloudflare');
assert(pkg.scripts?.['check:cloudflare']==='node scripts/cloudflare-workers-contract-check.mjs','check:cloudflare ausente');

const env=read('.env.example');
for(const key of ['DATABASE_URL','SESSION_SECRET','PRIVACY_HASH_SECRET','ADMIN_PASSWORD_HASH','ADMIN_TOTP_SECRET','S3_ENDPOINT','S3_BUCKET','S3_ACCESS_KEY_ID','S3_SECRET_ACCESS_KEY','S3_PUBLIC_BASE_URL'])assert(env.includes(`${key}=`),`.env.example não documenta ${key}`);

const ci=read('.github/workflows/cloudflare-compat.yml');
for(const token of ['npm run check:cloudflare','npm run build:vinext','vinext-cloudflare deploy --dry-run'])assert(ci.includes(token),`Cloudflare CI sem ${token}`);

if(failures.length){
  console.error(`Cloudflare Workers Contract: FALHOU (${failures.length})`);
  for(const f of failures)console.error(`- ${f}`);
  process.exit(1);
}
console.log('Cloudflare Workers Contract: OK — vinext + Static Assets + Workers Cache prontos, sem KV/Images obrigatórios; Neon e R2 seguem externos.');
