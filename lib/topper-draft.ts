export const TOPPER_DRAFT_KEY='merlin_topper_draft_v1';
export const TOPPER_DRAFT_EVENT='merlin-topper-draft-change';

export type TopperDraft={
  version:1;
  level:string;
  inspirationSlug:string;
  eventDate:string;
  theme:string;
  celebrantName:string;
  celebrantAge:string;
  cakeSize:string;
  colors:string;
  reference:string;
  notes:string;
};

export const EMPTY_TOPPER_DRAFT:TopperDraft={
  version:1,
  level:'essencial',
  inspirationSlug:'',
  eventDate:'',
  theme:'',
  celebrantName:'',
  celebrantAge:'',
  cakeSize:'',
  colors:'',
  reference:'',
  notes:''
};

function trim(value:unknown,max:number){
  return typeof value==='string'?value.slice(0,max):'';
}

function sanitize(value:unknown):TopperDraft|null{
  if(!value||typeof value!=='object')return null;
  const input=value as Record<string,unknown>;
  if(input.version!==1)return null;
  return{
    version:1,
    level:trim(input.level,80)||'essencial',
    inspirationSlug:trim(input.inspirationSlug,120),
    eventDate:trim(input.eventDate,20),
    theme:trim(input.theme,120),
    celebrantName:trim(input.celebrantName,120),
    celebrantAge:trim(input.celebrantAge,40),
    cakeSize:trim(input.cakeSize,80),
    colors:trim(input.colors,160),
    reference:trim(input.reference,220),
    notes:trim(input.notes,800)
  };
}

export function readTopperDraft(){
  if(typeof window==='undefined')return null as TopperDraft|null;
  try{
    const raw=sessionStorage.getItem(TOPPER_DRAFT_KEY);
    if(!raw)return null;
    const parsed=sanitize(JSON.parse(raw));
    if(!parsed)sessionStorage.removeItem(TOPPER_DRAFT_KEY);
    return parsed;
  }catch{
    try{sessionStorage.removeItem(TOPPER_DRAFT_KEY);}catch{}
    return null;
  }
}

export function hasTopperDraft(draft:TopperDraft|null){
  if(!draft)return false;
  return Boolean(
    draft.level!=='essencial'||
    draft.inspirationSlug||
    draft.eventDate||
    draft.theme||
    draft.celebrantName||
    draft.celebrantAge||
    draft.cakeSize||
    draft.colors||
    draft.reference||
    draft.notes
  );
}

export function writeTopperDraft(next:TopperDraft){
  if(typeof window==='undefined')return {ok:false as const,draft:null};
  const safe=sanitize(next);
  if(!safe)return {ok:false as const,draft:null};
  try{
    sessionStorage.setItem(TOPPER_DRAFT_KEY,JSON.stringify(safe));
    window.dispatchEvent(new CustomEvent(TOPPER_DRAFT_EVENT,{detail:safe}));
    return {ok:true as const,draft:safe};
  }catch{
    return {ok:false as const,draft:safe};
  }
}

export function clearTopperDraft(){
  if(typeof window==='undefined')return;
  try{sessionStorage.removeItem(TOPPER_DRAFT_KEY);}catch{}
  window.dispatchEvent(new CustomEvent(TOPPER_DRAFT_EVENT,{detail:null}));
}
