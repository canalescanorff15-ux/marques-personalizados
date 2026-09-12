import fs from 'node:fs';

const errors=[];
const button=fs.readFileSync('components/InspirationCompareButton.tsx','utf8');
const dock=fs.readFileSync('components/InspirationCompareDock.tsx','utf8');
const workspace=fs.readFileSync('components/InspirationCompareWorkspace.tsx','utf8');
const page=fs.readFileSync('app/comparar-inspiracoes/page.tsx','utf8');
const cards=fs.readFileSync('components/InspirationShowcase.tsx','utf8');
const explorer=fs.readFileSync('components/InspirationExplorer.tsx','utf8');
const detail=fs.readFileSync('app/inspiracoes/[code]/page.tsx','utf8');
const kit=fs.readFileSync('components/KitBuilder.tsx','utf8');
const css=fs.readFileSync('app/premium.css','utf8');

for(const needle of ['merlin_inspiration_compare_v1','INSPIRATION_COMPARE_LIMIT=4','slice(0,INSPIRATION_COMPARE_LIMIT)','aria-pressed={selected}'])if(!button.includes(needle))errors.push(`Seleção comparável perdeu requisito: ${needle}`);
if(!dock.includes('validCodes.length>=2')||!dock.includes('href="/comparar-inspiracoes"'))errors.push('Dock precisa exigir duas referências antes de abrir o comparador.');
if(!workspace.includes('models.length<2')||!workspace.includes('inspirationPaletteCollections'))errors.push('Workspace precisa tratar seleção insuficiente e resolver nomes de paleta.');
if(!workspace.includes('/monte-seu-kit?inspiracoes=')||!kit.includes("params.get('inspiracoes')"))errors.push('Comparador precisa transportar múltiplas referências para o Monte seu Kit.');
for(const needle of ["label:'Peça / coleção'","label:'Ocasião'","label:'Estilo'","label:'Nível de composição'","label:'Paleta'"])if(!workspace.includes(needle))errors.push(`Comparação objetiva perdeu campo: ${needle}`);
if(!page.includes("robots:{index:false,follow:true}"))errors.push('Página de comparação baseada em estado local não deve ser indexada como landing pública.');
if(!cards.includes('InspirationCompareButton code={model.code} compact'))errors.push('Cards precisam permitir adicionar inspiração à comparação.');
if(!explorer.includes('<InspirationCompareDock/>'))errors.push('Catálogo precisa exibir o dock de comparação quando houver seleção.');
if(!detail.includes('<InspirationCompareButton code={model.code}/>')||!detail.includes('<InspirationCompareDock/>'))errors.push('Ficha individual precisa participar da jornada de comparação.');
if(!css.includes('/* V6.60 — comparador de inspirações e seleção guiada */'))errors.push('Bloco visual V6.60 ausente.');
if(workspace.match(/R\$\s*\d/))errors.push('Comparador de inspirações não pode inventar preço.');

if(errors.length){console.error(`Inspiration Compare Contract Check: ${errors.length} problema(s)`);for(const error of errors)console.error(`- ${error}`);process.exit(1);}
console.log('Inspiration Compare Contract Check: OK (seleção, limite, comparação e deep-link protegidos).');
