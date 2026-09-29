import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');

const home=read('app/page.tsx');
const css=read('app/v8-home.css');
const stabilizationCss=read('app/v821-stabilization.css');
const premiumCss=fs.existsSync('app/v822-home-premium.css')?read('app/v822-home-premium.css'):'';
const layout=read('app/layout.tsx');

const isEssentialHome=home.includes('v8-essential-home-v814');

for(const token of [
  'v8-home-products',
  'Topos de Bolo',
  'Marcadores de Página',
  'Caixinhas',
  'Lembrancinhas',
  'Adesivos & Chaveiros',
  'Outros Personalizados',
  'Personalizados feitos para',
  'Pedir orçamento',
  'publicTopperInspirations',
  'Feito por Nós',
  'TRABALHOS REAIS',
  'Inspirações são referências visuais.'
]){
  if(!home.includes(token))errors.push('Home V8.22 sem '+token);
}

for(const forbidden of ['Doces & Complementos','href="/personalizados#doces"','href="/personalizados#kits"','<h3>Kits</h3>']){
  if(home.includes(forbidden))errors.push('Home V8.22 voltou a exibir categoria não ativa: '+forbidden);
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
  if(!css.includes(token))errors.push('CSS V8 base sem '+token);
}
for(const token of ['.v821-real-work','.v821-real-work-grid','.v821-product-grid','.merlin-mobile-dock']){
  if(!stabilizationCss.includes(token))errors.push('CSS V8.21 sem '+token);
}
for(const token of [
  '.v822-hero-real',
  '.v822-hero-badge',
  '.v822-product-card',
  '.v822-real-work-card',
  '@media(max-width:680px)',
  '@media(prefers-reduced-motion:reduce)'
]){
  if(!premiumCss.includes(token))errors.push('CSS V8.22 sem '+token);
}

const designIndex=layout.indexOf("import './v8-design-system.css';");
const imageIndex=layout.indexOf("import './v8-image-policy.css';");
const homeIndex=layout.indexOf("import './v8-home.css';");
const stabilizationIndex=layout.indexOf("import './v821-stabilization.css';");
const premiumIndex=layout.indexOf("import './v822-home-premium.css';");
if(homeIndex<0)errors.push('layout não importa v8-home.css');
if(designIndex<0||imageIndex<0||homeIndex<imageIndex)errors.push('v8-home.css precisa carregar depois da política de imagens');
if(stabilizationIndex<homeIndex)errors.push('v821-stabilization.css deve carregar depois da Home base');
if(premiumIndex<stabilizationIndex)errors.push('v822-home-premium.css deve carregar depois da estabilização V8.21');

if(home.includes('home-v717-showcase-seal'))errors.push('Home ainda contém selo editorial legado');
if(isEssentialHome){
  for(const forbidden of ['v8-clean-trust','v8-clean-levels','v8-clean-process','v8-clean-about','v8-clean-faq']){
    if(home.includes(forbidden))errors.push('Home V8.22 voltou a renderizar bloco removido: '+forbidden);
  }
}
if(home.includes('<span className="home-v717-photo-shade"'))errors.push('Home voltou a renderizar shade sobre fotografia');

if(!home.includes("import Image from 'next/image';"))errors.push('Home V8.22 precisa usar next/image');

const heroStart=home.indexOf('<section className="hero');
const heroEnd=home.indexOf('<section className="v8-home-products');
const hero=heroStart>=0&&heroEnd>heroStart?home.slice(heroStart,heroEnd):'';
if((hero.match(/className="btn /g)||[]).length!==2)errors.push('hero V8.22 deve manter exatamente dois CTAs principais');
if(!hero.includes('/catalogo')||!hero.includes('/orcamento'))errors.push('hero V8.22 precisa ligar catálogo e orçamento');
if(!hero.includes('REAL_WORKS[0]'))errors.push('hero V8.22 precisa priorizar um trabalho real da Merlin');
if(hero.includes('featuredInspirations[0]'))errors.push('hero V8.22 não deve usar inspiração como imagem principal');
if(!hero.includes('Produção Merlin'))errors.push('hero V8.22 precisa identificar o trabalho real com Produção Merlin');
if(!hero.includes('v822-hero-real'))errors.push('hero V8.22 precisa usar a composição premium real');

for(const token of ['v822-product-card','v822-real-work-card']){
  if(!home.includes(token))errors.push('Home V8.22 sem '+token);
}

for(const route of [
  '/personalizados#marcadores',
  '/personalizados#caixinhas',
  '/personalizados#lembrancinhas',
  '/personalizados#adesivos-chaveiros',
  '/personalizados#outros'
]){
  if(!home.includes(route))errors.push('produto sem rota comercial V8.22: '+route);
}
if(!fs.existsSync('app/personalizados/page.tsx'))errors.push('rota /personalizados ausente');
const personalizados=fs.existsSync('app/personalizados/page.tsx')?read('app/personalizados/page.tsx'):'';
for(const token of ['Marcadores de Página','Caixinhas','Lembrancinhas','Adesivos & Chaveiros','Outros Personalizados','Sob consulta','Não produzimos bolo, brigadeiros, bombons ou outros alimentos.']){
  if(!personalizados.includes(token))errors.push('Personalizados V8.22 sem '+token);
}
for(const forbidden of ['Kits Personalizados','Doces & Complementos'])if(personalizados.includes(forbidden))errors.push('Personalizados V8.22 ainda expõe '+forbidden);

if(errors.length){
  console.error('V8.22 Home Premium Contract: FALHOU ('+errors.length+')');
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V8.22 Home Premium Contract: OK — Home prioriza produção real, conversão e apresentação premium sem regressões comerciais.');
