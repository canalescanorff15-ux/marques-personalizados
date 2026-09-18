import fs from 'node:fs';
import path from 'node:path';

const source=fs.readFileSync('components/InspirationArtwork.tsx','utf8');
const refs=[...source.matchAll(/'(?<code>INSP-\d+)'\s*:\s*\{src:'(?<src>[^']+)'/g)].map(match=>match.groups).filter(Boolean);
const errors=[];

function webpDimensions(buffer){
  if(buffer.toString('ascii',0,4)!=='RIFF'||buffer.toString('ascii',8,12)!=='WEBP')return null;
  let offset=12;
  while(offset+8<=buffer.length){
    const type=buffer.toString('ascii',offset,offset+4);const size=buffer.readUInt32LE(offset+4);const data=offset+8;
    if(type==='VP8X'&&data+10<=buffer.length){const w=1+buffer[data+4]+(buffer[data+5]<<8)+(buffer[data+6]<<16);const h=1+buffer[data+7]+(buffer[data+8]<<8)+(buffer[data+9]<<16);return{w,h};}
    if(type==='VP8 '&&data+10<=buffer.length&&buffer[data+3]===0x9d&&buffer[data+4]===0x01&&buffer[data+5]===0x2a){return{w:buffer.readUInt16LE(data+6)&0x3fff,h:buffer.readUInt16LE(data+8)&0x3fff};}
    if(type==='VP8L'&&data+5<=buffer.length&&buffer[data]===0x2f){const bits=buffer.readUInt32LE(data+1);return{w:(bits&0x3fff)+1,h:((bits>>14)&0x3fff)+1};}
    offset=data+size+(size%2);
  }
  return null;
}

for(const item of refs){
  const file=path.join('public',item.src.replace(/^\//,''));
  if(!fs.existsSync(file)){errors.push(`${item.code}: arquivo ausente`);continue;}
  const stat=fs.statSync(file);const buffer=fs.readFileSync(file);const dims=webpDimensions(buffer);
  if(!dims){errors.push(`${item.code}: WebP sem dimensões legíveis`);continue;}
  const long=Math.max(dims.w,dims.h),short=Math.min(dims.w,dims.h);
  if(long<1100||short<800)errors.push(`${item.code}: resolução insuficiente ${dims.w}x${dims.h}`);
  if(stat.size<90*1024)errors.push(`${item.code}: arquivo comprimido demais (${Math.round(stat.size/1024)} KB)`);
}
if(errors.length){console.error(`INSPIRATION_IMAGE_QUALITY_FAIL: ${errors.length} problema(s)`);for(const error of errors)console.error(`- ${error}`);process.exit(1);}
console.log(`INSPIRATION_IMAGE_QUALITY_OK (${refs.length} imagens com resolução e peso mínimos)`);
