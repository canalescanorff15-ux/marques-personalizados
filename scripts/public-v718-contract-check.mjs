import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');

for(const file of ['app/public-v718.css','app/layout.tsx','app/page.tsx','components/PublicTopperHeader.tsx','components/Footer.tsx']){
  if(!fs.existsSync(file))errors.push('arquivo V7.18 ausente: '+file);
}

if(fs.existsSync('app/layout.tsx')){
  const layout=read('app/layout.tsx');
  const v717=layout.indexOf("import './public-v717.css';");
  const v718=layout.indexOf("import './public-v718.css';");
  if(v718<0)errors.push('layout não importa public-v718.css');
  if(v717<0||v718<v717)errors.push('V7.18 precisa carregar depois da V7.17');
}

if(fs.existsSync('app/page.tsx')){
  const home=read('app/page.tsx');
  const isV8=home.includes('v8-home-products');
  const required=isV8
    ? ['home-v718-brand-signature','Merlin Encantos em Papel','v8-home-products','Papelaria personalizada']
    : ['home-v718-brand-signature','Merlin Encantos em Papel','feitos sob encomenda','home-v717-showcase-seal'];
  for(const token of required){
    if(!home.includes(token))errors.push('Home '+(isV8?'V8.02':'V7.18')+' sem '+token);
  }
  if(isV8&&home.includes('home-v717-showcase-seal'))errors.push('Home V8.02 não deve reintroduzir selo editorial legado');
  if(!home.includes("settings.logo_url||'/merlin-logo.webp'"))errors.push('Home não usa a logo configurável da marca');
}

if(fs.existsSync('app/public-v718.css')){
  const css=read('app/public-v718.css');
  const required=[
    ['marcador V7.18','/* V7.18 — Refinamento Premium Global da marca */'],
    ['tokens da marca','--merlin-rose:#c91862'],
    ['header premium','.public-topper-header{'],
    ['logo enquadrada','.public-brand-logo{'],
    ['busca refinada','.public-header-search{'],
    ['navegação refinada','.public-main-nav a::after'],
    ['assinatura da logo na Home','.home-v718-brand-signature{'],
    ['selo afastado','.home-v717-showcase-seal{'],
    ['selo desktop mais afastado da foto','left:-96px!important'],
    ['banners internos','.public-inspiration-banner,'],
    ['cards globais','.public-inspiration-card,'],
    ['filtros premium','.public-gallery-filters{'],
    ['catálogo e detalhes','.product-page{'],
    ['briefing premium','.kit-builder-main{'],
    ['campos premium','.kit-brief-grid input,'],
    ['footer premium','.public-v712-footer{'],
    ['logo no footer','.public-v712-footer .kf-footer-logo{'],
    ['tablet','@media(max-width:900px)'],
    ['mobile','@media(max-width:640px)'],
    ['mobile estreito','@media(max-width:390px)']
  ];
  for(const [label,token] of required)if(!css.includes(token))errors.push(label);
}

if(fs.existsSync('components/PublicTopperHeader.tsx')){
  const header=read('components/PublicTopperHeader.tsx');
  if(!header.includes("settings.logo_url||'/merlin-logo.webp'"))errors.push('header não usa logo configurável');
}
if(fs.existsSync('components/Footer.tsx')){
  const footer=read('components/Footer.tsx');
  if(!footer.includes("settings.logo_url||'/merlin-logo.webp'"))errors.push('footer não usa logo configurável');
}

if(errors.length){
  console.error('V7.18 Premium Global Brand Contract: FALHOU ('+errors.length+')');
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V7.18 Premium Global Brand Contract: OK — marca, logo, header, Home, cards, formulários e footer protegidos.');
