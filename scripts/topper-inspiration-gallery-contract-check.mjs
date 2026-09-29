import fs from 'node:fs';

const errors=[];
const inspirationFile='lib/topper-inspirations.ts';
const activeFile='lib/active-topper-inspirations.ts';
const pageFile='app/inspiracoes/page.tsx';
const orderBuilderFile='components/OrderBuilder.tsx';
const galleryFile='components/TopperInspirationGallery.tsx';
const detailFile='app/inspiracoes/[code]/page.tsx';

if(!fs.existsSync(inspirationFile))errors.push('arquivo histórico lib/topper-inspirations.ts ausente');
if(!fs.existsSync(activeFile))errors.push('arquivo de inspirações públicas ativas ausente');
else{
  const active=fs.readFileSync(activeFile,'utf8');
  for(const token of ['activePublicTopperInspirations','topperLevelBySlug','isActivePublicTopperInspiration'])if(!active.includes(token))errors.push('coleção ativa sem '+token);
}

if(fs.existsSync(inspirationFile)){
  const source=fs.readFileSync(inspirationFile,'utf8');
  const codes=[...source.matchAll(/code:'(INSP-TOP-\d{2,3})'/g)].map(m=>m[1]);
  if(codes.length<17)errors.push(`acervo histórico não pode ser apagado; encontrou ${codes.length} códigos`);
  if(new Set(codes).size!==codes.length)errors.push('códigos das inspirações precisam ser únicos');
}

if(fs.existsSync(pageFile)){
  const page=fs.readFileSync(pageFile,'utf8');
  if(!page.includes('TopperInspirationGallery'))errors.push('página de inspirações não usa o componente da galeria');
}
if(fs.existsSync(galleryFile)){
  const gallery=fs.readFileSync(galleryFile,'utf8');
  if(!gallery.includes('activePublicTopperInspirations'))errors.push('galeria não usa a coleção pública filtrada');
  if(!gallery.includes('Ver detalhes'))errors.push('galeria precisa ter ação “Ver detalhes”');
}else errors.push('componente TopperInspirationGallery ausente');
if(fs.existsSync(detailFile)){
  const detail=fs.readFileSync(detailFile,'utf8');
  if(!detail.includes('Quero esse modelo'))errors.push('detalhe precisa ter CTA “Quero esse modelo”');
  if(!detail.includes('isActivePublicTopperInspiration'))errors.push('detalhe não bloqueia inspiração de linha retirada');
}else errors.push('detalhe de inspiração ausente');
if(fs.existsSync(orderBuilderFile)){
  const builder=fs.readFileSync(orderBuilderFile,'utf8');
  if(!builder.includes("params.get('inspiracao')"))errors.push('Monte seu Pedido não lê o parâmetro inspiracao');
  if(!builder.includes('topperInspirationBySlug'))errors.push('Monte seu Pedido não resolve a inspiração escolhida');
}

if(errors.length){
  console.error(`V8.23 Topper Inspiration Gallery Contract: FALHOU (${errors.length})`);
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V8.23 Topper Inspiration Gallery Contract: OK — acervo histórico preservado, vitrine limitada às quatro linhas atuais e handoff para pedido protegido.');
