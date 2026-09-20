import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');

const inspirations=read('lib/topper-inspirations.ts');
const gallery=read('components/TopperInspirationGallery.tsx');
const detail=read('app/inspiracoes/[code]/page.tsx');
const sitemap=read('app/sitemap.ts');
const home=read('app/page.tsx');
const layout=read('app/layout.tsx');
const css=read('app/v8-image-policy.css');

for(const token of [
  'curatedPublicTopperCodes',
  'archivedSceneTopperCodes',
  'publicTopperInspirations',
  'archivedTopperInspirations',
  'archivedSceneTopperInspirations',
  'isPublicTopperInspiration'
])if(!inspirations.includes(token))errors.push('curadoria sem '+token);

const curatedCodes=[...inspirations.matchAll(/'INSP-TOP-(\d{2})'/g)]
  .map(match=>Number(match[1]))
  .filter((value,index,array)=>array.indexOf(value)===index);
for(let code=18;code<=50;code++){
  if(!curatedCodes.includes(code))errors.push('coleção pública explícita sem INSP-TOP-'+String(code).padStart(2,'0'));
}
for(let code=51;code<=73;code++){
  if(!inspirations.includes("'INSP-TOP-"+String(code).padStart(2,'0')+"'"))errors.push('arquivo de cenário sem INSP-TOP-'+String(code).padStart(2,'0'));
}

if(!gallery.includes('publicTopperInspirations'))errors.push('galeria ainda não usa coleção pública curada');
if(!detail.includes('isPublicTopperInspiration'))errors.push('detalhe não bloqueia referências arquivadas');
if(!sitemap.includes('publicTopperInspirations'))errors.push('sitemap ainda expõe referências arquivadas');

const homeCodes=[...home.matchAll(/INSP-TOP-(\d{2})/g)].map(match=>Number(match[1]));
for(const code of homeCodes){
  if(code<18||code>50)errors.push('Home usa inspiração fora da faixa curada: INSP-TOP-'+String(code).padStart(2,'0'));
}

const designIndex=layout.indexOf("import './v8-design-system.css';");
const imageIndex=layout.indexOf("import './v8-image-policy.css';");
if(imageIndex<0)errors.push('layout não importa v8-image-policy.css');
if(designIndex<0||imageIndex<designIndex)errors.push('política de imagem precisa carregar depois do design system');

for(const token of [
  '.home-v717-photo-shade',
  '.public-card-shade-v721',
  '.home-v717-showcase-main>div',
  '.home-v717-gallery-info',
  'position:static!important',
  'display:none!important',
  'filter:none!important',
  'opacity:1!important',
  '.public-detail-image-scope'
])if(!css.includes(token))errors.push('política de imagem sem '+token);

if(errors.length){
  console.error('V8.01 Product Image Policy: FALHOU ('+errors.length+')');
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V8.01 Product Image Policy: OK — 33 inspirações de bolo publicadas; cenários permanecem arquivados e fora do sitemap.');
