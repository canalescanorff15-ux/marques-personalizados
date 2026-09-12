'use client';

import Link from 'next/link';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { CalendarDays, Check, CheckCircle2, MessageCircle, PackageCheck, Send, Sparkles } from 'lucide-react';
import { fetchJson } from '@/lib/client';
import { getAttribution } from '@/lib/attribution-client';
import type { InspirationModel } from '@/lib/inspirations';

const budgets=['Até R$ 150','R$ 150–300','R$ 300–500','R$ 500–800','Acima de R$ 800','Quero orientação'];
const pieceOptions=[
  {id:'Topo de bolo',label:'Topo de bolo'},
  {id:'Caixas personalizadas',label:'Caixas'},
  {id:'Lembrancinhas',label:'Lembrancinhas'},
  {id:'Tags e adesivos',label:'Tags / adesivos'},
  {id:'Displays e mesa',label:'Displays / mesa'},
  {id:'Kit completo',label:'Kit completo'},
] as const;

type Draft={
  name:string;
  whatsapp:string;
  event_date:string;
  theme:string;
  celebrant_name:string;
  celebrant_age:string;
  guest_count:string;
  budget_range:string;
  desired_categories:string[];
  notes:string;
};
type InquiryResponse={ok:boolean;persisted?:boolean;contingency?:boolean;whatsapp_url?:string};

