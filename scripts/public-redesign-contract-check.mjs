import fs from 'node:fs';

const errors=[];
const exists=p=>fs.existsSync(p);
const read=p=>fs.readFileSync(p,'utf8');
const nextConfig=read('next.config.ts');

for(const file of [
  'components/PublicTopperHeader.tsx',
  'components/TopperInspirationGallery.tsx',
  'app/public-v710.css',
  'app/public-v712.css'
])if(!exists(file))errors.push(`arquivo público obrigatório ausente: ${file}`);

if(exists('components/PublicTopperHeader.tsx')){
  const h=read('components/PublicTopperHeader.tsx');
  const isV809=h.includes('v8-simple-header');
  const isV8=h.includes("label:'Personalizados'");
  const required=isV809
    ? ['/monte-seu-pedido','/catalogo','Topos de bolo','Personalizados','Inspirações','v8-simple-nav','v8-simple-order-cta']
    : isV8
      ? ['Meus Favoritos','Meu Pedido','/inspiracoes?favoritos=1','/monte-seu-pedido','/catalogo','Topos de bolo','Personalizados','Inspirações','Como funciona','/orcamento','Orçamento']
      : ['Meus Favoritos','Meu Pedido','/inspiracoes?favoritos=1','/monte-seu-pedido','Sobre Nós','Nossos Topos','Inspirações','Monte seu Topo','Dúvidas','Contato'];
  for(const token of required)if(!h.includes(token))errors.push(`header público ${isV809?'V8.09':isV8?'V8.03':'legado'} sem ${token}`);
  if(!isV809&&!h.includes('public-header-search'))errors.push('header público sem busca dedicada');
  if(isV809&&h.includes('public-header-search'))errors.push('header V8.09 não deve reintroduzir busca global');
}

if(exists('components/TopperInspirationGallery.tsx')){
  const g=read('components/TopperInspirationGallery.tsx');
  for(const token of ['topperInspirations','categoria','nivel','favoritos','Ordem do catálogo','Nome A–Z','Nome Z–A','Carregar mais','Ver detalhes','InspirationFavoriteButton'])if(!g.includes(token))errors.push(`galeria V7.10 sem contrato: ${token}`);
  if(!g.includes('PAGE_SIZE=12'))errors.push('galeria precisa iniciar/carregar em blocos de 12');
  if(!g.includes('normalize'))errors.push('galeria precisa normalizar busca para acentos/maiúsculas');
  if(!g.includes('history.replaceState'))errors.push('galeria precisa refletir filtros na URL');
  for(const token of ['filterOpen','aria-modal','public-mobile-filter-trigger','Escape','filterCloseRef'])if(!g.includes(token))errors.push(`galeria móvel sem requisito acessível: ${token}`);
}

if(exists('app/page.tsx')){
  const home=read('app/page.tsx');
  for(const id of ['id="sobre"','id="duvidas"','id="contato"'])if(!home.includes(id))errors.push(`home sem âncora pública ${id}`);
}

if(exists('app/inspiracoes/page.tsx')){
  const p=read('app/inspiracoes/page.tsx');
  if(!p.includes('TopperInspirationGallery'))errors.push('/inspiracoes não usa a galeria V7.10');
  if(p.includes('12 ideias iniciais'))errors.push('/inspiracoes ainda tem contagem fixa obsoleta');
}

if(exists('app/inspiracoes/[code]/page.tsx')){
  const d=read('app/inspiracoes/[code]/page.tsx');
  if(d.includes('function LegacyInspirationDetail')||!d.includes("if(!inspiration)redirect('/inspiracoes')"))errors.push('detalhe deve redirecionar códigos desconhecidos');
  if(d.includes('isPublicTopperInspiration')&&!d.includes("redirect('/inspiracoes')"))errors.push('curadoria V8 precisa redirecionar referências arquivadas');
  for(const token of ['topperInspirationByCode','Quero esse modelo','paleta','nível sugerido'])if(!d.toLowerCase().includes(token.toLowerCase()))errors.push(`detalhe de inspiração sem ${token}`);
}

if(exists('components/InspirationFavoriteButton.tsx')){
  const f=read('components/InspirationFavoriteButton.tsx');
  if(!f.includes('try')||!f.includes('catch'))errors.push('favoritos precisam tratar armazenamento indisponível');
  if(!f.includes('kf_inspiration_favorites_v1'))errors.push('chave legada de favoritos precisa ser preservada');
}

if(nextConfig.includes("source: '/inspiracoes/:code'"))errors.push('redirect global ainda bloqueia os detalhes atuais de inspirações');

if(exists('app/public-v712.css')){
  const css=read('app/public-v712.css');
  if(!css.includes('V7.12 — sistema visual público unificado'))errors.push('marcador da camada visual V7.12 ausente');
}
for(const page of ['app/page.tsx','app/inspiracoes/page.tsx','app/catalogo/page.tsx','app/catalogo/[slug]/page.tsx','app/monte-seu-topo/page.tsx','app/monte-seu-pedido/page.tsx','app/orcamento/page.tsx','app/guia-de-precos/page.tsx','app/privacidade/page.tsx','app/termos/page.tsx']){
  if(!read(page).includes('public-v712'))errors.push(`${page} ainda não usa a identidade V7.12`);
}
if(!read('components/Footer.tsx').includes('public-v712-footer'))errors.push('rodapé ainda não usa a identidade V7.12');
if(!read('app/page.tsx').includes('TopperLevelVisual'))errors.push('home não usa visuais reais dos níveis');
if(!read('app/catalogo/[slug]/page.tsx').includes('TopperLevelVisual'))errors.push('detalhe do nível não usa visual oficial');
if(read('app/privacidade/page.tsx').includes('Minha Lista'))errors.push('privacidade ainda descreve recurso legado');
if(read('app/termos/page.tsx').includes('“a partir de”'))errors.push('termos ainda descrevem preço legado');

if(errors.length){
  console.error(`V7.10 Public Redesign Contract: FALHOU (${errors.length})`);
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V7.12 Public Redesign Contract: OK — identidade pública unificada, fluxos atuais e páginas institucionais alinhados.');
