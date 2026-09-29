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

if(!page.includes('OrderBuilder whatsappNumber={settings.whatsapp_number}'))errors.push('/monte-seu-pedido não passa WhatsApp ao OrderBuilder');
if(!quote.includes('OrderBuilder whatsappNumber={settings.whatsapp_number}'))errors.push('/orcamento não passa WhatsApp ao OrderBuilder');
if(!page.includes('v8-order-minimal-v815')||!quote.includes('v8-order-minimal-v815'))errors.push('páginas de pedido precisam usar modo compacto');
if(!builder.includes('<summary>Revisar pedido</summary>'))errors.push('pedido sem resumo recolhível');
if(!builder.includes('aria-pressed={productType===item.key}'))errors.push('pedido sem estado acessível nos produtos');

for(const token of [
  "key:'topo'","key:'marcadores'","key:'caixinhas'","key:'lembrancinhas'","key:'chaveiros'","key:'adesivos'","key:'outro'",
  "'/api/inquiries'","request_id:requestId.current","getAttribution()","source:'site'","desired_categories:[selectedProduct.label]",
  "product_name:selectedProduct.label","productType==='topo'","cake_size","quantity","frontBack","description","whatsappUrl","localWhatsapp"
])if(!builder.includes(token))errors.push('OrderBuilder sem requisito: '+token);
for(const forbidden of ["key:'doces'","key:'kit'"])if(builder.includes(forbidden))errors.push('OrderBuilder ainda expõe produto desativado: '+forbidden);

for(const token of ['ORDER_DRAFT_KEY','ORDER_DRAFT_EVENT','productType:OrderProductType','writeOrderDraft','readOrderDraft','clearOrderDraft',"'marcadores'"]){
  if(!draft.includes(token))errors.push('rascunho V8.21 sem requisito: '+token);
}
for(const source of [header,footer,dock])if(!source.includes('/monte-seu-pedido'))errors.push('navegação pública sem /monte-seu-pedido');
if(!sitemap.includes('/monte-seu-pedido'))errors.push('sitemap sem /monte-seu-pedido');
if(!sitemap.includes('/personalizados'))errors.push('sitemap sem /personalizados');
for(const token of ["{ source: '/monte-seu-kit', destination: '/monte-seu-pedido', permanent: true }","{ source: '/meu-projeto', destination: '/monte-seu-pedido', permanent: true }"])if(!config.includes(token))errors.push('redirect legado ausente: '+token);
for(const token of ['.v8-order-page','.v8-order-hero','.v8-order-product-grid','.v8-order-summary','@media(max-width:1050px)','@media(max-width:640px)','@media(prefers-reduced-motion:reduce)'])if(!css.includes(token))errors.push('CSS base V8 sem '+token);
if(!layout.includes("import './v8-order-builder.css';"))errors.push('layout não importa v8-order-builder.css');
if(!layout.includes("import './v821-stabilization.css';"))errors.push('layout não importa overrides V8.21');
if(builder.includes('category:selectedProduct.label'))errors.push('OrderBuilder não deve exigir categoria administrativa não validada');
if(!builder.includes("category:''"))errors.push('OrderBuilder precisa evitar categoria administrativa sintética');

if(errors.length){console.error('V8.21 Order Builder Contract: FALHOU ('+errors.length+')');for(const error of errors)console.error('- '+error);process.exit(1);}
console.log('V8.21 Order Builder Contract: OK — produtos atuais, rascunho e fallback WhatsApp estão protegidos.');
