'use client';
import { useEffect, useMemo, useState } from 'react';
import { Dices, Heart, MessageCircle, PackagePlus, Palette, Search, SlidersHorizontal, Sparkles, Tags, Trash2, X } from 'lucide-react';
import { InspirationCard } from './InspirationShowcase';
import { INSPIRATION_FAVORITES_EVENT, readInspirationFavorites, writeInspirationFavorites } from './InspirationFavoriteButton';
import { inspirationGroups, inspirationModels, inspirationOccasionCollections, inspirationStyleCollections, type InspirationModel } from '@/lib/inspirations';
import {
  emptyInspirationFilters,
  facetCount,
  filterInspirations,
  inspirationPaletteCollections,
  inspirationQuickFilters,
  inspirationSortOptions,
  inspirationThemeCollections,
  type InspirationFacetKey,
  type InspirationFilters,
  type InspirationSort,
} from '@/lib/inspiration-filters';
import { whatsappUrl } from '@/lib/links';
import InspirationCompareDock from './InspirationCompareDock';

const tiers:InspirationModel['tier'][]=['Essencial','Intermediário','Premium'];
const PAGE_SIZE=32;

export default function InspirationExplorer({whatsapp}:{whatsapp:string}){
  const [filters,setFilters]=useState<InspirationFilters>(emptyInspirationFilters);
  const [savedCodes,setSavedCodes]=useState<string[]>([]);const [savedOnly,setSavedOnly]=useState(false);const [visible,setVisible]=useState(PAGE_SIZE);const [ready,setReady]=useState(false);
  const setFilter=<K extends keyof InspirationFilters>(key:K,value:InspirationFilters[K])=>setFilters(current=>({...current,[key]:value}));

  useEffect(()=>{const p=new URLSearchParams(location.search);setFilters({query:p.get('busca')||'',group:p.get('grupo')||'',occasion:p.get('ocasiao')||'',style:p.get('estilo')||'',tier:p.get('nivel')||'',theme:p.get('tema')||'',palette:p.get('paleta')||'',sort:(p.get('ordem') as InspirationSort)||'catalog'});setSavedOnly(p.get('salvos')==='1');setReady(true);},[]);
  useEffect(()=>{const sync=()=>setSavedCodes(readInspirationFavorites());sync();window.addEventListener(INSPIRATION_FAVORITES_EVENT,sync);window.addEventListener('storage',sync);return()=>{window.removeEventListener(INSPIRATION_FAVORITES_EVENT,sync);window.removeEventListener('storage',sync);};},[]);
  useEffect(()=>{if(!ready)return;const url=new URL(location.href);const mapping:[keyof InspirationFilters,string][]=[['query','busca'],['group','grupo'],['occasion','ocasiao'],['style','estilo'],['tier','nivel'],['theme','tema'],['palette','paleta']];for(const [key,param] of mapping){const value=String(filters[key]||'');value?url.searchParams.set(param,value):url.searchParams.delete(param);}filters.sort!=='catalog'?url.searchParams.set('ordem',filters.sort):url.searchParams.delete('ordem');savedOnly?url.searchParams.set('salvos','1'):url.searchParams.delete('salvos');history.replaceState(null,'',url);},[filters,savedOnly,ready]);
  useEffect(()=>setVisible(PAGE_SIZE),[filters,savedOnly]);

  const filtered=useMemo(()=>filterInspirations(filters),[filters]);
  const results=useMemo(()=>savedOnly?filtered.filter(model=>savedCodes.includes(model.code)):filtered,[filtered,savedOnly,savedCodes]);
  const visibleResults=results.slice(0,visible);
  const grouped=useMemo(()=>inspirationGroups.map(name=>({name,items:visibleResults.filter(model=>model.group===name)})).filter(section=>section.items.length),[visibleResults]);
  const savedModels=useMemo(()=>savedCodes.map(code=>inspirationModels.find(model=>model.code===code)).filter((model):model is InspirationModel=>Boolean(model)),[savedCodes]);
  const savedMessage=useMemo(()=>{const selected=savedModels.slice(0,8);const lines=selected.map(model=>`${model.code} — ${model.title}`);if(savedModels.length>8)lines.push(`+ ${savedModels.length-8} inspiração(ões) salva(s)`);return `Olá! Separei algumas inspirações no catálogo da Merlin Encantos em Papel e gostaria de montar um orçamento combinando essas ideias:\n\n${lines.join('\n')}\n\nPodemos adaptar tema, cores e peças para a minha festa?`;},[savedModels]);
  const savedWhatsapp=whatsappUrl(whatsapp,savedMessage);
  const activeFilters=[
    filters.query&&{key:'query',label:`Busca: ${filters.query}`},filters.group&&{key:'group',label:filters.group},filters.occasion&&{key:'occasion',label:`Ocasião: ${filters.occasion}`},filters.style&&{key:'style',label:`Estilo: ${filters.style}`},filters.tier&&{key:'tier',label:`Nível: ${filters.tier}`},filters.theme&&{key:'theme',label:`Tema: ${inspirationThemeCollections.find(item=>item.slug===filters.theme)?.label||filters.theme}`},filters.palette&&{key:'palette',label:`Paleta: ${inspirationPaletteCollections.find(item=>item.slug===filters.palette)?.label||filters.palette}`},savedOnly&&{key:'saved',label:'Somente salvos'},
  ].filter(Boolean) as {key:string;label:string}[];

  function reset(){setFilters(emptyInspirationFilters);setSavedOnly(false);}
  function surprise(){const pool=results.length?results:inspirationModels;const choice=pool[Math.floor(Math.random()*pool.length)];setFilters({...emptyInspirationFilters,query:choice.code});requestAnimationFrame(()=>document.getElementById('explorar-inspiracoes')?.scrollIntoView({behavior:'smooth'}));}
  function clearSaved(){writeInspirationFavorites([]);setSavedOnly(false);}
  function removeActive(key:string){if(key==='saved'){setSavedOnly(false);return;}setFilters(current=>({...current,[key]:key==='sort'?'catalog':''} as InspirationFilters));}
  function applyQuick(filtersToApply:Partial<InspirationFilters>){setFilters({...emptyInspirationFilters,...filtersToApply});setSavedOnly(false);}
  const count=(facet:InspirationFacetKey,value:string)=>facetCount(filters,facet,value);

  return <section className="inspiration-explorer" id="explorar-inspiracoes"><div className="container">
    {savedCodes.length>0&&<div className="inspiration-saved-board" data-reveal><div><Heart size={18} fill="currentColor"/><span><strong>{savedCodes.length}</strong> {savedCodes.length===1?'inspiração salva':'inspirações salvas'}</span><small>Monte sua seleção e envie tudo junto para orçamento.</small></div><div><button type="button" className={savedOnly?'active':''} onClick={()=>setSavedOnly(value=>!value)}><Heart size={14}/> {savedOnly?'Ver catálogo':'Ver somente salvos'}</button><a href="/monte-seu-kit?usar_salvos=1"><PackagePlus size={14}/> Montar kit com salvos</a><a href="/meu-projeto"><Heart size={14}/> Revisar meu projeto</a>{savedWhatsapp&&<a href={savedWhatsapp} target="_blank" rel="noreferrer"><MessageCircle size={14}/> Pedir orçamento da seleção</a>}<button type="button" className="quiet" onClick={clearSaved}><Trash2 size={14}/> Limpar</button></div></div>}

    <div className="inspiration-quick-filters" data-reveal><span><Tags size={14}/> Atalhos</span>{inspirationQuickFilters.map(item=><button type="button" onClick={()=>applyQuick(item.filters)} key={item.slug}>{item.label}</button>)}</div>

    <div className="inspiration-explorer-toolbar" data-reveal>
      <div className="inspiration-search"><Search size={18}/><input aria-label="Buscar inspirações" value={filters.query} onChange={e=>setFilter('query',e.target.value)} placeholder="Busque por topo, floral, gamer, batizado, rosé..."/>{filters.query&&<button type="button" aria-label="Limpar busca" onClick={()=>setFilter('query','')}><X size={15}/></button>}</div>
      <select className="inspiration-sort" aria-label="Ordenar inspirações" value={filters.sort} onChange={e=>setFilter('sort',e.target.value as InspirationSort)}>{inspirationSortOptions.map(item=><option value={item.value} key={item.value}>{item.label}</option>)}</select>
      <button type="button" className="inspiration-surprise" onClick={surprise}><Dices size={16}/> Me surpreenda</button>
      <div className="inspiration-result-total"><Sparkles size={15}/><strong>{results.length}</strong><span>{results.length===1?'inspiração':'inspirações'}</span></div>
    </div>

    <div className="inspiration-filter-shell" data-reveal>
      <div className="inspiration-filter-title"><SlidersHorizontal size={15}/><span>Filtros avançados</span>{activeFilters.length>0&&<button type="button" onClick={reset}>Limpar tudo</button>}</div>
      <div className="inspiration-filter-row"><small>Produto / coleção</small><div><button type="button" className={!filters.group?'active':''} onClick={()=>setFilter('group','')}>Todos <i>{filterInspirations({...filters,group:''}).length}</i></button>{inspirationGroups.map(item=><button type="button" className={filters.group===item?'active':''} onClick={()=>setFilter('group',item)} key={item}>{item} <i>{count('group',item)}</i></button>)}</div></div>
      <div className="inspiration-filter-row"><small>Tema</small><div><button type="button" className={!filters.theme?'active':''} onClick={()=>setFilter('theme','')}>Todos <i>{filterInspirations({...filters,theme:''}).length}</i></button>{inspirationThemeCollections.map(item=><button type="button" className={filters.theme===item.slug?'active':''} onClick={()=>setFilter('theme',item.slug)} key={item.slug}>{item.label} <i>{count('theme',item.slug)}</i></button>)}</div></div>
      <div className="inspiration-filter-row"><small>Ocasião</small><div><button type="button" className={!filters.occasion?'active':''} onClick={()=>setFilter('occasion','')}>Todas <i>{filterInspirations({...filters,occasion:''}).length}</i></button>{inspirationOccasionCollections.map(item=><button type="button" className={filters.occasion===item.value?'active':''} onClick={()=>setFilter('occasion',item.value)} key={item.slug}>{item.label} <i>{count('occasion',item.value)}</i></button>)}</div></div>
      <div className="inspiration-filter-row"><small>Estilo</small><div><button type="button" className={!filters.style?'active':''} onClick={()=>setFilter('style','')}>Todos <i>{filterInspirations({...filters,style:''}).length}</i></button>{inspirationStyleCollections.map(item=><button type="button" className={filters.style===item.value?'active':''} onClick={()=>setFilter('style',item.value)} key={item.slug}>{item.label} <i>{count('style',item.value)}</i></button>)}</div></div>
      <div className="inspiration-filter-row palette-row"><small><Palette size={13}/> Paleta</small><div><button type="button" className={!filters.palette?'active':''} onClick={()=>setFilter('palette','')}>Todas <i>{filterInspirations({...filters,palette:''}).length}</i></button>{inspirationPaletteCollections.map(item=><button type="button" className={filters.palette===item.slug?'active':''} onClick={()=>setFilter('palette',item.slug)} key={item.slug}><span className={`palette-dot palette-${item.slug}`}/>{item.label} <i>{count('palette',item.slug)}</i></button>)}</div></div>
      <div className="inspiration-filter-row"><small>Nível de composição</small><div><button type="button" className={!filters.tier?'active':''} onClick={()=>setFilter('tier','')}>Todos <i>{filterInspirations({...filters,tier:''}).length}</i></button>{tiers.map(item=><button type="button" className={filters.tier===item?'active':''} onClick={()=>setFilter('tier',item)} key={item}>{item} <i>{count('tier',item)}</i></button>)}</div></div>
    </div>

    {activeFilters.length>0&&<div className="inspiration-active-summary" aria-live="polite"><span>Filtros ativos:</span>{activeFilters.map(item=><button type="button" key={`${item.key}-${item.label}`} onClick={()=>removeActive(item.key)}>{item.label}<X size={12}/></button>)}</div>}
    {grouped.length>0?grouped.map(section=><div className="inspiration-filtered-group" key={section.name}><div className="inspiration-group-head"><div><span>{String(inspirationGroups.indexOf(section.name)+1).padStart(2,'0')}</span><h2>{section.name}</h2></div><p>{section.items.length} {section.items.length===1?'modelo nesta página':'modelos nesta página'}.</p></div><div className="inspiration-grid">{section.items.map(model=><InspirationCard model={model} whatsapp={whatsapp} key={model.code}/>)}</div></div>):<div className="inspiration-no-results"><Sparkles size={28}/><strong>{savedOnly&&savedCodes.length===0?'Você ainda não salvou inspirações.':'Nenhuma inspiração encontrou essa combinação.'}</strong><p>{savedOnly?'Toque no coração dos modelos que gostar. Depois você pode enviar todas as escolhas juntas para orçamento.':'Remova um dos filtros, experimente um atalho ou faça uma busca mais ampla. Você também pode enviar sua própria referência pelo WhatsApp.'}</p><button type="button" className="btn btn-primary" onClick={reset}>Ver todas as inspirações</button></div>}
    {visibleResults.length<results.length&&<div className="inspiration-load-more"><p>Mostrando <strong>{visibleResults.length}</strong> de <strong>{results.length}</strong> opções.</p><button type="button" className="btn btn-secondary" onClick={()=>setVisible(value=>value+PAGE_SIZE)}>Mostrar mais inspirações</button></div>}
  </div><InspirationCompareDock/></section>;
}
