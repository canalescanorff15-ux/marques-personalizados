import fs from 'node:fs';
import path from 'node:path';

const errors=[];
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>{
  const full=path.join(dir,entry.name);
  return entry.isDirectory()?walk(full):[full];
});

const pages=walk('app').filter(file=>file.endsWith(`${path.sep}page.tsx`));
function pageRoute(file){
  const relative=file.replace(/\\/g,'/').replace(/^app\//,'').replace(/\/page\.tsx$/,'');
  if(!relative)return'/';
  const parts=relative.split('/').filter(part=>!/^\(.+\)$/.test(part));
  return'/'+parts.join('/');
}
const routes=new Set(pages.map(pageRoute));
const patterns=[...routes].map(route=>{
  const escaped=route.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')
    .replace(/\\\[\\\.\\\.\\\.(\w+)\\\]/g,'.+')
    .replace(/\\\[(\w+)\\\]/g,'[^/]+');
  return new RegExp(`^${escaped}/?$`);
});
function existsRoute(value){
  const clean=value.split(/[?#]/)[0]||'/';
  if(clean.startsWith('/api/')||clean.startsWith('/admin'))return true;
  return routes.has(clean)||patterns.some(pattern=>pattern.test(clean));
}

const tsx=[...walk('app'),...walk('components')].filter(file=>file.endsWith('.tsx')).filter(file=>!file.replace(/\\/g,'/').includes('/app/admin/'));
const localLinks=[];
for(const file of tsx){
  const source=fs.readFileSync(file,'utf8');
  const patternsToScan=[
    /href\s*=\s*["'](\/[^"']*)["']/g,
    /href\s*:\s*["'](\/[^"']*)["']/g,
    /(?:redirect|router\.push|router\.replace)\(\s*["'](\/[^"']*)["']/g
  ];
  for(const regex of patternsToScan){
    for(const match of source.matchAll(regex))localLinks.push({file:file.replace(/\\/g,'/'),href:match[1]});
  }
}
for(const {file,href} of localLinks){
  if(href.startsWith('/_next/')||href.startsWith('//'))continue;
  if(!existsRoute(href))errors.push(`rota local inexistente em ${file}: ${href}`);
}

const order=fs.readFileSync('components/OrderBuilder.tsx','utf8');
const mapBlock=order.match(/const productQueryMap:[\s\S]*?\n\};/)?.[0]??'';
const acceptedProducts=new Set([...mapBlock.matchAll(/^\s*['"]?([a-z0-9-]+)['"]?\s*:/gmi)].map(match=>match[1]));
for(const {file,href} of localLinks){
  const match=href.match(/[?&]produto=([^&#]+)/);
  if(match&&!acceptedProducts.has(decodeURIComponent(match[1]).toLowerCase()))errors.push(`produto de URL sem mapeamento no OrderBuilder em ${file}: ${match[1]}`);
}

if(errors.length){
  console.error(`V8.29 Public Route Integrity Contract: FALHOU (${errors.length})`);
  for(const error of [...new Set(errors)])console.error('- '+error);
  process.exit(1);
}
console.log(`V8.29 Public Route Integrity Contract: OK — ${routes.size} páginas e ${localLinks.length} referências locais verificadas sem rota quebrada ou produto órfão.`);
