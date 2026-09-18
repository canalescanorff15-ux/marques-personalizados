import './inspiration-image-quality-check.mjs';
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
if(!cards.includes('`/inspiracoes/${encodeURIComponent(model.code)}`'))errors.push('Cards do catálogo precisam abrir a ficha individual.');
if(!kit.includes("params.get('inspiracao')")||!kit.includes("params.get('inspiracoes')"))errors.push('Monte seu Kit precisa aceitar deep-link de inspirações.');
if(!sitemap.includes('inspirationModels.map(model=>({url:`${siteUrl}/inspiracoes/${model.code}`'))errors.push('Sitemap precisa incluir fichas individuais.');
if(!data.includes('export function getInspirationByCode')||!data.includes('export function getRelatedInspirations'))errors.push('Resolução/recomendação precisam ter autoridade única.');
if(!share.includes('navigator.share')||!share.includes('navigator.clipboard'))errors.push('Compartilhamento precisa ter Web Share com fallback.');

if(!cards.includes('<InspirationArtwork model={model}'))errors.push('Cards precisam usar InspirationArtwork.');
if(!route.includes('<InspirationArtwork model={model} label/>')&&!route.includes('<InspirationArtwork model={model} label detail/>'))errors.push('Ficha individual precisa reutilizar InspirationArtwork.');
if(!compare.includes('<InspirationArtwork model={model}/>'))errors.push('Comparador precisa reutilizar InspirationArtwork.');
if(!concierge.includes('<InspirationArtwork model={model}/>'))errors.push('Curadoria precisa reutilizar InspirationArtwork.');
if(!artwork.includes('const codePhotos:Record<string,PhotoDefinition>'))errors.push('Mapeamento explícito por código ausente.');
if(!artwork.includes('Imagem exclusiva em produção'))errors.push('INSP sem foto própria precisa usar placeholder neutro.');
if(artwork.includes('photoKeyFor')||artwork.includes('fallbackOrder'))errors.push('Fallback fotográfico compartilhado é proibido.');
if(!artwork.includes('<img src={src}')||artwork.includes('<svg'))errors.push('Foto real precisa ser renderizada quando mapeada.');

const mapped=[...artwork.matchAll(/'(INSP-\d{3})':\{src:'([^']+)'/g)].map(([,code,src])=>({code,src}));
const bySrc=new Map();
const byHash=new Map();
for(const item of mapped){
  if(bySrc.has(item.src))errors.push(`Imagem repetida: ${bySrc.get(item.src)} e ${item.code} usam ${item.src}.`);
  else bySrc.set(item.src,item.code);

  const assetPath=`public${item.src}`;
  if(!fs.existsSync(assetPath)){
    errors.push(`${item.code}: arquivo mapeado não existe no repositório (${assetPath}).`);
    continue;
  }
  const bytes=fs.readFileSync(assetPath);
  const hash=crypto.createHash('sha256').update(bytes).digest('hex');
  if(byHash.has(hash))errors.push(`Duplicata binária: ${byHash.get(hash)} e ${item.code} têm o mesmo SHA-256.`);
  else byHash.set(hash,item.code);
}

for(const quarantined of ['INSP-009','INSP-049','INSP-102','INSP-113','INSP-114','INSP-115','INSP-116','INSP-117','INSP-118','INSP-119']){
  if(mapped.some(item=>item.code===quarantined))errors.push(`${quarantined} permanece em quarentena até o arquivo visualmente aprovado estar versionado.`);
}

for(const [surface,source] of [['cards',cards],['detail',route],['compare',compare],['concierge',concierge]]){
  if(source.includes('inspiration-monogram')||/function initials\(/.test(source)||source.includes("title.slice(0,2).toUpperCase()"))errors.push(`${surface}: não pode voltar ao placeholder de iniciais/monograma.`);
}
for(const token of ['.inspiration-artwork','.inspiration-artwork.inspiration-photo img','.inspiration-detail-art>.inspiration-artwork','.inspiration-compare-art>.inspiration-artwork','.concierge-inspiration-art>.inspiration-artwork','.kit-inspiration-thumb>.inspiration-artwork'])if(!artworkCss.includes(token))errors.push(`Sistema visual sem regra ${token}.`);

if(errors.length){console.error(`Inspiration Detail Contract Check: ${errors.length} problema(s)`);for(const error of errors)console.error(`- ${error}`);process.exit(1);}
console.log(`Inspiration Detail Contract Check: OK (${mapped.length} referências exclusivas; caminhos e hashes únicos; arquivos presentes).`);
