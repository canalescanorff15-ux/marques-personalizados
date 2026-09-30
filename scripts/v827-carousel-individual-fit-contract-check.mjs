import fs from 'node:fs';

const errors=[];
const home=fs.readFileSync('app/page.tsx','utf8');
const component=fs.readFileSync('components/HomeRealWorkCarousel.tsx','utf8');
const css=fs.readFileSync('app/v824-hero-real-work-carousel.css','utf8');

if(!component.includes('fitScale?:number'))errors.push('RealWork ainda não declara escala individual por foto');
if(!component.includes('fitPosition?:string'))errors.push('RealWork ainda não declara posição individual por foto');
if(!component.includes("'--v827-photo-scale'"))errors.push('componente não injeta a escala individual em variável CSS');
if(!component.includes("'--v827-photo-position'"))errors.push('componente não injeta a posição individual em variável CSS');

const workBlock=home.match(/const REAL_WORKS=\[([\s\S]*?)\n\];/)?.[1]??'';
const scales=[...workBlock.matchAll(/fitScale:(0?\.\d+|1(?:\.0+)?)/g)].map(match=>Number(match[1]));
const positions=[...workBlock.matchAll(/fitPosition:'([^']+)'/g)].map(match=>match[1]);
if(scales.length!==4)errors.push(`as 4 fotos reais precisam de fitScale próprio; encontrou ${scales.length}`);
if(positions.length!==4)errors.push(`as 4 fotos reais precisam de fitPosition próprio; encontrou ${positions.length}`);
for(const scale of scales){
  if(!(scale>0&&scale<=1))errors.push(`fitScale inválido (${scale}); nunca pode ampliar acima de 1`);
}
if(scales.length===4&&new Set(scales).size<3)errors.push('as fotos continuam recebendo praticamente o mesmo enquadramento; esperado ajuste individual real');

const strongSelector='.premium-site.v822-home .v822-hero-visual .v826-carousel-photo-safe > img.v824-carousel-image';
if(!css.includes(strongSelector))errors.push('CSS não possui seletor forte para impedir regras antigas de cover');
const start=css.indexOf(strongSelector);
const strong=start>=0?css.slice(start,css.indexOf('}',start)+1):'';
if(!/object-fit:\s*contain\s*!important/.test(strong))errors.push('imagem principal não força contain!important contra CSS legado');
if(!/object-position:\s*var\(--v827-photo-position/.test(strong))errors.push('posição individual não é aplicada na imagem principal');
if(!/scale\(var\(--v827-photo-scale/.test(strong))errors.push('escala individual não é aplicada na imagem principal');
if(!/transform-origin:\s*center\s*!important/.test(strong))errors.push('escala individual não usa origem central');

if(errors.length){
  console.error(`V8.27 Carousel Individual Fit Contract: FALHOU (${errors.length})`);
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V8.27 Carousel Individual Fit Contract: OK — cada foto usa enquadramento próprio, sem cover e sem zoom acima de 100%.');
