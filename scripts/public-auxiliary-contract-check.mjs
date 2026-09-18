import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');

const links=read('app/links/page.tsx');
const notFound=read('app/not-found.tsx');
const loading=read('app/loading.tsx');
const errorPage=read('app/error.tsx');
const priceGuide=read('app/guia-de-precos/page.tsx');
const publicCss=read('app/public-v712.css');

for(const token of ["import Header from '@/components/Header';","import Footer from '@/components/Footer';",'public-v712','public-links-page']){
  if(!links.includes(token))errors.push('links não usa integralmente a identidade pública: '+token);
}
if(links.includes('bio-page'))errors.push('links ainda usa o layout legado bio-page');

for(const [name,source] of [['404',notFound],['loading',loading],['erro',errorPage]]){
  if(!source.includes('public-state-page'))errors.push(name+' não usa o estado visual público');
}
for(const route of ['/','/inspiracoes','/monte-seu-topo']){
  if(!notFound.includes(route))errors.push('404 sem rota de recuperação: '+route);
}
if(!errorPage.includes('Tentar novamente'))errors.push('erro sem ação de nova tentativa');
if(!loading.includes('aria-busy'))errors.push('loading sem indicação de carregamento acessível');
if(priceGuide.includes('do Essencial ao Elite'))errors.push('SEO do guia de preços ainda usa Essencial');
for(const token of ['.public-links-page','.public-state-page','.public-state-actions']){
  if(!publicCss.includes(token))errors.push('CSS público sem estilo auxiliar: '+token);
}

if(errors.length){
  console.error('Public Auxiliary Contract: FALHOU ('+errors.length+')');
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('Public Auxiliary Contract: OK — links, estados e SEO alinhados à identidade pública.');
