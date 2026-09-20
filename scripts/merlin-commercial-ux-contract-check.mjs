import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');
const home=read('app/page.tsx');
const header=read('components/PublicTopperHeader.tsx');
const dock=read('components/MerlinMobileDock.tsx');
const footer=read('components/Footer.tsx');
const catalog=read('lib/topper-catalog.ts');
const catalogPage=read('app/catalogo/page.tsx');
const inspirationsPage=read('app/inspiracoes/page.tsx');
const quotePage=read('app/orcamento/page.tsx');
const builder=read('components/TopperBuilder.tsx');
const topperInspirationContract='scripts/topper-inspiration-gallery-contract-check.mjs';
const publicRedesignContract='scripts/public-redesign-contract-check.mjs';
const topperDraftContract='scripts/topper-draft-contract-check.mjs';
const publicAuxiliaryContract='scripts/public-auxiliary-contract-check.mjs';
const publicResponsiveContract='scripts/public-responsive-v714-contract-check.mjs';
const publicV715Contract='scripts/public-v715-contract-check.mjs';
const publicV716Contract='scripts/public-v716-contract-check.mjs';
const publicV717Contract='scripts/public-v717-contract-check.mjs';
const publicV718Contract='scripts/public-v718-contract-check.mjs';
const publicV7182AssetContract='scripts/public-v7182-asset-integrity-check.mjs';
const publicV719Contract='scripts/public-v719-contract-check.mjs';

for(const route of ['/catalogo','/inspiracoes','/monte-seu-topo','/orcamento']){
  if(!home.includes(route))errors.push(`home sem caminho comercial: ${route}`);
  if(!header.includes(route))errors.push(`header sem caminho comercial: ${route}`);
}
for(const route of ['/catalogo','/inspiracoes','/monte-seu-topo','/orcamento'])if(!dock.includes(route))errors.push(`dock móvel sem caminho: ${route}`);
for(const route of ['/catalogo','/inspiracoes','/monte-seu-topo','/guia-de-precos','/orcamento'])if(!footer.includes(route))errors.push(`footer sem caminho: ${route}`);
for(const token of ['Topo Simples','Topo Básico 3D','Topo Premium','Topo Shaker','Topo com Acetato','Topo Elite Shaker + Acetato'])if(!catalog.includes(token))errors.push(`nível comercial ausente: ${token}`);
const imageRefs=[...catalog.matchAll(/image:'([^']+)'/g)].map(match=>match[1]);
if(imageRefs.length!==6)errors.push(`linha de topos precisa declarar 6 imagens oficiais; encontrou ${imageRefs.length}`);
if(new Set(imageRefs).size!==imageRefs.length)errors.push('cada nível precisa usar uma imagem oficial exclusiva');
for(const image of imageRefs){const file=`public${image}`;if(!fs.existsSync(file))errors.push(`asset oficial ausente: ${file}`);}
if(!catalogPage.includes('TopperLevelVisual'))errors.push('catálogo não reutiliza a referência visual oficial do nível');
if(!inspirationsPage.includes('TopperInspirationGallery'))errors.push('inspirações não usam a galeria pública de topos');
if(!builder.includes('TopperLevelVisual'))errors.push('Monte seu topo não reutiliza a referência visual oficial do nível');
for(const source of [home,header,dock,footer])if(source.includes('href="/monte-seu-kit"'))errors.push('fluxo público ainda contém link para Monte seu Kit');
if(!home.includes('Shaker')||!home.includes('Acetato'))errors.push('home não comunica os dois acabamentos avançados');
if(!home.includes('tamanho do bolo')&&!home.includes('tamanho'))errors.push('home não orienta o cliente sobre adequação ao bolo');
for(const [name,source] of [['home',home],['catalogo',catalogPage],['inspiracoes',inspirationsPage],['orcamento',quotePage]]){
  for(const forbidden of ['caixas, kits ou lembrancinhas','antigo orçamento de vários produtos','fotos antigas de mesas completas'])if(source.includes(forbidden))errors.push(`${name} ainda exibe linguagem do catálogo antigo: ${forbidden}`);
}

