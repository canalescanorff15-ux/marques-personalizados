'use client';

import Link from 'next/link';
import { createContext,useContext,useEffect,useMemo,useRef,useState } from 'react';
import { ArrowUpRight,Check,LoaderCircle,Scale,ShoppingBag,Trash2,X } from 'lucide-react';
import type { Product } from '@/lib/db';
import { fetchJson } from '@/lib/client';
import { formatCatalogMoney,minimumOrderCents } from '@/lib/catalog-merchandising';
import SafeImage from './SafeImage';
import { useDialogA11y } from './useDialogA11y';
import { useQuoteList } from './QuoteListProvider';

type CompareContextValue={
  ids:string[];
  count:number;
  open:boolean;
  setOpen:(open:boolean)=>void;
  includes:(id:string)=>boolean;
  toggle:(product:Product)=>void;
  clear:()=>void;
};
const CompareContext=createContext<CompareContextValue|null>(null);
const STORAGE='marques.compare.v1';
function readIds(){try{const raw=JSON.parse(localStorage.getItem(STORAGE)||'[]');return Array.isArray(raw)?raw.filter(v=>typeof v==='string').slice(0,3):[];}catch{return [];}}
function price(v:number|null){return formatCatalogMoney(v);}
function status(v:Product['stock_status']){return v==='disponivel'?'Disponível':v==='indisponivel'?'Indisponível':'Sob encomenda';}

export function CompareProvider({children}:{children:React.ReactNode}){
  const [ids,setIds]=useState<string[]>([]),[open,setOpen]=useState(false),[notice,setNotice]=useState('');
  useEffect(()=>{setIds(readIds());},[]);
  useEffect(()=>{try{localStorage.setItem(STORAGE,JSON.stringify(ids));}catch{}},[ids]);
  function toggle(product:Product){setIds(current=>{if(current.includes(product.id))return current.filter(id=>id!==product.id);if(current.length>=3){setNotice('Você pode comparar até 3 peças por vez.');setTimeout(()=>setNotice(''),2200);return current;}return [...current,product.id];});}
  function clear(){setIds([]);}
  const value=useMemo(()=>({ids,count:ids.length,open,setOpen,includes:(id:string)=>ids.includes(id),toggle,clear}),[ids,open]);
  return <CompareContext.Provider value={value}>{children}{notice&&<div className="compare-toast" role="status">{notice}</div>}<CompareTray/><CompareDialog/></CompareContext.Provider>;
}

export function useCompare(){const ctx=useContext(CompareContext);if(!ctx)throw new Error('useCompare deve ser usado dentro de CompareProvider');return ctx;}

export function CompareButton({product,className='',label=true}:{product:Product;className?:string;label?:boolean}){
  const compare=useCompare();const active=compare.includes(product.id);
  return <button type="button" className={`${className} compare-button ${active?'active':''}`} onClick={()=>compare.toggle(product)} aria-pressed={active} aria-label={active?`Remover ${product.name} da comparação`:`Comparar ${product.name}`}><Scale size={16}/>{label&&<span>{active?'Comparando':'Comparar'}</span>}</button>;
}

function CompareTray(){const compare=useCompare();if(!compare.count||compare.open)return null;return <div className="compare-tray" role="region" aria-label="Produtos para comparar"><div><Scale size={17}/><span><strong>{compare.count}</strong> {compare.count===1?'peça selecionada':'peças selecionadas'}</span></div><div><button type="button" className="compare-clear" onClick={compare.clear}>Limpar</button><button type="button" className="btn btn-primary" onClick={()=>compare.setOpen(true)} disabled={compare.count<2}>{compare.count<2?'Escolha mais 1':'Comparar agora'}</button></div></div>;}

