import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');
const catalog=read('lib/topper-catalog.ts');
const inspirations=read('lib/topper-inspirations.ts');
const activeInspirations=read('lib/active-topper-inspirations.ts');
const page=read('app/inspiracoes/page.tsx');
const gallery=read('components/TopperInspirationGallery.tsx');

const levels=[...catalog.matchAll(/slug:'([^']+)',code:'TOP-/g)].map(match=>match[1]);
const categories=[...inspirations.matchAll(/category:'([^']+)'/g)].map(match=>match[1]);

if(levels.length!==4)errors.push(`esperado 4 níveis atuais de topo; recebido ${levels.length}`);
if(new Set(levels).size!==levels.length)errors.push('slugs de níveis duplicados');
for(const retired of ['shaker','elite-shaker-acetato'])if(levels.includes(retired))errors.push(`nível retirado ainda filtrável: ${retired}`);
if(new Set(categories).size<6)errors.push(`acervo histórico deve continuar preservado; categorias encontradas ${new Set(categories).size}`);
if(!activeInspirations.includes('topperLevelBySlug'))errors.push('coleção pública ativa não filtra níveis atuais');
if(!page.includes('TopperInspirationGallery'))errors.push('página de inspirações não usa a galeria pública');
for(const token of ['activePublicTopperInspirations','categoria','nivel','favoritos','busca','normalize','history.replaceState'])if(!gallery.includes(token))errors.push(`galeria sem recurso: ${token}`);
if(!gallery.includes("item.category!==filters.categoria"))errors.push('categoria precisa usar mapeamento explícito');
for(const old of ['InspirationExplorer','inspirationModels','inspirationGroups','inspirationThemeCollections'])if(page.includes(old)||gallery.includes(old))errors.push(`galeria pública ainda depende do sistema antigo: ${old}`);
const isV810=page.includes('v8-storefront-inspirations');
if(isV810){
  if(!page.includes('INSPIRAÇÕES')||!page.includes('Escolha uma referência'))errors.push('página V8.10 não comunica de forma curta o escopo de inspirações');
}else if(!page.includes('Inspirações de topos')&&!page.includes('inspirações de topos')){
  errors.push('página não comunica claramente o novo escopo de topos');
}

if(errors.length){console.error(`Topper Inspiration Contract: FALHOU (${errors.length})`);for(const error of errors)console.error('- '+error);process.exit(1);}
console.log(`Topper Inspiration Contract: OK — acervo histórico preservado e ${levels.length} linhas atuais filtráveis na vitrine.`);
