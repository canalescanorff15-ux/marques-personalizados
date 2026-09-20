import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');

const page=read('app/monte-seu-pedido/page.tsx');
const builder=read('components/OrderBuilder.tsx');
const draft=read('lib/order-draft.ts');
const quote=read('app/orcamento/page.tsx');
const header=read('components/PublicTopperHeader.tsx');
const footer=read('components/Footer.tsx');
const dock=read('components/MerlinMobileDock.tsx');
const sitemap=read('app/sitemap.ts');
const config=read('next.config.ts');
const css=read('app/v8-order-builder.css');
const layout=read('app/layout.tsx');

if(!page.includes('<OrderBuilder/>'))errors.push('/monte-seu-pedido não usa OrderBuilder');
if(!quote.includes('<OrderBuilder/>'))errors.push('/orcamento não usa OrderBuilder');

for(const token of [
  "'topo'","'caixinhas'","'lembrancinhas'","'chaveiros'","'adesivos'","'doces'","'kit'","'outro'",
  "'/api/inquiries'","request_id:requestId.current","getAttribution()","source:'site'",
  "desired_categories:[selectedProduct.label]","product_name:selectedProduct.label",
  "productType==='topo'","cake_size","quantity","frontBack","kitItems","description"
]){
  if(!builder.includes(token))errors.push('OrderBuilder sem requisito: '+token);
}

for(const token of ['ORDER_DRAFT_KEY','ORDER_DRAFT_EVENT','productType:OrderProductType','writeOrderDraft','readOrderDraft','clearOrderDraft']){
  if(!draft.includes(token))errors.push('rascunho V8.06 sem requisito: '+token);
}

for(const source of [header,footer,dock]){
  if(!source.includes('/monte-seu-pedido'))errors.push('navegação pública sem /monte-seu-pedido');
}
if(!sitemap.includes('/monte-seu-pedido'))errors.push('sitemap sem /monte-seu-pedido');
if(!sitemap.includes('/personalizados'))errors.push('sitemap sem /personalizados');

for(const token of [
  "{ source: '/monte-seu-kit', destination: '/monte-seu-pedido', permanent: true }",
  "{ source: '/meu-projeto', destination: '/monte-seu-pedido', permanent: true }"
]){
  if(!config.includes(token))errors.push('redirect legado ausente: '+token);
}

for(const token of [
  '.v8-order-page','.v8-order-hero','.v8-order-product-grid','.v8-order-summary',
  '@media(max-width:1050px)','@media(max-width:640px)','@media(prefers-reduced-motion:reduce)'
]){
  if(!css.includes(token))errors.push('CSS V8.06 sem '+token);
}

const orderStyleIndex=layout.indexOf("import './v8-order-builder.css';");
const inspirationsIndex=layout.indexOf("import './v8-inspirations.css';");
if(orderStyleIndex<0)errors.push('layout não importa v8-order-builder.css');
if(inspirationsIndex>=0&&orderStyleIndex<inspirationsIndex)errors.push('v8-order-builder.css deve carregar depois da camada de inspirações');

if(builder.includes('category:selectedProduct.label'))errors.push('OrderBuilder não deve exigir categoria administrativa não validada');
if(!builder.includes("category:''"))errors.push('OrderBuilder precisa evitar categoria administrativa sintética');

if(errors.length){
  console.error('V8.06 Order Builder Contract: FALHOU ('+errors.length+')');
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V8.06 Order Builder Contract: OK — seleção de produto, campos adaptativos, rascunho, CRM e navegação protegidos.');
