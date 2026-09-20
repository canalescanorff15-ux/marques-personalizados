import fs from 'node:fs';

const errors=[];
const comparePage=fs.readFileSync('app/comparar-inspiracoes/page.tsx','utf8');
const header=fs.readFileSync('components/Header.tsx','utf8');
const dock=fs.readFileSync('components/MerlinMobileDock.tsx','utf8');
const home=fs.readFileSync('app/page.tsx','utf8');
const catalog=fs.readFileSync('app/catalogo/page.tsx','utf8');

if(!comparePage.includes("redirect('/inspiracoes')"))errors.push('comparador antigo precisa redirecionar para inspirações de topo');
for(const [name,source] of [['header',header],['dock',dock],['home',home],['catalog',catalog]]){
  if(source.includes('/comparar-inspiracoes'))errors.push(`${name} ainda expõe o comparador antigo`);
}
if(!catalog.includes('topperLevels.map'))errors.push('comparação comercial agora precisa acontecer entre os níveis do catálogo');
const isV810=catalog.includes('v8-storefront-catalog');
if(isV810){
  if(!catalog.includes('item.code')||!catalog.includes('Ver acabamento'))errors.push('catálogo V8.10 precisa manter identificação e acesso aos seis níveis');
}else if(!catalog.includes('TOP-01 ao TOP-06')){
  errors.push('catálogo precisa comunicar claramente a escala dos seis níveis');
}

if(errors.length){console.error(`Legacy Compare Contract: FALHOU (${errors.length})`);for(const error of errors)console.error('- '+error);process.exit(1);}
console.log('Legacy Compare Contract: OK — comparador antigo aposentado e seis níveis preservados no catálogo clean.');
