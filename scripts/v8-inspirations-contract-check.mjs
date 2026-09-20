import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');

for(const file of ['app/v8-inspirations.css','app/layout.tsx','app/inspiracoes/page.tsx','components/TopperInspirationGallery.tsx']){
  if(!fs.existsSync(file))errors.push('V8.04 arquivo ausente: '+file);
}

if(fs.existsSync('app/layout.tsx')){
  const layout=read('app/layout.tsx');
  const home=layout.indexOf("import './v8-home.css';");
  const inspirations=layout.indexOf("import './v8-inspirations.css';");
  if(inspirations<0)errors.push('layout não importa v8-inspirations.css');
  if(home<0||inspirations<home)errors.push('V8.04 precisa carregar depois de v8-home.css');
}

if(fs.existsSync('app/v8-inspirations.css')){
  const css=read('app/v8-inspirations.css');
  for(const token of [
    '/* V8.04 — Inspirações Premium',
    '.public-inspirations-v721 .public-topper-header',
    '.public-inspirations-v721 .public-inspiration-banner-v721',
    '.public-inspirations-v721 .public-gallery-search-v721',
    '.public-inspirations-v721 .public-gallery-filters-v721',
    'grid-template-columns:repeat(3,minmax(0,1fr))!important',
    '.public-inspirations-v721 .public-inspiration-card-v721',
    'background:#fff!important',
    '.public-inspirations-v721 .public-inspiration-image-v721>img',
    'opacity:1!important',
    'filter:none!important',
    '.public-inspirations-v721 .public-inspiration-image-v721>.public-card-shade-v721',
    'display:none!important',
    '@media(max-width:1080px)',
    '@media(max-width:640px)'
  ])if(!css.includes(token))errors.push('V8.04 CSS sem requisito: '+token);
}

if(fs.existsSync('app/inspiracoes/page.tsx')){
  const page=read('app/inspiracoes/page.tsx');
  for(const token of ['Foco no produto','Personalizável','Referência clara'])if(!page.includes(token))errors.push('V8.04 página sem '+token);
  if(page.includes('cenários completos de festa'))errors.push('V8.04 não pode prometer cenário completo');
}

if(fs.existsSync('components/TopperInspirationGallery.tsx')){
  const gallery=read('components/TopperInspirationGallery.tsx');
  for(const token of ['public-inspiration-image-v721','public-inspiration-body-v721','Ver detalhes','InspirationFavoriteButton'])if(!gallery.includes(token))errors.push('V8.04 galeria sem '+token);
}

if(errors.length){
  console.error('V8.04 Inspiration Premium Contract: FALHOU ('+errors.length+')');
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V8.04 Inspiration Premium Contract: OK — galeria clara, fotos sem máscara e responsividade protegidas.');
