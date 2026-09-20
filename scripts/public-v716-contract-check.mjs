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
for(const file of requiredFiles){
  if(!fs.existsSync(file))errors.push('arquivo V7.16 ausente: '+file);
}

if(fs.existsSync('app/public-v716.css')){
  const css=read('app/public-v716.css');
  const required=[
    ['marcador V7.16','/* V7.16 — auditoria visual global, encaixe e antitruncamento */'],
    ['utilitário sr-only','.sr-only{'],
    ['sr-only fora do fluxo','position:absolute!important'],
    ['sr-only recortado','clip:rect(0,0,0,0)!important'],
    ['header em três colunas','grid-template-columns:20px minmax(0,1fr) auto'],
    ['input com largura flexível','.public-header-search input{'],
    ['botão de busca não quebra','white-space:nowrap'],
    ['breakpoint notebook','@media(max-width:1280px) and (min-width:821px)'],
    ['guia com colunas protegidas','grid-template-columns:minmax(230px,1.35fr)'],
    ['guia em cards intermediários','@media(max-width:1100px)'],
    ['rótulo de complexidade','content:"Complexidade"'],
    ['rótulo de valor','content:"Valor"'],
    ['rótulo ideal para','content:"Ideal para"'],
    ['filtro legível','.public-gallery-filters fieldset button,'],
    ['fonte de filtro','.public-favorites-filter{\n  min-height:40px'],
    ['filtro desktop mais largo','grid-template-columns:260px minmax(0,1fr)'],
    ['paleta sem ellipsis','text-overflow:clip'],
    ['price guide 1 coluna estreita','@media(max-width:650px)']
  ];
  for(const [label,token] of required){
    if(!css.includes(token))errors.push(label);
  }
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
  const isV8=header.includes("label:'Personalizados'");
  if(!header.includes('className="sr-only"'))errors.push('label acessível da busca foi removido');
  const expectedPlaceholder=isV8?'placeholder="Tema, produto, cor ou estilo..."':'placeholder="Tema, código, cor ou estilo..."';
  if(!header.includes(expectedPlaceholder))errors.push('placeholder curto da busca global ausente');
  if((header.match(/<input/g)||[]).length!==1)errors.push('header público deve manter uma única entrada de busca');
}

if(fs.existsSync('app/guia-de-precos/page.tsx')){
  const guide=read('app/guia-de-precos/page.tsx');
  for(const token of ['Complexidade','Valor','Ideal para'])if(!guide.includes(token))errors.push('guia sem coluna '+token);
}

if(fs.existsSync('components/TopperInspirationGallery.tsx')){
  const gallery=read('components/TopperInspirationGallery.tsx');
  for(const token of ['Tema, código, cor...','Carregar mais']){
    if(!gallery.includes(token))errors.push('galeria sem conteúdo esperado: '+token);
  }
}
if(fs.existsSync('lib/topper-catalog.ts')){
  const catalog=read('lib/topper-catalog.ts');
  if(!catalog.includes("name:'Topo Elite Shaker + Acetato'"))errors.push('catálogo sem nome longo do nível Elite para teste de encaixe');
}
if(fs.existsSync('lib/topper-inspirations.ts')){
  const inspirations=read('lib/topper-inspirations.ts');
  if(!inspirations.includes("category:'Feminino elegante'"))errors.push('inspirações sem categoria longa Feminino elegante para teste de encaixe');
}

if(errors.length){
  console.error('V7.16 Global Visual Audit Contract: FALHOU ('+errors.length+')');
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V7.16 Global Visual Audit Contract: OK — header, preço, filtros, texto e breakpoints protegidos.');
