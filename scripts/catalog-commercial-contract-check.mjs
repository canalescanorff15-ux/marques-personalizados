import fs from 'node:fs';
import './v823-pricing-contract-check.mjs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');
const data=read('lib/topper-catalog.ts');
const catalog=read('app/catalogo/page.tsx');
const detail=read('app/catalogo/[slug]/page.tsx');
const prices=read('app/guia-de-precos/page.tsx');
const home=read('app/page.tsx');

const codes=[...data.matchAll(/code:'(TOP-\d{2})'/g)].map(match=>match[1]);
const slugs=[...data.matchAll(/slug:'([^']+)',code:'TOP-/g)].map(match=>match[1]);
if(codes.length!==4)errors.push(`catálogo público precisa ter 4 níveis ativos; encontrou ${codes.length}`);
if(new Set(codes).size!==codes.length)errors.push('códigos TOP duplicados');
if(new Set(slugs).size!==slugs.length)errors.push('slugs TOP duplicados');
for(const code of ['TOP-01','TOP-02','TOP-03','TOP-05'])if(!codes.includes(code))errors.push(`código ausente: ${code}`);
for(const retired of ['shaker','elite-shaker-acetato'])if(data.includes(`slug:'${retired}'`))errors.push(`nível retirado ainda está público: ${retired}`);

if(!catalog.includes('topperLevels.map'))errors.push('catálogo raiz não renderiza a linha de topos');
if(catalog.includes('getPublicCatalogPage')||catalog.includes('starterCatalogProducts'))errors.push('catálogo público ainda depende do catálogo misto antigo');
if(!detail.includes('topperLevelBySlug')||!detail.includes("redirect('/catalogo')"))errors.push('detalhe não está limitado aos quatro níveis atuais');
if(!prices.includes('topperLevels.map')||!prices.includes('topperPriceForSlug'))errors.push('guia de preços não usa os quatro níveis com preço centralizado');
if(prices.includes('shaker')||prices.includes('Topo Completo')||prices.includes('Topo Luxo'))errors.push('guia de preços ainda apresenta linhas retiradas');
if(prices.includes('Sob orçamento'))errors.push('guia de preços ainda esconde os valores de lançamento');

const isV808=home.includes('v8-clean-home');
const isEssentialHome=home.includes('v8-essential-home-v814');
if(isEssentialHome){
  if(!home.includes('href="/catalogo"'))errors.push('Home V8.14 não oferece acesso direto ao catálogo completo');
  if(home.includes('featuredLevels'))errors.push('Home V8.14 voltou a incorporar níveis de acabamento que pertencem ao catálogo');
}else if(isV808){
  if(!home.includes('href="/catalogo"'))errors.push('Home V8.08 não oferece acesso ao catálogo completo');
}else{
  if(!home.includes('href="/catalogo"')||!home.includes('href="/guia-de-precos"')&&!home.includes('/guia-de-precos'))errors.push('home não oferece acesso ao catálogo/guia');
}

if(errors.length){console.error(`Topper Catalog Commercial Contract: FALHOU (${errors.length})`);for(const error of errors)console.error('- '+error);process.exit(1);}
console.log('Topper Catalog Commercial Contract: OK — quatro linhas atuais, preços de lançamento centralizados e modelos retirados fora do site público.');
