import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');

for(const file of ['app/public-v721.css','app/layout.tsx','app/inspiracoes/page.tsx','components/TopperInspirationGallery.tsx']){
  if(!fs.existsSync(file))errors.push('arquivo V7.21 ausente: '+file);
}

if(fs.existsSync('app/layout.tsx')){
  const layout=read('app/layout.tsx');
  const v719=layout.indexOf("import './public-v719.css';");
  const v721=layout.indexOf("import './public-v721.css';");
  if(v721<0)errors.push('layout não importa public-v721.css');
  if(v719<0||v721<v719)errors.push('V7.21 precisa carregar depois da V7.19');
}

if(fs.existsSync('app/inspiracoes/page.tsx')){
  const page=read('app/inspiracoes/page.tsx');
  const isV8=page.includes('Foco no produto')&&page.includes('Referência clara');
  const required=[
    'public-inspirations-v721',
    'public-inspiration-banner-v721',
    '02',
    'Referências que ajudam a',
    'enxergar o resultado.',
    ...(isV8?['Foco no produto','Personalizável','Referência clara']:['Design exclusivo','Para todos os temas','Feito com carinho']),
    'public-after-points'
  ];
  for(const token of required)if(!page.includes(token))errors.push('página '+(isV8?'V8.03':'V7.21')+' sem '+token);
  if(isV8&&page.includes('cenários completos de festa'))errors.push('página V8.03 reintroduziu linguagem de cenário completo');
}

if(fs.existsSync('components/TopperInspirationGallery.tsx')){
  const gallery=read('components/TopperInspirationGallery.tsx');
  for(const token of [
    'PAGE_SIZE=12',
    'INITIAL_VISIBLE=8',
    'public-gallery-search-v721',
    'public-gallery-chip-row',
    'public-gallery-more-filters',
    'public-gallery-filters-v721',
    'public-inspiration-grid-v721',
    'public-inspiration-card-v721',
    'public-inspiration-body-v721',
    'public-card-primary-v721'
  ])if(!gallery.includes(token))errors.push('galeria V7.21 sem '+token);
  if(!gallery.includes('InspirationFavoriteButton'))errors.push('favoritos foram removidos da galeria');
  if(!gallery.includes('topperLevels'))errors.push('níveis foram removidos da galeria');
}

if(fs.existsSync('app/public-v721.css')){
  const css=read('app/public-v721.css');
  const required=[
    ['marcador','/* V7.21 — Galeria Premium de Inspirações */'],
    ['header escuro','.public-inspirations-v721 .public-topper-header{'],
    ['hero escuro','.public-inspirations-v721 .public-inspiration-banner-v721{'],
    ['benefícios','.public-inspiration-benefits{'],
    ['busca premium','.public-gallery-search-v721{'],
    ['chips','.public-gallery-chip-row{'],
    ['drawer','.public-gallery-filters-v721{'],
    ['4 colunas','grid-template-columns:repeat(4,minmax(0,1fr))!important'],
    ['cards overlay','.public-inspiration-body-v721{'],
    ['faixa inferior','.public-after-card-v721{'],
    ['tablet','@media(max-width:820px)'],
    ['mobile','@media(max-width:640px)'],
    ['mobile estreito','@media(max-width:390px)']
  ];
  for(const [label,token] of required)if(!css.includes(token))errors.push(label);
}

if(errors.length){
  console.error('V7.21 Inspiration Premium Gallery: FALHOU ('+errors.length+')');
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V7.21 Inspiration Premium Gallery: OK — mockup premium convertido em UI funcional e responsiva.');