function todayLocal(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
function makeRequestId(){if(globalThis.crypto?.randomUUID)return globalThis.crypto.randomUUID();const b=new Uint8Array(16);globalThis.crypto.getRandomValues(b);b[6]=(b[6]&15)|64;b[8]=(b[8]&63)|128;const h=[...b].map(x=>x.toString(16).padStart(2,'0')).join('');return `${h.slice(0,8)}-${h.slice(8,12)}-${h.slice(12,16)}-${h.slice(16,20)}-${h.slice(20)}`;}

function initialDraft(model:InspirationModel):Draft{
  return {name:'',whatsapp:'',event_date:'',theme:'',celebrant_name:'',celebrant_age:'',guest_count:'',budget_range:'',desired_categories:model.group==='Kits completos'?['Kit completo']:[model.category].filter(Boolean),notes:''};
}

export default function InspirationQuickQuote({model}:{model:InspirationModel}){
  const uid=useId().replace(/:/g,'');
  const storageKey=`merlin-inspiration-quote-${model.code.toLowerCase()}`;
  const requestId=useRef(makeRequestId());
  const [draft,setDraft]=useState<Draft>(()=>initialDraft(model));
  const [ready,setReady]=useState(false);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');
  const [done,setDone]=useState(false);
  const [persisted,setPersisted]=useState(true);
  const [saved,setSaved]=useState(false);

  useEffect(()=>{
    try{
      const raw=localStorage.getItem(storageKey);
      if(raw){
        const parsed=JSON.parse(raw) as Partial<Draft>;
        setDraft(current=>({...current,...parsed,desired_categories:Array.isArray(parsed.desired_categories)?parsed.desired_categories.slice(0,6):current.desired_categories}));
      }
    }catch{}
    setReady(true);
  },[storageKey]);

  useEffect(()=>{
    if(!ready||done)return;
    const timer=setTimeout(()=>{
      try{localStorage.setItem(storageKey,JSON.stringify(draft));setSaved(true);setTimeout(()=>setSaved(false),1000);}catch{}
    },250);
    return()=>clearTimeout(timer);
  },[draft,ready,done,storageKey]);

  const summary=useMemo(()=>[
    `Referência: ${model.code} — ${model.title}`,
    `Coleção: ${model.category}`,
    draft.theme?`Tema / adaptação: ${draft.theme}`:'',
    draft.celebrant_name?`Nome / homenageado: ${draft.celebrant_name}${draft.celebrant_age?` • ${draft.celebrant_age}`:''}`:'',
    draft.guest_count?`Convidados: ${draft.guest_count}`:'',
    draft.budget_range?`Faixa de investimento: ${draft.budget_range}`:'',
    draft.desired_categories.length?`Peças desejadas: ${draft.desired_categories.join(', ')}`:'',
    draft.notes?`Observações: ${draft.notes}`:'',
  ].filter(Boolean).join('\n'),[draft,model]);

  function field<K extends keyof Draft>(key:K,value:Draft[K]){setDraft(current=>({...current,[key]:value}));setError('');}
  function toggleCategory(value:string){setDraft(current=>{const selected=current.desired_categories.includes(value);const next=selected?current.desired_categories.filter(item=>item!==value):[...current.desired_categories,value].slice(0,6);return{...current,desired_categories:next};});}

  async function submit(e:React.FormEvent){
    e.preventDefault();
    if(loading)return;
    if(!draft.desired_categories.length){setError('Escolha pelo menos um tipo de peça para o orçamento.');return;}
    setLoading(true);setError('');
    try{
      const data=await fetchJson<InquiryResponse>('/api/inquiries',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({
        request_id:requestId.current,
        name:draft.name,
        whatsapp:draft.whatsapp,
        email:'',
        event_date:draft.event_date,
        product_id:'',
        product_name:'',
        category:model.category,
        message:summary,
        items:[],
        website:'',
        brief:{
          occasion:model.occasion,
          theme:draft.theme||model.title,
          celebrant_name:draft.celebrant_name,
          celebrant_age:draft.celebrant_age,
          guest_count:draft.guest_count?Math.max(1,Number(draft.guest_count)):null,
          budget_range:draft.budget_range,
          desired_categories:draft.desired_categories,
          source:'site',
          attribution:getAttribution(),
        },
      })},18000);
      setPersisted(data.persisted!==false);setDone(true);requestId.current=makeRequestId();
      try{localStorage.removeItem(storageKey);}catch{}
      if(data.whatsapp_url)window.location.assign(data.whatsapp_url);
    }catch(err){setError(err instanceof Error?err.message:'Não foi possível registrar o orçamento agora.');}
    finally{setLoading(false);}
  }

  if(done)return <div className="inspiration-quick-success" role="status" aria-live="polite"><CheckCircle2 size={25}/><div><strong>{persisted?'Pedido registrado com a referência certa.':'Atendimento em contingência.'}</strong><p>{persisted?'A Merlin recebeu seu briefing. Se o WhatsApp não abriu, você pode continuar por lá sem refazer as informações.':'Seu briefing continua salvo nesta tela. Continue pelo WhatsApp para não perder o atendimento.'}</p><Link href={`/monte-seu-kit?inspiracao=${encodeURIComponent(model.code)}`} className="text-action">Quero detalhar um kit completo</Link></div></div>;

  return <section className="inspiration-quick-quote" id="orcamento-rapido" aria-labelledby={`${uid}-title`}>
    <div className="inspiration-quick-head"><div><div className="eyebrow"><Sparkles size={14}/> Orçamento express desta inspiração</div><h2 id={`${uid}-title`}>Leve esta ideia para<br/><em>a sua festa.</em></h2></div><div className="inspiration-quick-ref"><span>{model.code}</span><strong>{model.title}</strong><small>Essa referência seguirá junto com o pedido.</small></div></div>
    <form onSubmit={submit} className="inspiration-quick-form">
      <div className="inspiration-quick-fields">
        <label>Seu nome<input required minLength={2} maxLength={120} autoComplete="name" value={draft.name} onChange={e=>field('name',e.target.value)}/></label>
        <label>WhatsApp<input required minLength={8} maxLength={30} inputMode="tel" autoComplete="tel" placeholder="(98) 99999-9999" value={draft.whatsapp} onChange={e=>field('whatsapp',e.target.value)}/></label>
        <label><span><CalendarDays size={14}/> Data do evento</span><input type="date" min={todayLocal()} value={draft.event_date} onChange={e=>field('event_date',e.target.value)}/></label>
        <label>Tema / adaptação<input maxLength={120} placeholder="Ex.: manter rosé, trocar para lilás..." value={draft.theme} onChange={e=>field('theme',e.target.value)}/></label>
        <label>Nome / homenageado<input maxLength={120} value={draft.celebrant_name} onChange={e=>field('celebrant_name',e.target.value)}/></label>
        <label>Idade<input maxLength={40} placeholder="Ex.: 29 anos" value={draft.celebrant_age} onChange={e=>field('celebrant_age',e.target.value)}/></label>
        <label>Convidados<input type="number" min="1" max="10000" inputMode="numeric" placeholder="Ex.: 40" value={draft.guest_count} onChange={e=>field('guest_count',e.target.value)}/></label>
        <label>Faixa de investimento<select value={draft.budget_range} onChange={e=>field('budget_range',e.target.value)}><option value="">Ainda não sei</option>{budgets.map(item=><option key={item}>{item}</option>)}</select></label>
      </div>
      <fieldset className="inspiration-piece-picker"><legend>O que você quer personalizar?</legend><p>Escolha uma ou mais opções. Você pode ajustar quantidades depois.</p><div>{pieceOptions.map(item=>{const active=draft.desired_categories.includes(item.id);return <button type="button" className={active?'active':''} aria-pressed={active} onClick={()=>toggleCategory(item.id)} key={item.id}>{active?<Check size={14}/>:<PackageCheck size={14}/>} {item.label}</button>;})}</div></fieldset>
      <label className="inspiration-quick-notes">Observações (opcional)<textarea maxLength={1200} placeholder="Cores, acabamento, quantidades aproximadas ou algum detalhe importante..." value={draft.notes} onChange={e=>field('notes',e.target.value)}/></label>
      <div className="inspiration-quick-summary"><div><span>Referência anexada ao briefing</span><strong>{model.code} — {model.title}</strong></div><small>{saved?'Rascunho salvo neste aparelho':'Seu rascunho é salvo automaticamente enquanto você preenche.'}</small></div>
      {error&&<div className="error" role="alert">{error}</div>}
      <div className="inspiration-quick-actions"><button className="btn btn-primary btn-luxury" type="submit" disabled={loading} aria-busy={loading}><Send size={16}/>{loading?'Registrando pedido...':'Enviar para orçamento'}</button><Link className="btn" href={`/monte-seu-kit?inspiracao=${encodeURIComponent(model.code)}`}><MessageCircle size={16}/> Prefiro montar um kit completo</Link></div>
      <small className="inspiration-quick-privacy">Ao enviar, seu pedido entra no atendimento da Merlin e pode continuar pelo WhatsApp. <Link href="/privacidade">Privacidade</Link>.</small>
    </form>
  </section>;
}
