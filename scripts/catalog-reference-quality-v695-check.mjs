import fs from 'node:fs';
import path from 'node:path';
import {readWebpMetadata} from './lib/webp-metadata.mjs';
const refs=JSON.parse(fs.readFileSync('data/catalog-photo-references.json','utf8'));
const files=[...new Set([...Object.values(refs.categories||{}),...Object.values(refs.products||{})])];
const errors=[];
for(const url of files){
  const file=path.join('public',String(url).replace(/^\//,''));
  if(!fs.existsSync(file)){errors.push(`arquivo ausente: ${url}`);continue;}
  try{
    const {width,height,bytes}=readWebpMetadata(file);
    if(Math.max(width,height)<1000||Math.min(width,height)<800)errors.push(`${url} baixa resolução: ${width}x${height}`);
    if(bytes<50*1024)errors.push(`${url} compressão excessiva: ${Math.round(bytes/1024)} KB`);
  }catch(error){errors.push(`${url}: ${error.message}`)}
}
if(errors.length){console.error(`CATALOG_REFERENCE_QUALITY_V695_FAIL: ${errors.length} problema(s)`);for(const e of errors)console.error(`- ${e}`);process.exit(1)}
console.log(`CATALOG_REFERENCE_QUALITY_V695_OK: ${files.length} referências fotográficas em alta resolução.`);
