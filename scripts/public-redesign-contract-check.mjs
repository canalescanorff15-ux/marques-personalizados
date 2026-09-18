import fs from 'node:fs';

const errors=[];
const exists=p=>fs.existsSync(p);
const read=p=>fs.readFileSync(p,'utf8');

for(const file of [
  'components/PublicTopperHeader.tsx',
  'components/TopperInspirationGallery.tsx',
  'app/public-v710.css'
])if(!exists(file))errors.push(`arquivo público obrigatório ausente: ${file}`);

if(exists('components/PublicTopperHeader.tsx')){
  const h=read('components/PublicTopperHeader.tsx');
  for(const token of ['Meus Favoritos','Meu Pedido','/inspiracoes?favoritos=1','/monte-seu-topo'])if(!h.includes(token))errors.push(`header V7.10 sem ${token}`);
  if(!h.includes('busca'))errors.push('header V7.10 sem busca dedicada a topos');
}

if(exists('components/TopperInspirationGallery.tsx')){
  const g=read('components/TopperInspirationGallery.tsx');
  for(const token of ['topperInspirations','categoria','nivel','favoritos','Ordem do catálogo','Nome A–Z','Nome Z–A','Carregar mais','Ver detalhes','InspirationFavoriteButton'])if(!g.includes(token))errors.push(`galeria V7.10 sem contrato: ${token}`);
  if(!g.includes('PAGE_SIZE=12'))errors.push('galeria precisa iniciar/carregar em blocos de 12');
  if(!g.includes('normalize'))errors.push('galeria precisa normalizar busca para acentos/maiúsculas');
  if(!g.includes('history.replaceState'))errors.push('galeria precisa refletir filtros na URL');
}

if(exists('app/inspiracoes/page.tsx')){
  const p=read('app/inspiracoes/page.tsx');
  if(!p.includes('TopperInspirationGallery'))errors.push('/inspiracoes não usa a galeria V7.10');
  if(p.includes('12 ideias iniciais'))errors.push('/inspiracoes ainda tem contagem fixa obsoleta');
}

if(exists('app/inspiracoes/[code]/page.tsx')){
  const d=read('app/inspiracoes/[code]/page.tsx');
  if(d.includes("redirect('/inspiracoes')"))errors.push('detalhe dos códigos atuais ainda redireciona para a galeria');
  for(const token of ['topperInspirationByCode','Quero esse modelo','paleta','nível sugerido'])if(!d.toLowerCase().includes(token.toLowerCase()))errors.push(`detalhe de inspiração sem ${token}`);
}

if(exists('components/InspirationFavoriteButton.tsx')){
  const f=read('components/InspirationFavoriteButton.tsx');
  if(!f.includes('try')||!f.includes('catch'))errors.push('favoritos precisam tratar armazenamento indisponível');
  if(!f.includes('kf_inspiration_favorites_v1'))errors.push('chave legada de favoritos precisa ser preservada');
}

if(errors.length){
  console.error(`V7.10 Public Redesign Contract: FALHOU (${errors.length})`);
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V7.10 Public Redesign Contract: OK — header, galeria, favoritos e detalhes públicos alinhados à referência aprovada.');
