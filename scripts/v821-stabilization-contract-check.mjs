import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');
const expect=(condition,message)=>{if(!condition)errors.push(message);};

const catalog=read('lib/topper-catalog.ts');
const header=read('components/PublicTopperHeader.tsx');
const dock=read('components/MerlinMobileDock.tsx');
const home=read('app/page.tsx');
const personalizados=read('app/personalizados/page.tsx');
const orderBuilder=read('components/OrderBuilder.tsx');
const route=read('app/api/inquiries/route.ts');
const origin=read('lib/request-origin.ts');
const wrangler=read('wrangler.jsonc');

for(const token of ['Topo Essencial','Topo 3D em Camadas','Topo Premium','Topo com Movimento (Shaker)','Topo com Acetato','Topo Luxo — Movimento + Acetato'])expect(catalog.includes(token),`catálogo sem nome público: ${token}`);
for(const slug of ["slug:'essencial'","slug:'camadas-3d'","slug:'premium'","slug:'shaker'","slug:'acetato'","slug:'elite-shaker-acetato'"])expect(catalog.includes(slug),`slug técnico alterado: ${slug}`);

expect(header.includes('MerlinMobileDock'),'dock móvel não está no header compartilhado');
expect(!home.includes('import MerlinMobileDock'),'Home ainda monta dock próprio');
for(const routePath of ['/','/catalogo','/inspiracoes','/monte-seu-pedido','/orcamento'])expect(dock.includes(routePath),`dock sem rota ${routePath}`);

for(const token of ['Feito por Nós','Marcadores de Página','Caixinhas — sob consulta','Outros Personalizados'])expect(home.includes(token),`Home sem ${token}`);
expect(!home.includes('Doces & Complementos'),'Home ainda anuncia doces');
expect(!home.includes('>Kits<'),'Home ainda anuncia Kits');
for(const token of ['Marcadores de Página','Caixinhas — sob consulta','Outros Personalizados'])expect(personalizados.includes(token),`Personalizados sem ${token}`);
expect(!personalizados.includes('Kits Personalizados'),'Personalizados ainda anuncia Kits');
expect(!personalizados.includes('Doces & Complementos'),'Personalizados ainda anuncia doces');

expect(orderBuilder.includes("key:'marcadores'"),'OrderBuilder sem marcadores');
expect(!orderBuilder.includes("key:'doces'"),'OrderBuilder ainda oferece doces');
expect(!orderBuilder.includes("key:'kit'"),'OrderBuilder ainda oferece kit');
expect(route.includes('🎂 NOVO PEDIDO — MERLIN'),'WhatsApp sem cabeçalho NOVO PEDIDO — MERLIN');
for(const token of ['👤 Cliente:','📱 WhatsApp:','📅 Data do evento:','🎨 Produto:','📝 Detalhes do pedido:'])expect(route.includes(token),`WhatsApp sem campo ${token}`);

expect(origin.includes('merlin.encantos.workers.dev'),'boundary sem domínio público atual');
expect(wrangler.includes('"name": "merlin"'),'wrangler não aponta para Worker merlin');

if(errors.length){
  console.error(`V8.21 Stabilization Contract: FALHOU (${errors.length})`);
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V8.21 Stabilization Contract: OK — marca, catálogo, navegação, trabalhos reais e orçamento estão alinhados.');
