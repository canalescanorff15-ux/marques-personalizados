'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Check, Clipboard, Heart, Layers3, PackagePlus, Share2, Sparkles, Trash2, X } from 'lucide-react';
import { inspirationModels, type InspirationModel } from '@/lib/inspirations';
import { whatsappUrl } from '@/lib/links';
import { INSPIRATION_FAVORITES_EVENT, readInspirationFavorites } from './InspirationFavoriteButton';
import { INSPIRATION_COMPARE_EVENT, readInspirationCompare } from './InspirationCompareButton';

export const MERLIN_PROJECT_KEY='merlin_project_shortlist_v1';
export const MERLIN_PROJECT_EVENT='merlin-project-shortlist-change';
export const MERLIN_PROJECT_LIMIT=6;

function sanitize(codes:unknown){
  if(!Array.isArray(codes))return [] as string[];
  return [...new Set(codes.filter((value):value is string=>typeof value==='string').map(value=>value.trim().toUpperCase()).filter(code=>inspirationModels.some(model=>model.code===code)))].slice(0,MERLIN_PROJECT_LIMIT);
}

function readProjectShortlist(){
  if(typeof window==='undefined')return [] as string[];
  try{return sanitize(JSON.parse(localStorage.getItem(MERLIN_PROJECT_KEY)||'[]'));}catch{return [];}
}

function writeProjectShortlist(codes:string[]){
  const next=sanitize(codes);
  localStorage.setItem(MERLIN_PROJECT_KEY,JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(MERLIN_PROJECT_EVENT,{detail:next}));
  return next;
}

function modelFor(code:string){return inspirationModels.find(model=>model.code===code);}
function initials(title:string){return title.split(/\s+/).slice(0,2).map(part=>part[0]||'').join('').toUpperCase();}

