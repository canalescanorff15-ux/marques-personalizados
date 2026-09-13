export type QuotePlanningItem = {
  name: string;
  category?: string;
  price_cents: number | null;
  quantity: number;
  min_quantity?: number | null;
  production_time?: string;
};

export type BudgetFit = 'unknown'|'within'|'near-limit'|'above';
export type DeadlineState = 'unknown'|'comfortable'|'tight'|'urgent';

export function moneyBRL(cents:number){
  return new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Math.max(0,cents)/100);
}

export function estimateQuote(items:QuotePlanningItem[]){
  const priced=items.filter(item=>typeof item.price_cents==='number');
  const totalCents=priced.reduce((sum,item)=>sum+(item.price_cents||0)*Math.max(1,Math.floor(Number(item.quantity)||1)),0);
  return {totalCents,pricedCount:priced.length,totalCount:items.length,complete:items.length>0&&priced.length===items.length};
}

export function parseBudgetRange(value:string|undefined|null){
  const text=(value||'').trim();
  if(!text||/orienta|não sei|nao sei/i.test(text))return null;
  const numbers=[...text.matchAll(/(?:R\$\s*)?(\d[\d.]*)/g)].map(match=>Number(match[1].replace(/\./g,''))*100).filter(Number.isFinite);
  if(/até/i.test(text)&&numbers[0])return{min:0,max:numbers[0]};
  if(/acima/i.test(text)&&numbers[0])return{min:numbers[0],max:null as number|null};
  if(numbers.length>=2)return{min:Math.min(numbers[0],numbers[1]),max:Math.max(numbers[0],numbers[1])};
  if(numbers.length===1)return{min:0,max:numbers[0]};
  return null;
}

export function evaluateBudget(totalCents:number,budgetRange:string|undefined|null):{state:BudgetFit;label:string;detail:string}{
  const budget=parseBudgetRange(budgetRange);
  if(!budget||totalCents<=0)return{state:'unknown',label:'Faixa ainda não comparada',detail:'Defina uma faixa de investimento para comparar com a estimativa mínima.'};
  if(budget.max===null){
    if(totalCents>=budget.min)return{state:'within',label:'Compatível com a faixa',detail:`A estimativa mínima está em ${moneyBRL(totalCents)}.`};
    return{state:'within',label:'Abaixo da faixa informada',detail:`A estimativa mínima está em ${moneyBRL(totalCents)} e ainda há margem para personalização.`};
  }
  if(totalCents>budget.max)return{state:'above',label:'Acima da faixa inicial',detail:`A estimativa mínima está em ${moneyBRL(totalCents)}. Reduza quantidades, troque peças ou ajuste a faixa.`};
  if(totalCents>=budget.max*0.85)return{state:'near-limit',label:'Próximo do limite da faixa',detail:`A estimativa mínima está em ${moneyBRL(totalCents)}. Acabamentos extras podem ultrapassar o teto informado.`};
  return{state:'within',label:'Dentro da faixa informada',detail:`A estimativa mínima está em ${moneyBRL(totalCents)}, antes de acabamentos e frete.`};
}

export function productionWindow(text:string|undefined|null){
  const values=[...(text||'').matchAll(/(\d+)/g)].map(match=>Number(match[1])).filter(Number.isFinite);
  if(!values.length)return null;
  return{min:Math.max(1,Math.min(...values)),max:Math.max(...values)};
}

function localDate(value:string){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return null;
  const [year,month,day]=value.split('-').map(Number);const date=new Date(year,month-1,day,12,0,0,0);
  return Number.isNaN(date.getTime())?null:date;
}

export function businessDaysUntil(eventDate:string,from=new Date()){
  const target=localDate(eventDate);if(!target)return null;
  const cursor=new Date(from.getFullYear(),from.getMonth(),from.getDate(),12,0,0,0);
  if(target<=cursor)return 0;
  let count=0;while(cursor<target&&count<10000){cursor.setDate(cursor.getDate()+1);const day=cursor.getDay();if(day!==0&&day!==6)count++;}
  return count;
}

