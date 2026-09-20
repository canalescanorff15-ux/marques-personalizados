import fs from 'node:fs';

const errors=[];
const main='lib/topper-inspirations.ts';
const batch='lib/topper-inspirations-batch.ts';
const host='https://merlin-topper-assets.floot.app/_cdn/static/';

if(!fs.existsSync(main))errors.push('fonte principal de inspirações ausente');
if(!fs.existsSync(batch))errors.push('lote V7.22 de inspirações ausente');

if(fs.existsSync(main)){
  const source=fs.readFileSync(main,'utf8');
  if(!source.includes("import { topperInspirationBatch } from './topper-inspirations-batch';"))errors.push('fonte principal não importa o lote V7.22');
  if(!source.includes('...topperInspirationBatch'))errors.push('fonte principal não incorpora o lote V7.22');
}

if(fs.existsSync(batch)){
  const source=fs.readFileSync(batch,'utf8');
  const codes=[...source.matchAll(/code:"(INSP-TOP-\d+)"/g)].map(match=>match[1]);
  const images=[...source.matchAll(/image:"([^"]+)"/g)].map(match=>match[1]);
  const expected=Array.from({length:56},(_,index)=>'INSP-TOP-'+String(index+18).padStart(2,'0'));

  if(codes.length!==56)errors.push('V7.22 precisa conter 56 inspirações; encontrou '+codes.length);
  if(JSON.stringify(codes)!==JSON.stringify(expected))errors.push('códigos V7.22 precisam ser sequenciais de INSP-TOP-18 a INSP-TOP-73');
  if(new Set(codes).size!==codes.length)errors.push('V7.22 contém códigos duplicados');
  if(images.length!==56)errors.push('V7.22 precisa declarar 56 imagens; encontrou '+images.length);
  if(new Set(images).size!==images.length)errors.push('V7.22 contém imagens reutilizadas');
  for(const image of images){
    if(!image.startsWith(host))errors.push('asset fora do host oficial: '+image);
    if(!image.endsWith('.webp'))errors.push('asset V7.22 não está otimizado em WebP: '+image);
  }
  for(const token of [
    'insp-top-18-bolo-elegante-com-topper-parabens.webp',
    'insp-top-35-bolo-south-park-do-arthur-9-anos.webp',
    'insp-top-73-mesa-de-sobremesas-de-casamento-romantica.webp',
    '"Chá de bebê & revelação"',
    '"Casamento & bodas"',
    '"Religioso"'
  ])if(!source.includes(token))errors.push('marcador esperado ausente: '+token);
}

if(errors.length){
  console.error('V7.22 Inspiration Batch: FALHOU ('+errors.length+')');
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V7.22 Inspiration Batch: OK — 56 inspirações exclusivas em WebP, INSP-TOP-18..73.');
