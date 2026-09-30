import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');
const home=read('app/page.tsx');
const layout=read('app/layout.tsx');
const component=fs.existsSync('components/HomeRealWorkCarousel.tsx')?read('components/HomeRealWorkCarousel.tsx'):'';
const css=fs.existsSync('app/v824-hero-real-work-carousel.css')?read('app/v824-hero-real-work-carousel.css'):'';
const homeCss=fs.existsSync('app/v822-home-premium.css')?read('app/v822-home-premium.css'):'';

if(!home.includes("import HomeRealWorkCarousel from '@/components/HomeRealWorkCarousel';"))errors.push('Home não importa o carrossel de trabalhos reais');
if(!home.includes('<HomeRealWorkCarousel works={REAL_WORKS}/>'))errors.push('Hero não usa os trabalhos reais no carrossel');
for(const removed of ['TRABALHOS REAIS','Feito por Nós.','Peças que já saíram da nossa bancada','id="feito-por-nos"','className="v821-real-work v822-real-work"']){
  if(home.includes(removed))errors.push(`bloco separado de trabalhos reais ainda existe: ${removed}`);
}

for(const token of ["'use client'",'AUTO_ROTATE_MS=6000','setInterval','aria-label="Trabalho anterior"','aria-label="Próximo trabalho"','Produção Merlin','next/image']){
  if(!component.includes(token))errors.push(`carrossel sem comportamento obrigatório: ${token}`);
}
for(const forbidden of ['onMouseEnter','onMouseLeave','onFocusCapture','onBlurCapture','const [paused','if(paused']){
  if(component.includes(forbidden))errors.push(`carrossel ainda pode pausar indefinidamente: ${forbidden}`);
}
for(const token of ['aspectRatios','setAspectRatios','naturalWidth','naturalHeight','onLoad','style={{aspectRatio:activeAspectRatio}}']){
  if(!component.includes(token))errors.push(`carrossel não ajusta a moldura à proporção real da foto: ${token}`);
}
if(component.includes('v824-carousel-dots')||component.includes('Selecionar trabalho'))errors.push('carrossel ainda exibe os pontos de navegação inferiores');
if(!component.includes('aria-live="polite"'))errors.push('carrossel sem anúncio acessível da peça atual');
if(!component.includes('prefers-reduced-motion'))errors.push('carrossel não respeita redução de movimento');

const v823=layout.indexOf("import './v823-pricing.css';");
const v824=layout.indexOf("import './v824-hero-real-work-carousel.css';");
if(v824<0)errors.push('layout não importa CSS V8.24');
if(v823>=0&&v824<=v823)errors.push('CSS V8.24 deve carregar depois da V8.23');

for(const token of ['.v824-real-work-carousel','.v824-carousel-stage','.v824-carousel-image','.v824-carousel-controls','object-fit:contain','@media(max-width:680px)','@media(prefers-reduced-motion:reduce)']){
  if(!css.includes(token))errors.push(`CSS V8.24 sem ${token}`);
}
if(css.includes('aspect-ratio:4/3'))errors.push('moldura do carrossel ainda está presa em 4/3');
if(css.includes('.v824-carousel-dots'))errors.push('CSS ainda mantém navegação por bolinhas abaixo da foto');
const controlsBlock=css.match(/\.v824-carousel-controls\s*\{([\s\S]*?)\}/)?.[1]??'';
if(!/top:\s*16px/.test(controlsBlock))errors.push('controles do carrossel não ficam no topo direito no desktop');
if(/bottom:\s*16px/.test(controlsBlock))errors.push('controles do carrossel ainda estão ancorados na parte inferior');
const mobileControlsBlock=css.match(/@media\(max-width:680px\)\{[\s\S]*?\.v824-carousel-controls\s*\{([\s\S]*?)\}/)?.[1]??'';
if(!/top:\s*10px/.test(mobileControlsBlock))errors.push('controles do carrossel não ficam no topo direito no mobile');
if(/bottom:\s*10px/.test(mobileControlsBlock))errors.push('controles mobile ainda estão ancorados na parte inferior');

const heroTitleBlock=homeCss.match(/\.v822-home \.v822-home-hero h1\s*\{([\s\S]*?)\}/)?.[1]??'';
if(!/font-size:\s*clamp\(2\.7rem,4\.8vw,5rem\)!important/.test(heroTitleBlock))errors.push('título principal desktop ainda está grande demais');
const mobileHeroTitleBlock=homeCss.match(/@media\(max-width:680px\)\{[\s\S]*?\.v822-home \.v822-home-hero h1\s*\{([\s\S]*?)\}/)?.[1]??'';
for(const token of ['max-width:100%!important','font-size:clamp(2.45rem,11vw,3.35rem)!important','overflow-wrap:normal!important','word-break:normal!important','hyphens:none!important']){
  if(!mobileHeroTitleBlock.includes(token))errors.push(`título principal mobile sem ajuste obrigatório: ${token}`);
}

if(errors.length){
  console.error(`V8.24 Hero Real Work Carousel Contract: FALHOU (${errors.length})`);
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V8.24 Hero Real Work Carousel Contract: OK — título responsivo menor, autoplay 6s, moldura adaptativa e controles no topo sem bolinhas inferiores.');
