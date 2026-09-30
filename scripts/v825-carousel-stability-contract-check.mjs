import fs from 'node:fs';

const errors=[];
const component=fs.readFileSync('components/HomeRealWorkCarousel.tsx','utf8');
const css=fs.readFileSync('app/v824-hero-real-work-carousel.css','utf8');

if(component.includes('reduceMotion')||component.includes('prefers-reduced-motion'))errors.push('autoplay ainda pode ser bloqueado pela preferência de movimento do sistema');
if(!component.includes('window.setInterval'))errors.push('carrossel sem autoplay por intervalo');
if(!component.includes('AUTO_ROTATE_MS=6000'))errors.push('autoplay não preserva intervalo de 6 segundos');
if(!/\},\[works\.length\]\);/.test(component))errors.push('timer do autoplay ainda reinicia a cada troca de slide');
if(!component.includes('new window.Image()'))errors.push('imagens seguintes não são pré-carregadas para evitar piscada');
for(const token of ['aspectRatios','setAspectRatios','naturalWidth','naturalHeight','style={{aspectRatio:activeAspectRatio}}']){
  if(component.includes(token))errors.push(`layout ainda muda de altura conforme a foto: ${token}`);
}

const stage=css.match(/\.v824-carousel-stage\s*\{([\s\S]*?)\}/)?.[1]??'';
if(!/height:\s*clamp\(400px,40vw,520px\)/.test(stage))errors.push('altura desktop do quadro não está na faixa estável V8.28');
if(/aspect-ratio/.test(stage)||/transition:[^;]*aspect-ratio/.test(stage))errors.push('quadro ainda anima/muda proporção e pode causar salto de página');

const imageBlock=css.match(/\.v824-carousel-image\s*\{([\s\S]*?)\}/)?.[1]??'';
if(/animation:/.test(imageBlock))errors.push('imagem ainda usa animação de entrada que pode causar piscada');

const mobileStage=css.match(/@media\(max-width:680px\)\{[\s\S]*?\.v824-carousel-stage\s*\{([\s\S]*?)\}/)?.[1]??'';
if(!/height:\s*clamp\(330px,98vw,440px\)/.test(mobileStage))errors.push('altura mobile do quadro não está na faixa estável V8.28');

for(const token of ['type="button" onClick={previous}','type="button" onClick={next}']){
  if(!component.includes(token))errors.push(`controle manual perdeu botão seguro: ${token}`);
}

if(errors.length){
  console.error(`V8.25 Carousel Stability Contract: FALHOU (${errors.length})`);
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V8.25 Carousel Stability Contract: OK — autoplay 6s contínuo, quadro estável/compacto e troca sem animação de entrada ou salto de layout.');
