import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const fail=(msg)=>{console.error(`CATALOG_COMMERCIAL_CONTRACT_FAIL: ${msg}`);process.exit(1)};
const read=(file)=>fs.readFileSync(path.join(root,file),'utf8');
const catalog=JSON.parse(read('data/starter-catalog.json'));
if(!Array.isArray(catalog.categories)||catalog.categories.length!==6)fail('catálogo inicial deve possuir 6 categorias comerciais');
if(!Array.isArray(catalog.products)||catalog.products.length!==21)fail('catálogo inicial deve possuir 21 produtos');
const slugs=new Set();
for(const category of catalog.categories){if(!category.slug||!category.name||String(category.description||'').trim().length<30)fail(`categoria incompleta: ${category.slug||category.name}`);if(!String(category.image_url||'').startsWith('/catalog/'))fail(`categoria sem imagem comercial: ${category.slug}`);const asset=path.join(root,'public',category.image_url.replace(/^\//,''));if(!fs.existsSync(asset))fail(`imagem ausente: ${category.image_url}`)}
for(const product of catalog.products){if(slugs.has(product.slug))fail(`slug duplicado: ${product.slug}`);slugs.add(product.slug);if(!Number.isInteger(product.price_cents)||product.price_cents<=0)fail(`preço inválido: ${product.slug}`);if(!Number.isInteger(product.min_quantity)||product.min_quantity<1)fail(`quantidade mínima inválida: ${product.slug}`);if(!String(product.image_url||'').startsWith('/catalog/'))fail(`produto usa placeholder: ${product.slug}`);const asset=path.join(root,'public',product.image_url.replace(/^\//,''));if(!fs.existsSync(asset))fail(`imagem ausente: ${product.image_url}`)}
const merchandising=read('lib/catalog-merchandising.ts');
for(const token of ['formatCatalogMoney','catalogPriceContext','minimumOrderLabel','isIllustrativeCatalogImage'])if(!merchandising.includes(token))fail(`helper ausente: ${token}`);
const client=read('components/CatalogClient.tsx');
for(const token of ['A PARTIR DE','catalogPriceContext','Imagem ilustrativa','minimumOrderLabel'])if(!client.includes(token))fail(`CatalogClient sem ${token}`);
const detail=read('app/catalogo/[slug]/page.tsx');
for(const token of ['Preço inicial de referência','frete podem alterar','Imagem ilustrativa do formato','catalogPriceContext'])if(!detail.includes(token))fail(`produto sem aviso comercial: ${token}`);
const seed=read('scripts/seed-db.mjs');
for(const token of ['starter-catalog.json','price_cents','Merlin Encantos em Papel','ON CONFLICT'])if(!seed.includes(token))fail(`seed não protege ${token}`);
const home=read('app/page.tsx');if(!home.includes('StarterPriceGuide'))fail('home sem guia de preços');
const guide=read('components/StarterPriceGuide.tsx');for(const token of ['Preços para começar','A partir de','Montar meu kit'])if(!guide.includes(token))fail(`guia de preços sem ${token}`);
console.log(`CATALOG_COMMERCIAL_CONTRACT_OK (${catalog.products.length} produtos, ${catalog.categories.length} categorias, todos com preço e imagem)`);
