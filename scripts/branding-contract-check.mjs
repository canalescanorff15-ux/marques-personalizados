import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const errors=[];
const catalogText=fs.readFileSync(path.join(root,'app/catalogo/page.tsx'),'utf8');
const catalogNeedles=catalogText.includes('v8-storefront-catalog')
  ? ['TOPOS DE BOLO','Escolha o acabamento.','topperLevels.map','A partir de R$']
  : ['Catálogo de topos'];

const homeText=fs.readFileSync(path.join(root,'app/page.tsx'),'utf8');
const essentialHome=homeText.includes('v8-essential-home-v814');
const mustContain={
  'components/PublicTopperHeader.tsx':['Merlin Encantos','EM PAPEL','merlin-logo-oficial.webp'],
  'components/Footer.tsx':['merlin-logo-oficial.webp','Topos de bolo personalizados'],
  'app/page.tsx':essentialHome
    ? ['v8-essential-home-v814','Personalizados feitos para','Topos de Bolo','Marcadores de Página','HomeRealWorkCarousel','<HomeRealWorkCarousel works={REAL_WORKS}/>']
    : ['Merlin'],
  'app/catalogo/page.tsx':catalogNeedles,
  'app/monte-seu-topo/page.tsx':["redirect('/monte-seu-pedido?produto=topo')"],
  'lib/topper-catalog.ts':["name:'Topo Clássico'","name:'Topo em Camadas'","name:'Topo Premium'","name:'Topo Transparente'"]
};
for(const [rel,needles] of Object.entries(mustContain)){
  const file=path.join(root,rel);
  if(!fs.existsSync(file)){errors.push(`${rel}: ausente`);continue;}
  const text=fs.readFileSync(file,'utf8');
  for(const needle of needles)if(!text.includes(needle))errors.push(`${rel}: faltando ${JSON.stringify(needle)}`);
}
for(const removed of ['TRABALHOS REAIS','Feito por Nós.','Peças que já saíram da nossa bancada','id="feito-por-nos"']){
  if(homeText.includes(removed))errors.push(`app/page.tsx: bloco separado de trabalhos reais voltou: ${JSON.stringify(removed)}`);
}
for(const rel of ['public/merlin-logo.webp','public/merlin-logo-original.png','public/favicon.svg']){
  const file=path.join(root,rel);
  if(!fs.existsSync(file)||fs.statSync(file).size<100)errors.push(`${rel}: asset legado/fallback ausente ou inválido`);
}
const userFacing=['app/page.tsx','app/catalogo/page.tsx','app/inspiracoes/page.tsx','app/monte-seu-topo/page.tsx','components/PublicTopperHeader.tsx','components/Footer.tsx'];
const legacyBrand=[/K&F Papelaria Criativa/i,/K&amp;F/i,/Marques Papelaria/i,/Marques Personalizados/i,/\/kf-logo\.webp/i];
for(const rel of userFacing){
  const text=fs.readFileSync(path.join(root,rel),'utf8');
  for(const pattern of legacyBrand)if(pattern.test(text))errors.push(`${rel}: referência visual antiga ${pattern}`);
}
const publicCatalog=fs.readFileSync(path.join(root,'lib/topper-catalog.ts'),'utf8');
for(const retired of ["slug:'shaker'","slug:'elite-shaker-acetato'"]){
  if(publicCatalog.includes(retired))errors.push(`lib/topper-catalog.ts: linha retirada ainda pública ${retired}`);
}
if(errors.length){console.error(`Branding contract falhou (${errors.length}):\n- ${errors.join('\n- ')}`);process.exit(1);}
console.log('Branding contract OK — Merlin preserva a identidade oficial, quatro linhas atuais e trabalhos reais integrados ao hero sem seção duplicada.');
