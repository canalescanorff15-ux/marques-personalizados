import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');
const home=read('app/page.tsx');
const header=read('components/PublicTopperHeader.tsx');
const dock=read('components/MerlinMobileDock.tsx');
const footer=read('components/Footer.tsx');
const catalog=read('lib/topper-catalog.ts');
const catalogPage=read('app/catalogo/page.tsx');
const inspirationsPage=read('app/inspiracoes/page.tsx');
const orderBuilder=read('components/OrderBuilder.tsx');

for(const route of ['/catalogo','/inspiracoes','/monte-seu-pedido','/orcamento']){
  if(!home.includes(route))errors.push(`home sem caminho comercial: ${route}`);
  if(!header.includes(route))errors.push(`header sem caminho comercial: ${route}`);
  if(!dock.includes(route))errors.push(`dock móvel sem caminho: ${route}`);
}
for(const route of ['/catalogo','/inspiracoes','/monte-seu-pedido'])if(!footer.includes(route))errors.push(`footer sem caminho: ${route}`);

for(const token of ["name:'Topo Clássico'","name:'Topo em Camadas'","name:'Topo Premium'","name:'Topo Transparente'"]){
  if(!catalog.includes(token))errors.push(`linha comercial atual ausente: ${token}`);
}
for(const retired of ["slug:'shaker'","slug:'elite-shaker-acetato'"]){
  if(catalog.includes(retired))errors.push(`linha retirada voltou ao catálogo público: ${retired}`);
}
const imageRefs=[...catalog.matchAll(/image:'([^']+)'/g)].map(match=>match[1]);
if(imageRefs.length!==4)errors.push(`linha de topos precisa declarar 4 imagens oficiais; encontrou ${imageRefs.length}`);
if(new Set(imageRefs).size!==imageRefs.length)errors.push('cada linha atual precisa usar uma imagem oficial exclusiva');
for(const image of imageRefs){
  if(/^https:\/\//.test(image)){
    try{
      const url=new URL(image);
      if(url.hostname!=='merlin-topper-assets.floot.app')errors.push(`host externo de asset não aprovado: ${url.hostname}`);
      if(!url.pathname.startsWith('/_cdn/static/'))errors.push(`asset externo fora do CDN oficial: ${image}`);
    }catch{errors.push(`URL de asset oficial inválida: ${image}`);}
  }else if(!fs.existsSync(`public${image}`))errors.push(`asset oficial ausente: public${image}`);
}

if(!catalogPage.includes('TopperLevelVisual'))errors.push('catálogo não reutiliza a referência visual oficial do nível');
if(!catalogPage.includes('topperPriceForSlug'))errors.push('catálogo não usa preço centralizado');
if(!catalogPage.includes('Pedir orçamento no WhatsApp'))errors.push('catálogo sem CTA de orçamento por linha');
if(!inspirationsPage.includes('TopperInspirationGallery'))errors.push('inspirações não usam a galeria pública de topos');
if(!orderBuilder.includes('topperLevels'))errors.push('Monte seu Pedido não usa a fonte oficial das quatro linhas atuais');
for(const source of [home,header,dock,footer])if(source.includes('href="/monte-seu-kit"'))errors.push('fluxo público ainda contém link para Monte seu Kit');

const nestedContracts=[
  'scripts/public-redesign-contract-check.mjs',
  'scripts/topper-draft-contract-check.mjs',
  'scripts/public-auxiliary-contract-check.mjs',
  'scripts/public-responsive-v714-contract-check.mjs',
  'scripts/public-v715-contract-check.mjs',
  'scripts/public-v716-contract-check.mjs',
  'scripts/public-v717-contract-check.mjs',
  'scripts/public-v718-contract-check.mjs',
  'scripts/public-v7182-asset-integrity-check.mjs',
  'scripts/public-v719-contract-check.mjs',
  'scripts/public-v720-party-scenes-contract-check.mjs',
  'scripts/public-v721-inspirations-contract-check.mjs',
  'scripts/public-v722-inspiration-batch-contract-check.mjs',
  'scripts/v8-home-premium-contract-check.mjs',
  'scripts/v824-hero-real-work-carousel-contract-check.mjs',
  'scripts/v825-carousel-stability-contract-check.mjs',
  'scripts/v8-inspirations-contract-check.mjs',
  'scripts/v8-inspiration-detail-contract-check.mjs',
  'scripts/v8-order-builder-contract-check.mjs',
  'scripts/v8-clean-premium-contract-check.mjs',
  'scripts/v8-global-clean-contract-check.mjs',
  'scripts/v8-storefront-essentials-contract-check.mjs',
  'scripts/v8-sales-minimal-contract-check.mjs',
  'scripts/topper-inspiration-gallery-contract-check.mjs'
];
for(const contract of nestedContracts){
  if(!fs.existsSync(contract)){errors.push(`contrato ausente: ${contract}`);continue;}
  const check=spawnSync(process.execPath,[contract],{encoding:'utf8'});
  if(check.status!==0)errors.push((check.stderr||check.stdout||`${contract} falhou`).trim());
}

if(errors.length){
  console.error(`Merlin V8.25 Commercial UX: FALHOU (${errors.length})`);
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('Merlin V8.25 Commercial UX: OK — quatro linhas atuais, preços centralizados e hero com carrossel estável, compacto e automático.');
