import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');
const data=read('lib/kit-builder.ts');
const component=read('components/KitBuilder.tsx');
const page=read('app/monte-seu-kit/page.tsx');
const header=read('components/Header.tsx');
const home=read('app/page.tsx');
const inspirations=read('components/InspirationExplorer.tsx');
const sitemap=read('app/sitemap.ts');
const mobileDock=fs.existsSync('components/MerlinMobileDock.tsx')?read('components/MerlinMobileDock.tsx'):'';
const showcase=fs.existsSync('components/InspirationShowcase.tsx')?read('components/InspirationShowcase.tsx'):'';

const pieceIds=[...data.matchAll(/\{id:'([^']+)',label:/g)].map(match=>match[1]);
if(pieceIds.length<10)errors.push(`kit builder precisa de pelo menos 10 tipos de peça; encontrou ${pieceIds.length}`);
if(new Set(pieceIds).size!==pieceIds.length)errors.push('kit builder possui IDs de peça duplicados');
const presetSlugs=[...data.matchAll(/\{slug:'(mini|essencial|completo|premium)'/g)].map(match=>match[1]);
for(const slug of ['mini','essencial','completo','premium'])if(!presetSlugs.includes(slug))errors.push(`preset ausente: ${slug}`);

for(const token of ["localStorage.setItem(DRAFT_KEY","localStorage.removeItem(DRAFT_KEY","readInspirationFavorites()","source:'concierge'","desired_categories:desiredCategories","items:[]","/api/inquiries","compositionText"]){if(!component.includes(token))errors.push(`KitBuilder sem contrato: ${token}`);}
if(!component.includes("inspirationCodes.length>=6"))errors.push('KitBuilder não limita referências visuais a 6');
if(!component.includes("activePieces.length"))errors.push('KitBuilder não bloqueia envio sem peças');
if(!page.includes('<KitBuilder/>'))errors.push('rota /monte-seu-kit não monta o KitBuilder');
if(!header.includes('href="/monte-seu-kit"'))errors.push('header não expõe /monte-seu-kit');
const homeRendersHeader=home.includes('<Header')||home.includes('<Header ');
const homeRendersDock=home.includes('<MerlinMobileDock')||home.includes('<MerlinMobileDock ');
const homeRendersShowcase=home.includes('<InspirationShowcase')||home.includes('<InspirationShowcase ');
const directHomeKit=home.includes('href="/monte-seu-kit"')||home.includes("href='/monte-seu-kit'")||home.includes("'/monte-seu-kit'")||home.includes('`/monte-seu-kit`');
const composedHomeKit=(homeRendersHeader&&header.includes('href="/monte-seu-kit"'))||(homeRendersDock&&mobileDock.includes('/monte-seu-kit'))||(homeRendersShowcase&&showcase.includes('/monte-seu-kit'));
if(!directHomeKit&&!composedHomeKit)errors.push('home não oferece caminho renderizado para /monte-seu-kit');
if(!inspirations.includes('/monte-seu-kit?usar_salvos=1'))errors.push('favoritos de inspiração não integram com o construtor de kit');
if(!sitemap.includes('/monte-seu-kit'))errors.push('sitemap não inclui /monte-seu-kit');

if(errors.length){
  console.error(`Kit Builder Contract: FALHOU (${errors.length})`);
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log(`Kit Builder Contract: OK — ${pieceIds.length} tipos de peça, 4 presets, rascunho local, inspirações e CRM/WhatsApp integrados.`);
