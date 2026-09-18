'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Heart, Layers3, Search, SlidersHorizontal, X } from 'lucide-react';
import { topperInspirations } from '@/lib/topper-inspirations';
import { topperLevels } from '@/lib/topper-catalog';
import InspirationFavoriteButton, { INSPIRATION_FAVORITES_EVENT, readInspirationFavorites } from './InspirationFavoriteButton';

const PAGE_SIZE=12;
type SortOrder='catalog'|'az'|'za';
type Filters={query:string;categoria:string;nivel:string;favoritos:boolean;ordem:SortOrder};
const DEFAULT_FILTERS:Filters={query:'',categoria:'',nivel:'',favoritos:false,ordem:'catalog'};

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
    ordem:ordem==='az'||ordem==='za'?ordem:'catalog'
  };
}

function paletteColor(name:string){
  const key=normalize(name);
  if(key.includes('rosa')||key.includes('rose'))return '#e9a8b9';
  if(key.includes('vermelho')||key.includes('marsala'))return '#94495f';
  if(key.includes('azul'))return '#8db8df';
  if(key.includes('verde'))return '#88a27f';
  if(key.includes('dourado')||key.includes('champagne'))return '#c8a45f';
  if(key.includes('preto'))return '#252525';
  if(key.includes('branco')||key.includes('marfim')||key.includes('creme'))return '#f5efe3';
  if(key.includes('lilas')||key.includes('roxo'))return '#a697cb';
  if(key.includes('laranja')||key.includes('terracota'))return '#d98555';
  if(key.includes('nude')||key.includes('bege')||key.includes('areia'))return '#d8bda8';
  if(key.includes('prata'))return '#b9bec8';
  return '#d8c3ca';
}

