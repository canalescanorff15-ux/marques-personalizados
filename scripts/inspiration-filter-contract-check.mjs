import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');
const catalog=read('lib/topper-catalog.ts');
const inspirations=read('lib/topper-inspirations.ts');
const page=read('app/inspiracoes/page.tsx');
const gallery=read('components/TopperInspirationGallery.tsx');

const levels=[...catalog.matchAll(/slug:'([^']+)',code:'TOP-/g)].map(match=>match[1]);
const categories=[...inspirations.matchAll(/category:'([^']+)'/g)].map(match=>match[1]);

if(levels.length!==6)errors.push(`esperado 6 níveis de topo; recebido ${levels.length}`);
if(new Set(levels).size!==levels.length)errors.push('slugs de níveis duplicados');
if(new Set(categories).size<6)errors.push(`esperado pelo menos 6 categorias reais; recebido ${new Set(categories).size}`);
if(!page.includes('TopperInspirationGallery'))errors.push('página de inspirações não usa a galeria pública');
for(const token of ['topperInspirations','categoria','nivel','favoritos','busca','normalize','history.replaceState'])if(!gallery.includes(token))errors.push(`galeria sem recurso: ${token}`);
if(!gallery.includes("item.category!==filters.categoria"))errors.push('categoria precisa usar mapeamento explícito, sem reclassificação parcial');
for(const old of ['InspirationExplorer','inspirationModels','inspirationGroups','inspirationThemeCollections'])if(page.includes(old)||gallery.includes(old))errors.push(`galeria pública ainda depende do sistema antigo: ${old}`);
if(!page.includes('Inspirações de topos')&&!page.includes('inspirações de topos'))errors.push('página não comunica claramente o novo escopo de topos');

if(errors.length){console.error(`Topper Inspiration Contract: FALHOU (${errors.length})`);for(const error of errors)console.error('- '+error);process.exit(1);}
console.log(`Topper Inspiration Contract: OK — ${new Set(categories).size} categorias reais e ${levels.length} níveis filtráveis.`);
