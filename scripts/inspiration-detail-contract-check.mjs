import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');
const oldDetail=read('app/inspiracoes/[code]/page.tsx');
const levelDetail=read('app/catalogo/[slug]/page.tsx');
const catalog=read('lib/topper-catalog.ts');
const sitemap=read('app/sitemap.ts');

if(!oldDetail.includes("redirect('/inspiracoes')"))errors.push('fichas antigas de INSP precisam redirecionar para a nova página de inspirações');
if(!levelDetail.includes('topperLevelBySlug'))errors.push('detalhe público precisa resolver exclusivamente os níveis de topo');
if(!levelDetail.includes("redirect('/catalogo')"))errors.push('slug antigo/inválido precisa retornar ao catálogo de topos');
for(const token of ['level.features','level.materials','level.idealFor','/monte-seu-topo?nivel='])if(!levelDetail.includes(token))errors.push(`detalhe de topo sem requisito: ${token}`);
for(const slug of ['essencial','camadas-3d','premium','shaker','acetato','elite-shaker-acetato'])if(!catalog.includes(`slug:'${slug}'`))errors.push(`nível ausente no catálogo: ${slug}`);
if(!sitemap.includes('topperLevels.map'))errors.push('sitemap não gera URLs para os níveis de topo');
if(sitemap.includes('inspirationModels.map'))errors.push('sitemap ainda indexa as 128 fichas de inspiração antigas');

if(errors.length){console.error(`Topper Detail Contract: FALHOU (${errors.length})`);for(const error of errors)console.error('- '+error);process.exit(1);}
console.log('Topper Detail Contract: OK — níveis próprios, fichas antigas redirecionadas e SEO sem catálogo misto.');
