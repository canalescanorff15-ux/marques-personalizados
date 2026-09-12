import fs from 'node:fs';

function read(path){return fs.readFileSync(path,'utf8');}
function assert(condition,message){if(!condition)throw new Error(message);}

const inspirations=read('lib/inspirations.ts');
const filters=read('lib/inspiration-filters.ts');
const explorer=read('components/InspirationExplorer.tsx');
const page=read('app/inspiracoes/page.tsx');
const css=read('app/premium.css');

const codes=[...inspirations.matchAll(/code:'(INSP-\d+)'/g)].map(match=>match[1]);
assert(codes.length===128,`esperado 128 modelos; recebido ${codes.length}`);
assert(new Set(codes).size===codes.length,'códigos de inspiração duplicados');

const themes=[...filters.matchAll(/\{slug:'([^']+)',label:'([^']+)',description:'[^']+',terms:\[/g)].map(match=>match[1]);
assert(themes.length>=12,`esperado pelo menos 12 temas guiados; recebido ${themes.length}`);
assert(new Set(themes).size===themes.length,'slugs de tema duplicados');

const palettes=['blush','sage','lilac','sky','cocoa','blackgold','candy','terracotta'];
for(const palette of palettes){assert(filters.includes(`slug:'${palette}'`),`paleta ausente: ${palette}`);}

for(const param of ['busca','grupo','ocasiao','estilo','nivel','tema','paleta','ordem','salvos']){
  assert(explorer.includes(`'${param}'`),`parâmetro de URL ausente no explorador: ${param}`);
}
for(const facet of ['group','occasion','style','tier','theme','palette']){
  assert(filters.includes(`'${facet}'`),`faceta não declarada: ${facet}`);
}
for(const feature of ['facetCount','filterInspirations','inspirationQuickFilters','inspirationSortOptions']){
  assert(explorer.includes(feature),`recurso não integrado ao explorador: ${feature}`);
}
assert(page.includes("qp('tema',item.slug)"),'atalhos por tema não estão expostos na página');
assert(page.includes("qp('paleta',item.slug)"),'atalhos por paleta não estão expostos na página');
assert(css.includes('/* V6.55 — temas, paletas e filtros avançados */'),'bloco visual V6.55 ausente');
assert(css.includes('.inspiration-active-summary button'),'chips removíveis de filtros ausentes');

console.log(`inspiration-filter-contract-check: OK (${codes.length} modelos, ${themes.length} temas, ${palettes.length} paletas)`);
