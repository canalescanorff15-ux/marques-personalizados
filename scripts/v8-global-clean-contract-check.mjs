import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');

const header=read('components/PublicTopperHeader.tsx');
const footer=read('components/Footer.tsx');
const css=read('app/v8-global-clean.css');
const layout=read('app/layout.tsx');

for(const token of [
  'v8-simple-header',
  'v8-simple-nav',
  'v8-simple-order-cta',
  "label:'Topos de bolo'",
  "label:'Personalizados'",
  "label:'Inspirações'",
  '/monte-seu-pedido'
]){
  if(!header.includes(token))errors.push('Header V8.09 sem '+token);
}

for(const forbidden of [
  'public-header-search',
  'Meus Favoritos',
  'Meu Pedido',
  'public-header-whatsapp',
  "label:'Como funciona'",
  "label:'Orçamento'"
]){
  if(header.includes(forbidden))errors.push('Header V8.09 ainda contém excesso: '+forbidden);
}

for(const token of [
  'v8-simple-footer',
  'Topos de bolo personalizados',
  '/catalogo',
  '/personalizados',
  '/inspiracoes',
  '/monte-seu-pedido',
  '/privacidade',
  '/termos'
]){
  if(!footer.includes(token))errors.push('Footer V8.09 sem '+token);
}

for(const token of [
  '.v8-simple-header',
  '.v8-simple-nav',
  '.v8-simple-order-cta',
  '.v8-simple-footer',
  '.v8-simple-footer-main',
  '@media(max-width:680px)'
]){
  if(!css.includes(token))errors.push('CSS V8.09 sem '+token);
}

const globalIndex=layout.indexOf("import './v8-global-clean.css';");
const cleanIndex=layout.indexOf("import './v8-clean-ui.css';");
if(globalIndex<0)errors.push('layout não importa v8-global-clean.css');
if(cleanIndex<0||globalIndex<cleanIndex)errors.push('v8-global-clean.css precisa carregar depois de v8-clean-ui.css');

if(errors.length){
  console.error('V8.09 Global Clean Navigation Contract: FALHOU ('+errors.length+')');
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V8.09 Global Clean Navigation Contract: OK — header e footer reduzidos ao essencial.');
