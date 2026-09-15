import starterCatalog from '../data/starter-catalog.json';
import photoReferences from '../data/catalog-photo-references.json';

export type StarterCatalogProduct = (typeof starterCatalog.products)[number];
export type StarterCatalogCategory = (typeof starterCatalog.categories)[number];

type PhotoReferenceMap=Record<string,string>;
const categoryPhotoReferences=photoReferences.categories as PhotoReferenceMap;
const productPhotoReferences=photoReferences.products as PhotoReferenceMap;

export const catalogPricingNote = starterCatalog.pricing_note;
export const starterCatalogProducts = starterCatalog.products.map(product=>({...product,image_url:productPhotoReferences[product.slug]||product.image_url})) as StarterCatalogProduct[];
export const starterCatalogCategories = starterCatalog.categories.map(category=>({...category,image_url:categoryPhotoReferences[category.slug]||category.image_url})) as StarterCatalogCategory[];

const legacyCategoryAliases: Record<string,string> = {
  'caixinhas-milk': 'caixas-personalizadas',
  'Caixinhas Milk': 'caixas-personalizadas',
  'flores': 'flores-acabamentos',
  'Flores': 'flores-acabamentos',
  'outros': 'mesa-festa',
  'Outros': 'mesa-festa',
};

const categoryBySlug = new Map(starterCatalogCategories.map(category => [category.slug, category]));
const categoryByName = new Map(starterCatalogCategories.map(category => [category.name, category]));
const productBySlug = new Map(starterCatalogProducts.map(product => [product.slug, product]));

export function getStarterProduct(slug:string){ return productBySlug.get(slug); }
export function getStarterCategory(value:string){
  const key=legacyCategoryAliases[value]||value;
  return categoryBySlug.get(key)||categoryByName.get(key);
}
export function isLegacyCatalogPlaceholder(url:string){ return /^\/placeholder-(?:topo|milk|kit)\.svg$/i.test(url); }
function isLegacyIllustrativeCatalogImage(url:string|undefined|null){ return Boolean(url&&url.startsWith('/catalog/')&&/\.svg(?:$|\?)/i.test(url)); }
export function isReferenceCatalogPhoto(url:string|undefined|null){ return Boolean(url&&url.startsWith('/inspirations/reais/')&&/\.webp(?:$|\?)/i.test(url)); }
export function isIllustrativeCatalogImage(url:string|undefined|null){ return isLegacyIllustrativeCatalogImage(url)||isReferenceCatalogPhoto(url); }
export function catalogProductImage(slug:string,category:string,current:string[]){
  const clean=current.filter(Boolean);
  const customerMedia=clean.filter(url=>!isLegacyCatalogPlaceholder(url)&&!isIllustrativeCatalogImage(url));
  if(customerMedia.length)return customerMedia;
  const starter=getStarterProduct(slug);
  if(starter)return [starter.image_url];
  const categoryArt=getStarterCategory(category)?.image_url;
  return categoryArt?[categoryArt]:clean;
}
export function catalogCategoryImage(slug:string,name:string,current:string|null|undefined){
  if(current&&!isLegacyCatalogPlaceholder(current)&&!isIllustrativeCatalogImage(current))return current;
  return getStarterCategory(slug)?.image_url||getStarterCategory(name)?.image_url||current||null;
}
export function formatCatalogMoney(cents:number|null|undefined){
  if(cents===null||cents===undefined)return 'Sob consulta';
  return new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(cents/100);
}
export function catalogPriceContext(priceCents:number|null|undefined,minQuantity:number|null|undefined){
  if(priceCents===null||priceCents===undefined)return 'Valor confirmado no orçamento';
  const min=Math.max(1,Number(minQuantity)||1);
  if(min===1)return 'valor inicial por peça';
  return `por unidade • mínimo ${min}`;
}
export function minimumOrderCents(priceCents:number|null|undefined,minQuantity:number|null|undefined){
  if(priceCents===null||priceCents===undefined)return null;
  return priceCents*Math.max(1,Number(minQuantity)||1);
}
export function minimumOrderLabel(priceCents:number|null|undefined,minQuantity:number|null|undefined){
  const min=Math.max(1,Number(minQuantity)||1);
  const total=minimumOrderCents(priceCents,minQuantity);
  return total!==null&&min>1?`Pedido mínimo a partir de ${formatCatalogMoney(total)}`:'';
}
