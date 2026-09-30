import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');
const attribution=read('lib/attribution-client.ts');
const validation=read('lib/validation.ts');
const inquiry=read('app/api/inquiries/route.ts');
const orderBuilder=read('components/OrderBuilder.tsx');
const quotePage=read('app/orcamento/page.tsx');
const e2e=read('scripts/http-e2e-check.mjs');

if(attribution.includes('if(existing&&typeof existing===\'object\')return existing'))errors.push('atribuição legada ainda retorna sessionStorage sem normalização');
if(!/sanitizeAttribution|normalizeAttribution/.test(attribution))errors.push('cliente não possui normalizador único de atribuição');
if(!/sessionStorage\.setItem\(KEY,JSON\.stringify\(/.test(attribution))errors.push('atribuição normalizada não é persistida/migrada na sessão');

if(!/safeAttributionSchema|tolerantAttributionSchema|sanitizeAttributionInput/.test(validation))errors.push('schema de inquiry não isola metadados opcionais de atribuição');
if(!/\.catch\(\{\}\)|z\.preprocess\(/.test(validation))errors.push('atribuição opcional ainda pode invalidar integralmente o orçamento');

if(inquiry.includes("{error:'Confira seu nome, WhatsApp e os dados do orçamento.'"))errors.push('API ainda usa mensagem genérica para qualquer falha de schema');
if(!/inquiryValidationMessage|firstInquiryIssueMessage/.test(inquiry))errors.push('API não traduz primeira falha de validação para mensagem pública específica');

if(!orderBuilder.includes("if(error)setError('')"))errors.push('erro antigo do formulário não é limpo quando o usuário corrige dados');
if(!orderBuilder.includes('writeOrderDraft'))errors.push('OrderBuilder perdeu preservação do rascunho');
if(/clearOrderDraft\(\)[\s\S]{0,120}catch/.test(orderBuilder))errors.push('rascunho pode ser apagado no caminho de erro');
if(!quotePage.includes('<OrderBuilder/>'))errors.push('/orcamento não usa mais o fluxo principal de pedido');

for(const route of ['/personalizados','/inspiracoes','/orcamento'])if(!e2e.includes(`request('${route}')`))errors.push(`E2E não cobre rota pública essencial: ${route}`);
if(!e2e.includes('Orçamento aceita pedido público realista'))errors.push('E2E não possui caso positivo realista de orçamento');
if(!e2e.includes('Orçamento tolera atribuição legada opcional'))errors.push('E2E não protege compatibilidade com atribuição legada');

if(errors.length){
  console.error(`V8.29 Site Consistency Contract: FALHOU (${errors.length})`);
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V8.29 Site Consistency Contract: OK — orçamento resiliente a metadados legados, erros específicos, rascunho preservado e rotas públicas auditadas.');