import fs from 'node:fs';

const errors=[];
const builder=fs.readFileSync('components/TopperBuilder.tsx','utf8');
const quotePage=fs.readFileSync('app/orcamento/page.tsx','utf8');
const orderBuilder=fs.readFileSync('components/OrderBuilder.tsx','utf8');
const orderPage=fs.readFileSync('app/monte-seu-pedido/page.tsx','utf8');
const builderPage=fs.readFileSync('app/monte-seu-topo/page.tsx','utf8');
const validation=fs.readFileSync('lib/validation.ts','utf8');

for(const needle of ["'/api/inquiries'","request_id:requestId.current","getAttribution()","source:'site'","desired_categories:['Topos de bolo']","product_name:selected.name","category:'Topos de bolo'","event_date:form.event_date","cake_size","theme","colors"]){
  if(!builder.includes(needle))errors.push(`Orçamento de topo perdeu requisito: ${needle}`);
}
if(!builder.includes('selected.code')||!builder.includes('selected.name'))errors.push('resumo do pedido precisa carregar nível/código do topo');
if(!quotePage.includes('<OrderBuilder/>'))errors.push('rota /orcamento precisa usar o briefing adaptativo');
if(!builderPage.includes('<TopperBuilder/>'))errors.push('rota /monte-seu-topo precisa preservar o briefing legado de topo');
if(!orderPage.includes('<OrderBuilder/>'))errors.push('rota /monte-seu-pedido precisa usar OrderBuilder');

for(const needle of [
  "selectedProduct.label",
  "desired_categories:[selectedProduct.label]",
  "productType==='topo'",
  "productType==='caixinhas'",
  "productType==='lembrancinhas'",
  "productType==='marcadores'",
  "productType==='chaveiros'",
  "productType==='outro'"
])if(!orderBuilder.includes(needle))errors.push(`OrderBuilder perdeu requisito V8.21: ${needle}`);

for(const forbidden of ["productType==='doces'","productType==='kit'"]){
  if(orderBuilder.includes(forbidden))errors.push(`OrderBuilder V8.21 voltou a expor categoria inativa: ${forbidden}`);
}

if(!validation.includes("source: z.enum(['site','concierge','shared_list'])"))errors.push('contrato da API pode rejeitar source=site');
if(!validation.includes('desired_categories: z.array')||!validation.includes('.max(12)'))errors.push('contrato de categorias do briefing não está compatível');

if(errors.length){console.error(`Topper Quote Contract: FALHOU (${errors.length})`);for(const error of errors)console.error('- '+error);process.exit(1);}
console.log('Quote Contract V8.21: OK — briefing de topo preservado e orçamento limitado às categorias públicas ativas.');
