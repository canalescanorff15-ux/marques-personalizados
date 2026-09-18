import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');
const catalog=read('lib/topper-catalog.ts');
const builder=read('components/TopperBuilder.tsx');
const page=read('app/monte-seu-topo/page.tsx');
const legacy=read('app/monte-seu-kit/page.tsx');
const header=read('components/PublicTopperHeader.tsx');
const home=read('app/page.tsx');
const sitemap=read('app/sitemap.ts');

const codes=[...catalog.matchAll(/code:'(TOP-\d{2})'/g)].map(match=>match[1]);
const slugs=[...catalog.matchAll(/slug:'([^']+)',code:'TOP-/g)].map(match=>match[1]);
if(codes.length!==6)errors.push(`linha de topos precisa ter exatamente 6 níveis; encontrou ${codes.length}`);
if(new Set(codes).size!==codes.length)errors.push('linha de topos possui códigos duplicados');
if(new Set(slugs).size!==slugs.length)errors.push('linha de topos possui slugs duplicados');
for(const code of ['TOP-01','TOP-02','TOP-03','TOP-04','TOP-05','TOP-06'])if(!codes.includes(code))errors.push(`nível ausente: ${code}`);
for(const slug of ['essencial','camadas-3d','premium','shaker','acetato','elite-shaker-acetato'])if(!slugs.includes(slug))errors.push(`slug de nível ausente: ${slug}`);

for(const token of ["'/api/inquiries'","getAttribution()","desired_categories:['Topos de bolo']","source:'site'","cake_size","celebrant_name","celebrant_age","colors","reference","event_date"]){
  if(!builder.includes(token))errors.push(`TopperBuilder sem contrato: ${token}`);
}
if(!builder.includes("product_name:selected.name")||!builder.includes("category:'Topos de bolo'"))errors.push('TopperBuilder precisa identificar o pedido como topo de bolo.');
if(!page.includes('<TopperBuilder/>'))errors.push('rota /monte-seu-topo não monta TopperBuilder');
if(!legacy.includes("redirect('/monte-seu-topo')"))errors.push('rota antiga /monte-seu-kit precisa redirecionar para /monte-seu-topo');
if(!header.includes('href="/monte-seu-topo"'))errors.push('header não expõe /monte-seu-topo');
if(!home.includes('href="/monte-seu-topo"'))errors.push('home não oferece caminho direto para /monte-seu-topo');
if(!sitemap.includes('/monte-seu-topo'))errors.push('sitemap não inclui /monte-seu-topo');
if(header.includes('href="/monte-seu-kit"'))errors.push('header ainda expõe o construtor antigo de kits');

if(errors.length){
  console.error(`Topper Builder Contract: FALHOU (${errors.length})`);
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('Topper Builder Contract: OK — 6 níveis, briefing de topo, CRM/WhatsApp e redirecionamento legado protegidos.');
