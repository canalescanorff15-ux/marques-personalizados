import fs from 'node:fs';
const source=fs.readFileSync('app/catalogo/page.tsx','utf8');
const detail=fs.readFileSync('app/catalogo/[slug]/page.tsx','utf8');
const errors=[];
if(/type Props=\{params:Promise<\{slug:string\}>/.test(source))errors.push('/catalogo ainda exige slug como se fosse ficha individual');
if(source.includes('getProductBySlug('))errors.push('/catalogo ainda busca um único produto por slug');
if(source.includes('return notFound()'))errors.push('/catalogo ainda retorna 404 por ausência de produto individual');
for(const token of ['getPublicCatalogPage','CatalogClient','getCategories','getSiteSettings'])if(!source.includes(token))errors.push(`/catalogo sem ${token}`);
if(!source.includes('<CatalogClient'))errors.push('/catalogo não renderiza a vitrine filtrável já existente');
if(!detail.includes('href="/catalogo"'))errors.push('ficha de produto não volta para /catalogo');
if(errors.length){console.error(`CATALOG_ROOT_V695_FAIL: ${errors.length} problema(s)`);for(const e of errors)console.error(`- ${e}`);process.exit(1)}
console.log('CATALOG_ROOT_V695_OK: /catalogo é uma vitrine real e preserva as fichas /catalogo/[slug].');
