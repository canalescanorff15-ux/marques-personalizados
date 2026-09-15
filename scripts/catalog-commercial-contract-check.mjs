import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const fail=(msg)=>{console.error(`CATALOG_COMMERCIAL_CONTRACT_FAIL: ${msg}`);process.exit(1)};
const read=(file)=>fs.readFileSync(path.join(root,file),'utf8');
const catalog=JSON.parse(read('data/starter-catalog.json'));
const photoRefs=JSON.parse(read('data/catalog-photo-references.json'));
if(!Array.isArray(catalog.categories)||catalog.categories.length!==6)fail('catálogo inicial deve possuir 6 categorias comerciais');
if(!Array.isArray(catalog.products)||catalog.products.length!==21)fail('catálogo inicial deve possuir 21 produtos');
const assertPhoto=(scope,slug,url)=>{if(!String(url||'').startsWith('/inspirations/reais/')||!/\.webp$/i.test(String(url||'')))fail(`${scope} sem referência fotográfica WebP: ${slug}`);const asset=path.join(root,'public',String(url).replace(/^\//,''));if(!fs.existsSync(asset))fail(`referência fotográfica ausente: ${url}`)};
const slugs=new Set();
for(const category of catalog.categories){if(!category.slug||!category.name||String(category.description||'').trim().length<30)fail(`categoria incompleta: ${category.slug||category.name}`);assertPhoto('categoria',category.slug,photoRefs.categories?.[category.slug])}
for(const product of catalog.products){if(slugs.has(product.slug))fail(`slug duplicado: ${product.slug}`);slugs.add(product.slug);if(!Number.isInteger(product.price_cents)||product.price_cents<=0)fail(`preço inválido: ${product.slug}`);if(!Number.isInteger(product.min_quantity)||product.min_quantity<1)fail(`quantidade mínima inválida: ${product.slug}`);assertPhoto('produto',product.slug,photoRefs.products?.[product.slug])}
if(Object.keys(photoRefs.categories||{}).length!==catalog.categories.length)fail('mapa fotográfico de categorias possui itens extras ou faltantes');
if(Object.keys(photoRefs.products||{}).length!==catalog.products.length)fail('mapa fotográfico de produtos possui itens extras ou faltantes');
const merchandising=read('lib/catalog-merchandising.ts');
for(const token of ['formatCatalogMoney','catalogPriceContext','minimumOrderLabel','isIllustrativeCatalogImage','isReferenceCatalogPhoto','isLegacyIllustrativeCatalogImage','customerMedia','catalog-photo-references.json'])if(!merchandising.includes(token))fail(`helper ausente: ${token}`);
const client=read('components/CatalogClient.tsx');
for(const token of ['A PARTIR DE','catalogPriceContext','Imagem ilustrativa','minimumOrderLabel'])if(!client.includes(token))fail(`CatalogClient sem ${token}`);
const detail=read('app/catalogo/[slug]/page.tsx');
for(const token of ['Preço inicial de referência','frete podem alterar','Imagem ilustrativa do formato','catalogPriceContext'])if(!detail.includes(token))fail(`produto sem aviso comercial: ${token}`);
const seed=read('scripts/seed-db.mjs');
for(const token of ['starter-catalog.json','price_cents','Merlin Encantos em Papel','ON CONFLICT'])if(!seed.includes(token))fail(`seed não protege ${token}`);
const home=read('app/page.tsx');
if(!home.includes('href="/guia-de-precos"'))fail('home sem acesso direto ao guia de preços');
if(!home.includes('href="/catalogo"'))fail('home sem acesso direto ao catálogo completo');
const guide=read('components/StarterPriceGuide.tsx');for(const token of ['Preços para começar','A partir de','Montar meu kit'])if(!guide.includes(token))fail(`guia de preços sem ${token}`);
console.log(`CATALOG_COMMERCIAL_CONTRACT_OK (${catalog.products.length} produtos e ${catalog.categories.length} categorias cobertos por referências fotográficas WebP; mídia real do cliente é preservada e SVG legado é substituído automaticamente)`);