export default function TopperInspirationGallery(){
  const [filters,setFilters]=useState<Filters>(DEFAULT_FILTERS);
  const [favoriteCodes,setFavoriteCodes]=useState<string[]>([]);
  const [visible,setVisible]=useState(PAGE_SIZE);
  const [ready,setReady]=useState(false);

  const categories=useMemo(()=>[...new Set(topperInspirations.map(item=>item.category))].sort((a,b)=>a.localeCompare(b,'pt-BR')),[ ]);

  useEffect(()=>{
    const fromUrl=readFiltersFromUrl();
    setFilters(fromUrl);
    setFavoriteCodes(readInspirationFavorites());
    setReady(true);
    const onPop=()=>{setFilters(readFiltersFromUrl());setVisible(PAGE_SIZE);};
    const onFavorites=()=>setFavoriteCodes(readInspirationFavorites());
    window.addEventListener('popstate',onPop);
    window.addEventListener(INSPIRATION_FAVORITES_EVENT,onFavorites);
    window.addEventListener('storage',onFavorites);
    return()=>{window.removeEventListener('popstate',onPop);window.removeEventListener(INSPIRATION_FAVORITES_EVENT,onFavorites);window.removeEventListener('storage',onFavorites);};
  },[]);

  function syncUrl(next:Filters,push:boolean){
    const url=new URL(window.location.href);
    const params=url.searchParams;
    next.query?params.set('busca',next.query):params.delete('busca');
    next.categoria?params.set('categoria',next.categoria):params.delete('categoria');
    next.nivel?params.set('nivel',next.nivel):params.delete('nivel');
    next.favoritos?params.set('favoritos','1'):params.delete('favoritos');
    next.ordem!=='catalog'?params.set('ordem',next.ordem):params.delete('ordem');
    if(push)history.pushState(null,'',url);else history.replaceState(null,'',url);
  }

  function apply(next:Filters,push=true){
    setFilters(next);
    setVisible(PAGE_SIZE);
    if(ready)syncUrl(next,push);
  }

  function clearFilters(){
    apply(DEFAULT_FILTERS,true);
  }

  const results=useMemo(()=>{
    const query=normalize(filters.query);
    const filtered=topperInspirations.filter(item=>{
      if(filters.categoria&&item.category!==filters.categoria)return false;
      if(filters.nivel&&item.levelSlug!==filters.nivel)return false;
      if(filters.favoritos&&!favoriteCodes.includes(item.code))return false;
      if(!query)return true;
      const haystack=normalize([item.title,item.code,item.category,item.description,...item.tags,...item.palette].join(' '));
      return haystack.includes(query);
    });
    if(filters.ordem==='az')return [...filtered].sort((a,b)=>a.title.localeCompare(b.title,'pt-BR'));
    if(filters.ordem==='za')return [...filtered].sort((a,b)=>b.title.localeCompare(a.title,'pt-BR'));
    return filtered;
  },[filters,favoriteCodes]);

  const shown=results.slice(0,visible);
  const hasMore=shown.length<results.length;
  const active=Boolean(filters.query||filters.categoria||filters.nivel||filters.favoritos||filters.ordem!=='catalog');

  return <div className="public-gallery-layout">
    <aside className="public-gallery-filters" aria-label="Filtros de inspirações">
      <div className="public-filter-heading"><SlidersHorizontal size={17}/><div><strong>Filtrar inspirações</strong><small>Encontre o estilo ideal</small></div></div>

      <label className="public-filter-search"><span>Buscar</span><div><Search size={16}/><input value={filters.query} onChange={e=>apply({...filters,query:e.target.value},false)} placeholder="Tema, código, cor..."/>{filters.query&&<button type="button" onClick={()=>apply({...filters,query:''},true)} aria-label="Limpar busca"><X size={14}/></button>}</div></label>

      <fieldset><legend>Categoria</legend><button type="button" className={!filters.categoria?'is-active':''} onClick={()=>apply({...filters,categoria:''})}>Todas <span>{topperInspirations.length}</span></button>{categories.map(categoria=><button type="button" key={categoria} className={filters.categoria===categoria?'is-active':''} onClick={()=>apply({...filters,categoria})}>{categoria}<span>{topperInspirations.filter(item=>item.category===categoria).length}</span></button>)}</fieldset>

      <fieldset><legend>Nível</legend><button type="button" className={!filters.nivel?'is-active':''} onClick={()=>apply({...filters,nivel:''})}>Todos</button>{topperLevels.map(level=><button type="button" key={level.slug} className={filters.nivel===level.slug?'is-active':''} onClick={()=>apply({...filters,nivel:level.slug})}>{level.name}</button>)}</fieldset>

      <button type="button" className={filters.favoritos?'public-favorites-filter is-active':'public-favorites-filter'} onClick={()=>apply({...filters,favoritos:!filters.favoritos})}><Heart size={16} fill={filters.favoritos?'currentColor':'none'}/> Favoritos <span>{favoriteCodes.length}</span></button>

      {active&&<button type="button" className="public-clear-filters" onClick={clearFilters}>Limpar filtros</button>}
    </aside>

    <section className="public-gallery-results">
      <div className="public-gallery-toolbar">
        <div><strong>{results.length}</strong><span>{results.length===1?' inspiração encontrada':' inspirações encontradas'}</span></div>
        <label>Ordenar por<select value={filters.ordem} onChange={e=>apply({...filters,ordem:e.target.value as SortOrder})}><option value="catalog">Ordem do catálogo</option><option value="az">Nome A–Z</option><option value="za">Nome Z–A</option></select></label>
      </div>

      {shown.length>0?<div className="public-inspiration-grid">{shown.map(item=>{
        const level=topperLevels.find(option=>option.slug===item.levelSlug);
        return <article className="public-inspiration-card" key={item.code}>
          <div className="public-inspiration-image"><img src={item.image} alt={'Inspiração de topo '+item.title} loading="lazy" decoding="async" onError={event=>{event.currentTarget.onerror=null;event.currentTarget.src='/placeholder-topo.svg';}}/><InspirationFavoriteButton code={item.code}/><span>{item.code}</span></div>
          <div className="public-inspiration-body"><small>{item.category}</small><h3>{item.title}</h3><div className="public-inspiration-level"><Layers3 size={14}/><span>Nível sugerido: <strong>{level?.name||'Personalizado'}</strong></span></div><div className="public-palette" aria-label={'Paleta: '+item.palette.join(', ')}>{item.palette.map(color=><span key={color} title={color}><i style={{background:paletteColor(color)}} aria-hidden="true"/><em>{color}</em></span>)}</div><Link href={'/inspiracoes/'+encodeURIComponent(item.code)} className="public-card-primary">Ver detalhes</Link></div>
        </article>;
      })}</div>:<div className="public-gallery-empty"><Search size={28}/><strong>Nenhuma inspiração encontrou essa combinação.</strong><p>Tente limpar um filtro ou buscar por outro tema, cor ou código.</p><button type="button" onClick={clearFilters}>Ver todas as inspirações</button></div>}

      {hasMore&&<div className="public-load-more"><p>Mostrando {shown.length} de {results.length} inspirações.</p><button type="button" onClick={()=>setVisible(value=>value+PAGE_SIZE)}>Carregar mais</button></div>}
    </section>
  </div>;
}
