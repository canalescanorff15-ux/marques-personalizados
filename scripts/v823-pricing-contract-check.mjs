import fs from 'node:fs';

const failures=[];
const read=file=>fs.readFileSync(file,'utf8');
const exists=file=>fs.existsSync(file);
const assert=(ok,msg)=>{if(!ok)failures.push(msg);};

const pricingFile='lib/topper-pricing.ts';
assert(exists(pricingFile),'configuracao central de precos lib/topper-pricing.ts ausente');

if(exists(pricingFile)){
  const pricing=read(pricingFile);
  for(const token of [
    "pricingStage='launch'",
    'classic:35','layers:45','premium:55','transparent:60',
    'classic:40','layers:50','premium:60','transparent:65',
    'classic:45','layers:55','premium:65','transparent:70',
    'classic:45','layers:55','premium:70','transparent:75'
  ])assert(pricing.replace(/\s/g,'').includes(token.replace(/\s/g,'')),`pricing config sem ${token}`);
  assert(pricing.includes('Valor base. O orçamento final pode variar conforme tamanho, quantidade de camadas, complexidade, personalização e materiais especiais.'),'aviso de valor base ausente');
  assert(pricing.includes('Valores de lançamento, sujeitos a atualização conforme custos de produção e evolução da marca.'),'aviso geral de lancamento ausente');
}

const catalog=read('lib/topper-catalog.ts');
for(const pair of [
  ["slug:'essencial'","name:'Topo Clássico'"],
  ["slug:'camadas-3d'","name:'Topo em Camadas'"],
  ["slug:'premium'","name:'Topo Premium'"],
  ["slug:'acetato'","name:'Topo Transparente'"]
]){
  assert(catalog.includes(pair[0]),`slug publico ausente: ${pair[0]}`);
  assert(catalog.includes(pair[1]),`nome comercial ausente: ${pair[1]}`);
}
assert(!catalog.includes("slug:'shaker'"),'Topo Shaker/Movimento ainda esta no catalogo publico');
assert(!catalog.includes("slug:'elite-shaker-acetato'"),'Topo Completo/Luxo ainda esta no catalogo publico');

const catalogPage=read('app/catalogo/page.tsx');
assert(catalogPage.includes('topperPriceForSlug'),'cards do catalogo nao leem a configuracao central de preco');
assert(catalogPage.includes('topperLaunchPriceNote'),'catalogo nao usa o aviso central de lancamento');
assert(catalogPage.includes('A partir de R$'),'cards do catalogo nao exibem preco inicial');
assert(catalogPage.includes('Pedir orçamento no WhatsApp'),'CTA de WhatsApp ausente nos cards');

const detailPage=read('app/catalogo/[slug]/page.tsx');
assert(detailPage.includes('topperPriceForSlug'),'detalhe nao le a configuracao central de preco');
assert(detailPage.includes('topperBasePriceNote'),'detalhe nao usa o aviso central de valor base');
assert(!detailPage.includes('Sob orçamento'),'detalhe ainda exibe Sob orçamento em vez do preco base');

for(const source of [catalogPage,detailPage]){
  for(const duplicated of ['R$ 35','R$ 45','R$ 55','R$ 60','R$ 65','R$ 70','R$ 75'])assert(!source.includes(duplicated),`preco duplicado fora da configuracao central: ${duplicated}`);
}

const orderBuilder=read('components/OrderBuilder.tsx');
assert(orderBuilder.includes('topperLevels'),'OrderBuilder deve continuar usando a fonte oficial dos quatro topos');
assert(orderBuilder.includes('selectedLevel.name'),'resumo do pedido deve levar o nome do topo selecionado');

const activeInspirations=read('lib/active-topper-inspirations.ts');
assert(activeInspirations.includes('topperLevelBySlug'),'inspiracoes publicas nao estao limitadas aos quatro topos atuais');
const gallery=read('components/TopperInspirationGallery.tsx');
assert(gallery.includes('activePublicTopperInspirations'),'galeria ainda pode expor inspiracoes de linhas retiradas');
const inspirationDetail=read('app/inspiracoes/[code]/page.tsx');
assert(inspirationDetail.includes('isActivePublicTopperInspiration'),'detalhe de inspiracao nao bloqueia linhas retiradas');
const sitemap=read('app/sitemap.ts');
assert(sitemap.includes('activePublicTopperInspirations'),'sitemap ainda pode indexar linhas retiradas');

if(failures.length){
  console.error(`V8.23 Pricing Contract: FALHOU (${failures.length})`);
  for(const failure of failures)console.error(`- ${failure}`);
  process.exit(1);
}

console.log('V8.23 Pricing Contract: OK — quatro topos publicos, precos centralizados, etapas futuras ocultas e linhas retiradas fora da vitrine.');
