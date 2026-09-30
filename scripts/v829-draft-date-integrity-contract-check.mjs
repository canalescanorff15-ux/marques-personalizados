import fs from 'node:fs';

const errors=[];
for(const file of ['lib/order-draft.ts','lib/topper-draft.ts']){
  const source=fs.readFileSync(file,'utf8');
  if(!source.includes('function date('))errors.push(`${file} ainda não possui normalização própria para datas restauradas`);
  if(!/eventDate:date\(input\.eventDate\)/.test(source))errors.push(`${file} ainda pode restaurar eventDate fora de YYYY-MM-DD`);
}

if(errors.length){
  console.error(`V8.29 Draft Date Integrity Contract: FALHOU (${errors.length})`);
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V8.29 Draft Date Integrity Contract: OK — datas inválidas do navegador são descartadas antes de chegar ao formulário.');
