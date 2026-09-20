import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');

const home=read('app/page.tsx');
const css=read('app/v8-home.css');
const layout=read('app/layout.tsx');

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
  'O bolo e a decoração da foto estão inclusos?',
  'Vocês fazem outros personalizados além de topo de bolo?'
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
if(home.includes('<span className="home-v717-photo-shade"'))errors.push('Home voltou a renderizar shade sobre fotografia');

const heroStart=home.indexOf('<section className="hero');
const heroEnd=home.indexOf('<section className="home-v717-intro-strip');
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
for(const token of ['Caixinhas','Lembrancinhas','Adesivos & Chaveiros','Doces & Complementos','Kits Personalizados','O que não está incluso por padrão']){
  if(!personalizados.includes(token))errors.push('V8.05 Personalizados sem '+token);
}

if(errors.length){
  console.error('V8.02 Home Premium Contract: FALHOU ('+errors.length+')');
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V8.05 Home Premium Contract: OK — Home conduz Topos + Papelaria Personalizada para descoberta por categoria e orçamento.');
