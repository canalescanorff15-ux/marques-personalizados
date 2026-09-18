import fs from 'node:fs';

const errors=[];
const draft='lib/topper-draft.ts';
const header='components/PublicTopperHeader.tsx';
const builder='components/TopperBuilder.tsx';

if(!fs.existsSync(draft))errors.push('helper de rascunho do topo ausente');
else{
  const source=fs.readFileSync(draft,'utf8');
  for(const token of ['sessionStorage','version:1','TOPPER_DRAFT_EVENT','clearTopperDraft','readTopperDraft','writeTopperDraft'])if(!source.includes(token))errors.push('rascunho sem requisito: '+token);
  for(const forbidden of ['whatsapp','email','client_name','customer_name'])if(source.includes(forbidden))errors.push('rascunho não pode persistir dado de contato: '+forbidden);
}
if(fs.existsSync(header)){
  const source=fs.readFileSync(header,'utf8');
  if(!source.includes('readTopperDraft'))errors.push('cabeçalho não lê rascunho do topo');
  if(!source.includes('TOPPER_DRAFT_EVENT'))errors.push('cabeçalho não sincroniza contador do pedido');
  if(!source.includes('0/1')&&!source.includes('orderCount'))errors.push('cabeçalho não expõe contador 0/1 do pedido');
}
if(fs.existsSync(builder)){
  const source=fs.readFileSync(builder,'utf8');
  if(!source.includes('readTopperDraft'))errors.push('builder não recupera rascunho');
  if(!source.includes('writeTopperDraft'))errors.push('builder não persiste rascunho');
  if(!source.includes('clearTopperDraft'))errors.push('builder não limpa rascunho após persistência');
  if(!source.includes('data.persisted===true'))errors.push('builder não condiciona limpeza a persisted:true');
  if(!source.includes('persisted:false')&&!source.includes('contingency'))errors.push('builder não trata contingência persisted:false');
  if(!source.includes('navigator.clipboard'))errors.push('builder não oferece cópia do resumo na contingência');
}

if(errors.length){
  console.error('Topper Draft Contract: FALHOU ('+errors.length+')');
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('Topper Draft Contract: OK — rascunho de sessão, contador 0/1 e contingência protegidos.');
