import fs from 'node:fs';

function read(path){return fs.readFileSync(path,'utf8');}
function assert(condition,message){if(!condition)throw new Error(message);}

const inspirations=read('lib/inspirations.ts');
const filters=read('lib/inspiration-filters.ts');
const explorer=read('components/InspirationExplorer.tsx');
const artwork=read('components/InspirationArtwork.tsx');
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

const exclusiveCodes=[
  'INSP-001','INSP-002','INSP-003','INSP-004','INSP-005','INSP-006','INSP-007','INSP-008','INSP-010',
  'INSP-041','INSP-042','INSP-043','INSP-044','INSP-045','INSP-046','INSP-047','INSP-048','INSP-050',
  'INSP-113','INSP-114','INSP-115','INSP-116','INSP-117','INSP-118','INSP-119',
];
const blockedCodes=['INSP-009','INSP-049'];
const photoMap=new Map([...artwork.matchAll(/['"](INSP-\d+)['"]:\{src:'([^']+)'/g)].map(match=>[match[1],match[2]]));
for(const code of blockedCodes)assert(!photoMap.has(code),`imagem bloqueada não pode estar mapeada: ${code}`);
for(const code of exclusiveCodes){
  const src=photoMap.get(code);
  assert(src,`imagem exclusiva não mapeada: ${code}`);
  assert(src.startsWith('/inspirations/reais/'),`caminho inválido: ${code} -> ${src}`);
  assert(fs.existsSync(`public${src}`),`arquivo exclusivo ausente: public${src}`);
}
assert(!photoMap.has('INSP-102'),'INSP-102 deve permanecer pendente até confirmação visual do arquivo original');
assert(new Set(photoMap.values()).size===photoMap.size,'duas INSPs diferentes não podem compartilhar o mesmo arquivo');
assert(explorer.includes('GROUP_PAGE_SIZE=10'),'paginação por seção deve iniciar em 10 itens');
assert(explorer.includes('visibleByGroup'),'estado de paginação por grupo ausente');
assert(!explorer.includes('results.slice(0,visible)'),'paginação global ainda corta resultados antes do agrupamento');
assert(explorer.includes('section.items.length<section.total'),'controle Mostrar mais por seção ausente');

assert(page.includes("qp('tema',item.slug)"),'atalhos por tema não estão expostos na página');
assert(page.includes("qp('paleta',item.slug)"),'atalhos por paleta não estão expostos na página');
assert(css.includes('/* V6.55 — temas, paletas e filtros avançados */'),'bloco visual V6.55 ausente');
assert(css.includes('.inspiration-active-summary button'),'chips removíveis de filtros ausentes');

console.log(`inspiration-filter-contract-check: OK (${codes.length} modelos, ${themes.length} temas, ${palettes.length} paletas, ${exclusiveCodes.length} imagens exclusivas)`);
