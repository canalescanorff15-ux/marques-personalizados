'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Heart, Layers3, Search, SlidersHorizontal, X } from 'lucide-react';
import { publicTopperInspirations } from '@/lib/topper-inspirations';
// Compatibilidade de contrato: a coleção histórica topperInspirations permanece preservada no módulo de origem.
import { topperLevels } from '@/lib/topper-catalog';
import InspirationFavoriteButton, { INSPIRATION_FAVORITES_EVENT, readInspirationFavorites } from './InspirationFavoriteButton';

const PAGE_SIZE=12;
const INITIAL_VISIBLE=8;
type SortOrder='recent'|'catalog'|'az'|'za';
type Filters={query:string;categoria:string;nivel:string;favoritos:boolean;ordem:SortOrder};
const DEFAULT_FILTERS:Filters={query:'',categoria:'',nivel:'',favoritos:false,ordem:'recent'};

export function normalize(value:string){
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
}

function readFiltersFromUrl():Filters{
  if(typeof window==='undefined')return DEFAULT_FILTERS;
  const params=new URLSearchParams(window.location.search);
  const ordem=params.get('ordem');
  return{
    query:params.get('busca')||'',
    categoria:params.get('categoria')||'',
    nivel:params.get('nivel')||'',
    favoritos:params.get('favoritos')==='1',
    ordem:ordem==='catalog'||ordem==='az'||ordem==='za'?ordem:'recent'
  };
}

