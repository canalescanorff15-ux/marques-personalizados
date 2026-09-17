import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const errors=[];
const read=(file)=>fs.readFileSync(path.join(root,file),'utf8');
const artwork=read('components/InspirationArtwork.tsx');
const data=read('lib/inspirations.ts');

const modelCodes=[...data.matchAll(/code:'(INSP-\d{3})'/g)].map(match=>match[1]);
const mappings=[...artwork.matchAll(/'(INSP-\d{3})':\{src:'([^']+)'/g)].map(match=>({code:match[1],src:match[2]}));
const byCode=new Map();
const bySrc=new Map();

for(const item of mappings){
  if(byCode.has(item.code))errors.push(`código mapeado mais de uma vez: ${item.code}`);
  byCode.set(item.code,item.src);
  const owner=bySrc.get(item.src);
  if(owner&&owner!==item.code)errors.push(`imagem repetida entre ${owner} e ${item.code}: ${item.src}`);
  bySrc.set(item.src,item.code);
  const asset=path.join(root,'public',item.src.replace(/^\//,''));
  if(!fs.existsSync(asset))errors.push(`imagem mapeada não existe: ${item.code} -> ${item.src}`);
  else if(fs.statSync(asset).size<1000)errors.push(`imagem mapeada inválida ou pequena demais: ${item.code} -> ${item.src}`);
}

for(const code of byCode.keys())if(!modelCodes.includes(code))errors.push(`mapeamento sem inspiração correspondente: ${code}`);
if(new Set(modelCodes).size!==modelCodes.length)errors.push('lib/inspirations.ts possui códigos duplicados.');
if(artwork.includes('photos[photoKeyFor(model)]')||artwork.includes('fallbackOrder')||artwork.includes('function photoKeyFor'))errors.push('InspirationArtwork ainda reutiliza fotografia compartilhada como fallback.');
if(!artwork.includes('Imagem exclusiva em produção'))errors.push('InspirationArtwork precisa usar placeholder neutro quando a inspiração ainda não possui foto exclusiva.');
if(mappings.length<20)errors.push(`regressão: somente ${mappings.length} imagens exclusivas mapeadas.`);

if(errors.length){
  console.error(`INSPIRATION_IMAGE_UNIQUENESS_FAIL: ${errors.length} problema(s)`);
  for(const error of errors)console.error(`- ${error}`);
  process.exit(1);
}
console.log(`INSPIRATION_IMAGE_UNIQUENESS_OK (${mappings.length}/${modelCodes.length} inspirações com fotografia exclusiva; nenhum src compartilhado).`);
