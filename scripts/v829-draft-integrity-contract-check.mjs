import fs from 'node:fs';

const errors=[];
const orderDraft=fs.readFileSync('lib/order-draft.ts','utf8');
const topperDraft=fs.readFileSync('lib/topper-draft.ts','utf8');
const builder=fs.readFileSync('components/OrderBuilder.tsx','utf8');

// Rascunhos antigos precisam convergir para as categorias públicas atuais.
if(!/input\.productType[\s\S]*adesivos[\s\S]*chaveiros/.test(orderDraft))errors.push('rascunho legado de adesivos ainda não migra centralmente para chaveiros');
if(!/input\.productType[\s\S]*(doces|kit)[\s\S]*outro/.test(orderDraft))errors.push('rascunhos legados de doces/kit ainda não migram centralmente para outro');

// Sanitização deve remover espaços inúteis antes de decidir se existe rascunho.
for(const [name,source] of [['order-draft',orderDraft],['topper-draft',topperDraft]]){
  const helper=source.match(/function trim\([\s\S]*?\n\}/)?.[0]??'';
  if(!helper.includes('.trim()'))errors.push(`${name} ainda preserva espaços em branco como conteúdo real`);
}

// A UI não pode restaurar um tipo sem botão correspondente.
if(!builder.includes("if(nextProduct==='adesivos')nextProduct='chaveiros'"))errors.push('OrderBuilder não possui defesa de compatibilidade para rascunho adesivos legado');

if(errors.length){
  console.error(`V8.29 Draft Integrity Contract: FALHOU (${errors.length})`);
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V8.29 Draft Integrity Contract: OK — rascunhos legados convergem para categorias atuais e espaços vazios não criam estado fantasma.');
