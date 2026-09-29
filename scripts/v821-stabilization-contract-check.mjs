import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');
const wrangler=read('wrangler.jsonc');
const catalog=read('lib/topper-catalog.ts');
const header=read('components/PublicTopperHeader.tsx');
const dock=read('components/MerlinMobileDock.tsx');
const home=read('app/page.tsx');
const personalizados=read('app/personalizados/page.tsx');
const orderBuilder=read('components/OrderBuilder.tsx');
const inquiryRoute=read('app/api/inquiries/route.ts');
const requestOrigin=read('lib/request-origin.ts');
const config=read('lib/config.ts');
const layout=read('app/layout.tsx');

const must=(condition,message)=>{if(!condition)errors.push(message);};

must(/\"name\"\s*:\s*\"merlin\"/.test(wrangler),'wrangler precisa usar o Worker merlin');
must(config.includes('https://merlin.encantos.workers.dev'),'config precisa conhecer o domínio canônico atual');

for(const token of [
  "name:'Topo Essencial'",
  "name:'Topo 3D em Camadas'",
  "name:'Topo Premium'",
  "name:'Topo com Movimento (Shaker)'",
  "name:'Topo com Acetato'",
  "name:'Topo Luxo — Movimento + Acetato'"
]) must(catalog.includes(token),`nome público ausente no catálogo: ${token}`);

for(const slug of ['essencial','camadas-3d','premium','shaker','acetato','elite-shaker-acetato'])
  must(catalog.includes(`slug:'${slug}'`),`slug legado precisa ser preservado: ${slug}`);

must(header.includes('MerlinMobileDock'),'dock móvel precisa ser montado pelo header público compartilhado');
must(header.includes('merlin-logo-v821.webp'),'header precisa usar a logo oficial V8.21');
must(!home.includes('<MerlinMobileDock'),'Home não deve duplicar o dock móvel');
for(const route of ['/','/catalogo','/inspiracoes','/monte-seu-pedido','/orcamento'])
  must(dock.includes(route),`dock móvel sem rota principal: ${route}`);

must(home.includes('Feito por Nós'),'Home precisa ter seção Feito por Nós');
for(const asset of ['topo-gotico-real.webp','marcadores-literarios-real.webp','marcadores-personalizados-real.webp'])
  must(home.includes(asset),`Home sem trabalho real: ${asset}`);

must(personalizados.includes('Marcadores de Página'),'Personalizados precisa destacar Marcadores de Página');
must(!personalizados.includes('Kits Personalizados'),'Kits devem ficar ocultos do catálogo público');
must(!personalizados.includes('Doces & Complementos'),'Doces não podem parecer produto alimentício ofertado');

must(orderBuilder.includes("key:'marcadores'"),'OrderBuilder precisa aceitar marcadores');
must(!orderBuilder.includes("key:'kit' as const"),'OrderBuilder não deve oferecer Kits');
must(!orderBuilder.includes("key:'doces' as const"),'OrderBuilder não deve oferecer Doces');
must(orderBuilder.includes('foto pelo WhatsApp'),'referência por foto precisa orientar envio no WhatsApp');

must(inquiryRoute.includes('🎂 NOVO PEDIDO — MERLIN'),'WhatsApp precisa usar cabeçalho visual do novo pedido');
for(const token of ['👤 Cliente:','📱 WhatsApp:','📅 Data do evento:','🎨 Produto:','🎉 Tema:','✍️ Nome / texto:','🎈 Idade / número:','🎨 Cores:','📝 Observações:'])
  must(inquiryRoute.includes(token),`WhatsApp sem campo formatado: ${token}`);

must(requestOrigin.includes('merlin.encantos.workers.dev'),'boundary de origem precisa conhecer o domínio canônico atual');
must(layout.includes("import './v821-stabilization.css';"),'layout precisa carregar a camada V8.21 por último');

if(errors.length){
  console.error(`V8.21 Stabilization Contract: FALHOU (${errors.length})`);
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V8.21 Stabilization Contract: OK — identidade, navegação, catálogo, trabalhos reais e orçamento estão alinhados.');