export function evaluateDeadline(items:QuotePlanningItem[],eventDate:string|undefined|null):{state:DeadlineState;label:string;detail:string;businessDays:number|null;requiredDays:number|null}{
  if(!eventDate)return{state:'unknown',label:'Data do evento não informada',detail:'Informe a data para comparar com os prazos iniciais de produção.',businessDays:null,requiredDays:null};
  const windows=items.map(item=>productionWindow(item.production_time)).filter(Boolean) as {min:number;max:number}[];
  const businessDays=businessDaysUntil(eventDate);
  if(businessDays===null||!windows.length)return{state:'unknown',label:'Prazo precisa de confirmação',detail:'A agenda final é sempre confirmada pelo ateliê.',businessDays,requiredDays:null};
  const required=Math.max(...windows.map(window=>window.max));
  const minimum=Math.max(...windows.map(window=>window.min));
  if(businessDays<minimum)return{state:'urgent',label:'Prazo muito curto',detail:`Restam cerca de ${businessDays} dia(s) útil(eis), abaixo do prazo inicial de algumas peças. Fale com a Merlin antes de fechar.`,businessDays,requiredDays:required};
  if(businessDays<required+3)return{state:'tight',label:'Prazo apertado',detail:`Restam cerca de ${businessDays} dia(s) útil(eis). A agenda e a complexidade da arte precisam ser confirmadas rapidamente.`,businessDays,requiredDays:required};
  return{state:'comfortable',label:'Prazo inicial confortável',detail:`Restam cerca de ${businessDays} dia(s) útil(eis). Ainda assim, a vaga de produção só é confirmada no atendimento.`,businessDays,requiredDays:required};
}

export function suggestProductQuantity(product:{name:string;category:string;min_quantity:number|null;tags?:string[]},guestCount:number|null|undefined){
  const min=Math.max(1,Number(product.min_quantity)||1);const guests=Math.max(0,Math.floor(Number(guestCount)||0));
  const text=`${product.name} ${product.category} ${(product.tags||[]).join(' ')}`.toLocaleLowerCase('pt-BR');
  if(!guests)return{quantity:min,label:min>1?`Mínimo ${min}`:'Quantidade inicial',reason:'Informe o número de convidados para receber uma sugestão quando este tipo de peça permitir.'};
  if(/caixa|lembranc|tag|adesivo/.test(text))return{quantity:Math.max(min,guests),label:`Sugestão para ${guests} convidados`,reason:'Referência de 1 unidade por convidado. Ajuste conforme sua distribuição real.'};
  if(/topper|forminha|wrapper/.test(text))return{quantity:min,label:`Mínimo ${min}`,reason:'Para doces e cupcakes, use a quantidade real de unidades que estarão na mesa.'};
  if(/topo|kit|display|bandeirola|plaquinha/.test(text))return{quantity:min,label:'Quantidade inicial',reason:'Normalmente esta peça é definida pela composição da mesa, não pelo número de convidados.'};
  return{quantity:min,label:min>1?`Mínimo ${min}`:'Quantidade inicial',reason:'A quantidade pode ser ajustada livremente no orçamento.'};
}

export function quoteReadiness(input:{itemCount:number;occasion?:string;theme?:string;eventDate?:string;guestCount?:number|null;budgetRange?:string}){
  const checks=[
    {key:'items',label:'Produtos selecionados',done:input.itemCount>0},
    {key:'occasion',label:'Ocasião definida',done:Boolean(input.occasion?.trim())},
    {key:'theme',label:'Tema ou referência',done:Boolean(input.theme?.trim())},
    {key:'date',label:'Data do evento',done:Boolean(input.eventDate?.trim())},
    {key:'guests',label:'Número de convidados',done:Boolean(input.guestCount&&input.guestCount>0)},
    {key:'budget',label:'Faixa de investimento',done:Boolean(input.budgetRange?.trim())},
  ];
  const done=checks.filter(check=>check.done).length;
  return{checks,done,total:checks.length,percent:Math.round((done/checks.length)*100)};
}
