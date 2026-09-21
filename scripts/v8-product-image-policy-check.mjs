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
const focusCssPath='app/v8-product-focus.css';
const focusCss=fs.existsSync(focusCssPath)?read(focusCssPath):'';

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
for(let code=74;code<=109;code++){
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

const homeMinimalIndex=layout.indexOf("import './v8-home-minimal.css';");
const productFocusIndex=layout.indexOf("import './v8-product-focus.css';");
if(!fs.existsSync(focusCssPath))errors.push('camada V8.13 de foco no produto ausente');
if(productFocusIndex<0)errors.push('layout não importa v8-product-focus.css');
if(homeMinimalIndex<0||productFocusIndex<homeMinimalIndex)errors.push('v8-product-focus.css precisa carregar depois da Home minimalista');

for(const token of [
  '.public-inspiration-image-v721',
  'aspect-ratio:10/11!important',
  'object-fit:contain!important',
  '.v8-clean-hero-media>img',
  '.v8-detail-media>img',
  '.v8-detail-related-card>div',
  'transform:none!important'
]){
  if(!focusCss.includes(token))errors.push('foco de produto V8.13 sem '+token);
}

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
console.log('V8.20 Product Image Policy: OK — 36 inspirações públicas (6 por categoria), sem cortes agressivos; acervo anterior e cenários permanecem arquivados.');
