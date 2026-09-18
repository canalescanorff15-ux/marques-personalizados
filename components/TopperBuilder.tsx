'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2, Copy, Layers3, MessageCircle, Send, Sparkles, Trash2 } from 'lucide-react';
import { fetchJson } from '@/lib/client';
import { getAttribution } from '@/lib/attribution-client';
import { topperLevels } from '@/lib/topper-catalog';
import { topperInspirationBySlug } from '@/lib/topper-inspirations';
import { clearTopperDraft, readTopperDraft, writeTopperDraft } from '@/lib/topper-draft';
import TopperLevelVisual from '@/components/TopperLevelVisual';

type InquiryResponse={ok:boolean;persisted?:boolean;whatsapp_url?:string};
type Contingency={message:string;whatsappUrl:string}|null;

function makeRequestId(){if(globalThis.crypto?.randomUUID)return globalThis.crypto.randomUUID();const b=new Uint8Array(16);globalThis.crypto.getRandomValues(b);b[6]=(b[6]&15)|64;b[8]=(b[8]&63)|128;const h=[...b].map(x=>x.toString(16).padStart(2,'0')).join('');return `${h.slice(0,8)}-${h.slice(8,12)}-${h.slice(12,16)}-${h.slice(16,20)}-${h.slice(20)}`;}
function todayLocal(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}

