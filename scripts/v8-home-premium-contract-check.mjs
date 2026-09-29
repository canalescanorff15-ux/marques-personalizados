import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');
const home=read('app/page.tsx');
const css=read('app/v8-home.css');
const layout=read('app/layout.tsx');
const personalizados=read('app/personalizados/page.tsx');

for(const token of [
  'v8-home-products','Topos de Bolo','Marcadores de Página','Caixinhas — sob consulta','Lembrancinhas','Adesivos & Chaveiros',
  'Outros Personalizados','Detalhes personalizados que fazem','Pedir orçamento','publicTopperInspirations','v8-home-scope-note','Feito por Nós','REAL_WORKS'
])if(!home.includes(token))errors.push('Home V8.21 sem '+token);

for(const forbidden of ['Doces & Complementos','>Kits<','/personalizados#doces','/personalizados#kits'])if(home.includes(forbidden))errors.push('Home V8.21 ainda contém oferta desativada: '+forbidden);

for(const token of ['.v8-home-products','.v8-home-products-grid','.v8-home-product-card','.v8-home-product-card.is-featured','@media(max-width:980px)','@media(max-width:640px)','@media(prefers-reduced-motion:reduce)'])if(!css.includes(token))errors.push('CSS V8 legado sem '+token);
if(!layout.includes("import './v821-stabilization.css';"))errors.push('layout não importa camada V8.21');

if(home.includes('home-v717-showcase-seal'))errors.push('Home ainda contém selo editorial legado');
for(const forbidden of ['v8-clean-trust','v8-clean-levels','v8-clean-process','v8-clean-about','v8-clean-faq'])if(home.includes(forbidden))errors.push('Home voltou a renderizar bloco removido: '+forbidden);
if(home.includes('<span className="home-v717-photo-shade"'))errors.push('Home voltou a renderizar shade sobre fotografia');

const heroStart=home.indexOf('<section className="hero');
const heroEnd=home.indexOf('<section className="v8-home-products');
const hero=heroStart>=0&&heroEnd>heroStart?home.slice(heroStart,heroEnd):'';
if((hero.match(/className="btn /g)||[]).length!==2)errors.push('hero deve manter exatamente dois CTAs principais');
if(!hero.includes('/inspiracoes')||!hero.includes('/orcamento'))errors.push('hero precisa ligar inspirações e orçamento');

for(const route of ['/personalizados#marcadores','/personalizados#caixinhas','/personalizados#lembrancinhas','/personalizados#adesivos-chaveiros','/personalizados#outros'])if(!home.includes(route))errors.push('produto sem rota comercial V8.21: '+route);
for(const token of ['Marcadores de Página','Caixinhas — sob consulta','Lembrancinhas','Adesivos & Chaveiros','Outros Personalizados','v8-storefront-note'])if(!personalizados.includes(token))errors.push('Personalizados V8.21 sem '+token);
for(const forbidden of ['Doces & Complementos','Kits Personalizados'])if(personalizados.includes(forbidden))errors.push('Personalizados ainda contém linha desativada: '+forbidden);

if(errors.length){console.error('V8.21 Home Premium Contract: FALHOU ('+errors.length+')');for(const error of errors)console.error('- '+error);process.exit(1);}
console.log('V8.21 Home Premium Contract: OK — Home curta distingue trabalhos reais, inspirações e produtos ativos.');