if(!fs.existsSync(publicRedesignContract))errors.push('contrato da remodelação pública ausente');
else{
  const publicCheck=spawnSync(process.execPath,[publicRedesignContract],{encoding:'utf8'});
  if(publicCheck.status!==0)errors.push((publicCheck.stderr||publicCheck.stdout||'contrato da remodelação pública falhou').trim());
}

if(!fs.existsSync(topperDraftContract))errors.push('contrato do rascunho de topo ausente');
else{
  const draftCheck=spawnSync(process.execPath,[topperDraftContract],{encoding:'utf8'});
  if(draftCheck.status!==0)errors.push((draftCheck.stderr||draftCheck.stdout||'contrato do rascunho falhou').trim());
}

if(!fs.existsSync(publicAuxiliaryContract))errors.push('contrato das rotas públicas auxiliares ausente');
else{
  const auxiliaryCheck=spawnSync(process.execPath,[publicAuxiliaryContract],{encoding:'utf8'});
  if(auxiliaryCheck.status!==0)errors.push((auxiliaryCheck.stderr||auxiliaryCheck.stdout||'contrato das rotas públicas auxiliares falhou').trim());
}

if(!fs.existsSync(publicResponsiveContract))errors.push('contrato responsivo V7.14 ausente');
else{
  const responsiveCheck=spawnSync(process.execPath,[publicResponsiveContract],{encoding:'utf8'});
  if(responsiveCheck.status!==0)errors.push((responsiveCheck.stderr||responsiveCheck.stdout||'contrato responsivo V7.14 falhou').trim());
}

if(!fs.existsSync(publicV715Contract))errors.push('contrato visual V7.15 ausente');
else{
  const v715Check=spawnSync(process.execPath,[publicV715Contract],{encoding:'utf8'});
  if(v715Check.status!==0)errors.push((v715Check.stderr||v715Check.stdout||'contrato visual V7.15 falhou').trim());
}

if(!fs.existsSync(publicV716Contract))errors.push('contrato visual V7.16 ausente');
else{
  const v716Check=spawnSync(process.execPath,[publicV716Contract],{encoding:'utf8'});
  if(v716Check.status!==0)errors.push((v716Check.stderr||v716Check.stdout||'contrato visual V7.16 falhou').trim());
}

if(!fs.existsSync(publicV717Contract))errors.push('contrato visual V7.17 ausente');
else{
  const v717Check=spawnSync(process.execPath,[publicV717Contract],{encoding:'utf8'});
  if(v717Check.status!==0)errors.push((v717Check.stderr||v717Check.stdout||'contrato visual V7.17 falhou').trim());
}

if(!fs.existsSync(publicV718Contract))errors.push('contrato premium global V7.18 ausente');
else{
  const v718Check=spawnSync(process.execPath,[publicV718Contract],{encoding:'utf8'});
  if(v718Check.status!==0)errors.push((v718Check.stderr||v718Check.stdout||'contrato premium global V7.18 falhou').trim());
}

if(!fs.existsSync(publicV7182AssetContract))errors.push('contrato de integridade de assets V7.18.2 ausente');
else{
  const v7182Check=spawnSync(process.execPath,[publicV7182AssetContract],{encoding:'utf8'});
  if(v7182Check.status!==0)errors.push((v7182Check.stderr||v7182Check.stdout||'contrato de integridade de assets V7.18.2 falhou').trim());
}

if(!fs.existsSync(publicV719Contract))errors.push('contrato premium final V7.19 ausente');
else{
  const v719Check=spawnSync(process.execPath,[publicV719Contract],{encoding:'utf8'});
  if(v719Check.status!==0)errors.push((v719Check.stderr||v719Check.stdout||'contrato premium final V7.19 falhou').trim());
}

if(!fs.existsSync(topperInspirationContract))errors.push('contrato da galeria de inspirações ausente');
else{
  const galleryCheck=spawnSync(process.execPath,[topperInspirationContract],{encoding:'utf8'});
  if(galleryCheck.status!==0)errors.push((galleryCheck.stderr||galleryCheck.stdout||'contrato da galeria falhou').trim());
}

if(errors.length){console.error(`Merlin Topper Commercial UX: FALHOU (${errors.length})`);for(const error of errors)console.error('- '+error);process.exit(1);}
console.log('Merlin Topper Commercial UX: OK — jornada pública focada em escolher nível, inspiração, briefing e orçamento.');
