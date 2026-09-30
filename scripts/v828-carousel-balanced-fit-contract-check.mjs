import fs from 'node:fs';

const errors=[];
const home=fs.readFileSync('app/page.tsx','utf8');
const css=fs.readFileSync('app/v824-hero-real-work-carousel.css','utf8');

const workBlock=home.match(/const REAL_WORKS=\[([\s\S]*?)\n\];/)?.[1]??'';
const scales=[...workBlock.matchAll(/fitScale:(0?\.\d+|1(?:\.0+)?)/g)].map(match=>Number(match[1]));

if(scales.length!==4)errors.push(`as 4 fotos reais precisam de fitScale; encontrou ${scales.length}`);
for(const scale of scales){
  if(scale<.94||scale>1)errors.push(`fitScale ${scale} desequilibrado; V8.28 exige entre .94 e 1 para manter impacto sem cortar`);
}
if(scales.length===4&&new Set(scales).size<3)errors.push('V8.28 precisa manter ajuste individual real entre as fotos');

if(!css.includes('/* V8.28 — equilíbrio visual: foto grande, inteira e sem grande faixa vazia. */'))errors.push('CSS sem regra V8.28 de equilíbrio visual');
if(!/\.v824-carousel-stage\{[\s\S]*?height:clamp\(400px,40vw,520px\)/.test(css))errors.push('hero desktop ainda está alto demais; esperado máximo de 520px');
if(!/\.v826-carousel-photo-safe\{[\s\S]*?inset:clamp\(10px,1\.8vw,16px\)/.test(css))errors.push('área útil ainda reserva espaço demais; esperado inset uniforme pequeno');
if(!/\.v824-carousel-backdrop\{[\s\S]*?opacity:\.3/.test(css))errors.push('backdrop ainda compete com a foto principal; esperado opacidade .3');
if(!/\.v824-carousel-shade\{[\s\S]*?inset:48% 0 0/.test(css))errors.push('degradê inferior não está preparado para legenda sobre a foto');
if(/inset:[^;]*clamp\(72px|inset:[^;]*clamp\(58px/.test(css))errors.push('CSS ainda reserva uma faixa inferior grande para a legenda');

const strongSelector='.premium-site.v822-home .v822-hero-visual .v826-carousel-photo-safe > img.v824-carousel-image';
const start=css.indexOf(strongSelector);
const strong=start>=0?css.slice(start,css.indexOf('}',start)+1):'';
if(!/object-fit:\s*contain\s*!important/.test(strong))errors.push('imagem principal deixou de forçar contain!important');
if(!/scale\(var\(--v827-photo-scale/.test(strong))errors.push('escala individual deixou de ser aplicada');

if(errors.length){
  console.error(`V8.28 Carousel Balanced Fit Contract: FALHOU (${errors.length})`);
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V8.28 Carousel Balanced Fit Contract: OK — fotos grandes, inteiras, sem zoom acima de 100% e com backdrop apenas de acabamento.');
