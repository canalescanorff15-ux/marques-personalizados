import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');
const oldDetail=read('app/inspiracoes/[code]/page.tsx');
const levelDetail=read('app/catalogo/[slug]/page.tsx');
const catalog=read('lib/topper-catalog.ts');
const sitemap=read('app/sitemap.ts');

if(!oldDetail.includes("redirect('/inspiracoes')"))errors.push('inspirações inválidas ou retiradas precisam redirecionar para a galeria atual');
if(!oldDetail.includes('isActivePublicTopperInspiration'))errors.push('detalhe de inspiração não bloqueia linhas retiradas');
if(!levelDetail.includes('topperLevelBySlug'))errors.push('detalhe público precisa resolver exclusivamente os níveis atuais de topo');
if(!levelDetail.includes("redirect('/catalogo')"))errors.push('slug antigo/inválido precisa retornar ao catálogo de topos');
for(const token of ['level.features','level.materials','level.idealFor','/monte-seu-pedido?produto=topo&nivel=','topperPriceForSlug'])if(!levelDetail.includes(token))errors.push(`detalhe de topo sem requisito: ${token}`);
for(const slug of ['essencial','camadas-3d','premium','acetato'])if(!catalog.includes(`slug:'${slug}'`))errors.push(`nível atual ausente no catálogo: ${slug}`);
for(const retired of ['shaker','elite-shaker-acetato'])if(catalog.includes(`slug:'${retired}'`))errors.push(`nível retirado ainda público no catálogo: ${retired}`);
if(!sitemap.includes('topperLevels.map'))errors.push('sitemap não gera URLs para os níveis atuais de topo');
if(!sitemap.includes('activePublicTopperInspirations'))errors.push('sitemap não limita inspirações às linhas atuais');
if(sitemap.includes('inspirationModels.map'))errors.push('sitemap ainda indexa fichas antigas de inspiração');

if(errors.length){console.error(`V8.23 Topper Detail Contract: FALHOU (${errors.length})`);for(const error of errors)console.error('- '+error);process.exit(1);}
console.log('V8.23 Topper Detail Contract: OK — quatro níveis atuais, preços centrais e slugs/inspirações retirados redirecionados.');
