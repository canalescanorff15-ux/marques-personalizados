import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');

for(const file of ['app/page.tsx','app/v8-home.css','app/layout.tsx']){
  if(!fs.existsSync(file))errors.push('arquivo V8.02 ausente: '+file);
}

if(fs.existsSync('app/layout.tsx')){
  const layout=read('app/layout.tsx');
  const policy=layout.indexOf("import './v8-image-policy.css';");
  const homeCss=layout.indexOf("import './v8-home.css';");
  if(homeCss<0)errors.push('layout não importa v8-home.css');
  if(policy<0||homeCss<policy)errors.push('v8-home.css precisa carregar depois da política de imagens');
}

if(fs.existsSync('app/page.tsx')){
  const home=read('app/page.tsx');
  for(const token of [
    'v8-home',
    'v8-hero',
    'Papelaria personalizada para',
    'v8-product-categories',
    'Topos de bolo',
    'Caixinhas personalizadas',
    'Adesivos & chaveiros',
    'Doces & brigadeiros',
    'Lembrancinhas',
    'Kits personalizados',
    'v8-home-inspirations',
    'publicTopperInspirations',
    'v8-included-grid',
    'Não são incluídos automaticamente',
    'bolo, doces e alimentos',
    'balões, painel e mobiliário',
    'v8-levels-grid',
    'TopperLevelVisual',
    'Shaker',
    'Acetato',
    'v8-process-grid',
    'v8-home-about',
    'v8-faq-grid',
    'v8-home-contact-shell',
    'id="sobre"',
    'id="duvidas"',
    'id="contato"'
  ])if(!home.includes(token))errors.push('Home V8.02 sem '+token);

  const hero=home.slice(home.indexOf('<section className="v8-hero"'),home.indexOf('<section className="v8-trust-strip"'));
  if((hero.match(/className="btn /g)||[]).length!==2)errors.push('hero V8.02 precisa ter exatamente dois CTAs principais');
  if(hero.includes('home-v717-photo-shade')||hero.includes('public-card-shade'))errors.push('hero V8.02 não pode usar shade escuro sobre foto');

  const codes=[...home.matchAll(/INSP-TOP-(\d{2})/g)].map(match=>Number(match[1]));
  if(codes.length<6)errors.push('Home V8.02 precisa ter ao menos seis inspirações curadas');
  if(codes.some(code=>code<18||code>50))errors.push('Home V8.02 usa inspiração fora da faixa pública focada em bolo');
}

if(fs.existsSync('app/v8-home.css')){
  const css=read('app/v8-home.css');
  for(const token of [
    '.v8-hero-photo img',
    '.v8-inspiration-photo img',
    'opacity:1!important',
    'filter:none!important',
    '.v8-product-categories',
    '.v8-inspiration-grid',
    '.v8-included-grid',
    '.v8-process-grid',
    '@media(max-width:900px)',
    '@media(max-width:640px)',
    '@media(max-width:390px)',
    '@media(prefers-reduced-motion:reduce)'
  ])if(!css.includes(token))errors.push('CSS V8.02 sem '+token);

  if(/linear-gradient\([^\n]+rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*\.7/.test(css))errors.push('CSS V8.02 contém gradiente preto pesado');
}

if(errors.length){
  console.error('V8.02 Product-first Home: FALHOU ('+errors.length+')');
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V8.02 Product-first Home: OK — produto, clareza comercial, fotografia limpa e responsividade protegidos.');
