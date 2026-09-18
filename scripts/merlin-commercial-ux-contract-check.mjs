import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');
const home=read('app/page.tsx');
const header=read('components/Header.tsx');
const dock=read('components/MerlinMobileDock.tsx');
const footer=read('components/Footer.tsx');
const catalog=read('lib/topper-catalog.ts');
const catalogPage=read('app/catalogo/page.tsx');
const inspirationsPage=read('app/inspiracoes/page.tsx');
const quotePage=read('app/orcamento/page.tsx');

for(const route of ['/catalogo','/inspiracoes','/monte-seu-topo','/orcamento']){
  if(!home.includes(route))errors.push(`home sem caminho comercial: ${route}`);
  if(!header.includes(route))errors.push(`header sem caminho comercial: ${route}`);
}
for(const route of ['/catalogo','/inspiracoes','/monte-seu-topo','/orcamento'])if(!dock.includes(route))errors.push(`dock móvel sem caminho: ${route}`);
for(const route of ['/catalogo','/inspiracoes','/monte-seu-topo','/guia-de-precos','/orcamento'])if(!footer.includes(route))errors.push(`footer sem caminho: ${route}`);
for(const token of ['Topo Simples','Topo Básico 3D','Topo Premium','Topo Shaker','Topo com Acetato','Topo Elite Shaker + Acetato'])if(!catalog.includes(token))errors.push(`nível comercial ausente: ${token}`);
for(const source of [home,header,dock,footer])if(source.includes('href="/monte-seu-kit"'))errors.push('fluxo público ainda contém link para Monte seu Kit');
if(!home.includes('Shaker')||!home.includes('Acetato'))errors.push('home não comunica os dois acabamentos avançados');
if(!home.includes('tamanho do bolo')&&!home.includes('tamanho'))errors.push('home não orienta o cliente sobre adequação ao bolo');
for(const [name,source] of [['home',home],['catalogo',catalogPage],['inspiracoes',inspirationsPage],['orcamento',quotePage]]){
  for(const forbidden of ['caixas, kits ou lembrancinhas','antigo orçamento de vários produtos','fotos antigas de mesas completas'])if(source.includes(forbidden))errors.push(`${name} ainda exibe linguagem do catálogo antigo: ${forbidden}`);
}

if(errors.length){console.error(`Merlin Topper Commercial UX: FALHOU (${errors.length})`);for(const error of errors)console.error('- '+error);process.exit(1);}
console.log('Merlin Topper Commercial UX: OK — jornada pública focada em escolher nível, inspiração, briefing e orçamento.');
