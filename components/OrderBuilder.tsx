'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  BookOpen,
  Box,
  CheckCircle2,
  Copy,
  Gift,
  KeyRound,
  Layers3,
  MessageCircle,
  Send,
  Sparkles,
  Trash2
} from 'lucide-react';
import { fetchJson } from '@/lib/client';
import { getAttribution } from '@/lib/attribution-client';
import { topperLevels } from '@/lib/topper-catalog';
import { topperInspirationBySlug } from '@/lib/topper-inspirations';
import {
  clearOrderDraft,
  readOrderDraft,
  writeOrderDraft,
  type OrderProductType
} from '@/lib/order-draft';
import { clearTopperDraft, readTopperDraft } from '@/lib/topper-draft';

// Compatibilidade de contrato: TopperLevelVisual continua sendo a referência visual oficial no catálogo.
type InquiryResponse={ok:boolean;persisted?:boolean;whatsapp_url?:string};
type Contingency={message:string;whatsappUrl:string}|null;

const productTypes=[
  {key:'topo' as const,label:'Topo de bolo',short:'Topo',icon:Layers3},
  {key:'marcadores' as const,label:'Marcadores de página',short:'Marcadores',icon:BookOpen},
  {key:'lembrancinhas' as const,label:'Lembrancinhas',short:'Lembrancinhas',icon:Gift},
  {key:'chaveiros' as const,label:'Adesivos & Chaveiros',short:'Adesivos / Chaveiros',icon:KeyRound},
  {key:'caixinhas' as const,label:'Caixinhas personalizadas',short:'Caixinhas',icon:Box},
  {key:'outro' as const,label:'Outro personalizado',short:'Outro',icon:Sparkles}
];

const productQueryMap:Record<string,OrderProductType>={
  topo:'topo',
  'topo-de-bolo':'topo',
  marcadores:'marcadores',
  marcador:'marcadores',
  'marcadores-de-pagina':'marcadores',
  caixinhas:'caixinhas',
  lembrancinhas:'lembrancinhas',
  chaveiros:'chaveiros',
  'adesivos-chaveiros':'chaveiros',
  adesivos:'chaveiros',
  doces:'outro',
  kit:'outro',
  kits:'outro',
  outro:'outro'
};

