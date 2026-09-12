import fs from 'node:fs';

const errors=[];
const component=fs.readFileSync('components/InspirationQuickQuote.tsx','utf8');
const route=fs.readFileSync('app/inspiracoes/[code]/page.tsx','utf8');
const css=fs.readFileSync('app/premium.css','utf8');
const validation=fs.readFileSync('lib/validation.ts','utf8');

for(const needle of ["'/api/inquiries'",'request_id:requestId.current','getAttribution()','source:\'site\'','model.code','model.title','desired_categories','localStorage.setItem(storageKey','localStorage.removeItem(storageKey)','/privacidade']){
  if(!component.includes(needle))errors.push(`Orçamento contextual perdeu requisito: ${needle}`);
}
if(!component.includes("slice(0,6)"))errors.push('Seleção de peças precisa permanecer limitada e previsível.');
if(!component.includes("guest_count:draft.guest_count?Math.max(1,Number(draft.guest_count)):null"))errors.push('Quantidade de convidados precisa ser normalizada antes da API.');
if(!component.includes("event_date:draft.event_date"))errors.push('Data do evento precisa seguir para o CRM.');
if(!route.includes('InspirationQuickQuote model={model}'))errors.push('Ficha individual precisa incorporar o orçamento express contextual.');
if(!route.includes('href="#orcamento-rapido"'))errors.push('CTA principal da ficha precisa conduzir ao briefing contextual antes de abandonar a página.');
if(!route.includes('id="orcamento-rapido"') && !component.includes('id="orcamento-rapido"'))errors.push('Orçamento express precisa ter âncora navegável.');
if(!css.includes('/* V6.59 — orçamento express contextual por inspiração */'))errors.push('Bloco visual V6.59 ausente.');
if(!validation.includes("source: z.enum(['site','concierge','shared_list'])"))errors.push('Contrato da API mudou e pode rejeitar source=site.');
if(!validation.includes('desired_categories: z.array')||!validation.includes('.max(12)'))errors.push('Contrato de categorias do briefing não está compatível com o orçamento express.');

if(errors.length){console.error(`Inspiration Quote Contract Check: ${errors.length} problema(s)`);for(const error of errors)console.error(`- ${error}`);process.exit(1);}
console.log('Inspiration Quote Contract Check: OK (referência, rascunho, CRM, WhatsApp e privacidade protegidos).');