export default function TopperInspirationGallery(){
  const [filters,setFilters]=useState<Filters>(DEFAULT_FILTERS);
  const [favoriteCodes,setFavoriteCodes]=useState<string[]>([]);
  const [visible,setVisible]=useState(INITIAL_VISIBLE);
  const [ready,setReady]=useState(false);
  const [filterOpen,setFilterOpen]=useState(false);
  const filterTriggerRef=useRef<HTMLButtonElement>(null);
  const filterCloseRef=useRef<HTMLButtonElement>(null);
  const filterPanelRef=useRef<HTMLElement>(null);

  const categories=useMemo(()=>[...new Set(publicTopperInspirations.map(item=>item.category))].sort((a,b)=>a.localeCompare(b,'pt-BR')),[]);

  useEffect(()=>{
    const fromUrl=readFiltersFromUrl();
    setFilters(fromUrl);
    setFavoriteCodes(readInspirationFavorites());
    setReady(true);
    const onPop=()=>{setFilters(readFiltersFromUrl());setVisible(INITIAL_VISIBLE);};
    const onFavorites=()=>setFavoriteCodes(readInspirationFavorites());
    window.addEventListener('popstate',onPop);
    window.addEventListener(INSPIRATION_FAVORITES_EVENT,onFavorites);
    window.addEventListener('storage',onFavorites);
    return()=>{window.removeEventListener('popstate',onPop);window.removeEventListener(INSPIRATION_FAVORITES_EVENT,onFavorites);window.removeEventListener('storage',onFavorites);};
  },[]);

  useEffect(()=>{
    if(!filterOpen)return;
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    requestAnimationFrame(()=>filterCloseRef.current?.focus());
    const onKeyDown=(event:KeyboardEvent)=>{
      if(event.key==='Escape'){
        setFilterOpen(false);
        requestAnimationFrame(()=>filterTriggerRef.current?.focus());
        return;
      }
      if(event.key==='Tab'){
        const panel=filterPanelRef.current;
        if(!panel)return;
        const focusable=[...panel.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), select:not([disabled]), a[href]')].filter(node=>node.offsetParent!==null);
        if(focusable.length===0)return;
        const first=focusable[0];
        const last=focusable[focusable.length-1];
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
        else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
      }
    };
    window.addEventListener('keydown',onKeyDown);
    return()=>{
      document.body.style.overflow=previousOverflow;
      window.removeEventListener('keydown',onKeyDown);
    };
  },[filterOpen]);

  function closeFilters(){
    setFilterOpen(false);
    requestAnimationFrame(()=>filterTriggerRef.current?.focus());
  }

  function syncUrl(next:Filters,push:boolean){
    const url=new URL(window.location.href);
    const params=url.searchParams;
    next.query?params.set('busca',next.query):params.delete('busca');
    next.categoria?params.set('categoria',next.categoria):params.delete('categoria');
    next.nivel?params.set('nivel',next.nivel):params.delete('nivel');
    next.favoritos?params.set('favoritos','1'):params.delete('favoritos');
    next.ordem!=='recent'?params.set('ordem',next.ordem):params.delete('ordem');
    if(push)history.pushState(null,'',url);else history.replaceState(null,'',url);
  }

  function apply(next:Filters,push=true){
    setFilters(next);
    setVisible(INITIAL_VISIBLE);
    if(ready)syncUrl(next,push);
  }

  function clearFilters(){
    apply(DEFAULT_FILTERS,true);
  }

  const results=useMemo(()=>{
    const query=normalize(filters.query);
    const filtered=publicTopperInspirations.filter(item=>{
      if(filters.categoria&&item.category!==filters.categoria)return false;
      if(filters.nivel&&item.levelSlug!==filters.nivel)return false;
      if(filters.favoritos&&!favoriteCodes.includes(item.code))return false;
      if(!query)return true;
      const haystack=normalize([item.title,item.code,item.category,item.description,...item.tags,...item.palette].join(' '));
      return haystack.includes(query);
    });
    if(filters.ordem==='recent')return [...filtered].reverse();
    if(filters.ordem==='az')return [...filtered].sort((a,b)=>a.title.localeCompare(b.title,'pt-BR'));
    if(filters.ordem==='za')return [...filtered].sort((a,b)=>b.title.localeCompare(a.title,'pt-BR'));
    return filtered;
  },[filters,favoriteCodes]);

  const shown=results.slice(0,visible);
  const hasMore=shown.length<results.length;
  const active=Boolean(filters.query||filters.categoria||filters.nivel||filters.favoritos||filters.ordem!=='recent');

  return <div className="public-gallery-layout public-gallery-layout-v721">
    <div className="public-gallery-premium-controls">
      <label className="public-gallery-search-v721">
        <Search size={19}/>
        <span className="sr-only">Pesquisar inspirações</span>
        <input value={filters.query} onChange={e=>apply({...filters,query:e.target.value},false)} placeholder="Pesquisar inspirações..." aria-label="Tema, código, cor..."/>
        {filters.query&&<button type="button" onClick={()=>apply({...filters,query:''},true)} aria-label="Limpar pesquisa"><X size={15}/></button>}
        <i aria-hidden="true"><Search size={18}/></i>
      </label>

      <div className="public-gallery-chip-row" aria-label="Categorias">
        <button type="button" className={!filters.categoria?'is-active':''} onClick={()=>apply({...filters,categoria:''})}>Todos</button>
        {categories.map(categoria=><button type="button" key={categoria} className={filters.categoria===categoria?'is-active':''} onClick={()=>apply({...filters,categoria})}>{categoria}</button>)}
        <button type="button" className={filters.favoritos?'is-active is-favorite':''} onClick={()=>apply({...filters,favoritos:!filters.favoritos})}><Heart size={14} fill={filters.favoritos?'currentColor':'none'}/> Favoritos</button>
        <button ref={filterTriggerRef} type="button" className="public-gallery-more-filters public-mobile-filter-trigger" aria-expanded={filterOpen} aria-controls="public-gallery-filters" onClick={()=>setFilterOpen(true)}><SlidersHorizontal size={15}/> Mais filtros{active&&<span aria-label="Há filtros ativos"/>}</button>
      </div>
    </div>

    {filterOpen&&<button type="button" className="public-filter-backdrop" aria-label="Fechar filtros" onClick={closeFilters}/>}
    <aside ref={filterPanelRef} id="public-gallery-filters" className={filterOpen?'public-gallery-filters public-gallery-filters-v721 is-open':'public-gallery-filters public-gallery-filters-v721'} aria-label="Filtros avançados de inspirações" role="dialog" aria-modal="true">
      <div className="public-filter-heading"><SlidersHorizontal size={17}/><div><strong>Filtros avançados</strong><small>Refine por categoria e acabamento</small></div><button ref={filterCloseRef} type="button" className="public-filter-close" onClick={closeFilters} aria-label="Fechar filtros"><X size={18}/></button></div>

      <fieldset><legend>Categoria</legend><button type="button" className={!filters.categoria?'is-active':''} onClick={()=>apply({...filters,categoria:''})}>Todas <span>{publicTopperInspirations.length}</span></button>{categories.map(categoria=><button type="button" key={categoria} className={filters.categoria===categoria?'is-active':''} onClick={()=>apply({...filters,categoria})}>{categoria}<span>{publicTopperInspirations.filter(item=>item.category===categoria).length}</span></button>)}</fieldset>

      <fieldset><legend>Nível de acabamento</legend><button type="button" className={!filters.nivel?'is-active':''} onClick={()=>apply({...filters,nivel:''})}>Todos</button>{topperLevels.map(level=><button type="button" key={level.slug} className={filters.nivel===level.slug?'is-active':''} onClick={()=>apply({...filters,nivel:level.slug})}>{level.name}</button>)}</fieldset>

      <label className="public-filter-sort-v721">Ordenar por<select value={filters.ordem} onChange={e=>apply({...filters,ordem:e.target.value as SortOrder})}><option value="recent">Mais recentes</option><option value="catalog">Ordem do catálogo</option><option value="az">Nome A–Z</option><option value="za">Nome Z–A</option></select></label>

      <button type="button" className={filters.favoritos?'public-favorites-filter is-active':'public-favorites-filter'} onClick={()=>apply({...filters,favoritos:!filters.favoritos})}><Heart size={16} fill={filters.favoritos?'currentColor':'none'}/> Favoritos <span>{favoriteCodes.length}</span></button>
      {active&&<button type="button" className="public-clear-filters" onClick={clearFilters}>Limpar filtros</button>}
      <button type="button" className="public-filter-apply" onClick={closeFilters}>Ver {results.length} {results.length===1?'resultado':'resultados'}</button>
    </aside>

    <section className="public-gallery-results public-gallery-results-v721">
      <div className="public-gallery-toolbar public-gallery-toolbar-v721">
        <div><strong>{results.length}</strong><span>{results.length===1?' inspiração encontrada':' inspirações encontradas'}</span></div>
        {active&&<button type="button" onClick={clearFilters}>Limpar filtros</button>}
      </div>

      {shown.length>0?<div className="public-inspiration-grid public-inspiration-grid-v721">{shown.map(item=>{
        const level=topperLevels.find(option=>option.slug===item.levelSlug);
        return <article className="public-inspiration-card public-inspiration-card-v721" key={item.code}>
          <div className="public-inspiration-image public-inspiration-image-v721">
            <img src={item.image} alt={'Inspiração de topo '+item.title} width={1200} height={1200} loading="lazy" decoding="async" onError={event=>{event.currentTarget.onerror=null;event.currentTarget.src='/placeholder-topo.svg';}}/>
            <InspirationFavoriteButton code={item.code}/>
            <span className="public-card-code-v721">{item.code}</span>
          </div>
          <div className="public-inspiration-body public-inspiration-body-v721">
            <small>{item.category}</small>
            <h3>{item.title}</h3>
            <div className="public-card-level-v721"><Layers3 size={13}/><span>{level?.name||'Personalizado'}</span></div>
            <Link href={'/inspiracoes/'+encodeURIComponent(item.code)} className="public-card-primary public-card-primary-v721" aria-label={'Ver detalhes de '+item.title}><span>Ver detalhes</span><ArrowUpRight size={16}/></Link>
          </div>
        </article>;
      })}</div>:<div className="public-gallery-empty public-gallery-empty-v721"><Search size={28}/><strong>Nenhuma inspiração encontrou essa combinação.</strong><p>Tente limpar um filtro ou buscar por outro tema, cor ou código.</p><button type="button" onClick={clearFilters}>Ver todas as inspirações</button></div>}

      {hasMore&&<div className="public-load-more public-load-more-v721"><p>Mostrando {shown.length} de {results.length} inspirações.</p><button type="button" onClick={()=>setVisible(value=>value+PAGE_SIZE)}><span className="sr-only">Carregar mais</span>Ver mais inspirações <ArrowUpRight size={15}/></button></div>}
    </section>
  </div>;
}
