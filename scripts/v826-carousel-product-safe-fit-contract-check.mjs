import fs from 'node:fs';

const errors=[];
const component=fs.readFileSync('components/HomeRealWorkCarousel.tsx','utf8');
const css=fs.readFileSync('app/v824-hero-real-work-carousel.css','utf8');

if(!component.includes('className="v826-carousel-photo-safe"'))errors.push('foto principal ainda não usa área segura interna');
if(!/className="v826-carousel-photo-safe"[\s\S]*className="v824-carousel-image"/.test(component))errors.push('imagem principal não está dentro da área segura');

const safe=css.match(/\.v826-carousel-photo-safe\s*\{([\s\S]*?)\}/)?.[1]??'';
for(const token of ['position:absolute','z-index:1'])if(!safe.replace(/\s/g,'').includes(token.replace(/\s/g,'')))errors.push(`área segura sem ${token}`);
if(!/inset:\s*clamp\(/.test(safe))errors.push('área segura desktop sem folga responsiva em volta do produto');

const image=css.match(/\.v824-carousel-image\s*\{([\s\S]*?)\}/)?.[1]??'';
if(!/object-fit:\s*contain/.test(image))errors.push('imagem principal não usa contain');
if(!/object-position:\s*center/.test(image))errors.push('imagem principal não fica centralizada');
if(/transform:\s*scale\(/.test(image))errors.push('imagem principal ainda recebe zoom por scale');
if(/object-fit:\s*cover/.test(image))errors.push('imagem principal ainda usa cover');

const mobileSafe=css.match(/@media\(max-width:680px\)\{[\s\S]*?\.v826-carousel-photo-safe\s*\{([\s\S]*?)\}/)?.[1]??'';
if(!/inset:\s*clamp\(/.test(mobileSafe))errors.push('área segura mobile sem folga responsiva');

if(errors.length){
  console.error(`V8.26 Carousel Product Safe Fit Contract: FALHOU (${errors.length})`);
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V8.26 Carousel Product Safe Fit Contract: OK — foto real inteira dentro de área segura, sem cover e sem zoom.');
