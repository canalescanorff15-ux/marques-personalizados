import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');

for(const file of ['app/public-v717.css','app/layout.tsx','app/page.tsx','lib/topper-inspirations.ts','lib/topper-catalog.ts']){
  if(!fs.existsSync(file))errors.push('arquivo V7.17 ausente: '+file);
}

if(fs.existsSync('app/layout.tsx')){
  const layout=read('app/layout.tsx');
  const v716=layout.indexOf("import './public-v716.css';");
  const v717=layout.indexOf("import './public-v717.css';");
  if(v717<0)errors.push('layout não importa public-v717.css');
  if(v716<0||v717<v716)errors.push('V7.17 precisa carregar depois da V7.16');
}

if(fs.existsSync('app/page.tsx')){
  const home=read('app/page.tsx');
  const isEssentialHome=home.includes('v8-essential-home-v814');
  const required=isEssentialHome?[
    ['escopo da home','home-v717'],
    ['Home essencial V8.14','v8-essential-home-v814'],
    ['hero editorial','home-v717-showcase'],
    ['headline V8','Detalhes personalizados que fazem'],
    ['CTA inspirações','Ver inspirações'],
    ['CTA orçamento','Pedir orçamento'],
    ['vitrine de produtos V8','v8-home-products'],
    ['produto caixinhas','Caixinhas'],
    ['produto lembrancinhas','Lembrancinhas'],
    ['produto adesivos e chaveiros','Adesivos & Chaveiros'],
    ['produto doces','Doces & Complementos'],
    ['produto kits','Kits'],
    ['galeria de inspirações','home-v717-gallery-grid'],
    ['fonte real de inspirações','publicTopperInspirations'],
    ['escopo comercial curto','v8-home-scope-note'],
    ['contato final','home-v717-contact-shell'],
    ['âncora contato','id="contato"']
  ]:[
    ['escopo da home','home-v717'],
    ['hero editorial','home-v717-showcase'],
    ['headline V8','Detalhes personalizados que fazem'],
    ['CTA inspirações','Ver inspirações'],
    ['CTA orçamento','Pedir orçamento'],
    ['faixa de processo','home-v717-intro-strip'],
    ['vitrine de produtos V8','v8-home-products'],
    ['produto caixinhas','Caixinhas'],
    ['produto lembrancinhas','Lembrancinhas'],
    ['produto adesivos e chaveiros','Adesivos & Chaveiros'],
    ['produto doces','Doces & Complementos'],
    ['produto kits','Kits'],
    ['grade nova de níveis','home-v717-level-grid'],
    ['visuais oficiais dos níveis','TopperLevelVisual'],
    ['galeria de inspirações','home-v717-gallery-grid'],
    ['fonte real de inspirações','publicTopperInspirations'],
    ['processo em três passos','home-v717-process-grid'],
    ['acabamento visual','home-v717-detail-grid'],
    ['história da marca','home-v717-about-grid'],
    ['FAQ ampliado','Posso enviar uma foto ou referência minha?'],
    ['contato final','home-v717-contact-shell'],
    ['âncora sobre','id="sobre"'],
    ['âncora dúvidas','id="duvidas"'],
    ['âncora contato','id="contato"']
  ];
  for(const [label,token] of required)if(!home.includes(token))errors.push(label);
  const heroEnd=home.indexOf(isEssentialHome?'<section className="v8-home-products':'<section className="home-v717-intro-strip');
  const hero=home.slice(home.indexOf('<section className="hero'),heroEnd);
  if((hero.match(/className="btn /g)||[]).length!==2)errors.push('hero V7.17 deve manter exatamente 2 CTAs principais');
  if(hero.includes('Conhecer os níveis'))errors.push('hero V7.17 voltou a concentrar CTA de níveis');
  const v8Curated=fs.existsSync('app/v8-image-policy.css')&&home.includes('homeInspirationCodes');
  if(v8Curated){
    const codes=[...home.matchAll(/INSP-TOP-(\\d{2})/g)].map(match=>Number(match[1]));
    if(codes.some(code=>code<18||code>50))errors.push('hero V8 usa inspiração fora da faixa curada de bolos');
  }else if(!home.includes("['INSP-TOP-13','INSP-TOP-16','INSP-TOP-17'"))errors.push('hero sem curadoria visual de inspirações reais');
}

if(fs.existsSync('app/public-v717.css')){
  const css=read('app/public-v717.css');
  const required=[
    ['marcador V7.17','/* V7.17 — Home editorial premium */'],
    ['hero em duas colunas','.premium-hero .hero-grid'],
    ['colagem editorial','.home-v717-showcase{'],
    ['metadados do hero','.home-v717-hero-meta{'],
    ['grade de níveis 3 colunas','grid-template-columns:repeat(3,minmax(0,1fr))'],
    ['galeria assimétrica','.home-v717-gallery-card-1'],
    ['processo em cards','.home-v717-process-grid{'],
    ['detalhes de acabamento','.home-v717-detail-grid{'],
    ['seção sobre editorial','.home-v717-about-grid{'],
    ['contato escuro','.home-v717-contact-shell{'],
    ['tablet','@media(max-width:900px)'],
    ['mobile','@media(max-width:640px)'],
    ['mobile estreito','@media(max-width:390px)'],
    ['movimento reduzido','@media(prefers-reduced-motion:reduce)']
  ];
  for(const [label,token] of required)if(!css.includes(token))errors.push(label);
}

if(fs.existsSync('lib/topper-inspirations.ts')){
  const source=read('lib/topper-inspirations.ts');
  for(const code of ['INSP-TOP-13','INSP-TOP-16','INSP-TOP-17','INSP-TOP-14','INSP-TOP-10','INSP-TOP-05']){
    if(!source.includes("code:'"+code+"'"))errors.push('inspiração da Home ausente: '+code);
  }
}

if(fs.existsSync('lib/topper-catalog.ts')){
  const catalog=read('lib/topper-catalog.ts');
  if((catalog.match(/slug:'/g)||[]).length<6)errors.push('catálogo perdeu os seis níveis');
}

if(errors.length){
  console.error('V7.17 Home Editorial Contract: FALHOU ('+errors.length+')');
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V8.14 Home Editorial Contract: OK — hero, produtos, inspirações e contato protegidos; blocos secundários podem permanecer aposentados.');
