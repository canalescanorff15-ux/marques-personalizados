import fs from 'node:fs';

export function readWebpMetadata(file){
  const b=fs.readFileSync(file);
  if(b.length<30||b.toString('ascii',0,4)!=='RIFF'||b.toString('ascii',8,12)!=='WEBP')throw new Error(`WEBP inválido: ${file}`);
  let offset=12;
  while(offset+8<=b.length){
    const fourcc=b.toString('ascii',offset,offset+4);
    const size=b.readUInt32LE(offset+4);
    const data=offset+8;
    if(fourcc==='VP8X'&&data+10<=b.length)return{width:1+b.readUIntLE(data+4,3),height:1+b.readUIntLE(data+7,3),bytes:b.length};
    if(fourcc==='VP8 '&&data+10<=b.length&&b[data+3]===0x9d&&b[data+4]===0x01&&b[data+5]===0x2a)return{width:b.readUInt16LE(data+6)&0x3fff,height:b.readUInt16LE(data+8)&0x3fff,bytes:b.length};
    if(fourcc==='VP8L'&&data+5<=b.length&&b[data]===0x2f){const bits=b.readUInt32LE(data+1);return{width:(bits&0x3fff)+1,height:((bits>>>14)&0x3fff)+1,bytes:b.length};}
    offset=data+size+(size%2);
  }
  throw new Error(`Dimensões WEBP não encontradas: ${file}`);
}
