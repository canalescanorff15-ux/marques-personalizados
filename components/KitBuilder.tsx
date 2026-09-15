'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, CheckCircle2, Clipboard, Gift, Heart, Minus, PackagePlus, Plus, RotateCcw, Save, Send, Sparkles, WandSparkles } from 'lucide-react';
import { fetchJson } from '@/lib/client';
import { getAttribution } from '@/lib/attribution-client';
import { inspirationModels, inspirationSearchText, type InspirationModel } from '@/lib/inspirations';
import { emptyKitQuantities, kitPieceDefinitions, kitPresets, kitSummaryLines, quantitiesForPreset, suggestedPresetFor, type KitPreset } from '@/lib/kit-builder';
import { readInspirationFavorites } from './InspirationFavoriteButton';
import InspirationArtwork from './InspirationArtwork';

const DRAFT_KEY='kf-kit-builder-v1';
const occasions=['Aniversário infantil','Aniversário adulto','1 ano','15 anos','Chá / Revelação','Batizado','Casamento','Formatura','Evento corporativo','Outro'];
const budgets=['Até R$ 150','R$ 150–300','R$ 300–500','R$ 500–800','Acima de R$ 800','Quero orientação'];

type Draft={
  preset:KitPreset['slug'];
  quantities:Record<string,number>;
  inspirationCodes:string[];
  brief:{occasion:string;theme:string;celebrant_name:string;celebrant_age:string;guest_count:string;budget_range:string};
  contact:{name:string;whatsapp:string;email:string;event_date:string;notes:string};
};

type InquiryResponse={ok:boolean;persisted?:boolean;contingency?:boolean;whatsapp_url?:string};

