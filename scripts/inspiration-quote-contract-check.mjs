import fs from 'node:fs';

const errors=[];
const quotePage=fs.readFileSync('app/orcamento/page.tsx','utf8');
const orderBuilder=fs.readFileSync('components/OrderBuilder.tsx','utf8');
const orderPage=fs.readFileSync('app/monte-seu-pedido/page.tsx','utf8');
const builderPage=fs.readFileSync('app/monte-seu-topo/page.tsx','utf8');
const validation=fs.readFileSync('lib/validation.ts','utf8');
const catalog=fs.readFileSync('lib/topper-catalog.ts','utf8');

if(!quotePage.includes('<OrderBuilder/>'))errors.push('rota /orcamento precisa usar o briefing adaptativo atual');
if(!orderPage.includes('<OrderBuilder/>'))errors.push('rota /monte-seu-pedido precisa usar OrderBuilder');
if(!builderPage.includes("redirect('/monte-seu-pedido?produto=topo')"))errors.push('rota /monte-seu-topo deve redirecionar para o fluxo único atual');

for(const needle of [
  "'/api/inquiries'",
  'request_id:requestId.current',
  'getAttribution()',
  "source:'site'",
  'selectedProduct.label',
  'selectedLevel.code',
  'selectedLevel.name',
  "params.get('inspiracao')",
  'topperInspirationBySlug',
  'event_date:form.event_date',
  'form.cake_size',
  'form.theme',
  'form.colors',
  'desired_categories:[selectedProduct.label]'
])if(!orderBuilder.includes(needle))errors.push(`OrderBuilder perdeu requisito: ${needle}`);

for(const needle of ["productType==='topo'","productType==='caixinhas'","productType==='lembrancinhas'","productType==='marcadores'","productType==='chaveiros'","productType==='outro'"]){
  if(!orderBuilder.includes(needle))errors.push(`OrderBuilder perdeu categoria pública: ${needle}`);
}
for(const forbidden of ["key:'doces'","key:'kit'"]){
  const publicTypes=orderBuilder.slice(orderBuilder.indexOf('const productTypes=['),orderBuilder.indexOf('const productQueryMap'));
  if(publicTypes.includes(forbidden))errors.push(`OrderBuilder voltou a expor categoria inativa: ${forbidden}`);
}
for(const retired of ["slug:'shaker'","slug:'elite-shaker-acetato'"])if(catalog.includes(retired))errors.push(`catálogo voltou a expor linha retirada: ${retired}`);

if(!validation.includes("source: z.enum(['site','concierge','shared_list'])"))errors.push('contrato da API pode rejeitar source=site');
if(!validation.includes('desired_categories: z.array')||!validation.includes('.max(12)'))errors.push('contrato de categorias do briefing não está compatível');

if(errors.length){console.error(`V8.23 Quote Contract: FALHOU (${errors.length})`);for(const error of errors)console.error('- '+error);process.exit(1);}
console.log('V8.23 Quote Contract: OK — fluxo único preserva topo selecionado, inspiração e categorias públicas ativas no orçamento.');
