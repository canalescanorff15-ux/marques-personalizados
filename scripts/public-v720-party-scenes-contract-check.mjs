import fs from 'node:fs';

const errors=[];
const inspirations=fs.readFileSync('lib/topper-inspirations.ts','utf8');
const home=fs.readFileSync('app/page.tsx','utf8');

const expected=[
  ['INSP-TOP-13','insp-top-13-jardim-abelhinhas-festa-premium.png'],
  ['INSP-TOP-14','insp-top-14-dino-aventura-festa-premium.png'],
  ['INSP-TOP-16','insp-top-16-casamento-floral-dourado-festa-premium.png'],
  ['INSP-TOP-17','insp-top-17-bailarina-15-anos-festa-premium.png']
];

for(const [code,file] of expected){
  const itemPattern=new RegExp("\\{code:'"+code+"'[^\\n]+image:'([^']+)'");
  const match=inspirations.match(itemPattern);
  if(!match){errors.push(code+': inspiração não encontrada');continue;}
  const url=match[1];
  if(!url.includes('https://merlin-topper-assets.floot.app/_cdn/static/'))errors.push(code+': não usa host oficial de assets');
  if(!url.includes(file))errors.push(code+': cena premium esperada ausente');
}

const ursinho=inspirations.match(/\{code:'INSP-TOP-15'[^\n]+image:'([^']+)'/);
if(!ursinho)errors.push('INSP-TOP-15 ausente');
else if(ursinho[1].includes('festa-premium'))errors.push('INSP-TOP-15 foi alterado sem cena premium aprovada');

const featured="['INSP-TOP-13','INSP-TOP-16','INSP-TOP-17','INSP-TOP-14','INSP-TOP-10','INSP-TOP-15']";
if(!home.includes(featured))errors.push('ordem premium de destaques da Home foi alterada');

if(errors.length){
  console.error('V7.20 Premium Party Scenes: FALHOU ('+errors.length+')');
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V7.20 Premium Party Scenes: OK — 4 cenas premium integradas e destaques da Home protegidos.');
