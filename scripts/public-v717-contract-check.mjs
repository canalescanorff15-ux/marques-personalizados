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
    ['produto marcadores','Marcadores de Página'],
    ['produto caixinhas','Caixinhas — sob consulta'],
    ['produto lembrancinhas','Lembrancinhas'],
    ['produto adesivos e chaveiros','Adesivos & Chaveiros'],
    ['produto outros','Outros Personalizados'],
    ['trabalhos reais','Feito por Nós'],
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
    ['vitrine de produtos V8','v8-home-products'],
    ['galeria de inspirações','home-v717-gallery-grid'],
    ['fonte real de inspirações','publicTopperInspirations'],
    ['contato final','home-v717-contact-shell'],
    ['âncora contato','id="contato"']
  ];
  for(const [label,token] of required)if(!home.includes(token))errors.push(label);
  for(const forbidden of ['Doces & Complementos','>Kits<'])if(home.includes(forbidden))errors.push('Home voltou a exibir linha desativada: '+forbidden);
  const heroEnd=home.indexOf(isEssentialHome?'<section className="v8-home-products':'<section className="home-v717-intro-strip');
  const hero=home.slice(home.indexOf('<section className="hero'),heroEnd);
  if((hero.match(/className="btn /g)||[]).length!==2)errors.push('hero V7.17 deve manter exatamente 2 CTAs principais');
  if(hero.includes('Conhecer os níveis'))errors.push('hero V7.17 voltou a concentrar CTA de níveis');
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

if(fs.existsSync('lib/topper-catalog.ts')){
  const catalog=read('lib/topper-catalog.ts');
  if((catalog.match(/slug:'/g)||[]).length<6)errors.push('catálogo perdeu os seis níveis');
}

if(errors.length){console.error('V7.17 Home Editorial Contract: FALHOU ('+errors.length+')');for(const error of errors)console.error('- '+error);process.exit(1);}
console.log('V8.21 Home Editorial Contract: OK — hero, produtos ativos, trabalhos reais, inspirações e contato protegidos.');
