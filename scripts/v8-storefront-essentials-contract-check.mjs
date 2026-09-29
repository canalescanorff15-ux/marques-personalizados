import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');

const catalog=read('app/catalogo/page.tsx');
const personalizados=read('app/personalizados/page.tsx');
const inspirations=read('app/inspiracoes/page.tsx');
const detail=read('app/inspiracoes/[code]/page.tsx');
const css=read('app/v8-storefront-clean.css');
const layout=read('app/layout.tsx');

for(const token of ['v8-storefront-catalog','topperLevels.map','TopperLevelVisual','Montar meu topo']){
  if(!catalog.includes(token))errors.push('Catálogo V8.10 sem '+token);
}
for(const forbidden of ['price-guide-rules','Sem pacote obrigatório.','Shaker e acetato são acabamentos avançados.']){
  if(catalog.includes(forbidden))errors.push('Catálogo V8.10 ainda contém bloco excessivo: '+forbidden);
}

for(const token of ['v8-storefront-personalizados','Marcadores de Página','Caixinhas — sob consulta','Lembrancinhas','Adesivos & Chaveiros','Outros Personalizados','v8-storefront-note']){
  if(!personalizados.includes(token))errors.push('Personalizados V8.21 sem '+token);
}
for(const forbidden of ['Kits Personalizados','Doces & Complementos','v8-scope-section','v8-personalizados-steps','O que pode estar incluso','TRANSPARÊNCIA NO PEDIDO']){
  if(personalizados.includes(forbidden))errors.push('Personalizados V8.21 contém item/bloco que deve ficar oculto: '+forbidden);
}

for(const token of ['v8-storefront-inspirations','TopperInspirationGallery','Encontre uma ideia.','Contar minha ideia']){
  if(!inspirations.includes(token))errors.push('Inspirações V8.10 sem '+token);
}
for(const forbidden of ['public-inspiration-benefits','public-after-points','public-inspiration-custom-cta','Referências que ajudam a']){
  if(inspirations.includes(forbidden))errors.push('Inspirações V8.10 ainda contém bloco excessivo: '+forbidden);
}

for(const token of ['v8-storefront-detail','InspirationFavoriteButton','InspirationShareButton','Quero esse modelo','v8-storefront-disclaimer','related.length>0']){
  if(!detail.includes(token))errors.push('Detalhe V8.10 sem '+token);
}
for(const forbidden of ['v8-detail-facts','v8-detail-tags','v8-detail-note','v8-detail-final-cta','v8-detail-scope']){
  if(detail.includes(forbidden))errors.push('Detalhe V8.10 ainda contém bloco excessivo: '+forbidden);
}

for(const token of [
  '.v8-storefront-hero',
  '.v8-storefront-grid',
  '.v8-storefront-card',
  '.v8-storefront-level-card',
  '.v8-storefront-note',
  '.v8-storefront-detail .v8-detail-personalize',
  '.v8-storefront-related',
  '@media(max-width:640px)'
]){
  if(!css.includes(token))errors.push('CSS V8.10 sem '+token);
}

const storefrontIndex=layout.indexOf("import './v8-storefront-clean.css';");
const globalIndex=layout.indexOf("import './v8-global-clean.css';");
if(storefrontIndex<0)errors.push('layout não importa v8-storefront-clean.css');
if(globalIndex<0||storefrontIndex<globalIndex)errors.push('v8-storefront-clean.css precisa carregar depois de v8-global-clean.css');

if(errors.length){
  console.error('V8 Storefront Essentials Contract: FALHOU ('+errors.length+')');
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V8.21 Storefront Essentials Contract: OK — personalizados ativos, imagem e CTA prioritários sem categorias não ofertadas.');
