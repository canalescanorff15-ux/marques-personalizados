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
    ['hero premium atual','v822-home-hero'],
    ['carrossel de trabalhos reais','HomeRealWorkCarousel'],
    ['trabalhos reais integrados ao hero','<HomeRealWorkCarousel works={REAL_WORKS}/>'],
    ['headline V8.22','Personalizados feitos para'],
    ['CTA catálogo','Ver topos'],
    ['CTA orçamento','Pedir orçamento'],
    ['vitrine de produtos V8','v8-home-products'],
    ['produto marcadores','Marcadores de Página'],
    ['produto caixinhas','Caixinhas'],
    ['produto lembrancinhas','Lembrancinhas'],
    ['produto adesivos e chaveiros','Adesivos & Chaveiros'],
    ['outros personalizados','Outros Personalizados'],
    ['galeria de inspirações','home-v717-gallery-grid'],
    ['fonte real de inspirações','publicTopperInspirations'],
    ['escopo comercial curto','v8-home-scope-note'],
    ['contato final','home-v717-contact-shell'],
    ['âncora contato','id="contato"']
  ]:[['escopo da home','home-v717'],['CTA orçamento','Pedir orçamento']];
  for(const [label,token] of required)if(!home.includes(token))errors.push(label);
  const heroEnd=home.indexOf(isEssentialHome?'<section className="v8-home-products':'<section className="home-v717-intro-strip');
  const hero=home.slice(home.indexOf('<section className="hero'),heroEnd);
  if((hero.match(/className="btn /g)||[]).length!==2)errors.push('hero deve manter exatamente 2 CTAs principais');
  if(isEssentialHome){
    for(const forbidden of ['Doces & Complementos','href="/personalizados#doces"','href="/personalizados#kits"'])if(home.includes(forbidden))errors.push('Home voltou a expor categoria não ativa: '+forbidden);
    for(const removed of ['TRABALHOS REAIS','Feito por Nós.','id="feito-por-nos"'])if(home.includes(removed))errors.push('Home voltou a renderizar seção separada removida: '+removed);
  }
  const v8Curated=fs.existsSync('app/v8-image-policy.css')&&home.includes('homeInspirationCodes');
  if(v8Curated){
    const codes=[...home.matchAll(/INSP-TOP-(\d{2,3})/g)].map(match=>Number(match[1]));
    const publicCodes=codes.filter(code=>code>=74&&code<=109);
    if(publicCodes.length<3)errors.push('Home precisa manter pelo menos três inspirações do lote público atual');
    for(const code of publicCodes)if((code>=92&&code<=97)||(code>=104&&code<=109))errors.push('Home usa inspiração de linha retirada: INSP-TOP-'+code);
  }
}

if(fs.existsSync('app/public-v717.css')){
  const css=read('app/public-v717.css');
  const required=[['marcador V7.17','/* V7.17 — Home editorial premium */'],['hero em duas colunas','.premium-hero .hero-grid'],['colagem editorial legada preservada no CSS','.home-v717-showcase{'],['tablet','@media(max-width:900px)'],['mobile','@media(max-width:640px)'],['mobile estreito','@media(max-width:390px)'],['movimento reduzido','@media(prefers-reduced-motion:reduce)']];
  for(const [label,token] of required)if(!css.includes(token))errors.push(label);
}

if(fs.existsSync('lib/topper-catalog.ts')){
  const catalog=read('lib/topper-catalog.ts');
  const current=[...catalog.matchAll(/slug:'([^']+)',code:'TOP-/g)].map(match=>match[1]);
  if(current.length!==4)errors.push(`catálogo deve manter quatro linhas atuais; encontrou ${current.length}`);
  for(const slug of ['essencial','camadas-3d','premium','acetato'])if(!current.includes(slug))errors.push('linha atual ausente: '+slug);
  for(const retired of ['shaker','elite-shaker-acetato'])if(current.includes(retired))errors.push('linha retirada voltou ao catálogo: '+retired);
}

if(errors.length){console.error('V8.24 Home Editorial Contract: FALHOU ('+errors.length+')');for(const error of errors)console.error('- '+error);process.exit(1);}
console.log('V8.24 Home Editorial Contract: OK — hero curto com trabalhos reais em carrossel, produtos ativos, inspirações e contato protegidos.');
