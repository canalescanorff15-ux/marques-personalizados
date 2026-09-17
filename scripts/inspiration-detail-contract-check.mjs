import fs from 'node:fs';
import crypto from 'node:crypto';

const errors=[];
const route=fs.readFileSync('app/inspiracoes/[code]/page.tsx','utf8');
const cards=fs.readFileSync('components/InspirationShowcase.tsx','utf8');
const compare=fs.readFileSync('components/InspirationCompareWorkspace.tsx','utf8');
const concierge=fs.readFileSync('components/PartyConcierge.tsx','utf8');
const kit=fs.readFileSync('components/KitBuilder.tsx','utf8');
const sitemap=fs.readFileSync('app/sitemap.ts','utf8');
const data=fs.readFileSync('lib/inspirations.ts','utf8');
const share=fs.readFileSync('components/InspirationShareButton.tsx','utf8');
const artwork=fs.readFileSync('components/InspirationArtwork.tsx','utf8');
const artworkCss=fs.readFileSync('app/inspiration-v687.css','utf8');

if(!route.includes('getInspirationByCode(code)')||!route.includes('return notFound()'))errors.push('Ficha individual precisa resolver o código e retornar 404 real para inspiração inválida.');
if(!route.includes('getRelatedInspirations(model,4)'))errors.push('Ficha individual precisa oferecer inspirações relacionadas.');
if(!route.includes('whatsappUrl(settings.whatsapp_number'))errors.push('Ficha individual precisa gerar orçamento contextual pelo WhatsApp oficial.');
if(!route.includes('/monte-seu-kit?inspiracao='))errors.push('Ficha individual precisa permitir levar a referência diretamente ao Monte seu Kit.');
if(!route.includes('CreativeWork')||!route.includes('BreadcrumbList'))errors.push('Ficha individual precisa publicar metadados estruturados sem fingir que a inspiração é produto pronto.');
if(!cards.includes('`/inspiracoes/${encodeURIComponent(model.code)}`'))errors.push('Cards do catálogo precisam abrir a ficha individual, não apenas refiltrar o catálogo.');
if(!kit.includes("params.get('inspiracao')")||!kit.includes("params.get('inspiracoes')"))errors.push('Monte seu Kit precisa aceitar uma ou várias inspirações por deep-link.');
if(!sitemap.includes('inspirationModels.map(model=>({url:`${siteUrl}/inspiracoes/${model.code}`'))errors.push('Sitemap precisa incluir as fichas individuais de inspiração.');
if(!data.includes('export function getInspirationByCode')||!data.includes('export function getRelatedInspirations'))errors.push('Resolução e recomendação de inspirações precisam ter autoridade única em lib/inspirations.ts.');
if(!share.includes('navigator.share')||!share.includes('navigator.clipboard'))errors.push('Compartilhamento precisa ter Web Share com fallback de cópia.');

if(!cards.includes('<InspirationArtwork model={model}'))errors.push('Cards precisam usar a referência visual oficial.');
if(!route.includes('<InspirationArtwork model={model} label/>')&&!route.includes('<InspirationArtwork model={model} label detail/>'))errors.push('Ficha individual precisa reutilizar a referência da inspiração.');
if(!compare.includes('<InspirationArtwork model={model}/>'))errors.push('Comparador precisa reutilizar a referência da inspiração.');
if(!concierge.includes('<InspirationArtwork model={model}/>'))errors.push('Curadoria guiada precisa reutilizar a referência quando cair em inspirações.');
if(!artwork.includes('const codePhotos:Record<string,PhotoDefinition>'))errors.push('InspirationArtwork precisa manter mapeamento explícito por código.');
if(!artwork.includes('Imagem exclusiva em produção'))errors.push('INSP sem foto própria precisa usar placeholder neutro.');
if(artwork.includes('photoKeyFor')||artwork.includes('fallbackOrder'))errors.push('InspirationArtwork não pode reutilizar famílias fotográficas como fallback.');
if(!artwork.includes('<img src={src}')||artwork.includes('<svg'))errors.push('InspirationArtwork precisa renderizar fotografia real quando houver arquivo exclusivo.');

