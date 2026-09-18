import fs from 'node:fs';

const errors=[];
const css=fs.readFileSync('app/public-v712.css','utf8');

const required=[
  ['marcador da revisão V7.14','/* V7.14 — revisão responsiva final */'],
  ['proteção horizontal da superfície pública','.public-v712{overflow-x:clip}'],
  ['breakpoint tablet de 1024 px','@media(max-width:1024px)'],
  ['acionamento dos filtros móveis até 1024 px','.public-mobile-filter-trigger{display:flex'],
  ['galeria sem coluna lateral até 1024 px','.public-gallery-layout{grid-template-columns:1fr}'],
  ['filtros em drawer até 1024 px','.public-gallery-filters{position:fixed'],
  ['breakpoint dedicado a 390 px','@media(max-width:390px)'],
  ['cards em uma coluna no celular estreito','.public-inspiration-grid{grid-template-columns:1fr}'],
  ['filhos do shell protegidos contra estouro','.public-v712 .public-shell>*{min-width:0}'],
  ['campos limitados à largura disponível','.public-v712 input,.public-v712 select,.public-v712 textarea{max-width:100%}'],
  ['ações principais empilháveis no celular','.public-v712 .hero-actions,.public-v712 .kit-builder-hero-actions']
];

for(const [label,token] of required){
  if(!css.includes(token))errors.push(label);
}

if(errors.length){
  console.error('V7.14 Responsive Contract: FALHOU ('+errors.length+')');
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}

console.log('V7.14 Responsive Contract: OK — 1024/390, overflow, filtros, cards, formulários e ações protegidos.');
