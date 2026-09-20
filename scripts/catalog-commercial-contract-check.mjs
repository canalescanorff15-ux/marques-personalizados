import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');
const data=read('lib/topper-catalog.ts');
const catalog=read('app/catalogo/page.tsx');
const detail=read('app/catalogo/[slug]/page.tsx');
const prices=read('app/guia-de-precos/page.tsx');
const home=read('app/page.tsx');

const codes=[...data.matchAll(/code:'(TOP-\d{2})'/g)].map(match=>match[1]);
const slugs=[...data.matchAll(/slug:'([^']+)',code:'TOP-/g)].map(match=>match[1]);
if(codes.length!==6)errors.push(`catálogo público precisa ter 6 níveis; encontrou ${codes.length}`);
if(new Set(codes).size!==codes.length)errors.push('códigos TOP duplicados');
if(new Set(slugs).size!==slugs.length)errors.push('slugs TOP duplicados');
for(const code of ['TOP-01','TOP-02','TOP-03','TOP-04','TOP-05','TOP-06'])if(!codes.includes(code))errors.push(`código ausente: ${code}`);
for(const token of ['shaker','acetato','elite-shaker-acetato'])if(!data.includes(token))errors.push(`acabamento/nível ausente: ${token}`);

if(!catalog.includes('topperLevels.map'))errors.push('catálogo raiz não renderiza a linha de topos');
if(catalog.includes('getPublicCatalogPage')||catalog.includes('starterCatalogProducts'))errors.push('catálogo público ainda depende do catálogo misto antigo');
if(!detail.includes('topperLevelBySlug')||!detail.includes("redirect('/catalogo')"))errors.push('detalhe não está limitado aos seis níveis de topo');
if(!prices.includes('topperLevels.map')||!prices.includes('Sob orçamento'))errors.push('guia de preços não reflete os níveis com orçamento real');
if(!prices.includes('shaker')||!prices.includes('acetato'))errors.push('guia de preços não explica acabamentos avançados');
const isV808=home.includes('v8-clean-home');
if(isV808){
  if(!home.includes('href="/catalogo"'))errors.push('Home V8.08 não oferece acesso ao catálogo completo');
  if(!home.includes("const featuredLevels=['essencial','premium','elite-shaker-acetato']"))errors.push('Home V8.08 sem seleção enxuta de níveis representativos');
}else{
  if(!home.includes('href="/catalogo"')||!home.includes('href="/guia-de-precos"')&&!home.includes('/guia-de-precos'))errors.push('home não oferece acesso ao catálogo/guia');
  if(!home.includes('topperLevels.map'))errors.push('home não apresenta a escada de produtos');
}

if(errors.length){console.error(`Topper Catalog Commercial Contract: FALHOU (${errors.length})`);for(const error of errors)console.error('- '+error);process.exit(1);}
console.log('Topper Catalog Commercial Contract: OK — catálogo completo preservado e Home V8.08 pode usar seleção enxuta.');
