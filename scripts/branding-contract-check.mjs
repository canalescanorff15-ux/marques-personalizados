import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const mustContain={
  'lib/config.ts':['Merlin Encantos em Papel',"logo_url: '/merlin-logo.webp'",'Planejar • Personalizar • Encantar'],
  'components/Header.tsx':['Merlin Encantos em Papel','planejar • personalizar • encantar',"'/merlin-logo.webp'"],
  'components/Footer.tsx':['/merlin-logo.webp','Planejar, personalizar e encantar'],
  'app/page.tsx':['MERLIN • ENCANTOS EM PAPEL','>Merlin<','>MERLIN<'],
  'app/inspiracoes/page.tsx':['Merlin • Encantos em Papel'],
  'app/monte-seu-kit/page.tsx':['Merlin Encantos em Papel','Pedido guiado Merlin'],
};
const errors=[];
for(const [rel,needles] of Object.entries(mustContain)){
  const file=path.join(root,rel);
  if(!fs.existsSync(file)){errors.push(`${rel}: ausente`);continue;}
  const text=fs.readFileSync(file,'utf8');
  for(const needle of needles)if(!text.includes(needle))errors.push(`${rel}: faltando ${JSON.stringify(needle)}`);
}
for(const rel of ['public/merlin-logo.webp','public/merlin-logo-original.png','public/favicon.svg']){
  const file=path.join(root,rel);if(!fs.existsSync(file)||fs.statSync(file).size<100)errors.push(`${rel}: asset ausente ou inválido`);
}
const userFacing=['app/page.tsx','app/inspiracoes/page.tsx','app/monte-seu-kit/page.tsx','components/Header.tsx','components/Footer.tsx','components/InspirationExplorer.tsx','components/InspirationShowcase.tsx','components/KitBuilder.tsx','components/PartyConcierge.tsx'];
const legacy=[/K&F Papelaria Criativa/i,/K&amp;F/i,/Marques Papelaria/i,/Marques Personalizados/i,/\/kf-logo\.webp/i];
for(const rel of userFacing){
  const text=fs.readFileSync(path.join(root,rel),'utf8');
  for(const pattern of legacy)if(pattern.test(text))errors.push(`${rel}: referência visual antiga ${pattern}`);
}
if(errors.length){console.error(`Branding contract falhou (${errors.length}):\n- ${errors.join('\n- ')}`);process.exit(1);}
console.log('Branding contract OK — Merlin Encantos em Papel, logo final e slogan oficial consistentes.');