function makeRequestId(){
  if(globalThis.crypto?.randomUUID)return globalThis.crypto.randomUUID();
  const b=new Uint8Array(16);globalThis.crypto.getRandomValues(b);
  b[6]=(b[6]&15)|64;b[8]=(b[8]&63)|128;
  const h=[...b].map(x=>x.toString(16).padStart(2,'0')).join('');
  return `${h.slice(0,8)}-${h.slice(8,12)}-${h.slice(12,16)}-${h.slice(16,20)}-${h.slice(20)}`;
}
function todayLocal(){
  const d=new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

export default function OrderBuilder(){
  const [productType,setProductType]=useState<OrderProductType>('topo');
  const [level,setLevel]=useState('essencial');
  const [inspirationSlug,setInspirationSlug]=useState('');
  const [referenceFileName,setReferenceFileName]=useState('');
  const [form,setForm]=useState({
    name:'',whatsapp:'',email:'',event_date:'',
    theme:'',celebrant_name:'',celebrant_age:'',cake_size:'',colors:'',reference:'',
    quantity:'',variant:'',format:'',dimensions:'',finish:'',frontBack:'',kitItems:'',description:'',notes:''
  });
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');
  const [done,setDone]=useState(false);
  const [draftReady,setDraftReady]=useState(false);
  const [draftWarning,setDraftWarning]=useState('');
  const [contingency,setContingency]=useState<Contingency>(null);
  const [copyStatus,setCopyStatus]=useState('');
  const requestId=useRef(makeRequestId());

  const selectedProduct=useMemo(()=>productTypes.find(item=>item.key===productType)||productTypes[0],[productType]);
  const selectedLevel=useMemo(()=>topperLevels.find(item=>item.slug===level)||topperLevels[0],[level]);
  const selectedInspiration=useMemo(()=>productType==='topo'?topperInspirationBySlug(inspirationSlug):null,[productType,inspirationSlug]);

  useEffect(()=>{
    const draft=readOrderDraft();
    const legacy=draft?null:readTopperDraft();

    let nextProduct:OrderProductType=draft?.productType||'topo';
    if(nextProduct==='doces'||nextProduct==='kit')nextProduct='outro';
    let nextLevel=draft?.level||(legacy?.level)||'essencial';
    let nextInspiration=draft?.inspirationSlug||(legacy?.inspirationSlug)||'';
    const next={
      event_date:draft?.eventDate||legacy?.eventDate||'',
      theme:draft?.theme||legacy?.theme||'',
      celebrant_name:draft?.celebrantName||legacy?.celebrantName||'',
      celebrant_age:draft?.celebrantAge||legacy?.celebrantAge||'',
      cake_size:draft?.cakeSize||legacy?.cakeSize||'',
      colors:draft?.colors||legacy?.colors||'',
      reference:draft?.reference||legacy?.reference||'',
      quantity:draft?.quantity||'',
      variant:draft?.variant||'',
      format:draft?.format||'',
      dimensions:draft?.dimensions||'',
      finish:draft?.finish||'',
      frontBack:draft?.frontBack||'',
      kitItems:'',
      description:draft?.description||'',
      notes:draft?.notes||legacy?.notes||''
    };

    const params=new URLSearchParams(location.search);
    const requestedProduct=params.get('produto')?.trim().toLowerCase()||'';
    if(requestedProduct&&productQueryMap[requestedProduct])nextProduct=productQueryMap[requestedProduct];

    const requestedLevel=params.get('nivel');
    const validRequested=Boolean(requestedLevel&&topperLevels.some(item=>item.slug===requestedLevel));
    if(validRequested&&requestedLevel){nextLevel=requestedLevel;nextProduct='topo';}

    const inspiration=params.get('inspiracao');
    const picked=inspiration?topperInspirationBySlug(inspiration):null;
    if(picked){
      nextProduct='topo';
      nextInspiration=picked.slug;
      if(!validRequested)nextLevel=picked.levelSlug;
      next.theme=params.get('tema')||picked.title;
      next.reference='Quero adaptar uma inspiração do site';
    }else{
      const theme=params.get('tema');
      if(theme)next.theme=theme;
    }

    setProductType(nextProduct);
    setLevel(nextLevel);
    setInspirationSlug(nextInspiration);
    setForm(current=>({...current,...next}));
    setDraftReady(true);
  },[]);

  useEffect(()=>{
    if(!draftReady)return;
    const result=writeOrderDraft({
      version:1,
      productType,
      level,
      inspirationSlug:productType==='topo'?inspirationSlug:'',
      eventDate:form.event_date,
      theme:form.theme,
      celebrantName:form.celebrant_name,
      celebrantAge:form.celebrant_age,
      cakeSize:productType==='topo'?form.cake_size:'',
      colors:form.colors,
      reference:form.reference,
      quantity:form.quantity,
      variant:form.variant,
      format:form.format,
      dimensions:form.dimensions,
      finish:form.finish,
      frontBack:form.frontBack,
      kitItems:'',
      description:form.description,
      notes:form.notes
    });
    setDraftWarning(result.ok?'':'Não foi possível salvar o rascunho nesta sessão. Você ainda pode continuar e enviar o pedido normalmente.');
  },[
    draftReady,productType,level,inspirationSlug,form.event_date,form.theme,form.celebrant_name,
    form.celebrant_age,form.cake_size,form.colors,form.reference,form.quantity,form.variant,
    form.format,form.dimensions,form.finish,form.frontBack,form.description,form.notes
  ]);

  function set(key:keyof typeof form,value:string){
    setForm(current=>({...current,[key]:value}));
    if(error)setError('');
    if(contingency)setContingency(null);
  }

  function chooseProduct(next:OrderProductType){
    setProductType(next);
    setError('');
    setContingency(null);
    setCopyStatus('');
    setReferenceFileName('');
    if(next!=='topo')setInspirationSlug('');
  }

  function resetDraft(){
    clearOrderDraft();
    clearTopperDraft();
    setProductType('topo');
    setLevel('essencial');
    setInspirationSlug('');
    setReferenceFileName('');
    setForm(current=>({
      ...current,
      event_date:'',theme:'',celebrant_name:'',celebrant_age:'',cake_size:'',colors:'',reference:'',
      quantity:'',variant:'',format:'',dimensions:'',finish:'',frontBack:'',kitItems:'',description:'',notes:''
    }));
    setDraftWarning('');
    setContingency(null);
    setCopyStatus('');
  }

  const productSpecificLines=useMemo(()=>{
    const lines:string[]=[];
    if(productType==='topo'){
      lines.push(`Modelo do topo: ${selectedLevel.code} — ${selectedLevel.name}`);
      if(selectedInspiration)lines.push(`Inspiração do site: ${selectedInspiration.code} — ${selectedInspiration.title}`);
      if(form.cake_size)lines.push(`Tamanho/diâmetro do bolo: ${form.cake_size}`);
    }
    if(form.variant)lines.push(`Modelo/tipo: ${form.variant}`);
    if(form.quantity)lines.push(`Quantidade: ${form.quantity}`);
    if(form.format)lines.push(`Formato: ${form.format}`);
    if(form.dimensions)lines.push(`Tamanho/medidas: ${form.dimensions}`);
    if(form.finish)lines.push(`Acabamento: ${form.finish}`);
    if(form.frontBack)lines.push(`Impressão: ${form.frontBack}`);
    if(form.description)lines.push(`Descrição da ideia: ${form.description}`);
    if(referenceFileName)lines.push(`Foto de referência selecionada: ${referenceFileName} — enviar no WhatsApp`);
    return lines;
  },[productType,selectedLevel,selectedInspiration,form.variant,form.quantity,form.format,form.dimensions,form.finish,form.frontBack,form.description,form.cake_size,referenceFileName]);

  const summary=useMemo(()=>[
    `Produto: ${selectedProduct.label}`,
    ...productSpecificLines,
    form.theme&&`Tema: ${form.theme}`,
    form.celebrant_name&&`Nome / texto: ${form.celebrant_name}`,
    form.celebrant_age&&`Idade / número: ${form.celebrant_age}`,
    form.colors&&`Cores: ${form.colors}`,
    form.reference&&`Referência: ${form.reference}`,
    form.notes&&`Observações: ${form.notes}`
  ].filter(Boolean).join('\n'),[selectedProduct,productSpecificLines,form.theme,form.celebrant_name,form.celebrant_age,form.colors,form.reference,form.notes]);

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
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify({
          request_id:requestId.current,
          name:form.name,
          whatsapp:form.whatsapp,
          email:form.email,
          event_date:form.event_date,
          product_id:'',
          product_name:selectedProduct.label,
          category:'',
          message:summary,
          items:[],
          website:'',
          brief:{
            occasion:selectedProduct.label,
            theme:form.theme,
            celebrant_name:form.celebrant_name,
            celebrant_age:form.celebrant_age,
            guest_count:null,
            budget_range:'',
            desired_categories:[selectedProduct.label],
            source:'site',
            attribution:getAttribution()
          }
        })
      },18000);

      if(data.persisted===true){
        clearOrderDraft();
        if(productType==='topo')clearTopperDraft();
        setDone(true);
        requestId.current=makeRequestId();
        if(data.whatsapp_url)window.location.assign(data.whatsapp_url);
      }else{
        setContingency({
          message:'Seu pedido ficou salvo como rascunho. Continue pelo WhatsApp para concluir sem perder os detalhes preenchidos.',
          whatsappUrl:data.whatsapp_url||''
        });
      }
    }catch(err){
      setError(err instanceof Error?err.message:'Não foi possível enviar o pedido.');
    }finally{
      setLoading(false);
    }
  }

  if(done)return <div className="quote-success" role="status"><CheckCircle2 size={28}/><div><strong>Pedido registrado.</strong><p>Agora vamos abrir o WhatsApp com o resumo pronto para você confirmar os detalhes.</p></div></div>;

  const personalizationStep=productType==='topo'?'03':'02';
  const contactStep=productType==='topo'?'04':'03';

  return <div className="v8-order-builder v821-order-builder">
    {draftWarning&&<div className="error" role="status">{draftWarning}</div>}

    <section className="v8-order-step">
      <div className="kit-step-heading"><span>01</span><div><small>ESCOLHA O PRODUTO</small><h2>O que você quer personalizar?</h2></div></div>
      <div className="v8-order-product-grid">
        {productTypes.map(item=>{
          const Icon=item.icon;
          return <button type="button" aria-pressed={productType===item.key} className={productType===item.key?'is-active':''} onClick={()=>chooseProduct(item.key)} key={item.key}>
            <span><Icon size={22}/></span>
            <strong>{item.short}</strong>
            {productType===item.key&&<i><CheckCircle2 size={14}/> selecionado</i>}
          </button>;
        })}
      </div>
    </section>

    {productType==='topo'&&<section className="v8-order-step">
      <div className="kit-step-heading"><span>02</span><div><small>MODELO DO TOPO</small><h2>Qual acabamento você prefere?</h2></div></div>
      <div className="kit-preset-grid v821-topper-options">{topperLevels.map(item=><button type="button" aria-pressed={level===item.slug} className={level===item.slug?'active':''} onClick={()=>setLevel(item.slug)} key={item.slug}><small>{item.code}</small><strong>{item.name}</strong><span>{item.complexity}</span>{level===item.slug&&<i><CheckCircle2 size={14}/> selecionado</i>}</button>)}</div>
    </section>}

    <section className="v8-order-step">
      <div className="kit-step-heading"><span>{personalizationStep}</span><div><small>PERSONALIZAÇÃO</small><h2>Conte como você quer.</h2></div></div>

      {selectedInspiration&&<div className="topper-builder-inspiration"><img src={selectedInspiration.image} alt={`Inspiração escolhida: ${selectedInspiration.title}`}/><div><small>INSPIRAÇÃO ESCOLHIDA</small><strong>{selectedInspiration.title}</strong></div></div>}

      <div className="kit-brief-grid">
        <label>Tema<input maxLength={120} placeholder="Ex.: safari, floral, futebol..." value={form.theme} onChange={e=>set('theme',e.target.value)}/></label>
        <label>Nome / texto principal<input maxLength={120} placeholder="Nome ou frase que deve aparecer" value={form.celebrant_name} onChange={e=>set('celebrant_name',e.target.value)}/></label>
        <label>Idade / número<input maxLength={40} placeholder="Se houver" value={form.celebrant_age} onChange={e=>set('celebrant_age',e.target.value)}/></label>
        <label>Cores desejadas<input maxLength={160} placeholder="Ex.: azul, branco e dourado" value={form.colors} onChange={e=>set('colors',e.target.value)}/></label>

        {productType==='topo'&&<label>Tamanho do bolo<input maxLength={80} placeholder="Ex.: 20 cm de diâmetro" value={form.cake_size} onChange={e=>set('cake_size',e.target.value)}/></label>}

        {productType==='marcadores'&&<>
          <label>Tipo de marcador<select value={form.variant} onChange={e=>set('variant',e.target.value)}><option value="">Selecione</option><option>Literário</option><option>Temático</option><option>Personalizado com foto/nome</option><option>Outro</option></select></label>
          <label>Quantidade<input inputMode="numeric" maxLength={40} placeholder="Ex.: 10 unidades" value={form.quantity} onChange={e=>set('quantity',e.target.value)}/></label>
          <label>Tamanho / medidas<input maxLength={80} placeholder="Se souber, informe" value={form.dimensions} onChange={e=>set('dimensions',e.target.value)}/></label>
          <label>Frente e verso?<select value={form.frontBack} onChange={e=>set('frontBack',e.target.value)}><option value="">Ainda não sei</option><option>Somente frente</option><option>Frente e verso</option></select></label>
        </>}

        {productType==='caixinhas'&&<>
          <label>Modelo da caixinha<select value={form.variant} onChange={e=>set('variant',e.target.value)}><option value="">Ainda não sei</option><option>Milk</option><option>Bala</option><option>Pirâmide</option><option>Sushi</option><option>Outro modelo</option></select></label>
          <label>Quantidade<input inputMode="numeric" maxLength={40} placeholder="Ex.: 20 unidades" value={form.quantity} onChange={e=>set('quantity',e.target.value)}/></label>
        </>}

        {productType==='lembrancinhas'&&<>
          <label>Tipo de lembrancinha<input maxLength={120} placeholder="Ex.: mimo, embalagem, tag..." value={form.variant} onChange={e=>set('variant',e.target.value)}/></label>
          <label>Quantidade<input inputMode="numeric" maxLength={40} placeholder="Ex.: 30 unidades" value={form.quantity} onChange={e=>set('quantity',e.target.value)}/></label>
        </>}

        {productType==='chaveiros'&&<>
          <label>Produto<select value={form.variant} onChange={e=>set('variant',e.target.value)}><option value="">Selecione</option><option>Chaveiro personalizado</option><option>Adesivo personalizado</option></select></label>
          <label>Formato<input maxLength={120} placeholder="Ex.: coração, redondo, recorte especial" value={form.format} onChange={e=>set('format',e.target.value)}/></label>
          <label>Quantidade<input inputMode="numeric" maxLength={40} placeholder="Ex.: 26 unidades" value={form.quantity} onChange={e=>set('quantity',e.target.value)}/></label>
          <label>Tamanho / medidas<input maxLength={80} placeholder="Se souber, informe" value={form.dimensions} onChange={e=>set('dimensions',e.target.value)}/></label>
        </>}

        {productType==='outro'&&<label className="v8-order-wide">Descreva o produto ou a ideia<textarea maxLength={800} placeholder="Conte o que você gostaria de produzir..." value={form.description} onChange={e=>set('description',e.target.value)}/></label>}

        <label>Já tem referência?<select value={form.reference} onChange={e=>set('reference',e.target.value)}><option value="">Selecione</option><option>Sim, vou enviar uma foto</option><option>Não, quero uma criação do zero</option><option>Quero adaptar uma inspiração do site</option></select></label>

        {form.reference==='Sim, vou enviar uma foto'&&<label className="v8-order-wide v821-reference-file">Escolha a foto para lembrar no pedido<input type="file" accept="image/png,image/jpeg,image/webp" onChange={e=>setReferenceFileName(e.target.files?.[0]?.name||'')}/><small>A imagem não é enviada automaticamente pelo formulário. Depois que o WhatsApp abrir, anexe essa mesma foto na conversa.</small></label>}
      </div>
    </section>

    <section className="v8-order-final">
      <form className="kit-contact-panel" onSubmit={submit}>
        <div><small>{contactStep} • CONTATO</small><h3>Revise e envie para o WhatsApp.</h3></div>
        <div className="kit-contact-two">
          <label>Seu nome<input minLength={2} maxLength={120} required autoComplete="name" value={form.name} onChange={e=>set('name',e.target.value)}/></label>
          <label>WhatsApp<input minLength={8} maxLength={30} required inputMode="tel" autoComplete="tel" placeholder="(98) 99999-9999" value={form.whatsapp} onChange={e=>set('whatsapp',e.target.value)}/></label>
        </div>
        <div className="kit-contact-two"><label>E-mail (opcional)<input type="email" maxLength={180} value={form.email} onChange={e=>set('email',e.target.value)}/></label><label>Data do evento<input type="date" min={todayLocal()} value={form.event_date} onChange={e=>set('event_date',e.target.value)}/></label></div>
        <label>Observações<textarea maxLength={1200} placeholder="Prazo, estilo, acabamento ou qualquer informação importante..." value={form.notes} onChange={e=>set('notes',e.target.value)}/></label>

        <details className="v8-order-summary">
          <summary>Revisar pedido</summary>
          <strong>{selectedProduct.label}</strong>
          <pre>{summary}</pre>
          <button type="button" className="public-secondary-button" onClick={resetDraft}><Trash2 size={15}/> Limpar rascunho</button>
        </details>

        {error&&<div className="error" role="alert">{error}</div>}

        {contingency&&<div className="quote-contingency" role="status">
          <strong>Continue pelo WhatsApp.</strong>
          <p>{contingency.message}</p>
          <div className="quote-contingency-actions">
            {contingency.whatsappUrl&&<a className="btn btn-primary" href={contingency.whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={16}/> Abrir WhatsApp</a>}
            <button className="btn" type="button" onClick={copySummary}><Copy size={16}/> Copiar resumo</button>
          </div>
          {copyStatus&&<small>{copyStatus}</small>}
        </div>}

        <button className="btn btn-primary kit-submit" type="submit" disabled={loading}><Send size={16}/>{loading?'Preparando...':'Enviar pedido pelo WhatsApp'}</button>
        <small className="form-note"><Sparkles size={13}/> O orçamento é confirmado pelo WhatsApp antes da produção. Nenhum pagamento é feito pelo site.</small>
      </form>
    </section>
  </div>;
}