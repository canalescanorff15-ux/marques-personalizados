export const ORDER_DRAFT_KEY='merlin_order_draft_v1';
export const ORDER_DRAFT_EVENT='merlin-order-draft-change';

export type OrderProductType='topo'|'caixinhas'|'lembrancinhas'|'chaveiros'|'adesivos'|'doces'|'kit'|'outro';

export type OrderDraft={
  version:1;
  productType:OrderProductType;
  level:string;
  inspirationSlug:string;
  eventDate:string;
  theme:string;
  celebrantName:string;
  celebrantAge:string;
  cakeSize:string;
  colors:string;
  reference:string;
  quantity:string;
  variant:string;
  format:string;
  dimensions:string;
  finish:string;
  frontBack:string;
  kitItems:string;
  description:string;
  notes:string;
};

export const EMPTY_ORDER_DRAFT:OrderDraft={
  version:1,
  productType:'topo',
  level:'essencial',
  inspirationSlug:'',
  eventDate:'',
  theme:'',
  celebrantName:'',
  celebrantAge:'',
  cakeSize:'',
  colors:'',
  reference:'',
  quantity:'',
  variant:'',
  format:'',
  dimensions:'',
  finish:'',
  frontBack:'',
  kitItems:'',
  description:'',
  notes:''
};

function trim(value:unknown,max:number){
  return typeof value==='string'?value.slice(0,max):'';
}

const allowed=new Set<OrderProductType>(['topo','caixinhas','lembrancinhas','chaveiros','adesivos','doces','kit','outro']);

function sanitize(value:unknown):OrderDraft|null{
  if(!value||typeof value!=='object')return null;
  const input=value as Record<string,unknown>;
  if(input.version!==1)return null;
  const type=typeof input.productType==='string'&&allowed.has(input.productType as OrderProductType)?input.productType as OrderProductType:'topo';
  return{
    version:1,
    productType:type,
    level:trim(input.level,80)||'essencial',
    inspirationSlug:trim(input.inspirationSlug,120),
    eventDate:trim(input.eventDate,20),
    theme:trim(input.theme,120),
    celebrantName:trim(input.celebrantName,120),
    celebrantAge:trim(input.celebrantAge,40),
    cakeSize:trim(input.cakeSize,80),
    colors:trim(input.colors,160),
    reference:trim(input.reference,220),
    quantity:trim(input.quantity,40),
    variant:trim(input.variant,120),
    format:trim(input.format,120),
    dimensions:trim(input.dimensions,80),
    finish:trim(input.finish,120),
    frontBack:trim(input.frontBack,80),
    kitItems:trim(input.kitItems,500),
    description:trim(input.description,800),
    notes:trim(input.notes,1200)
  };
}

export function readOrderDraft(){
  if(typeof window==='undefined')return null as OrderDraft|null;
  try{
    const raw=sessionStorage.getItem(ORDER_DRAFT_KEY);
    if(!raw)return null;
    const parsed=sanitize(JSON.parse(raw));
    if(!parsed)sessionStorage.removeItem(ORDER_DRAFT_KEY);
    return parsed;
  }catch{
    try{sessionStorage.removeItem(ORDER_DRAFT_KEY);}catch{}
    return null;
  }
}

export function hasOrderDraft(draft:OrderDraft|null){
  if(!draft)return false;
  return Boolean(
    draft.productType!=='topo'||
    draft.level!=='essencial'||
    draft.inspirationSlug||
    draft.eventDate||
    draft.theme||
    draft.celebrantName||
    draft.celebrantAge||
    draft.cakeSize||
    draft.colors||
    draft.reference||
    draft.quantity||
    draft.variant||
    draft.format||
    draft.dimensions||
    draft.finish||
    draft.frontBack||
    draft.kitItems||
    draft.description||
    draft.notes
  );
}

export function writeOrderDraft(next:OrderDraft){
  if(typeof window==='undefined')return {ok:false as const,draft:null};
  const safe=sanitize(next);
  if(!safe)return {ok:false as const,draft:null};
  try{
    sessionStorage.setItem(ORDER_DRAFT_KEY,JSON.stringify(safe));
    window.dispatchEvent(new CustomEvent(ORDER_DRAFT_EVENT,{detail:safe}));
    return {ok:true as const,draft:safe};
  }catch{
    return {ok:false as const,draft:safe};
  }
}

export function clearOrderDraft(){
  if(typeof window==='undefined')return;
  try{sessionStorage.removeItem(ORDER_DRAFT_KEY);}catch{}
  window.dispatchEvent(new CustomEvent(ORDER_DRAFT_EVENT,{detail:null}));
}
