import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');

const requiredFiles=[
  'app/public-v716.css',
  'app/layout.tsx',
  'components/PublicTopperHeader.tsx',
  'app/guia-de-precos/page.tsx',
  'components/TopperInspirationGallery.tsx'
];
for(const file of requiredFiles)if(!fs.existsSync(file))errors.push('arquivo V7.16 ausente: '+file);

if(fs.existsSync('app/public-v716.css')){
  const css=read('app/public-v716.css');
  const required=[
    ['marcador V7.16','/* V7.16 — auditoria visual global, encaixe e antitruncamento */'],
    ['utilitário sr-only','.sr-only{'],
    ['sr-only fora do fluxo','position:absolute!important'],
    ['sr-only recortado','clip:rect(0,0,0,0)!important'],
    ['breakpoint notebook','@media(max-width:1280px) and (min-width:821px)'],
    ['guia com colunas protegidas','grid-template-columns:minmax(230px,1.35fr)'],
    ['guia em cards intermediários','@media(max-width:1100px)'],
    ['rótulo de complexidade','content:"Complexidade"'],
    ['rótulo de valor','content:"Valor"'],
    ['rótulo ideal para','content:"Ideal para"'],
    ['price guide 1 coluna estreita','@media(max-width:650px)']
  ];
  for(const [label,token] of required)if(!css.includes(token))errors.push(label);
  if(css.includes('content:"Preço inicial"'))errors.push('V7.16 não deve rotular complexidade como preço inicial');
}

if(fs.existsSync('app/layout.tsx')){
  const layout=read('app/layout.tsx');
  const v715=layout.indexOf("import './public-v715.css';");
  const v716=layout.indexOf("import './public-v716.css';");
  if(v716<0)errors.push('layout não importa public-v716.css');
  if(v715<0||v716<v715)errors.push('V7.16 precisa carregar depois da V7.15');
}

if(fs.existsSync('components/PublicTopperHeader.tsx')){
  const header=read('components/PublicTopperHeader.tsx');
  const isV809=header.includes('v8-simple-header');
  if(isV809){
    if(header.includes('public-header-search'))errors.push('header V8.09 não deve reintroduzir busca global');
    const gallery=read('components/TopperInspirationGallery.tsx');
    if(!gallery.includes('public-gallery-search-v721'))errors.push('V8.09 precisa manter busca contextual na galeria');
    if(!gallery.includes('Tema, código, cor...'))errors.push('busca contextual da galeria sem placeholder curto');
  }
}

if(fs.existsSync('app/guia-de-precos/page.tsx')){
  const guide=read('app/guia-de-precos/page.tsx');
  for(const token of ['Complexidade','Valor inicial','Ideal para'])if(!guide.includes(token))errors.push('guia sem conteúdo atual '+token);
}

if(fs.existsSync('components/TopperInspirationGallery.tsx')){
  const gallery=read('components/TopperInspirationGallery.tsx');
  for(const token of ['Tema, código, cor...','Ver mais inspirações'])if(!gallery.includes(token))errors.push('galeria sem conteúdo esperado: '+token);
}
if(fs.existsSync('lib/topper-catalog.ts')){
  const catalog=read('lib/topper-catalog.ts');
  for(const current of ["name:'Topo Clássico'","name:'Topo em Camadas'","name:'Topo Premium'","name:'Topo Transparente'"]){
    if(!catalog.includes(current))errors.push('catálogo sem linha atual para teste de encaixe: '+current);
  }
  for(const retired of ["slug:'shaker'","slug:'elite-shaker-acetato'"])if(catalog.includes(retired))errors.push('catálogo reativou linha retirada: '+retired);
}

if(errors.length){
  console.error('V8.23 Global Visual Audit Contract: FALHOU ('+errors.length+')');
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V8.23 Global Visual Audit Contract: OK — quatro nomes atuais, guia, busca contextual e breakpoints protegidos.');
