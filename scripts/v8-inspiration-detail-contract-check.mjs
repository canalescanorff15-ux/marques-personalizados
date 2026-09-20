import fs from 'node:fs';

const errors=[];
const page=fs.readFileSync('app/inspiracoes/[code]/page.tsx','utf8');
const css=fs.readFileSync('app/v8-inspiration-detail.css','utf8');
const layout=fs.readFileSync('app/layout.tsx','utf8');

const isV810=page.includes('v8-storefront-detail');
const pageTokens=isV810
  ? ['InspirationFavoriteButton','InspirationShareButton','publicTopperInspirations','Quero esse modelo','Imagem de referência. Bolo e decoração do ambiente','related.length>0']
  : ['InspirationFavoriteButton','InspirationShareButton','publicTopperInspirations','Quero esse modelo','O que a imagem representa','Bolo, doces, painel, balões, mesa, flores de cenário','Outras referências que','related.length>0'];
for(const token of pageTokens){
  if(!page.includes(token))errors.push('Detalhe V8 sem '+token);
}

for(const token of [
  '.v8-detail-grid',
  '.v8-detail-media',
  '.v8-detail-copy',
  '.v8-detail-personalize',
  '.v8-detail-related-grid',
  'opacity:1!important',
  'filter:none!important',
  '@media(max-width:680px)'
]){
  if(!css.includes(token))errors.push('CSS V8 detalhe sem '+token);
}

const detailIndex=layout.indexOf("import './v8-inspiration-detail.css';");
const inspirationIndex=layout.indexOf("import './v8-inspirations.css';");
if(detailIndex<0)errors.push('layout não importa v8-inspiration-detail.css');
if(detailIndex<inspirationIndex)errors.push('v8-inspiration-detail.css precisa carregar depois de v8-inspirations.css');

if(page.includes('public-detail-image-scope'))errors.push('detalhe ainda usa bloco visual legado de escopo');
if(page.includes('public-detail-grid'))errors.push('detalhe ainda usa grid legado');

if(errors.length){
  console.error('V8.07 Inspiration Detail Contract: FALHOU ('+errors.length+')');
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V8.07/V8.10 Inspiration Detail Contract: OK — foto limpa, ação principal e versão minimalista protegidas.');