function todayLocal(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
function makeRequestId(){if(globalThis.crypto?.randomUUID)return globalThis.crypto.randomUUID();const b=new Uint8Array(16);globalThis.crypto.getRandomValues(b);b[6]=(b[6]&15)|64;b[8]=(b[8]&63)|128;const h=[...b].map(x=>x.toString(16).padStart(2,'0')).join('');return `${h.slice(0,8)}-${h.slice(8,12)}-${h.slice(12,16)}-${h.slice(16,20)}-${h.slice(20)}`;}
function normalize(value:string){return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR').trim();}
function clamp(value:number,max:number){return Math.max(0,Math.min(max,Math.floor(Number.isFinite(value)?value:0)));}
async function copyText(value:string){if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(value);return;}const area=document.createElement('textarea');area.value=value;area.setAttribute('readonly','');area.style.position='fixed';area.style.opacity='0';document.body.appendChild(area);area.select();document.execCommand('copy');area.remove();}

export default function KitBuilder(){
  const [preset,setPreset]=useState<KitPreset['slug']>('essencial');
  const [quantities,setQuantities]=useState<Record<string,number>>(()=>quantitiesForPreset('essencial'));
  const [inspirationCodes,setInspirationCodes]=useState<string[]>([]);
  const [brief,setBrief]=useState({occasion:'',theme:'',celebrant_name:'',celebrant_age:'',guest_count:'',budget_range:''});
  const [contact,setContact]=useState({name:'',whatsapp:'',email:'',event_date:'',notes:''});
  const [ready,setReady]=useState(false),[draftSaved,setDraftSaved]=useState(false),[loading,setLoading]=useState(false),[error,setError]=useState(''),[done,setDone]=useState(false),[persisted,setPersisted]=useState(true),[shareStatus,setShareStatus]=useState('');
  const requestId=useRef(makeRequestId());

  useEffect(()=>{
    let restored=false;
    try{
      const raw=localStorage.getItem(DRAFT_KEY);
      if(raw){const parsed=JSON.parse(raw) as Partial<Draft>;if(parsed&&typeof parsed==='object'){
        if(kitPresets.some(item=>item.slug===parsed.preset))setPreset(parsed.preset as KitPreset['slug']);
        if(parsed.quantities&&typeof parsed.quantities==='object')setQuantities({...emptyKitQuantities(),...parsed.quantities});
        if(Array.isArray(parsed.inspirationCodes))setInspirationCodes(parsed.inspirationCodes.filter(code=>inspirationModels.some(model=>model.code===code)).slice(0,6));
        if(parsed.brief&&typeof parsed.brief==='object')setBrief(current=>({...current,...parsed.brief}));
        if(parsed.contact&&typeof parsed.contact==='object')setContact(current=>({...current,...parsed.contact}));
        restored=true;
      }}
    }catch{}
    const params=new URLSearchParams(location.search);
    const occasion=params.get('occasion')||params.get('ocasiao')||'';const theme=params.get('theme')||params.get('tema')||'';const budget=params.get('budget')||params.get('orcamento')||'';
    if(occasion||theme||budget)setBrief(current=>({...current,occasion:occasion||current.occasion,theme:theme||current.theme,budget_range:budget||current.budget_range}));
    if(params.get('usar_salvos')==='1'){
      const saved=readInspirationFavorites().filter(code=>inspirationModels.some(model=>model.code===code)).slice(0,6);
      if(saved.length)setInspirationCodes(current=>[...new Set([...current,...saved])].slice(0,6));
    }
    const directCodes=[params.get('inspiracao')||'',...(params.get('inspiracoes')||'').split(',')]
      .map(code=>code.trim().toUpperCase())
      .filter(code=>inspirationModels.some(model=>model.code===code));
    if(directCodes.length)setInspirationCodes(current=>[...new Set([...current,...directCodes])].slice(0,6));
    if(!restored){const requested=params.get('kit');if(requested&&kitPresets.some(item=>item.slug===requested)){setPreset(requested as KitPreset['slug']);setQuantities(quantitiesForPreset(requested as KitPreset['slug']));}}
    setReady(true);
  },[]);

  useEffect(()=>{if(!ready)return;const timer=setTimeout(()=>{try{const draft:Draft={preset,quantities,inspirationCodes,brief,contact};localStorage.setItem(DRAFT_KEY,JSON.stringify(draft));setDraftSaved(true);setTimeout(()=>setDraftSaved(false),1200);}catch{}},250);return()=>clearTimeout(timer);},[ready,preset,quantities,inspirationCodes,brief,contact]);

  const activePieces=useMemo(()=>kitPieceDefinitions.flatMap(piece=>{const quantity=clamp(Number(quantities[piece.id])||0,piece.max);return quantity?[{...piece,quantity}]:[];}),[quantities]);
  const totalUnits=activePieces.reduce((sum,piece)=>sum+piece.quantity,0);
  const desiredCategories=[...new Set(activePieces.map(piece=>piece.category))].slice(0,12);
  const selectedInspirations=useMemo(()=>inspirationCodes.map(code=>inspirationModels.find(model=>model.code===code)).filter((model):model is InspirationModel=>Boolean(model)),[inspirationCodes]);
  const recommendation=useMemo(()=>suggestedPresetFor(Math.max(0,Number(brief.guest_count)||0),brief.budget_range),[brief.guest_count,brief.budget_range]);
  const suggestedInspirations=useMemo(()=>{
    const terms=[brief.occasion,brief.theme].map(normalize).filter(Boolean);
    const selected=new Set(inspirationCodes);
    const ranked=inspirationModels.map(model=>({model,score:terms.reduce((sum,term)=>sum+(inspirationSearchText(model).includes(term)?5:0),0)+(desiredCategories.some(category=>normalize(model.category).includes(normalize(category).split(' ')[0]))?1:0)})).filter(row=>!selected.has(row.model.code)).sort((a,b)=>b.score-a.score||a.model.code.localeCompare(b.model.code));
    const matching=ranked.filter(row=>row.score>0);return (matching.length?matching:ranked).slice(0,8).map(row=>row.model);
  },[brief.occasion,brief.theme,inspirationCodes,desiredCategories.join('|')]);

  const compositionText=useMemo(()=>{
    const lines=kitSummaryLines(quantities);const inspirationLines=selectedInspirations.map(model=>`${model.code} — ${model.title}`);
    return [`Kit personalizado Merlin`,...lines.length?['','Composição:',...lines.map(line=>`- ${line}`)]:[],...inspirationLines.length?['','Inspirações escolhidas:',...inspirationLines.map(line=>`- ${line}`)]:[],brief.occasion?`\nOcasião: ${brief.occasion}`:'',brief.theme?`Tema: ${brief.theme}`:'',brief.celebrant_name?`Nome / homenageado: ${brief.celebrant_name}${brief.celebrant_age?` • ${brief.celebrant_age}`:''}`:'',brief.guest_count?`Convidados: ${brief.guest_count}`:'',brief.budget_range?`Faixa de investimento: ${brief.budget_range}`:'',contact.notes?`\nObservações: ${contact.notes}`:''].filter(Boolean).join('\n');
  },[quantities,selectedInspirations,brief,contact.notes]);

  function applyPreset(slug:KitPreset['slug']){setPreset(slug);setQuantities(quantitiesForPreset(slug));setError('');}
  function setQuantity(id:string,value:number){const piece=kitPieceDefinitions.find(item=>item.id===id);if(!piece)return;setQuantities(current=>({...current,[id]:clamp(value,piece.max)}));}
  function toggleInspiration(code:string){setInspirationCodes(current=>current.includes(code)?current.filter(item=>item!==code):current.length>=6?current:[...current,code]);}
  function clearDraft(){setPreset('essencial');setQuantities(quantitiesForPreset('essencial'));setInspirationCodes([]);setBrief({occasion:'',theme:'',celebrant_name:'',celebrant_age:'',guest_count:'',budget_range:''});setContact({name:'',whatsapp:'',email:'',event_date:'',notes:''});setError('');setDone(false);try{localStorage.removeItem(DRAFT_KEY);}catch{}}
  async function shareSummary(){try{if(navigator.share){await navigator.share({title:'Meu kit Merlin Encantos em Papel',text:compositionText});setShareStatus('Resumo compartilhado');}else{await copyText(compositionText);setShareStatus('Resumo copiado');}}catch{setShareStatus('Não foi possível compartilhar');}setTimeout(()=>setShareStatus(''),2200);}
  async function submit(e:React.FormEvent){e.preventDefault();if(loading)return;if(!activePieces.length){setError('Adicione pelo menos uma peça ao seu kit.');document.getElementById('pecas-do-kit')?.scrollIntoView({behavior:'smooth'});return;}setLoading(true);setError('');try{
      const data=await fetchJson<InquiryResponse>('/api/inquiries',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({request_id:requestId.current,name:contact.name,whatsapp:contact.whatsapp,email:contact.email,event_date:contact.event_date,product_id:'',product_name:'',category:'',message:compositionText,items:[],website:'',brief:{occasion:brief.occasion,theme:brief.theme,celebrant_name:brief.celebrant_name,celebrant_age:brief.celebrant_age,guest_count:brief.guest_count?Math.max(1,Number(brief.guest_count)):null,budget_range:brief.budget_range,desired_categories:desiredCategories,source:'concierge',attribution:getAttribution()}})},18000);
      setPersisted(data.persisted!==false);setDone(true);requestId.current=makeRequestId();try{localStorage.removeItem(DRAFT_KEY);}catch{}if(data.whatsapp_url)window.location.assign(data.whatsapp_url);
    }catch(error){setError(error instanceof Error?error.message:'Não foi possível registrar seu kit.');}finally{setLoading(false);}}

  return <div className="kit-builder-shell">
    <section className="kit-builder-step kit-presets" aria-labelledby="kit-presets-title"><div className="kit-step-heading"><span>01</span><div><small>COMECE PRONTO OU DO ZERO</small><h2 id="kit-presets-title">Escolha uma base para o seu kit.</h2><p>As quantidades são sugestões. Você pode alterar cada peça livremente antes de pedir o orçamento.</p></div></div><div className="kit-preset-grid">{kitPresets.map(item=><button type="button" className={preset===item.slug?'active':''} onClick={()=>applyPreset(item.slug)} key={item.slug}><small>{item.eyebrow}</small><strong>{item.title}</strong><p>{item.description}</p><span>{item.idealFor}</span>{preset===item.slug&&<i><Check size={14}/> selecionado</i>}</button>)}</div>{recommendation!==preset&&<div className="kit-recommendation"><WandSparkles size={17}/><span>Pelo número de convidados e investimento, sugerimos <strong>{kitPresets.find(item=>item.slug===recommendation)?.title}</strong>.</span><button type="button" onClick={()=>applyPreset(recommendation)}>Aplicar sugestão</button></div>}</section>

    <section className="kit-builder-step" id="pecas-do-kit" aria-labelledby="kit-pieces-title"><div className="kit-step-heading"><span>02</span><div><small>MONTE A COMPOSIÇÃO</small><h2 id="kit-pieces-title">Ajuste peça por peça.</h2><p>Zere a quantidade para remover uma peça. O rascunho fica salvo automaticamente neste aparelho.</p></div><div className="kit-draft-status"><Save size={14}/>{draftSaved?'Rascunho atualizado':'Salvamento automático'}</div></div><div className="kit-piece-grid">{kitPieceDefinitions.map(piece=>{const quantity=clamp(Number(quantities[piece.id])||0,piece.max);return <article className={quantity>0?'active':''} key={piece.id}><div><small>{piece.category}</small><strong>{piece.label}</strong><p>{piece.description}</p></div><div className="kit-quantity" aria-label={`Quantidade de ${piece.label}`}><button type="button" onClick={()=>setQuantity(piece.id,quantity-piece.step)} disabled={quantity===0} aria-label={`Diminuir ${piece.label}`}><Minus size={15}/></button><input inputMode="numeric" value={quantity} onChange={e=>setQuantity(piece.id,Number(e.target.value)||0)} aria-label={`Quantidade de ${piece.label}`}/><button type="button" onClick={()=>setQuantity(piece.id,quantity+piece.step)} disabled={quantity>=piece.max} aria-label={`Aumentar ${piece.label}`}><Plus size={15}/></button><span>{piece.unit}</span></div></article>;})}</div></section>

    <section className="kit-builder-step" aria-labelledby="kit-inspiration-title"><div className="kit-step-heading"><span>03</span><div><small>REFERÊNCIA VISUAL</small><h2 id="kit-inspiration-title">Misture até 6 inspirações.</h2><p>Use seus favoritos ou selecione ideias sugeridas. A Merlin adapta tema, paleta e peças — não é uma cópia obrigatória.</p></div></div>{selectedInspirations.length>0&&<div className="kit-selected-inspirations">{selectedInspirations.map(model=><button type="button" onClick={()=>toggleInspiration(model.code)} key={model.code}><span className={`kit-inspiration-thumb palette-${model.palette}`}><InspirationArtwork model={model}/></span><span className="kit-inspiration-selected-copy"><small>{model.code} • selecionada</small><strong>{model.title}</strong><em>{model.style}</em></span><Minus size={14}/></button>)}</div>}<div className="kit-inspiration-suggestions">{suggestedInspirations.map(model=><button type="button" onClick={()=>toggleInspiration(model.code)} disabled={!inspirationCodes.includes(model.code)&&inspirationCodes.length>=6} key={model.code}><span className={`kit-inspiration-thumb palette-${model.palette}`}><InspirationArtwork model={model}/></span><span><small>{model.code} • {model.tier}</small><strong>{model.title}</strong><em>{model.style}</em></span><Plus size={15}/></button>)}</div><a className="kit-more-inspirations" href="/inspiracoes">Ver as 128 inspirações do catálogo <Sparkles size={15}/></a></section>

    <section className="kit-builder-step" aria-labelledby="kit-brief-title"><div className="kit-step-heading"><span>04</span><div><small>BRIEFING DA FESTA</small><h2 id="kit-brief-title">Agora conte para quem e para quando.</h2><p>Essas informações chegam junto com a composição e evitam perguntas repetidas no início do atendimento.</p></div></div><div className="kit-brief-grid"><label>Ocasião<select value={brief.occasion} onChange={e=>setBrief(current=>({...current,occasion:e.target.value}))}><option value="">Selecione</option>{occasions.map(item=><option key={item}>{item}</option>)}</select></label><label>Tema<input maxLength={120} placeholder="Ex.: Stitch rosa, futebol, floral..." value={brief.theme} onChange={e=>setBrief(current=>({...current,theme:e.target.value}))}/></label><label>Nome / homenageado<input maxLength={120} value={brief.celebrant_name} onChange={e=>setBrief(current=>({...current,celebrant_name:e.target.value}))}/></label><label>Idade<input maxLength={40} placeholder="Ex.: 5 anos" value={brief.celebrant_age} onChange={e=>setBrief(current=>({...current,celebrant_age:e.target.value}))}/></label><label>Convidados<input type="number" min="1" max="10000" placeholder="Ex.: 30" value={brief.guest_count} onChange={e=>setBrief(current=>({...current,guest_count:e.target.value}))}/></label><label>Faixa de investimento<select value={brief.budget_range} onChange={e=>setBrief(current=>({...current,budget_range:e.target.value}))}><option value="">Ainda não defini</option>{budgets.map(item=><option key={item}>{item}</option>)}</select></label></div></section>

    <section className="kit-builder-final" aria-labelledby="kit-summary-title"><div className="kit-summary-panel"><div className="kit-step-heading"><span>05</span><div><small>RESUMO DO PEDIDO</small><h2 id="kit-summary-title">Seu kit está tomando forma.</h2></div></div><div className="kit-summary-stats"><span><strong>{activePieces.length}</strong> tipos de peça</span><span><strong>{totalUnits}</strong> unidades / conjuntos</span><span><strong>{selectedInspirations.length}</strong> inspirações</span></div><div className="kit-summary-lines">{activePieces.length?activePieces.map(piece=><div key={piece.id}><span>{piece.label}</span><strong>{piece.quantity} {piece.unit}</strong></div>):<p>Nenhuma peça selecionada.</p>}</div>{selectedInspirations.length>0&&<div className="kit-summary-inspirations"><small>REFERÊNCIAS</small>{selectedInspirations.map(model=><span key={model.code}><b>{model.code}</b>{model.title}</span>)}</div>}<button type="button" className="btn kit-copy-summary" onClick={shareSummary}><Clipboard size={15}/>{shareStatus||'Compartilhar resumo'}</button></div>

      <form className="kit-contact-panel" onSubmit={submit}><div><small>ENVIAR PARA ATENDIMENTO</small><h3>Receba o orçamento pelo WhatsApp.</h3><p>O pedido também fica registrado no CRM da Merlin para o atendimento não se perder.</p></div><label>Seu nome<input autoComplete="name" minLength={2} maxLength={120} required value={contact.name} onChange={e=>setContact(current=>({...current,name:e.target.value}))}/></label><label>WhatsApp<input autoComplete="tel" inputMode="tel" minLength={8} maxLength={30} placeholder="(98) 99999-9999" required value={contact.whatsapp} onChange={e=>setContact(current=>({...current,whatsapp:e.target.value}))}/></label><div className="kit-contact-two"><label>E-mail (opcional)<input type="email" autoComplete="email" maxLength={180} value={contact.email} onChange={e=>setContact(current=>({...current,email:e.target.value}))}/></label><label>Data do evento<input type="date" min={todayLocal()} value={contact.event_date} onChange={e=>setContact(current=>({...current,event_date:e.target.value}))}/></label></div><label>Observações (opcional)<textarea maxLength={1200} placeholder="Cores, acabamento, material, referência própria ou outra informação..." value={contact.notes} onChange={e=>setContact(current=>({...current,notes:e.target.value}))}/></label>{error&&<div className="error" role="alert">{error}</div>}{done&&<div className="kit-success" role="status"><CheckCircle2 size={18}/><span>{persisted?'Pedido registrado. Se o WhatsApp não abriu automaticamente, você pode continuar por lá normalmente.':'Atendimento em contingência: continue pelo WhatsApp; seu rascunho foi preservado.'}</span></div>}<button className="btn btn-primary kit-submit" type="submit" disabled={loading}><Send size={16}/>{loading?'Registrando kit...':'Enviar kit para orçamento'}</button><button className="kit-reset" type="button" onClick={clearDraft}><RotateCcw size={14}/> Começar outro kit</button></form>
    </section>
  </div>;
}