export default function MerlinProjectBoard({whatsapp}:{whatsapp:string}){
  const [favorites,setFavorites]=useState<string[]>([]);
  const [compare,setCompare]=useState<string[]>([]);
  const [shortlist,setShortlist]=useState<string[]>([]);
  const [shareStatus,setShareStatus]=useState('');
  const [ready,setReady]=useState(false);

  useEffect(()=>{
    const sync=()=>{
      const nextFavorites=readInspirationFavorites();
      const nextCompare=readInspirationCompare();
      const saved=readProjectShortlist();
      setFavorites(nextFavorites);
      setCompare(nextCompare);
      if(!ready){
        const seeded=saved.length?saved:sanitize([...nextCompare,...nextFavorites]);
        setShortlist(seeded);
        if(!saved.length&&seeded.length)writeProjectShortlist(seeded);
        setReady(true);
      }else{
        setShortlist(saved);
      }
    };
    sync();
    window.addEventListener(INSPIRATION_FAVORITES_EVENT,sync);
    window.addEventListener(INSPIRATION_COMPARE_EVENT,sync);
    window.addEventListener(MERLIN_PROJECT_EVENT,sync);
    window.addEventListener('storage',sync);
    return()=>{
      window.removeEventListener(INSPIRATION_FAVORITES_EVENT,sync);
      window.removeEventListener(INSPIRATION_COMPARE_EVENT,sync);
      window.removeEventListener(MERLIN_PROJECT_EVENT,sync);
      window.removeEventListener('storage',sync);
    };
  },[ready]);

  const candidateCodes=useMemo(()=>[...new Set([...shortlist,...compare,...favorites])],[shortlist,compare,favorites]);
  const candidates=useMemo(()=>candidateCodes.map(modelFor).filter((model):model is InspirationModel=>Boolean(model)),[candidateCodes]);
  const selectedModels=useMemo(()=>shortlist.map(modelFor).filter((model):model is InspirationModel=>Boolean(model)),[shortlist]);
  const kitHref=selectedModels.length?`/monte-seu-kit?inspiracoes=${encodeURIComponent(selectedModels.map(model=>model.code).join(','))}`:'/monte-seu-kit';
  const compareHref=compare.length>=2?'/comparar-inspiracoes':'/inspiracoes#explorar-inspiracoes';
  const summary=useMemo(()=>{
    if(!selectedModels.length)return 'Projeto Merlin ainda sem referências finais.';
    const lines=selectedModels.map((model,index)=>`${index+1}. ${model.code} — ${model.title} (${model.style} • ${model.palette})`);
    return `Meu projeto — Merlin Encantos em Papel\n\nReferências finais:\n${lines.join('\n')}\n\nQuero usar estas ideias como ponto de partida e adaptar tema, cores, peças e acabamentos para o meu evento.`;
  },[selectedModels]);
  const wa=whatsappUrl(whatsapp,summary);

  function toggle(code:string){
    if(shortlist.includes(code)){setShortlist(writeProjectShortlist(shortlist.filter(item=>item!==code)));return;}
    if(shortlist.length>=MERLIN_PROJECT_LIMIT)return;
    setShortlist(writeProjectShortlist([...shortlist,code]));
  }

  async function shareSummary(){
    try{
      if(navigator.share){await navigator.share({title:'Meu projeto Merlin',text:summary});setShareStatus('Resumo compartilhado');}
      else{await navigator.clipboard.writeText(summary);setShareStatus('Resumo copiado');}
    }catch(error){if((error as Error)?.name!=='AbortError')setShareStatus('Não foi possível compartilhar');}
    window.setTimeout(()=>setShareStatus(''),1800);
  }

  function clearProject(){setShortlist(writeProjectShortlist([]));}

  if(!ready)return <section className="merlin-project-shell"><div className="container"><div className="merlin-project-loading"><Sparkles size={22}/><span>Organizando suas escolhas...</span></div></div></section>;

  if(!candidates.length)return <section className="merlin-project-empty"><div className="container"><Sparkles size={34}/><span>MEU PROJETO MERLIN</span><h1>Seu painel começa<br/><em>com uma inspiração.</em></h1><p>Salve modelos no catálogo ou escolha alguns para comparar. Depois volte aqui para montar sua seleção final e seguir para o pedido.</p><Link className="btn btn-primary btn-luxury" href="/inspiracoes#explorar-inspiracoes">Explorar inspirações <ArrowRight size={16}/></Link></div></section>;

  return <>
    <section className="merlin-project-hero"><div className="container"><div><div className="eyebrow"><Heart size={14}/> Meu projeto Merlin</div><h1>Suas escolhas,<br/><em>em um só lugar.</em></h1></div><div><p>Reúna o que você salvou, o que está comparando e a seleção final que quer levar para o orçamento. Este painel fica somente neste aparelho.</p><div className="merlin-project-hero-actions"><Link className="btn btn-primary btn-luxury" href={kitHref}><PackagePlus size={16}/> Montar kit com minha seleção</Link><Link className="btn btn-ghost" href="/inspiracoes#explorar-inspiracoes"><Sparkles size={16}/> Buscar mais ideias</Link></div></div></div></section>

    <section className="merlin-project-shell"><div className="container">
      <div className="merlin-project-progress" aria-label="Etapas do projeto"><div className="is-complete"><span><Check size={14}/></span><small>01</small><strong>Descobrir</strong><em>{favorites.length} salvas</em></div><div className={compare.length>=2?'is-complete':''}><span>{compare.length>=2?<Check size={14}/>:<Layers3 size={14}/>}</span><small>02</small><strong>Comparar</strong><em>{compare.length} de 4</em></div><div className={shortlist.length?'is-active':''}><span>{shortlist.length?<Check size={14}/>:<Heart size={14}/>}</span><small>03</small><strong>Selecionar</strong><em>{shortlist.length} de {MERLIN_PROJECT_LIMIT}</em></div><div><span><PackagePlus size={14}/></span><small>04</small><strong>Montar pedido</strong><em>próximo passo</em></div></div>

      <div className="merlin-project-toolbar"><div><span>SELEÇÃO FINAL</span><h2>Escolha até {MERLIN_PROJECT_LIMIT} referências.</h2><p>Você pode combinar detalhes de modelos diferentes. A seleção final é a que será enviada para o Monte seu Kit.</p></div><div><button type="button" className="btn" onClick={shareSummary} disabled={!selectedModels.length}><Share2 size={15}/>{shareStatus||'Compartilhar resumo'}</button><button type="button" className="btn" onClick={clearProject} disabled={!shortlist.length}><Trash2 size={15}/> Limpar seleção final</button></div></div>

      <div className="merlin-project-grid">{candidates.map(model=>{const selected=shortlist.includes(model.code);const fromFavorite=favorites.includes(model.code);const fromCompare=compare.includes(model.code);const full=!selected&&shortlist.length>=MERLIN_PROJECT_LIMIT;return <article className={`merlin-project-card${selected?' is-selected':''}`} key={model.code}><div className={`merlin-project-art palette-${model.palette}`}><span>{initials(model.title)}</span><small>{model.code}</small>{selected&&<b><Check size={14}/> Seleção final</b>}</div><div className="merlin-project-card-copy"><div className="merlin-project-source-badges">{fromFavorite&&<span><Heart size={11} fill="currentColor"/> Salvo</span>}{fromCompare&&<span><Layers3 size={11}/> Comparação</span>}</div><small>{model.category} • {model.tier}</small><h3>{model.title}</h3><p>{model.description}</p><div className="merlin-project-card-actions"><button type="button" disabled={full} className={selected?'is-selected':''} onClick={()=>toggle(model.code)}>{selected?<><X size={14}/> Remover da seleção</>:<><Check size={14}/> Usar no projeto</>}</button><Link href={`/inspiracoes/${encodeURIComponent(model.code)}`}>Abrir ficha <ArrowRight size={13}/></Link></div></div></article>;})}</div>

      <div className="merlin-project-summary"><div><span>RESUMO DO PROJETO</span><h2>{selectedModels.length?`${selectedModels.length} referência${selectedModels.length===1?'':'s'} pronta${selectedModels.length===1?'':'s'} para o pedido.`:'Escolha as referências finais.'}</h2><p>O resumo não fecha preço nem acabamento. Ele organiza a direção visual antes de você definir quantidades e composição.</p>{selectedModels.length>0&&<div className="merlin-project-summary-list">{selectedModels.map(model=><span key={model.code}><b>{model.code}</b>{model.title}<small>{model.style} • {model.tier}</small></span>)}</div>}</div><div className="merlin-project-summary-actions"><Link className="btn btn-primary btn-luxury" href={kitHref}><PackagePlus size={16}/> Montar kit com {selectedModels.length||0} referência{selectedModels.length===1?'':'s'}</Link><Link className="btn btn-ghost" href={compareHref}><Layers3 size={16}/>{compare.length>=2?'Rever comparação':'Escolher para comparar'}</Link>{wa&&selectedModels.length>0&&<a className="btn btn-ghost" href={wa} target="_blank" rel="noreferrer"><Clipboard size={16}/> Enviar resumo no WhatsApp</a>}</div></div>

      <p className="merlin-project-privacy">Privacidade: favoritos, comparação e seleção final deste painel ficam salvos somente no navegador deste aparelho até você enviar um pedido.</p>
    </div></section>
  </>;
}