type PageResult={items:Product[]};
function CompareDialog(){
  const compare=useCompare();const quote=useQuoteList();const [products,setProducts]=useState<Product[]>([]),[loading,setLoading]=useState(false),[error,setError]=useState('');const ref=useRef<HTMLDivElement>(null);useDialogA11y(compare.open,ref,()=>compare.setOpen(false));
  useEffect(()=>{if(!compare.open)return;let cancelled=false;async function load(){setLoading(true);setError('');try{const u=new URL('/api/catalog',location.origin);u.searchParams.set('ids',compare.ids.join(','));u.searchParams.set('limit','3');const data=await fetchJson<PageResult>(u.toString());if(cancelled)return;setProducts(data.items);const valid=new Set(data.items.map(p=>p.id));if(compare.ids.some(id=>!valid.has(id))){for(const id of compare.ids)if(!valid.has(id)){const ghost={id} as Product;compare.toggle(ghost);}}}catch(e){if(!cancelled)setError(e instanceof Error?e.message:'Não foi possível atualizar a comparação.');}finally{if(!cancelled)setLoading(false);}}load();return()=>{cancelled=true};},[compare.open,compare.ids.join(',')]);
  if(!compare.open)return null;
  const knownTotals=products.map(product=>minimumOrderCents(product.price_cents,product.min_quantity)).filter((value):value is number=>value!==null);
  const bestEntry=knownTotals.length>=2?Math.min(...knownTotals):null;
  function addAll(){for(const product of products){if(product.stock_status!=='indisponivel'&&!product.customization_fields.some(field=>field.required))quote.addProduct(product);}quote.setOpen(true);compare.setOpen(false);}
  return <div className="modal-backdrop compare-backdrop" onMouseDown={e=>e.currentTarget===e.target&&compare.setOpen(false)}><div ref={ref} className="compare-dialog" role="dialog" aria-modal="true" aria-label="Comparar produtos" tabIndex={-1}><header><div><span>COMPARADOR MERLIN</span><h2>Escolha com mais clareza.</h2><p>Compare preço inicial, pedido mínimo, investimento de entrada, prazo e nível de personalização antes de montar sua lista.</p></div><button type="button" className="icon-btn" onClick={()=>compare.setOpen(false)} aria-label="Fechar comparação"><X size={18}/></button></header>{loading?<div className="compare-loading"><LoaderCircle className="spin" size={22}/> Atualizando informações…</div>:error?<div className="catalog-error" role="alert"><span>{error}</span><button type="button" className="btn" onClick={()=>{compare.setOpen(false);setTimeout(()=>compare.setOpen(true),0)}}>Tentar novamente</button></div>:<><div className="compare-grid">{products.map(product=>{const min=Math.max(1,product.min_quantity||1);const minimumTotal=minimumOrderCents(product.price_cents,min);const best=minimumTotal!==null&&bestEntry!==null&&minimumTotal===bestEntry;const required=product.customization_fields.filter(field=>field.required).length;return <article key={product.id} className={`compare-card ${best?'is-best-entry':''}`}><div className="compare-image"><SafeImage src={product.image_urls[0]} alt={product.name} loading="lazy" decoding="async"/><div className="compare-image-badges">{best&&<span className="compare-best-badge">Menor entrada</span>}{product.badge&&<span className="compare-product-badge">{product.badge}</span>}</div></div><div className="compare-card-head"><small>{product.category}</small><h3>{product.name}</h3><strong>{price(product.price_cents)}</strong><span className="compare-price-context">{product.price_cents===null?'valor confirmado no orçamento':min>1?`por unidade • mínimo ${min}`:'valor inicial por peça'}</span></div><dl><div><dt>Status</dt><dd>{status(product.stock_status)}</dd></div><div><dt>Pedido mínimo</dt><dd>{min} {min===1?'unidade':'unidades'}</dd></div><div className="compare-order-total"><dt>Pedido inicial</dt><dd>{minimumTotal===null?'Sob consulta':formatCatalogMoney(minimumTotal)}</dd></div><div><dt>Prazo</dt><dd>{product.production_time||'Sob consulta'}</dd></div><div><dt>Personalização</dt><dd>{product.customization_fields.length?required?`${required} detalhe(s) obrigatório(s)`:`${product.customization_fields.length} detalhe(s) opcional(is)`:'Modelo sem campos extras'}</dd></div></dl><div className="compare-card-actions"><Link href={`/catalogo/${product.slug}`} className="btn">Ver detalhes <ArrowUpRight size={15}/></Link>{product.stock_status!=='indisponivel'&&!product.customization_fields.some(field=>field.required)&&<button type="button" className="btn btn-primary" onClick={()=>quote.addProduct(product)}>{quote.includes(product.id)?<Check size={15}/>:<ShoppingBag size={15}/>} {quote.includes(product.id)?'Na minha lista':'Adicionar à lista'}</button>}{product.stock_status!=='indisponivel'&&product.customization_fields.some(field=>field.required)&&<Link href={`/catalogo/${product.slug}#personalizacao-produto`} className="btn btn-primary">Personalizar primeiro</Link>}<CompareButton product={product} className="compare-remove-button"/></div></article>})}</div>{products.some(p=>p.customization_fields.some(f=>f.required))&&<p className="compare-note">Peças com campos obrigatórios precisam ser personalizadas individualmente antes de entrar na lista. Isso evita mandar um orçamento incompleto.</p>}<footer className="compare-footer"><button type="button" className="btn" onClick={compare.clear}><Trash2 size={16}/> Limpar comparação</button><button type="button" className="btn btn-primary" onClick={addAll} disabled={!products.some(p=>p.stock_status!=='indisponivel'&&!p.customization_fields.some(f=>f.required))}><ShoppingBag size={16}/> Adicionar peças prontas à lista</button></footer></>}</div></div>;
}
