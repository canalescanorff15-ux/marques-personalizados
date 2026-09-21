import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');

const home=read('app/page.tsx');
const css=read('app/v8-home.css');
const layout=read('app/layout.tsx');

const isEssentialHome=home.includes('v8-essential-home-v814');

for(const token of [
  'v8-home-products',
  'Topos de Bolo',
  'Caixinhas',
  'Lembrancinhas',
  'Adesivos & Chaveiros',
  'Doces & Complementos',
  'Kits',
  'Detalhes personalizados que fazem',
  'Pedir orçamento',
  'publicTopperInspirations',
  ...(isEssentialHome?['v8-home-scope-note','Bolo e cenário não estão inclusos.']:['O bolo e a decoração da foto estão inclusos?','Vocês fazem outros personalizados além de topo de bolo?'])
]){
  if(!home.includes(token))errors.push('Home V8.02 sem '+token);
}

for(const token of [
  '.v8-home-products',
  '.v8-home-products-grid',
  '.v8-home-product-card',
  '.v8-home-product-card.is-featured',
  '@media(max-width:980px)',
  '@media(max-width:640px)',
  '@media(prefers-reduced-motion:reduce)'
]){
  if(!css.includes(token))errors.push('CSS V8.02 sem '+token);
}

const designIndex=layout.indexOf("import './v8-design-system.css';");
const imageIndex=layout.indexOf("import './v8-image-policy.css';");
const homeIndex=layout.indexOf("import './v8-home.css';");
if(homeIndex<0)errors.push('layout não importa v8-home.css');
if(designIndex<0||imageIndex<0||homeIndex<imageIndex)errors.push('v8-home.css precisa carregar depois da política de imagens');

if(home.includes('home-v717-showcase-seal'))errors.push('Home ainda contém selo editorial legado');
if(isEssentialHome){
  for(const forbidden of ['v8-clean-trust','v8-clean-levels','v8-clean-process','v8-clean-about','v8-clean-faq']){
    if(home.includes(forbidden))errors.push('Home V8.14 voltou a renderizar bloco removido: '+forbidden);
  }
}
if(home.includes('<span className="home-v717-photo-shade"'))errors.push('Home voltou a renderizar shade sobre fotografia');

const heroStart=home.indexOf('<section className="hero');
const heroEnd=home.indexOf(isEssentialHome?'<section className="v8-home-products':'<section className="home-v717-intro-strip');
const hero=heroStart>=0&&heroEnd>heroStart?home.slice(heroStart,heroEnd):'';
if((hero.match(/className="btn /g)||[]).length!==2)errors.push('hero V8.02 deve manter exatamente dois CTAs principais');
if(!hero.includes('/inspiracoes')||!hero.includes('/orcamento'))errors.push('hero V8.02 precisa ligar inspirações e orçamento');

for(const route of [
  '/personalizados#caixinhas',
  '/personalizados#lembrancinhas',
  '/personalizados#adesivos-chaveiros',
  '/personalizados#doces',
  '/personalizados#kits'
]){
  if(!home.includes(route))errors.push('produto sem rota comercial V8.05: '+route);
}
if(!fs.existsSync('app/personalizados/page.tsx'))errors.push('rota /personalizados ausente');
const personalizados=fs.existsSync('app/personalizados/page.tsx')?read('app/personalizados/page.tsx'):'';
const isV810Personalizados=personalizados.includes('v8-storefront-personalizados');
const personalizadosTokens=isV810Personalizados
  ? ['Caixinhas','Lembrancinhas','Adesivos & Chaveiros','Doces & Complementos','Kits Personalizados','v8-storefront-note','Bolo, doces e decoração do ambiente não estão inclusos']
  : ['Caixinhas','Lembrancinhas','Adesivos & Chaveiros','Doces & Complementos','Kits Personalizados','O que não está incluso por padrão'];
for(const token of personalizadosTokens){
  if(!personalizados.includes(token))errors.push('Personalizados V8 sem '+token);
}

if(errors.length){
  console.error('V8.02 Home Premium Contract: FALHOU ('+errors.length+')');
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V8.14 Home Premium Contract: OK — Home essencial preserva produtos, inspirações e conversão sem blocos secundários.');
