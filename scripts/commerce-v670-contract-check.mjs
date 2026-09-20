import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const errors=[];
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const must=(file,tokens)=>{const text=read(file);for(const token of tokens)if(!text.includes(token))errors.push(`${file} sem ${token}`);return text;};

const catalog=must('lib/topper-catalog.ts',['TOP-01','TOP-02','TOP-03','TOP-04','TOP-05','TOP-06','shaker','acetato']);
const home=must('app/page.tsx',['href="/catalogo"','href="/guia-de-precos"','href="/orcamento"','href="/monte-seu-pedido"']);
const price=must('app/guia-de-precos/page.tsx',['topperLevels.map','Sob orçamento','shaker','acetato','/monte-seu-pedido']);
const detail=must('app/catalogo/[slug]/page.tsx',['topperLevelBySlug','level.features','level.materials','/monte-seu-pedido?produto=topo&nivel=']);
const builder=must('components/TopperBuilder.tsx',["'/api/inquiries'","cake_size","desired_categories:['Topos de bolo']","product_name:selected.name"]);
const header=must('components/PublicTopperHeader.tsx',['/guia-de-precos','/orcamento','/monte-seu-pedido']);
const footer=must('components/Footer.tsx',['/guia-de-precos','/orcamento','/monte-seu-pedido']);
const dock=must('components/MerlinMobileDock.tsx',['href="/orcamento"','href="/monte-seu-pedido"']);
const sitemap=must('app/sitemap.ts',['/guia-de-precos','/monte-seu-pedido','topperLevels.map']);

if(catalog.includes('price_cents'))errors.push('linha de níveis não deve inventar preço fixo');
if(price.match(/R\$\s*\d/))errors.push('guia de níveis não deve publicar preço não validado');
for(const source of [home,header,footer,dock])if(source.includes('href="/monte-seu-kit"'))errors.push('jornada pública ainda oferece Monte seu Kit');
if(detail.includes('getProductBySlug'))errors.push('detalhe público ainda resolve produto legado do banco');
if(!builder.includes("source:'site'"))errors.push('briefing de topo precisa manter atribuição de origem site');

const pkg=JSON.parse(read('package.json'));
if(!pkg.scripts?.['check:commerce-v670'])errors.push('package.json sem check:commerce-v670');
if(!String(pkg.scripts.verify||'').includes('check:commerce-v670'))errors.push('verify não executa check:commerce-v670');
const workflow=read('.github/workflows/ci.yml');
if(!workflow.includes('check:commerce-v670'))errors.push('CI não executa o contrato comercial');

if(errors.length){console.error(`TOPPER_COMMERCE_CONTRACT_FAIL (${errors.length})`);for(const error of errors)console.error('- '+error);process.exit(1);}
console.log('TOPPER_COMMERCE_CONTRACT_OK — catálogo de topos, preços sob orçamento e navegação V8.06 protegidos.');
