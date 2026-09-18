import fs from 'node:fs';

const errors=[];
const inspirationFile='lib/topper-inspirations.ts';
const pageFile='app/inspiracoes/page.tsx';
const builderFile='components/TopperBuilder.tsx';

if(!fs.existsSync(inspirationFile))errors.push('arquivo lib/topper-inspirations.ts ausente');
else{
  const source=fs.readFileSync(inspirationFile,'utf8');
  const codes=[...source.matchAll(/code:'(INSP-TOP-\d{2})'/g)].map(m=>m[1]);
  const images=[...source.matchAll(/image:'([^']+)'/g)].map(m=>m[1]);
  if(codes.length!==12)errors.push(`galeria inicial precisa ter 12 inspirações; encontrou ${codes.length}`);
  if(new Set(codes).size!==codes.length)errors.push('códigos das inspirações precisam ser únicos');
  if(images.length!==12)errors.push(`cada inspiração precisa declarar imagem; encontrou ${images.length}`);
  if(new Set(images).size!==images.length)errors.push('cada inspiração precisa usar imagem exclusiva');
  for(const image of images){
    const file=`public${image}`;
    if(!fs.existsSync(file))errors.push(`asset de inspiração ausente: ${file}`);
  }
}
if(fs.existsSync(pageFile)){
  const page=fs.readFileSync(pageFile,'utf8');
  if(!page.includes('topperInspirations'))errors.push('página de inspirações não usa a coleção topperInspirations');
  if(!page.includes('Quero esse modelo'))errors.push('galeria precisa ter CTA “Quero esse modelo”');
}
if(fs.existsSync(builderFile)){
  const builder=fs.readFileSync(builderFile,'utf8');
  if(!builder.includes("params.get('inspiracao')"))errors.push('Monte seu topo não lê o parâmetro inspiracao');
  if(!builder.includes('topperInspirationBySlug'))errors.push('Monte seu topo não resolve a inspiração escolhida');
}

if(errors.length){
  console.error(`Topper Inspiration Gallery Contract: FALHOU (${errors.length})`);
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('Topper Inspiration Gallery Contract: OK — 12 inspirações exclusivas, CTA e handoff para Monte seu topo.');
