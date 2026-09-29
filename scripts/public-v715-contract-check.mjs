import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');

for(const file of ['app/public-v715.css','app/layout.tsx','app/page.tsx','app/inspiracoes/page.tsx','app/inspiracoes/[code]/page.tsx','app/monte-seu-topo/page.tsx','app/monte-seu-pedido/page.tsx']){
  if(!fs.existsSync(file))errors.push('arquivo V7.15 ausente: '+file);
}

if(fs.existsSync('app/public-v715.css')){
  const css=read('app/public-v715.css');
  const required=[
    ['marcador V7.15','/* V7.15 — hierarquia visual, legibilidade e estrutura comercial */'],
    ['shell controlado','--v715-shell:1240px'],
    ['medida de leitura','--v715-reading:68ch'],
    ['ritmo vertical fluido','--v715-section-space:clamp(64px,8vw,104px)'],
    ['títulos balanceados','text-wrap:balance'],
    ['hero com largura legível','.premium-hero .hero-copy-column h1'],
    ['ações do hero organizadas','.public-v712 .hero-actions{'],
    ['cards de nível previsíveis','.public-v712 .category-copy{'],
    ['galeria visual quadrada','.public-inspiration-image{\n  aspect-ratio:1/1'],
    ['detalhe com imagem de referência','.public-detail-media{\n  position:sticky'],
    ['personalização explícita','.public-detail-customize{'],
    ['formulário escaneável','.public-v712 .kit-builder-shell{'],
    ['breakpoint tablet','@media(max-width:820px)'],
    ['breakpoint mobile','@media(max-width:640px)'],
    ['proteção celular estreito','@media(max-width:390px)'],
    ['cards de inspiração em uma coluna estreita','.public-inspiration-grid{grid-template-columns:1fr}']
  ];
  for(const [label,token] of required)if(!css.includes(token))errors.push(label);
}

if(fs.existsSync('app/layout.tsx')){
  const layout=read('app/layout.tsx');
  const v712=layout.indexOf("import './public-v712.css';");
  const v715=layout.indexOf("import './public-v715.css';");
  if(v715<0)errors.push('layout não importa public-v715.css');
  if(v712<0||v715<v712)errors.push('camada V7.15 precisa carregar depois da V7.12/V7.14');
}

if(fs.existsSync('app/page.tsx')){
  const home=read('app/page.tsx');
  const isEssentialHome=home.includes('v8-essential-home-v814');
  const heroEnd=home.indexOf(isEssentialHome?'<section className="v8-home-products':'<section className="home-v717-intro-strip');
  const hero=home.slice(home.indexOf('<section className="hero'),heroEnd>0?heroEnd:home.indexOf('<section className="category-showcase'));
  const heroTokens=isEssentialHome?['Personalizados feitos para','Ver topos','Pedir orçamento']:['Pedir orçamento'];
  for(const token of heroTokens)if(!hero.includes(token))errors.push('hero público sem '+token);
  if(!home.includes('Caixinhas')||!home.includes('Lembrancinhas'))errors.push('Home sem expansão de produtos');
}

if(fs.existsSync('components/TopperInspirationGallery.tsx')){
  const gallery=read('components/TopperInspirationGallery.tsx');
  if(!gallery.includes('width={1200} height={1200}'))errors.push('galeria não reserva dimensão 1200x1200 das inspirações');
}
if(fs.existsSync('app/inspiracoes/[code]/page.tsx')){
  const detailImage=read('app/inspiracoes/[code]/page.tsx');
  if(!detailImage.includes('width={1200} height={1200}'))errors.push('detalhe não reserva dimensão 1200x1200 da inspiração');
  for(const token of ['public-detail-customize','Nome e idade','Cores e elementos','Acabamento','Quero esse modelo'])if(!detailImage.includes(token))errors.push('detalhe V7.15 sem '+token);
}

if(fs.existsSync('app/inspiracoes/page.tsx')){
  const p=read('app/inspiracoes/page.tsx');
  const isV810=p.includes('v8-storefront-inspirations');
  if(isV810){
    if(!p.includes('Escolha uma referência e personalize'))errors.push('V8.10 não explica de forma curta a função da referência');
    if(!p.includes('Envie sua própria referência'))errors.push('V8.10 não preserva liberdade de criação');
  }
}

if(fs.existsSync('app/monte-seu-topo/page.tsx')){
  const legacy=read('app/monte-seu-topo/page.tsx');
  if(!legacy.includes("redirect('/monte-seu-pedido?produto=topo')"))errors.push('rota legada /monte-seu-topo não redireciona para o pedido atual');
}
if(fs.existsSync('app/monte-seu-pedido/page.tsx')){
  const order=read('app/monte-seu-pedido/page.tsx');
  for(const token of ['Escolha o produto.','Conte como você imagina.','Começar meu pedido','<OrderBuilder/>'])if(!order.includes(token))errors.push('Monte seu Pedido atual sem '+token);
}

if(errors.length){
  console.error('V8.23 Visual Structure Contract: FALHOU ('+errors.length+')');
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V8.23 Visual Structure Contract: OK — hierarquia curta, quatro linhas atuais, inspirações e fluxo único de pedido protegidos.');
