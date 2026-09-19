import fs from 'node:fs';
import path from 'node:path';

const errors=[];
const dir='public/topper-inspirations';
const files=fs.readdirSync(dir).filter(name=>name.endsWith('.svg'));

for(const name of files){
  const file=path.join(dir,name);
  const content=fs.readFileSync(file,'utf8');
  const rawAmp=[...content.matchAll(/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9A-Fa-f]+;)/g)];
  if(rawAmp.length)errors.push(`${name}: ${rawAmp.length} ampersand(s) XML inválido(s)`);
  if(!content.includes('<svg'))errors.push(`${name}: sem tag <svg>`);
  if(!content.includes('</svg>'))errors.push(`${name}: sem fechamento </svg>`);
}

const home=fs.readFileSync('app/page.tsx','utf8');
if(home.includes("'INSP-TOP-05'"))errors.push('Home ainda destaca Floral Rosé simplificado na vitrine principal');
if(!home.includes("'INSP-TOP-15'"))errors.push('Home não usa a inspiração fotográfica Ursinho Aviador no destaque');

if(errors.length){
  console.error(`V7.18.2 SVG Asset Integrity: FALHOU (${errors.length})`);
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log(`V7.18.2 SVG Asset Integrity: OK — ${files.length} SVGs válidos e vitrine premium protegida.`);
