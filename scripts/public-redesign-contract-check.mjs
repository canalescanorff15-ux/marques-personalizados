import fs from 'node:fs';

const errors=[];
const exists=p=>fs.existsSync(p);
const read=p=>fs.readFileSync(p,'utf8');
const nextConfig=read('next.config.ts');

for(const file of [
  'components/PublicTopperHeader.tsx',
  'components/TopperInspirationGallery.tsx',
  'app/public-v710.css'
])if(!exists(file))errors.push(`arquivo público obrigatório ausente: ${file}`);

if(exists('components/PublicTopperHeader.tsx')){
  const h=read('components/PublicTopperHeader.tsx');
  for(const token of ['Meus Favoritos','Meu Pedido','/inspiracoes?favoritos=1','/monte-seu-topo','Sobre Nós','Nossos Topos','Inspirações','Monte seu Topo','Dúvidas','Contato'])if(!h.includes(token))errors.push(`header público sem ${token}`);
  if(!h.includes('busca'))errors.push('header V7.10 sem busca dedicada a topos');
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
  if(d.includes('function LegacyInspirationDetail')||!d.includes("if(!inspiration)redirect('/inspiracoes')"))errors.push('detalhe deve renderizar códigos atuais e redirecionar apenas códigos desconhecidos');
  for(const token of ['topperInspirationByCode','Quero esse modelo','paleta','nível sugerido'])if(!d.toLowerCase().includes(token.toLowerCase()))errors.push(`detalhe de inspiração sem ${token}`);
}

if(exists('components/InspirationFavoriteButton.tsx')){
  const f=read('components/InspirationFavoriteButton.tsx');
  if(!f.includes('try')||!f.includes('catch'))errors.push('favoritos precisam tratar armazenamento indisponível');
  if(!f.includes('kf_inspiration_favorites_v1'))errors.push('chave legada de favoritos precisa ser preservada');
}

if(nextConfig.includes("source: '/inspiracoes/:code'"))errors.push('redirect global ainda bloqueia os detalhes atuais de inspirações');

if(errors.length){
  console.error(`V7.10 Public Redesign Contract: FALHOU (${errors.length})`);
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V7.11 Public Redesign Contract: OK — navegação pública, galeria, filtros móveis, favoritos e detalhes alinhados à referência aprovada.');
