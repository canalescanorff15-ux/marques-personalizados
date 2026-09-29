import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');
const catalog=read('lib/topper-catalog.ts');
const page=read('app/monte-seu-topo/page.tsx');
const orderPage=read('app/monte-seu-pedido/page.tsx');
const orderBuilder=read('components/OrderBuilder.tsx');
const orderDraft=read('lib/order-draft.ts');
const legacy=read('app/monte-seu-kit/page.tsx');
const header=read('components/PublicTopperHeader.tsx');
const home=read('app/page.tsx');
const sitemap=read('app/sitemap.ts');

const codes=[...catalog.matchAll(/code:'(TOP-\d{2})'/g)].map(match=>match[1]);
const slugs=[...catalog.matchAll(/slug:'([^']+)',code:'TOP-/g)].map(match=>match[1]);
if(codes.length!==4)errors.push(`linha de topos precisa ter exatamente 4 níveis atuais; encontrou ${codes.length}`);
if(new Set(codes).size!==codes.length)errors.push('linha de topos possui códigos duplicados');
if(new Set(slugs).size!==slugs.length)errors.push('linha de topos possui slugs duplicados');
for(const code of ['TOP-01','TOP-02','TOP-03','TOP-05'])if(!codes.includes(code))errors.push(`nível atual ausente: ${code}`);
for(const slug of ['essencial','camadas-3d','premium','acetato'])if(!slugs.includes(slug))errors.push(`slug atual ausente: ${slug}`);
for(const retired of ['shaker','elite-shaker-acetato'])if(slugs.includes(retired))errors.push(`slug retirado ainda público: ${retired}`);

if(!page.includes("redirect('/monte-seu-pedido?produto=topo')"))errors.push('rota /monte-seu-topo deve redirecionar para o fluxo único atual');
if(!legacy.includes("redirect('/monte-seu-topo')"))errors.push('rota antiga /monte-seu-kit precisa preservar fallback legado');
if(!header.includes("href:'/monte-seu-pedido'")&&!header.includes('href="/monte-seu-pedido"'))errors.push('header não expõe /monte-seu-pedido');
if(!home.includes('href="/monte-seu-pedido"'))errors.push('home não oferece caminho direto para /monte-seu-pedido');
if(!sitemap.includes('/monte-seu-pedido'))errors.push('sitemap não inclui /monte-seu-pedido');
if(!orderPage.includes('<OrderBuilder/>'))errors.push('rota /monte-seu-pedido não monta OrderBuilder');
for(const token of ["'topo'","'marcadores'","'caixinhas'","'lembrancinhas'","'chaveiros'","'outro'","'/api/inquiries'","desired_categories:[selectedProduct.label]"])if(!orderBuilder.includes(token))errors.push(`OrderBuilder sem contrato V8.23: ${token}`);
for(const legacyType of ["'doces'","'kit'"])if(!orderDraft.includes(legacyType))errors.push(`rascunho não preserva compatibilidade com tipo legado: ${legacyType}`);
if(orderBuilder.slice(orderBuilder.indexOf('const productTypes=['),orderBuilder.indexOf('const productQueryMap')).includes("key:'kit'"))errors.push('OrderBuilder não deve oferecer Kit como categoria pública enquanto não estiver ativo');
if(orderBuilder.slice(orderBuilder.indexOf('const productTypes=['),orderBuilder.indexOf('const productQueryMap')).includes("key:'doces'"))errors.push('OrderBuilder não deve oferecer Doces como categoria pública');
if(header.includes('href="/monte-seu-kit"'))errors.push('header ainda expõe o construtor antigo de kits');

if(errors.length){
  console.error(`Topper Builder Contract: FALHOU (${errors.length})`);
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('Order Builder Contract: OK — quatro linhas atuais de topo e fluxo único de pedido, sem Shaker/Luxo/Kits/Doces públicos.');
