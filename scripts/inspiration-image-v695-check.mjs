import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {readWebpMetadata} from './lib/webp-metadata.mjs';

const errors=[];
const artwork=fs.readFileSync('components/InspirationArtwork.tsx','utf8');
const detail=fs.readFileSync('app/inspiracoes/[code]/page.tsx','utf8');
const entries=[...artwork.matchAll(/'(INSP-\d+)'\s*:\s*\{src:'([^']+)'[^}]*\}/g)].map(m=>({code:m[1],src:m[2]}));
if(entries.length<20)errors.push(`esperado ao menos 20 fotos exclusivas mapeadas; encontrado ${entries.length}`);
const bySrc=new Map(),byHash=new Map();
for(const entry of entries){
  if(bySrc.has(entry.src))errors.push(`${entry.code} repete caminho de ${bySrc.get(entry.src)}: ${entry.src}`);
  bySrc.set(entry.src,entry.code);
  const file=path.join('public',entry.src.replace(/^\//,''));
  if(!fs.existsSync(file)){errors.push(`${entry.code} aponta para arquivo ausente: ${entry.src}`);continue;}
  try{
    const bytes=fs.readFileSync(file);
    const hash=crypto.createHash('sha256').update(bytes).digest('hex');
    if(byHash.has(hash))errors.push(`${entry.code} repete exatamente a fotografia de ${byHash.get(hash)}`);
    byHash.set(hash,entry.code);
    const meta=readWebpMetadata(file);
    if(Math.max(meta.width,meta.height)<1000||Math.min(meta.width,meta.height)<800)errors.push(`${entry.code} baixa resolução: ${meta.width}x${meta.height}`);
    if(meta.bytes<50*1024)errors.push(`${entry.code} compressão excessiva: ${Math.round(meta.bytes/1024)} KB`);
  }catch(error){errors.push(`${entry.code}: ${error.message}`)}
}
if(/type PhotoKey=|const photos:|fallbackOrder|photoKeyFor\(/.test(artwork))errors.push('fallback fotográfico compartilhado ainda ativo; INSP sem foto exclusiva deve usar placeholder neutro');
if(!artwork.includes('Imagem exclusiva em produção'))errors.push('placeholder neutro para INSP sem foto exclusiva ausente');
if(!artwork.includes('detail=false'))errors.push('InspirationArtwork precisa manter sinalização de ficha para priorizar carregamento');
if(!detail.includes('<InspirationArtwork model={model} label detail/>'))errors.push('ficha individual não solicita a versão de detalhe');
if(errors.length){console.error(`INSPIRATION_V695_FAIL: ${errors.length} problema(s)`);for(const e of errors)console.error(`- ${e}`);process.exit(1)}
console.log(`INSPIRATION_V695_OK: ${entries.length} fotos exclusivas, únicas e em alta resolução, sem fallback compartilhado.`);
