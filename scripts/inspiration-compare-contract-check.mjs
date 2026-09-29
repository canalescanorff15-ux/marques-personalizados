import fs from 'node:fs';

const errors=[];
const comparePage=fs.readFileSync('app/comparar-inspiracoes/page.tsx','utf8');
const header=fs.readFileSync('components/Header.tsx','utf8');
const dock=fs.readFileSync('components/MerlinMobileDock.tsx','utf8');
const home=fs.readFileSync('app/page.tsx','utf8');
const catalog=fs.readFileSync('app/catalogo/page.tsx','utf8');
const topperCatalog=fs.readFileSync('lib/topper-catalog.ts','utf8');

if(!comparePage.includes("redirect('/inspiracoes')"))errors.push('comparador antigo precisa redirecionar para inspirações de topo');
for(const [name,source] of [['header',header],['dock',dock],['home',home],['catalog',catalog]]){
  if(source.includes('/comparar-inspiracoes'))errors.push(`${name} ainda expõe o comparador antigo`);
}
if(!catalog.includes('topperLevels.map'))errors.push('comparação comercial agora precisa acontecer entre as linhas do catálogo');
if(!catalog.includes('Ver acabamento'))errors.push('catálogo precisa manter acesso aos detalhes dos quatro acabamentos');
const levels=[...topperCatalog.matchAll(/slug:'([^']+)',code:'TOP-/g)].map(match=>match[1]);
if(levels.length!==4)errors.push(`catálogo comercial deveria ter 4 linhas atuais; encontrou ${levels.length}`);
for(const retired of ['shaker','elite-shaker-acetato'])if(levels.includes(retired))errors.push(`linha retirada ainda está no catálogo: ${retired}`);

if(errors.length){console.error(`Legacy Compare Contract: FALHOU (${errors.length})`);for(const error of errors)console.error('- '+error);process.exit(1);}
console.log('Legacy Compare Contract: OK — comparador antigo aposentado e quatro linhas comerciais atuais preservadas.');
