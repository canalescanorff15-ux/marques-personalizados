import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');
const board=read('components/MerlinProjectBoard.tsx');
const page=read('app/meu-projeto/page.tsx');
const header=read('components/Header.tsx');
const dock=read('components/MerlinMobileDock.tsx');
const explorer=read('components/InspirationExplorer.tsx');
const compare=read('components/InspirationCompareWorkspace.tsx');
const css=read('app/premium.css');
const pkg=JSON.parse(read('package.json'));
const ci=read('.github/workflows/ci.yml');

for(const needle of ['merlin_project_shortlist_v1','MERLIN_PROJECT_LIMIT=6','readInspirationFavorites','readInspirationCompare','localStorage.setItem(MERLIN_PROJECT_KEY','MERLIN_PROJECT_EVENT'])if(!board.includes(needle))errors.push(`Meu Projeto perdeu estado local protegido: ${needle}`);
if(!board.includes('/monte-seu-kit?inspiracoes=')||!board.includes('selectedModels.map(model=>model.code)'))errors.push('Meu Projeto precisa transportar a seleção final para o Monte seu Kit.');
if(!board.includes('navigator.share')||!board.includes('navigator.clipboard.writeText'))errors.push('Meu Projeto precisa oferecer resumo compartilhável/copiável.');
if(!board.includes('whatsappUrl(whatsapp,summary)'))errors.push('Meu Projeto perdeu handoff contextual para WhatsApp.');
if(!board.includes('somente no navegador deste aparelho'))errors.push('Meu Projeto precisa explicar que o estado local fica no aparelho.');
if(!page.includes('<MerlinProjectBoard whatsapp={settings.whatsapp_number}/>'))errors.push('Rota /meu-projeto não monta o painel com WhatsApp configurado.');
if(!page.includes("robots:{index:false,follow:true}"))errors.push('Meu Projeto depende de estado local e não deve ser indexado como landing pública.');
for(const [name,text] of [['header',header],['dock',dock],['explorer',explorer],['compare',compare]])if(!text.includes('/meu-projeto'))errors.push(`${name} perdeu caminho para /meu-projeto`);
if(!css.includes('/* V6.61 — Meu Projeto Merlin: shortlist, resumo e handoff para pedido */'))errors.push('Bloco visual V6.61 ausente.');
if(pkg.scripts?.['check:project-board']!=='node scripts/project-board-contract-check.mjs')errors.push('package.json não expõe check:project-board.');
if(!ci.includes('npm run check:project-board'))errors.push('CI não executa check:project-board.');
if(board.match(/R\$\s*\d/))errors.push('Meu Projeto não pode inventar preço.');

if(errors.length){console.error(`Project Board Contract: FALHOU (${errors.length})`);for(const error of errors)console.error(`- ${error}`);process.exit(1);}
console.log('Project Board Contract: OK — shortlist local, resumo, privacidade e handoff para kit/WhatsApp protegidos.');
