import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');

for(const file of ['app/public-v719.css','app/layout.tsx','app/page.tsx']){
  if(!fs.existsSync(file))errors.push('arquivo V7.19 ausente: '+file);
}

if(fs.existsSync('app/layout.tsx')){
  const layout=read('app/layout.tsx');
  const v718=layout.indexOf("import './public-v718.css';");
  const v719=layout.indexOf("import './public-v719.css';");
  if(v719<0)errors.push('layout não importa public-v719.css');
  if(v718<0||v719<v718)errors.push('V7.19 precisa carregar depois da V7.18');
}

if(fs.existsSync('app/page.tsx')){
  const home=read('app/page.tsx');
  if(!home.includes('home-v719'))errors.push('Home não habilita classe home-v719');
  const isV808=home.includes('v8-clean-home');
  const tokens=isV808
    ? ['home-v717-inspiration-story','Veja o produto.','Escolha a sua direção.']
    : ['home-v717-inspiration-story','Referências que ajudam a','enxergar o resultado.'];
  for(const token of tokens){
    if(!home.includes(token))errors.push('Home sem estrutura esperada da seção de inspirações: '+token);
  }
}

if(fs.existsSync('app/public-v719.css')){
  const css=read('app/public-v719.css');
  const required=[
    ['marcador V7.19','/* V7.19 — Premium Final Polish */'],
    ['seção 02 premium','.home-v719 .home-v717-inspiration-story{'],
    ['título claro','.home-v719 .home-v717-story-head h2{'],
    ['cor branca do título','color:#fff!important'],
    ['itálico rosa','.home-v719 .home-v717-story-head h2 em{'],
    ['painel editorial lateral','.home-v719 .home-v717-story-head>div:last-child{'],
    ['cards premium','.home-v719 .home-v717-gallery-card{'],
    ['moldura interna','.home-v719 .home-v717-gallery-card::after{'],
    ['processo premium','.home-v719 .home-v717-process-grid>a{'],
    ['FAQ premium','.home-v719 .public-home-faq-grid details{'],
    ['contato premium','.home-v719 .home-v717-contact-shell{'],
    ['header global','.public-topper-header{'],
    ['footer global','.public-v712-footer{'],
    ['tablet','@media(max-width:900px)'],
    ['mobile','@media(max-width:640px)'],
    ['mobile estreito','@media(max-width:390px)']
  ];
  for(const [label,token] of required)if(!css.includes(token))errors.push(label);
}

if(errors.length){
  console.error('V7.19 Premium Final Polish: FALHOU ('+errors.length+')');
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V7.19/V8.08 Premium Contract: OK — seção de inspirações preservada e Home clean reconhecida.');
