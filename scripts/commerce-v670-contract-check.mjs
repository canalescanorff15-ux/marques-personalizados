import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const errors=[];
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const must=(file,tokens)=>{const text=read(file);for(const token of tokens)if(!text.includes(token))errors.push(`${file} sem ${token}`);return text;};

const catalog=must('lib/topper-catalog.ts',['TOP-01','TOP-02','TOP-03','TOP-05','Topo Clássico','Topo em Camadas','Topo Premium','Topo Transparente']);
const pricing=must('lib/topper-pricing.ts',["pricingStage='launch'",'classic:35','layers:45','premium:55','transparent:60','stage2','stage3','consolidated']);
const homeSource=read('app/page.tsx');
const isEssentialHome=homeSource.includes('v8-essential-home-v814');
const home=must('app/page.tsx',isEssentialHome
  ? ['href="/catalogo"','href="/orcamento"','href="/monte-seu-pedido"']
  : ['href="/catalogo"','href="/guia-de-precos"','href="/orcamento"','href="/monte-seu-pedido"']);
const price=must('app/guia-de-precos/page.tsx',['topperLevels.map','topperPriceForSlug','topperLaunchPriceNote','/monte-seu-pedido']);
const detail=must('app/catalogo/[slug]/page.tsx',['topperLevelBySlug','topperPriceForSlug','topperBasePriceNote','level.features','level.materials','/monte-seu-pedido?produto=topo&nivel=']);
const orderBuilder=must('components/OrderBuilder.tsx',["'/api/inquiries'",'form.cake_size','selectedLevel.name','selectedLevel.code',"source:'site'"]);
const header=must('components/PublicTopperHeader.tsx',['/guia-de-precos','/orcamento','/monte-seu-pedido']);
const footerText=read('components/Footer.tsx');
const isV809Footer=footerText.includes('v8-simple-footer');
const footer=isV809Footer
  ? must('components/Footer.tsx',['/monte-seu-pedido','/catalogo','/inspiracoes','/personalizados'])
  : must('components/Footer.tsx',['/guia-de-precos','/orcamento','/monte-seu-pedido']);
if(isV809Footer){
  if(!isEssentialHome&&!home.includes('href="/guia-de-precos"'))errors.push('Home sem acesso ao guia de acabamentos');
  if(!home.includes('href="/orcamento"'))errors.push('Home sem acesso a orçamento');
  if(isEssentialHome&&!home.includes('href="/catalogo"'))errors.push('Home sem acesso ao catálogo atual');
}
const dock=must('components/MerlinMobileDock.tsx',["href:'/orcamento'","href:'/monte-seu-pedido'"]);
const sitemap=must('app/sitemap.ts',['/guia-de-precos','/monte-seu-pedido','topperLevels.map']);

for(const retired of ["slug:'shaker'","slug:'elite-shaker-acetato'"])if(catalog.includes(retired))errors.push(`catálogo voltou a publicar linha retirada: ${retired}`);
if(price.includes('Sob orçamento'))errors.push('guia de preços voltou a esconder os valores de lançamento');
if(!price.includes('Valores de lançamento'))errors.push('guia não comunica a etapa de lançamento');
if(!detail.includes('A partir de R$'))errors.push('detalhe não comunica valor inicial');
for(const source of [home,header,footer,dock]){
  if(source.includes('href="/monte-seu-kit"')||source.includes("href:'/monte-seu-kit'"))errors.push('jornada pública ainda oferece Monte seu Kit');
}
if(detail.includes('getProductBySlug'))errors.push('detalhe público ainda resolve produto legado do banco');
if(!orderBuilder.includes("desired_categories:[selectedProduct.label]"))errors.push('briefing atual precisa preservar categoria escolhida');

const pkg=JSON.parse(read('package.json'));
if(!pkg.scripts?.['check:commerce-v670'])errors.push('package.json sem check:commerce-v670');
if(!String(pkg.scripts.verify||'').includes('check:commerce-v670'))errors.push('verify não executa check:commerce-v670');
const workflow=read('.github/workflows/ci.yml');
if(!workflow.includes('check:commerce-v670'))errors.push('CI não executa o contrato comercial');

if(errors.length){console.error(`V8.23 TOPPER_COMMERCE_CONTRACT_FAIL (${errors.length})`);for(const error of errors)console.error('- '+error);process.exit(1);}
console.log('V8.23 TOPPER_COMMERCE_CONTRACT_OK — quatro linhas atuais, preços de lançamento centralizados e fluxo de orçamento preservado.');
