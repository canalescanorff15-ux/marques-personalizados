import fs from 'node:fs';

const errors=[];
const globalError=fs.readFileSync('app/global-error.tsx','utf8');
const errorPage=fs.readFileSync('app/error.tsx','utf8');
const notFound=fs.readFileSync('app/not-found.tsx','utf8');
const loading=fs.readFileSync('app/loading.tsx','utf8');

for(const internal of ['health check','logs do servidor','stack','digest']){
  if(globalError.toLowerCase().includes(internal))errors.push(`falha global ainda expõe linguagem interna ao cliente: ${internal}`);
}
if(!globalError.includes('href="/"'))errors.push('falha global não oferece caminho seguro de volta ao início');
if(!globalError.includes('Tentar novamente'))errors.push('falha global perdeu ação de nova tentativa');
if(!globalError.includes("background:'#fffaf7'"))errors.push('falha global ainda não acompanha a identidade clara atual da Merlin');

if(!errorPage.includes('Seus dados não devem ser considerados enviados'))errors.push('página de erro precisa deixar claro que envio não foi confirmado');
if(!notFound.includes('href="/monte-seu-pedido"'))errors.push('404 precisa manter caminho para o fluxo atual de pedido');
if(!loading.includes('aria-busy="true"')||!loading.includes('aria-live="polite"'))errors.push('estado de carregamento perdeu sinalização acessível');

if(errors.length){
  console.error(`V8.29 Public State Integrity Contract: FALHOU (${errors.length})`);
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V8.29 Public State Integrity Contract: OK — erro global, 404 e carregamento são públicos, seguros e coerentes com a identidade atual.');