export default function TopperBuilder(){
  const [level,setLevel]=useState('essencial');
  const [inspirationSlug,setInspirationSlug]=useState('');
  const [form,setForm]=useState({name:'',whatsapp:'',email:'',event_date:'',theme:'',celebrant_name:'',celebrant_age:'',cake_size:'',colors:'',reference:'',notes:''});
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');
  const [done,setDone]=useState(false);
  const [draftReady,setDraftReady]=useState(false);
  const [draftWarning,setDraftWarning]=useState('');
  const [contingency,setContingency]=useState<Contingency>(null);
  const [copyStatus,setCopyStatus]=useState('');
  const requestId=useRef(makeRequestId());

  const selected=useMemo(()=>topperLevels.find(item=>item.slug===level)||topperLevels[0],[level]);
  const selectedInspiration=useMemo(()=>topperInspirationBySlug(inspirationSlug),[inspirationSlug]);

  useEffect(()=>{
    const draft=readTopperDraft();
    let nextLevel=draft&&topperLevels.some(item=>item.slug===draft.level)?draft.level:'essencial';
    let nextInspiration=draft?.inspirationSlug&&topperInspirationBySlug(draft.inspirationSlug)?draft.inspirationSlug:'';
    const next={
      event_date:draft?.eventDate||'',
      theme:draft?.theme||'',
      celebrant_name:draft?.celebrantName||'',
      celebrant_age:draft?.celebrantAge||'',
      cake_size:draft?.cakeSize||'',
      colors:draft?.colors||'',
      reference:draft?.reference||'',
      notes:draft?.notes||''
    };

    const params=new URLSearchParams(location.search);
    const requested=params.get('nivel');
    const validRequested=Boolean(requested&&topperLevels.some(item=>item.slug===requested));
    if(validRequested&&requested)nextLevel=requested;

    const inspiration=params.get('inspiracao');
    const picked=inspiration?topperInspirationBySlug(inspiration):null;
    if(picked){
      nextInspiration=picked.slug;
      if(!validRequested)nextLevel=picked.levelSlug;
      next.theme=params.get('tema')||picked.title;
      next.reference='Quero adaptar uma inspiração do site';
    }else{
      const theme=params.get('tema');
      if(theme)next.theme=theme;
    }

    setLevel(nextLevel);
    setInspirationSlug(nextInspiration);
    setForm(current=>({...current,...next}));
    setDraftReady(true);
  },[]);

  useEffect(()=>{
    if(!draftReady)return;
    const result=writeTopperDraft({
      version:1,
      level,
      inspirationSlug,
      eventDate:form.event_date,
      theme:form.theme,
      celebrantName:form.celebrant_name,
      celebrantAge:form.celebrant_age,
      cakeSize:form.cake_size,
      colors:form.colors,
      reference:form.reference,
      notes:form.notes
    });
    setDraftWarning(result.ok?'':'Não foi possível salvar o rascunho nesta sessão. Você ainda pode continuar e enviar o pedido normalmente.');
  },[draftReady,level,inspirationSlug,form.event_date,form.theme,form.celebrant_name,form.celebrant_age,form.cake_size,form.colors,form.reference,form.notes]);

  function set(key:keyof typeof form,value:string){
    setForm(current=>({...current,[key]:value}));
    if(contingency)setContingency(null);
  }

  function resetDraft(){
    clearTopperDraft();
    setLevel('essencial');
    setInspirationSlug('');
    setForm(current=>({...current,event_date:'',theme:'',celebrant_name:'',celebrant_age:'',cake_size:'',colors:'',reference:'',notes:''}));
    setDraftWarning('');
    setContingency(null);
    setCopyStatus('');
  }

  const summary=useMemo(()=>[
    'Pedido de topo de bolo personalizado',
    `Modelo: ${selected.code} — ${selected.name}`,
    selectedInspiration&&`Inspiração: ${selectedInspiration.code} — ${selectedInspiration.title}`,
    form.theme&&`Tema: ${form.theme}`,
    form.celebrant_name&&`Nome: ${form.celebrant_name}`,
    form.celebrant_age&&`Idade: ${form.celebrant_age}`,
    form.cake_size&&`Tamanho/diâmetro do bolo: ${form.cake_size}`,
    form.colors&&`Cores: ${form.colors}`,
    form.reference&&`Referência própria: ${form.reference}`,
    form.notes&&`Observações: ${form.notes}`
  ].filter(Boolean).join('\n'),[selected,selectedInspiration,form]);

  async function copySummary(){
    try{
      await navigator.clipboard.writeText(summary);
      setCopyStatus('Resumo copiado.');
    }catch{
      setCopyStatus('Não foi possível copiar automaticamente. Selecione o resumo e copie manualmente.');
    }
  }

  async function submit(e:React.FormEvent){
    e.preventDefault();
    if(loading)return;
    setLoading(true);
    setError('');
    setContingency(null);
    setCopyStatus('');

    try{
      const data=await fetchJson<InquiryResponse>('/api/inquiries',{
        method:'POST',headers:{'content-type':'application/json'},
        body:JSON.stringify({
          request_id:requestId.current,
          name:form.name,whatsapp:form.whatsapp,email:form.email,event_date:form.event_date,
          product_id:'',product_name:selected.name,category:'Topos de bolo',message:summary,items:[],website:'',
          brief:{occasion:'Topo de bolo',theme:form.theme,celebrant_name:form.celebrant_name,celebrant_age:form.celebrant_age,guest_count:null,budget_range:'',desired_categories:['Topos de bolo'],source:'site',attribution:getAttribution()}
        })
      },18000);

      if(data.persisted===true){
        clearTopperDraft();
        setDone(true);
        requestId.current=makeRequestId();
        if(data.whatsapp_url)window.location.assign(data.whatsapp_url);
      }else{
        setContingency({
          message:'Seu pedido não foi confirmado como registrado no sistema. O rascunho foi preservado para você tentar novamente ou continuar pelo WhatsApp.',
          whatsappUrl:data.whatsapp_url||''
        });
      }
    }catch(err){
      setError(err instanceof Error?err.message:'Não foi possível enviar o pedido.');
    }finally{
      setLoading(false);
    }
  }

  if(done)return <div className="quote-success" role="status"><CheckCircle2 size={28}/><div><strong>Pedido registrado.</strong><p>Seu briefing foi registrado com sucesso. Continue pelo WhatsApp para confirmar detalhes, prazo e valor.</p></div></div>;

  return <div className="kit-builder-shell topper-builder">
    {draftWarning&&<div className="error" role="status">{draftWarning}</div>}

    <section className="kit-builder-step"><div className="kit-step-heading"><span>01</span><div><small>ESCOLHA O NÍVEL</small><h2>Do simples ao Elite.</h2><p>Você escolhe o nível de acabamento. Tema, cores e composição são personalizados depois.</p></div></div>
      <div className="kit-preset-grid">{topperLevels.map(item=><button type="button" className={level===item.slug?'active':''} onClick={()=>setLevel(item.slug)} key={item.slug}><small>{item.code} • {item.eyebrow}</small><strong>{item.name}</strong><p>{item.description}</p><span>{item.complexity}</span>{level===item.slug&&<i><CheckCircle2 size={14}/> selecionado</i>}</button>)}</div>
    </section>

    <section className="kit-builder-step"><div className="kit-step-heading"><span>02</span><div><small>PERSONALIZAÇÃO</small><h2>Conte como será o seu topo.</h2><p>Não precisa ter tudo decidido. Uma referência, tema ou paleta já é suficiente para começar.</p></div></div>
      {selectedInspiration&&<div className="topper-builder-inspiration"><img src={selectedInspiration.image} alt={`Inspiração escolhida: ${selectedInspiration.title}`}/><div><small>INSPIRAÇÃO ESCOLHIDA • {selectedInspiration.code}</small><strong>{selectedInspiration.title}</strong><p>Vamos adaptar nome, idade, cores e detalhes para o seu pedido.</p></div></div>}
      <TopperLevelVisual level={selected} className="topper-builder-selected-visual"/>
      <div className="kit-brief-grid">
        <label>Tema<input maxLength={120} placeholder="Ex.: safari, floral, futebol..." value={form.theme} onChange={e=>set('theme',e.target.value)}/></label>
        <label>Nome no topo<input maxLength={120} value={form.celebrant_name} onChange={e=>set('celebrant_name',e.target.value)}/></label>
        <label>Idade / número<input maxLength={40} placeholder="Ex.: 5 anos, 30, 50 anos" value={form.celebrant_age} onChange={e=>set('celebrant_age',e.target.value)}/></label>
        <label>Tamanho do bolo<input maxLength={80} placeholder="Ex.: 20 cm de diâmetro" value={form.cake_size} onChange={e=>set('cake_size',e.target.value)}/></label>
        <label>Cores desejadas<input maxLength={160} placeholder="Ex.: azul, branco e dourado" value={form.colors} onChange={e=>set('colors',e.target.value)}/></label>
        <label>Já tem referência?<select value={form.reference} onChange={e=>set('reference',e.target.value)}><option value="">Selecione</option><option>Sim, vou enviar uma foto</option><option>Não, quero uma criação do zero</option><option>Quero adaptar uma inspiração do site</option></select></label>
      </div>
      <div className="product-premium-notes">{selected.features.slice(0,4).map(feature=><span key={feature}><Layers3 size={15}/>{feature}</span>)}</div>
    </section>

    <section className="kit-builder-final"><form className="kit-contact-panel" onSubmit={submit}><div><small>03 • ORÇAMENTO</small><h3>Envie o briefing do seu topo.</h3><p>O valor final depende do nível escolhido, complexidade do tema, materiais e prazo.</p></div>
      <label>Seu nome<input minLength={2} maxLength={120} required autoComplete="name" value={form.name} onChange={e=>set('name',e.target.value)}/></label>
      <label>WhatsApp<input minLength={8} maxLength={30} required inputMode="tel" autoComplete="tel" placeholder="(98) 99999-9999" value={form.whatsapp} onChange={e=>set('whatsapp',e.target.value)}/></label>
      <div className="kit-contact-two"><label>E-mail (opcional)<input type="email" maxLength={180} value={form.email} onChange={e=>set('email',e.target.value)}/></label><label>Data do evento<input type="date" min={todayLocal()} value={form.event_date} onChange={e=>set('event_date',e.target.value)}/></label></div>
      <label>Observações<textarea maxLength={1200} placeholder="Detalhes do tema, estilo, acabamento ou qualquer informação importante..." value={form.notes} onChange={e=>set('notes',e.target.value)}/></label>

      <div className="kit-summary-panel"><small>MODELO ESCOLHIDO</small><strong>{selected.code} — {selected.name}</strong><p>{selected.description}</p><button type="button" className="public-secondary-button" onClick={resetDraft}><Trash2 size={15}/> Limpar rascunho</button></div>

      {error&&<div className="error" role="alert">{error}</div>}

      {contingency&&<div className="quote-contingency" role="status">
        <strong>O envio precisa de confirmação.</strong>
        <p>{contingency.message}</p>
        <div className="quote-contingency-actions">
          {contingency.whatsappUrl&&<a className="btn btn-primary" href={contingency.whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={16}/> Continuar pelo WhatsApp</a>}
          <button className="btn" type="button" onClick={copySummary}><Copy size={16}/> Copiar resumo</button>
        </div>
        {copyStatus&&<small>{copyStatus}</small>}
      </div>}

      <button className="btn btn-primary kit-submit" type="submit" disabled={loading}><Send size={16}/>{loading?'Enviando...':'Pedir orçamento deste topo'}</button>
      <small className="form-note"><Sparkles size={13}/> Nenhum pagamento é feito pelo site. O orçamento é confirmado antes da produção.</small>
    </form></section>
  </div>;
}
