import fs from 'node:fs';

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

if(!cards.includes('<InspirationArtwork model={model}'))errors.push('Cards precisam usar a referência fotográfica oficial.');
if(!route.includes('<InspirationArtwork model={model} label/>'))errors.push('Ficha individual precisa reutilizar a referência fotográfica da inspiração.');
if(!compare.includes('<InspirationArtwork model={model}/>'))errors.push('Comparador precisa reutilizar a referência fotográfica da inspiração.');
if(!concierge.includes('<InspirationArtwork model={model}/>'))errors.push('Curadoria guiada precisa reutilizar a referência fotográfica quando cair em inspirações.');
if(!artwork.includes("type PhotoKey='topper'|'firstBirthday'|'boxes'|'woodland'|'ballerina'|'keepsake'"))errors.push('InspirationArtwork precisa manter as seis famílias fotográficas oficiais.');
if(!artwork.includes('<img src={photo.src}')||artwork.includes('<svg'))errors.push('InspirationArtwork precisa renderizar fotografia real, não voltar para SVG conceitual.');

const photoAssets=[
  'public/inspirations/reais/topo-floral-dourado.webp',
  'public/inspirations/reais/mesa-primeiro-aniversario.webp',
  'public/inspirations/reais/caixas-florais-personalizadas.webp',
  'public/inspirations/reais/cupcakes-floresta.webp',
  'public/inspirations/reais/topo-bailarina-rosa.webp',
  'public/inspirations/reais/lembrancas-botanicas-verde-dourado.webp',
];
for(const asset of photoAssets){
  if(!fs.existsSync(asset)||fs.statSync(asset).size<1000)errors.push(`Referência fotográfica ausente ou inválida: ${asset}`);
}
for(const [surface,source] of [['cards',cards],['detail',route],['compare',compare],['concierge',concierge]]){
  if(source.includes('inspiration-monogram')||/function initials\(/.test(source)||source.includes("title.slice(0,2).toUpperCase()"))errors.push(`${surface}: não pode voltar ao placeholder de iniciais/monograma como arte principal.`);
}
for(const token of ['.inspiration-artwork','.inspiration-artwork.inspiration-photo img','.inspiration-detail-art>.inspiration-artwork','.inspiration-compare-art>.inspiration-artwork','.concierge-inspiration-art>.inspiration-artwork','.kit-inspiration-thumb>.inspiration-artwork'])if(!artworkCss.includes(token))errors.push(`Sistema visual fotográfico sem regra ${token}.`);

if(errors.length){console.error(`Inspiration Detail Contract Check: ${errors.length} problema(s)`);for(const error of errors)console.error(`- ${error}`);process.exit(1);}
console.log('Inspiration Detail Contract Check: OK (ficha, catálogo, comparador, curadoria, SEO e referências fotográficas reais consistentes).');
