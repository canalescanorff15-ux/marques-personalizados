import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');

const catalog=read('lib/topper-catalog.ts');
const header=read('components/PublicTopperHeader.tsx');
const footer=read('components/Footer.tsx');
const dock=read('components/MerlinMobileDock.tsx');
const home=read('app/page.tsx');
const personalizados=read('app/personalizados/page.tsx');
const order=read('components/OrderBuilder.tsx');
const inquiry=read('app/api/inquiries/route.ts');
const wrangler=read('wrangler.jsonc');

const expectedLevels=[
  ['essencial','Topo Essencial'],
  ['camadas-3d','Topo 3D em Camadas'],
  ['premium','Topo Premium'],
  ['shaker','Topo com Movimento (Shaker)'],
  ['acetato','Topo com Acetato'],
  ['elite-shaker-acetato','Topo Luxo — Movimento + Acetato']
];
for(const [slug,name] of expectedLevels){
  if(!catalog.includes(`slug:'${slug}'`))errors.push(`slug preservado ausente: ${slug}`);
  if(!catalog.includes(`name:'${name}'`))errors.push(`nome público ausente: ${name}`);
}

if(!header.includes('MerlinMobileDock'))errors.push('dock móvel não está montado no header público compartilhado');
if(home.includes('<MerlinMobileDock'))errors.push('Home ainda monta dock móvel duplicado');
for(const route of ["href:'/'","href:'/catalogo'","href:'/inspiracoes'","href:'/monte-seu-pedido'","href:'/orcamento'"]){
  if(!dock.includes(route))errors.push(`dock sem rota ${route}`);
}
if(!dock.includes('usePathname'))errors.push('dock sem estado ativo por rota');

for(const token of ['Feito por Nós','Marcadores de Página','Caixinhas — sob consulta','Outros Personalizados']){
  if(!home.includes(token))errors.push(`Home sem ${token}`);
}
for(const forbidden of ['Doces & Complementos','>Kits<','/personalizados#kits','/personalizados#doces']){
  if(home.includes(forbidden))errors.push(`Home ainda expõe categoria oculta: ${forbidden}`);
}
const realAssets=[
  '4a19b88c-1f47-4413-9d77-390a25cef683-trabalho-topo-gotico-real.webp',
  'a6f584d3-5ac8-45d7-b179-b9ec7c3da8fb-trabalho-marcadores-literarios-real.webp',
  'ee9a825f-1ab3-479d-83d0-806944f52709-trabalho-marcadores-personalizados-real.webp'
];
for(const asset of realAssets)if(!home.includes(`https://merlin-topper-assets.floot.app/_cdn/static/${asset}`))errors.push(`Home sem trabalho real oficial: ${asset}`);
const officialLogo='https://merlin-topper-assets.floot.app/_cdn/static/fc9617e0-d9e3-4afa-b08f-4a93729b0aed-merlin-logo-oficial.webp';
if(!header.includes(officialLogo))errors.push('header sem logo oficial');
if(!footer.includes(officialLogo))errors.push('footer sem logo oficial');

for(const token of ['Marcadores de Página','Caixinhas — sob consulta','Adesivos & Chaveiros','Lembrancinhas','Outros Personalizados']){
  if(!personalizados.includes(token))errors.push(`Personalizados sem ${token}`);
}
for(const forbidden of ['Doces & Complementos','Kits Personalizados']){
  if(personalizados.includes(forbidden))errors.push(`Personalizados ainda expõe ${forbidden}`);
}

if(!order.includes("key:'marcadores'"))errors.push('OrderBuilder sem produto marcadores');
if(order.includes("key:'doces'"))errors.push('OrderBuilder ainda oferece doces ao público');
if(order.includes("key:'kit'"))errors.push('OrderBuilder ainda oferece kit ao público');
if(!order.includes("marcadores:'marcadores'"))errors.push('query map sem marcadores');

for(const token of ['🎂 NOVO PEDIDO — MERLIN','👤 Cliente:','📱 WhatsApp:','📅 Data do evento:','🎨 Produto:','🎉 Tema:','✍️ Nome/texto:','🎈 Idade/número:','🎨 Cores:','🖼️ Referência:','📝 Observações:']){
  if(!inquiry.includes(token))errors.push(`mensagem WhatsApp sem ${token}`);
}

if(!wrangler.includes('"name": "merlin"'))errors.push('wrangler ainda não aponta para o Worker merlin');
if(!wrangler.includes('https://merlin.encantos.workers.dev'))errors.push('wrangler sem URL pública atual');

if(errors.length){
  console.error(`V8.21 Stabilization Contract: FALHOU (${errors.length})`);
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V8.21 Stabilization Contract: OK — identidade, navegação, catálogo, trabalhos reais e orçamento alinhados.');
