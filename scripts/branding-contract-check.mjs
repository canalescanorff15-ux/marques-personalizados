import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const errors=[];
const catalogText=fs.readFileSync(path.join(root,'app/catalogo/page.tsx'),'utf8');
const catalogNeedles=catalogText.includes('v8-storefront-catalog')
  ? ['TOPOS DE BOLO','Escolha o acabamento.','topperLevels.map']
  : ['Catálogo de topos','TOP-01 ao TOP-06'];

const homeText=fs.readFileSync(path.join(root,'app/page.tsx'),'utf8');
const essentialHome=homeText.includes('v8-essential-home-v814');
const mustContain={
  'components/PublicTopperHeader.tsx':['Merlin Encantos','EM PAPEL','merlin-logo-oficial.webp'],
  'components/Footer.tsx':['merlin-logo-oficial.webp','Topos de bolo personalizados'],
  'app/page.tsx':essentialHome
    ? ['v8-essential-home-v814','Personalizados feitos para','Topos de Bolo','Marcadores de Página','Feito por Nós','publicTopperInspirations']
    : ['MERLIN • TOPOS DE BOLO PERSONALIZADOS','Elite com shaker e acetato'],
  'app/catalogo/page.tsx':catalogNeedles,
  'app/monte-seu-topo/page.tsx':['Topos de bolo sob encomenda','Do simples ao Elite'],
};
for(const [rel,needles] of Object.entries(mustContain)){
  const file=path.join(root,rel);
  if(!fs.existsSync(file)){errors.push(`${rel}: ausente`);continue;}
  const text=fs.readFileSync(file,'utf8');
  for(const needle of needles)if(!text.includes(needle))errors.push(`${rel}: faltando ${JSON.stringify(needle)}`);
}
for(const rel of ['public/merlin-logo.webp','public/merlin-logo-original.png','public/favicon.svg']){
  const file=path.join(root,rel);
  if(!fs.existsSync(file)||fs.statSync(file).size<100)errors.push(`${rel}: asset legado/fallback ausente ou inválido`);
}
const userFacing=['app/page.tsx','app/catalogo/page.tsx','app/inspiracoes/page.tsx','app/monte-seu-topo/page.tsx','components/PublicTopperHeader.tsx','components/Footer.tsx','components/TopperBuilder.tsx'];
const legacyBrand=[/K&F Papelaria Criativa/i,/K&amp;F/i,/Marques Papelaria/i,/Marques Personalizados/i,/\/kf-logo\.webp/i];
for(const rel of userFacing){
  const text=fs.readFileSync(path.join(root,rel),'utf8');
  for(const pattern of legacyBrand)if(pattern.test(text))errors.push(`${rel}: referência visual antiga ${pattern}`);
}
if(errors.length){console.error(`Branding contract falhou (${errors.length}):\n- ${errors.join('\n- ')}`);process.exit(1);}
console.log('Branding contract OK — Merlin Encantos em Papel usa a identidade oficial e apresenta claramente seus personalizados.');
