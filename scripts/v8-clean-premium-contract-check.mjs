import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');

const home=read('app/page.tsx');
const css=read('app/v8-clean-ui.css');
const layout=read('app/layout.tsx');
const isEssentialHome=home.includes('v8-essential-home-v814');

for(const token of (isEssentialHome?[
  'v8-clean-home',
  'v8-clean-hero',
  'v8-clean-products',
  'v8-clean-inspirations',
  'v8-clean-contact',
  "['INSP-TOP-48','INSP-TOP-49','INSP-TOP-50']",
  'v8-essential-home-v814',
  'v8-home-scope-note'
]:[
  'v8-clean-home',
  'v8-clean-hero',
  'v8-clean-products',
  'v8-clean-inspirations',
  'v8-clean-process',
  'v8-clean-faq',
  'v8-clean-contact',
  "['INSP-TOP-48','INSP-TOP-49','INSP-TOP-50']"
])){
  if(!home.includes(token))errors.push('Home V8.08 sem '+token);
}

for(const token of [
  '.public-inspiration-image-v721>.favorite-control',
  'left:auto!important',
  'bottom:auto!important',
  'background:transparent!important',
  'border-radius:0!important',
  '.public-inspiration-image-v721::before',
  '.public-inspiration-image-v721::after',
  'display:none!important',
  '.v8-clean-products-grid',
  '.v8-clean-gallery',
  '@media(max-width:680px)'
]){
  if(!css.includes(token))errors.push('CSS V8.08 sem '+token);
}

const cleanIndex=layout.indexOf("import './v8-clean-ui.css';");
const orderIndex=layout.indexOf("import './v8-order-builder.css';");
if(cleanIndex<0)errors.push('layout não importa v8-clean-ui.css');
if(orderIndex<0||cleanIndex<orderIndex)errors.push('v8-clean-ui.css precisa carregar por último entre as camadas V8 principais');

if(home.includes('home-v717-hero-meta'))errors.push('Home clean não deve voltar a exibir metadados extensos no hero');
if(home.includes('home-v717-theme-cloud'))errors.push('Home clean não deve voltar a exibir nuvem de temas');
if(home.includes('testimonial-section'))errors.push('Home clean não deve voltar a incluir depoimentos longos na página inicial');
if(isEssentialHome){
  for(const forbidden of ['v8-clean-trust','v8-clean-levels','v8-clean-process','v8-clean-about','v8-clean-faq']){
    if(home.includes(forbidden))errors.push('Home essencial voltou a renderizar bloco secundário: '+forbidden);
  }
}

if(errors.length){
  console.error('V8.08 Clean Premium Contract: FALHOU ('+errors.length+')');
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V8.14 Clean Premium Contract: OK — Home essencial, fotos limpas e fluxo curto protegidos.');
