import fs from 'node:fs';

const errors=[];
const project=fs.readFileSync('app/meu-projeto/page.tsx','utf8');
const header=fs.readFileSync('components/PublicTopperHeader.tsx','utf8');
const dock=fs.readFileSync('components/MerlinMobileDock.tsx','utf8');
const footer=fs.readFileSync('components/Footer.tsx','utf8');
const builder=fs.readFileSync('app/monte-seu-topo/page.tsx','utf8');

if(!project.includes("redirect('/monte-seu-topo')"))errors.push('Meu Projeto antigo precisa redirecionar para o configurador de topo');
for(const [name,source] of [['header',header],['dock',dock],['footer',footer]]){
  if(source.includes('/meu-projeto'))errors.push(`${name} ainda oferece caminho para Meu Projeto antigo`);
  if(!source.includes('/monte-seu-topo'))errors.push(`${name} não oferece caminho para Monte seu topo`);
}
if(!builder.includes('<TopperBuilder/>'))errors.push('destino substituto /monte-seu-topo não monta o configurador');

if(errors.length){console.error(`Topper Project Flow Contract: FALHOU (${errors.length})`);for(const error of errors)console.error('- '+error);process.exit(1);}
console.log('Topper Project Flow Contract: OK — antigo board aposentado e briefing consolidado em Monte seu topo.');
