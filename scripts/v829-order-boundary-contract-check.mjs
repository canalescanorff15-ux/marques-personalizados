import fs from 'node:fs';

const errors=[];
const order=fs.readFileSync('components/OrderBuilder.tsx','utf8');
const validation=fs.readFileSync('lib/validation.ts','utf8');
const route=fs.readFileSync('app/api/inquiries/route.ts','utf8');

const whatsappInput=order.match(/<label>WhatsApp<input[\s\S]*?<\/label>/)?.[0]??'';
if(!/minLength=\{10\}/.test(whatsappInput))errors.push('cliente ainda aceita WhatsApp menor que a regra de 10 dígitos do servidor');

const messageMax=Number(validation.match(/message:\s*z\.string\(\)\.trim\(\)\.max\((\d+)\)/)?.[1]||0);
if(messageMax<5000)errors.push(`limite server-side do resumo ainda é menor que o formulário pode produzir (${messageMax})`);

const resetBlock=order.match(/function resetDraft\(\)[\s\S]*?\n  }/)?.[0]??'';
if(!resetBlock.includes("setError('')"))errors.push('limpar rascunho ainda pode deixar erro antigo visível');

if(!route.includes('function inquiryValidationMessage'))errors.push('API ainda não mapeia erros de schema para campos públicos compreensíveis');
if(route.includes("error:'Confira seu nome, WhatsApp e os dados do orçamento.'"))errors.push('API ainda usa mensagem genérica que pode culpar campos corretos');

if(errors.length){
  console.error(`V8.29 Order Boundary Contract: FALHOU (${errors.length})`);
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V8.29 Order Boundary Contract: OK — cliente/servidor usam limites compatíveis e erros apontam a correção útil.');
