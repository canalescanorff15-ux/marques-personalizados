import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');
const catalog=read('lib/topper-catalog.ts');
const page=read('app/inspiracoes/page.tsx');

const levels=[...catalog.matchAll(/slug:'([^']+)',code:'TOP-/g)].map(match=>match[1]);
const themeSection=catalog.split('export const topperThemes=')[1]||'';
const themes=[...themeSection.matchAll(/\{slug:'([^']+)',label:'([^']+)'/g)].map(match=>match[1]);

if(levels.length!==6)errors.push(`esperado 6 níveis de topo; recebido ${levels.length}`);
if(new Set(levels).size!==levels.length)errors.push('slugs de níveis duplicados');
if(themes.length<8)errors.push(`esperado pelo menos 8 famílias de tema; recebido ${themes.length}`);
if(new Set(themes).size!==themes.length)errors.push('slugs de tema duplicados');

for(const token of ['topperThemes','topperLevels','/monte-seu-topo?tema=','/monte-seu-topo?nivel='])if(!page.includes(token))errors.push(`página de inspirações sem recurso: ${token}`);
for(const old of ['InspirationExplorer','inspirationModels','inspirationGroups','inspirationThemeCollections'])if(page.includes(old))errors.push(`galeria pública ainda depende do sistema antigo: ${old}`);
if(!page.includes('direção visual do seu topo')&&!page.includes('topo de bolo personalizado'))errors.push('página não comunica claramente o novo escopo de topos');

if(errors.length){console.error(`Topper Inspiration Contract: FALHOU (${errors.length})`);for(const error of errors)console.error('- '+error);process.exit(1);}
console.log(`Topper Inspiration Contract: OK — ${themes.length} famílias de tema e ${levels.length} níveis direcionam ao briefing de topo.`);