for(const [surface,source] of [['cards',cards],['detail',route],['compare',compare],['concierge',concierge]]){
  if(source.includes('inspiration-monogram')||/function initials\(/.test(source)||source.includes("title.slice(0,2).toUpperCase()"))errors.push(`${surface}: não pode voltar ao placeholder de iniciais/monograma como arte principal.`);
}
for(const token of ['.inspiration-artwork','.inspiration-artwork.inspiration-photo img','.inspiration-detail-art>.inspiration-artwork','.inspiration-compare-art>.inspiration-artwork','.concierge-inspiration-art>.inspiration-artwork','.kit-inspiration-thumb>.inspiration-artwork'])if(!artworkCss.includes(token))errors.push(`Sistema visual fotográfico sem regra ${token}.`);

/* V6.96: every published INSP must own one real, existing asset. */
const NEW_QUALITY_CODES=new Set(['INSP-113','INSP-114','INSP-115','INSP-116','INSP-117','INSP-118','INSP-119']);
const BLOCKED_CODES=['INSP-009','INSP-049'];
const MIN_LONG_SIDE=1100;
const MIN_SHORT_SIDE=800;
const MIN_WEBP_BYTES=90_000;

function u24le(buf,offset){return buf[offset]|(buf[offset+1]<<8)|(buf[offset+2]<<16);}
function webpDimensions(buf){
  if(buf.length<30||buf.toString('ascii',0,4)!=='RIFF'||buf.toString('ascii',8,12)!=='WEBP')throw new Error('cabeçalho WebP inválido');
  let off=12;
  while(off+8<=buf.length){
    const fourcc=buf.toString('ascii',off,off+4); const size=buf.readUInt32LE(off+4); const data=off+8;
    if(fourcc==='VP8X'&&data+10<=buf.length)return {width:1+u24le(buf,data+4),height:1+u24le(buf,data+7)};
    if(fourcc==='VP8L'&&data+5<=buf.length){const bits=buf.readUInt32LE(data+1);return {width:1+(bits&0x3fff),height:1+((bits>>>14)&0x3fff)};}
    if(fourcc==='VP8 '&&data+10<=buf.length){for(let i=data;i<Math.min(data+20,buf.length-6);i++)if(buf[i]===0x9d&&buf[i+1]===0x01&&buf[i+2]===0x2a)return {width:buf.readUInt16LE(i+3)&0x3fff,height:buf.readUInt16LE(i+5)&0x3fff};}
    off=data+size+(size%2);
  }
  throw new Error('dimensões WebP não encontradas');
}
function sha256(buf){return crypto.createHash('sha256').update(buf).digest('hex');}

const mapped=new Map();
const entry=/['"](INSP-\d+)['"]:\{src:'([^']+)'/g;
for(const match of artwork.matchAll(entry)){
  const [,code,src]=match;
  if(mapped.has(code))errors.push(`${code}: código duplicado no mapa de fotos.`);
  mapped.set(code,{src});
}
for(const code of BLOCKED_CODES)if(mapped.has(code))errors.push(`${code}: imagem semanticamente reprovada não pode estar publicada.`);
if(artwork.includes('photoKeyFor')||artwork.includes('fallbackOrder'))errors.push('Galeria não pode reutilizar família/fallback fotográfico.');

const seenPaths=new Map();
const seenHashes=new Map();
for(const [code,{src}] of mapped){
  if(seenPaths.has(src))errors.push(`${code}: compartilha o caminho ${src} com ${seenPaths.get(src)}; regra é 1 INSP = 1 FOTO.`);
  else seenPaths.set(src,code);
  const path=`public${src}`;
  if(!fs.existsSync(path)){errors.push(`${code}: arquivo mapeado não existe (${path}).`);continue;}
  const buf=fs.readFileSync(path); const hash=sha256(buf);
  if(seenHashes.has(hash))errors.push(`${code}: arquivo é byte-a-byte idêntico ao de ${seenHashes.get(hash)}.`);
  else seenHashes.set(hash,code);
  if(NEW_QUALITY_CODES.has(code)){
    if(buf.length<MIN_WEBP_BYTES)errors.push(`${code}: WebP tem ${buf.length} bytes; mínimo é ${MIN_WEBP_BYTES}.`);
    try{const {width,height}=webpDimensions(buf);if(Math.max(width,height)<MIN_LONG_SIDE||Math.min(width,height)<MIN_SHORT_SIDE)errors.push(`${code}: ${width}x${height}px; mínimo é ${MIN_LONG_SIDE}x${MIN_SHORT_SIDE}.`);}catch(error){errors.push(`${code}: ${error instanceof Error?error.message:String(error)}.`);}
  }
}
for(const code of NEW_QUALITY_CODES)if(!mapped.has(code))errors.push(`${code}: fonte validada precisa estar mapeada.`);
if(mapped.has('INSP-102'))errors.push('INSP-102 não pode ser publicada até a fonte original ser localizada e revista visualmente.');

if(errors.length){console.error(`Inspiration Detail Contract Check: ${errors.length} problema(s)`);for(const error of errors)console.error(`- ${error}`);process.exit(1);}
console.log(`Inspiration Detail Contract Check: OK V6.96 (${mapped.size} fotos com caminho exclusivo; novas ${[...NEW_QUALITY_CODES].join(', ')} em alta resolução; bloqueadas: ${BLOCKED_CODES.join(', ')}).`);
