import fs from 'node:fs';

const errors=[];
const attribution=fs.readFileSync('lib/attribution-client.ts','utf8');
const validation=fs.readFileSync('lib/validation.ts','utf8');
const order=fs.readFileSync('components/OrderBuilder.tsx','utf8');
const route=fs.readFileSync('app/api/inquiries/route.ts','utf8');

// Regressão do bug visto em produção: visita direta gera referrer_host vazio.
if(!attribution.includes('sanitizeAttribution'))errors.push('atribuição ainda não possui normalização central para dados atuais/legados');
if(!/existing[\s\S]{0,180}sanitizeAttribution/.test(attribution))errors.push('atribuição recuperada do sessionStorage ainda pode reutilizar payload legado sem sanitização');
if(!attribution.includes("...(referrerHost?{referrer_host:referrerHost}:{})"))errors.push('cliente não condiciona referrer_host à existência de valor real');

// O servidor também precisa ser tolerante a vazio equivalente a "não informado".
const attributionBlock=validation.match(/const attributionSchema[\s\S]*?\.optional\(\);/)?.[0]??'';
if(!attributionBlock.includes('referrer_host'))errors.push('schema de atribuição perdeu referrer_host');
if(!/(preprocess|literal\(''\)|literal\(""\))/.test(attributionBlock))errors.push('schema ainda rejeita string vazia em metadado opcional de atribuição');

// Corrigir um campo precisa retirar imediatamente o erro antigo da tela.
const setter=order.match(/function set\([\s\S]*?\n  }/)?.[0]??'';
if(!setter.includes("setError('')"))errors.push('erro de envio continua visível mesmo depois que o usuário corrige um campo');

// A API deve manter a validação no servidor e não afrouxar same-origin.
if(!route.includes('sameOriginRequest(request)'))errors.push('proteção same-origin não pode ser removida para corrigir o formulário');
if(!route.includes('inquirySchema.safeParse(body)'))errors.push('validação server-side do orçamento não pode ser removida');

if(errors.length){
  console.error(`V8.29 Order Validation Integrity Contract: FALHOU (${errors.length})`);
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V8.29 Order Validation Integrity Contract: OK — atribuição opcional normalizada, dados legados higienizados, erro reativo e segurança preservada.');
