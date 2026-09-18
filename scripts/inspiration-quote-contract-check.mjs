import fs from 'node:fs';

const errors=[];
const builder=fs.readFileSync('components/TopperBuilder.tsx','utf8');
const quotePage=fs.readFileSync('app/orcamento/page.tsx','utf8');
const builderPage=fs.readFileSync('app/monte-seu-topo/page.tsx','utf8');
const validation=fs.readFileSync('lib/validation.ts','utf8');

for(const needle of ["'/api/inquiries'","request_id:requestId.current","getAttribution()","source:'site'","desired_categories:['Topos de bolo']","product_name:selected.name","category:'Topos de bolo'","event_date:form.event_date","cake_size","theme","colors"]){
  if(!builder.includes(needle))errors.push(`Orçamento de topo perdeu requisito: ${needle}`);
}
if(!builder.includes('selected.code')||!builder.includes('selected.name'))errors.push('resumo do pedido precisa carregar nível/código do topo');
if(!quotePage.includes('<TopperBuilder/>'))errors.push('rota /orcamento precisa usar o briefing exclusivo de topo');
if(!builderPage.includes('<TopperBuilder/>'))errors.push('rota /monte-seu-topo precisa usar o mesmo briefing');
if(!validation.includes("source: z.enum(['site','concierge','shared_list'])"))errors.push('contrato da API pode rejeitar source=site');
if(!validation.includes('desired_categories: z.array')||!validation.includes('.max(12)'))errors.push('contrato de categorias do briefing não está compatível');

if(errors.length){console.error(`Topper Quote Contract: FALHOU (${errors.length})`);for(const error of errors)console.error('- '+error);process.exit(1);}
console.log('Topper Quote Contract: OK — nível, tema, tamanho, CRM/WhatsApp e atribuição protegidos.');
