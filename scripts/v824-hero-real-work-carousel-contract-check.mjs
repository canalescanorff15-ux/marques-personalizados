import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');
const home=read('app/page.tsx');
const layout=read('app/layout.tsx');
const component=fs.existsSync('components/HomeRealWorkCarousel.tsx')?read('components/HomeRealWorkCarousel.tsx'):'';
const css=fs.existsSync('app/v824-hero-real-work-carousel.css')?read('app/v824-hero-real-work-carousel.css'):'';

if(!home.includes("import HomeRealWorkCarousel from '@/components/HomeRealWorkCarousel';"))errors.push('Home não importa o carrossel de trabalhos reais');
if(!home.includes('<HomeRealWorkCarousel works={REAL_WORKS}/>'))errors.push('Hero não usa os trabalhos reais no carrossel');
for(const removed of ['TRABALHOS REAIS','Feito por Nós.','Peças que já saíram da nossa bancada','id="feito-por-nos"','className="v821-real-work v822-real-work"']){
  if(home.includes(removed))errors.push(`bloco separado de trabalhos reais ainda existe: ${removed}`);
}

for(const token of ["'use client'",'AUTO_ROTATE_MS=7000','setInterval','onMouseEnter','onMouseLeave','onFocusCapture','onBlurCapture','aria-label="Trabalho anterior"','aria-label="Próximo trabalho"','Produção Merlin','next/image']){
  if(!component.includes(token))errors.push(`carrossel sem comportamento obrigatório: ${token}`);
}
if(!component.includes('aria-live="polite"'))errors.push('carrossel sem anúncio acessível da peça atual');
if(!component.includes('prefers-reduced-motion'))errors.push('carrossel não respeita redução de movimento');

const v823=layout.indexOf("import './v823-pricing.css';");
const v824=layout.indexOf("import './v824-hero-real-work-carousel.css';");
if(v824<0)errors.push('layout não importa CSS V8.24');
if(v823>=0&&v824<=v823)errors.push('CSS V8.24 deve carregar depois da V8.23');

for(const token of ['.v824-real-work-carousel','.v824-carousel-stage','.v824-carousel-controls','.v824-carousel-dots','@media(max-width:680px)','@media(prefers-reduced-motion:reduce)']){
  if(!css.includes(token))errors.push(`CSS V8.24 sem ${token}`);
}

if(errors.length){
  console.error(`V8.24 Hero Real Work Carousel Contract: FALHOU (${errors.length})`);
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V8.24 Hero Real Work Carousel Contract: OK — trabalhos reais integrados ao hero, rotação automática de 7s, controles acessíveis e seção duplicada removida.');
