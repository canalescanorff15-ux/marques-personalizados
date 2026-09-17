import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const artwork=fs.readFileSync(path.join(root,'components/InspirationArtwork.tsx'),'utf8');
const errors=[];
const entries=[...artwork.matchAll(/'(INSP-\d+)'\s*:\s*\{src:'([^']+)'/g)].map(([,code,src])=>({code,src}));

function webpDimensions(buffer){
  if(buffer.length<30||buffer.toString('ascii',0,4)!=='RIFF'||buffer.toString('ascii',8,12)!=='WEBP')return null;
  let offset=12;
  while(offset+8<=buffer.length){
    const type=buffer.toString('ascii',offset,offset+4);
    const size=buffer.readUInt32LE(offset+4);
    const data=offset+8;
    if(type==='VP8X'&&data+10<=buffer.length){
      return {width:1+buffer.readUIntLE(data+4,3),height:1+buffer.readUIntLE(data+7,3)};
    }
    if(type==='VP8 '&&data+10<=buffer.length){
      for(let i=data;i+10<=Math.min(buffer.length,data+32);i++){
        if(buffer[i+3]===0x9d&&buffer[i+4]===0x01&&buffer[i+5]===0x2a){
          return {width:buffer.readUInt16LE(i+6)&0x3fff,height:buffer.readUInt16LE(i+8)&0x3fff};
        }
      }
    }
    if(type==='VP8L'&&data+5<=buffer.length&&buffer[data]===0x2f){
      const b0=buffer[data+1],b1=buffer[data+2],b2=buffer[data+3],b3=buffer[data+4];
      return {width:1+(((b1&0x3f)<<8)|b0),height:1+(((b3&0x0f)<<10)|(b2<<2)|((b1&0xc0)>>6))};
    }
    offset=data+size+(size%2);
  }
  return null;
}

if(!entries.length)errors.push('nenhuma inspiração com foto exclusiva foi encontrada em InspirationArtwork');
for(const {code,src} of entries){
  if(!src.startsWith('/inspirations/reais/')||!src.endsWith('.webp')){errors.push(`${code}: caminho inválido ${src}`);continue;}
  const file=path.join(root,'public',src.slice(1));
  if(!fs.existsSync(file)){errors.push(`${code}: arquivo ausente ${src}`);continue;}
  const buffer=fs.readFileSync(file);
  const dimensions=webpDimensions(buffer);
  if(!dimensions){errors.push(`${code}: não foi possível ler dimensões WebP`);continue;}
  const longEdge=Math.max(dimensions.width,dimensions.height);
  const shortEdge=Math.min(dimensions.width,dimensions.height);
  if(longEdge<1100||shortEdge<800)errors.push(`${code}: resolução baixa ${dimensions.width}x${dimensions.height}; mínimo 1100px no lado maior e 800px no menor`);
  if(buffer.length<90000)errors.push(`${code}: arquivo excessivamente comprimido (${Math.round(buffer.length/1024)} KB); mínimo 90 KB para preservar detalhes`);
}

if(errors.length){
  console.error(`INSPIRATION_IMAGE_QUALITY_FAIL: ${errors.length} problema(s)`);
  for(const error of errors)console.error(`- ${error}`);
  process.exit(1);
}
console.log(`INSPIRATION_IMAGE_QUALITY_OK: ${entries.length} fotos exclusivas em resolução de detalhe.`);
