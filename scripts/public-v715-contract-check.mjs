import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');

for(const file of ['app/public-v715.css','app/layout.tsx','app/page.tsx','app/inspiracoes/page.tsx','app/inspiracoes/[code]/page.tsx','app/monte-seu-topo/page.tsx']){
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
  const hero=home.slice(home.indexOf('<section className="hero'),home.indexOf('<section className="category-showcase'));
  for(const token of ['Seu tema, do seu jeito.','Ver inspirações','Conhecer os níveis','Orçamento confirmado antes da produção'])if(!hero.includes(token))errors.push('hero V7.15 sem '+token);
  for(const noisy of ['Níveis & preços','Pedir orçamento</Link>'])if(hero.includes(noisy))errors.push('hero V7.15 ainda concentra CTA secundário: '+noisy);
  if(!home.includes('Inspire-se.<br/><em>Personalize. Peça orçamento.</em>'))errors.push('home sem sequência comercial V7.15');
}


if(fs.existsSync('lib/topper-inspirations.ts')){
  const inspirationSource=read('lib/topper-inspirations.ts');
  const images=[...inspirationSource.matchAll(/image:'([^']+)'/g)].map(match=>match[1]);
  for(const image of images.filter(value=>value.startsWith('/topper-inspirations/')&&value.endsWith('.svg'))){
    const asset='public'+image;
    if(!fs.existsSync(asset)){errors.push('asset V7.15 ausente: '+asset);continue;}
    const svg=read(asset);
    if(!/viewBox=["']0 0 1200 1200["']/.test(svg))errors.push('inspiração vetorial precisa manter prancha 1200x1200: '+asset);
  }
}

if(fs.existsSync('components/TopperInspirationGallery.tsx')){
  const gallery=read('components/TopperInspirationGallery.tsx');
  if(!gallery.includes('width={1200} height={1200}'))errors.push('galeria não reserva dimensão 1200x1200 das inspirações');
}
if(fs.existsSync('app/inspiracoes/[code]/page.tsx')){
  const detailImage=read('app/inspiracoes/[code]/page.tsx');
  if(!detailImage.includes('width={1200} height={1200}'))errors.push('detalhe não reserva dimensão 1200x1200 da inspiração');
}

if(fs.existsSync('app/inspiracoes/page.tsx')){
  const p=read('app/inspiracoes/page.tsx');
  if(!p.includes('Escolha o estilo que mais se aproxima'))errors.push('banner de inspirações não explica a função de referência');
  if(!p.includes('As inspirações do site existem para facilitar a conversa'))errors.push('fechamento de inspirações não reforça liberdade de criação');
}

if(fs.existsSync('app/inspiracoes/[code]/page.tsx')){
  const d=read('app/inspiracoes/[code]/page.tsx');
  for(const token of ['public-detail-customize','Nome e idade','Cores e elementos','Acabamento','Quero esse modelo'])if(!d.includes(token))errors.push('detalhe V7.15 sem '+token);
}

if(fs.existsSync('app/monte-seu-topo/page.tsx')){
  const b=read('app/monte-seu-topo/page.tsx');
  for(const token of ['Conte como você imagina','Não precisa ter tudo decidido','Preencher meu briefing','Escolha o<br/>acabamento.'])if(!b.includes(token))errors.push('Monte seu topo V7.15 sem '+token);
}

if(errors.length){
  console.error('V7.15 Visual Structure Contract: FALHOU ('+errors.length+')');
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V7.15 Visual Structure Contract: OK — hierarquia, legibilidade, cards, inspirações, briefing e breakpoints protegidos.');
