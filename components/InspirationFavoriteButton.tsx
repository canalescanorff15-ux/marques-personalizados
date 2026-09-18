'use client';
import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

export const INSPIRATION_FAVORITES_KEY='kf_inspiration_favorites_v1';
export const INSPIRATION_FAVORITES_EVENT='kf-inspiration-favorites-change';
export const INSPIRATION_FAVORITES_ERROR_EVENT='kf-inspiration-favorites-error';
const FAVORITES_LIMIT=24;

export function readInspirationFavorites(){
  if(typeof window==='undefined')return [] as string[];
  try{
    const raw=localStorage.getItem(INSPIRATION_FAVORITES_KEY);
    if(!raw)return [];
    const parsed=JSON.parse(raw);
    if(!Array.isArray(parsed))return [];
    return [...new Set(parsed.filter((value):value is string=>typeof value==='string'&&value.trim().length>0))].slice(0,FAVORITES_LIMIT);
  }catch{
    return [];
  }
}

export function writeInspirationFavorites(codes:string[]){
  if(typeof window==='undefined')return {ok:false,codes:[] as string[],reason:'unavailable' as const};
  const next=[...new Set(codes.filter(Boolean))].slice(0,FAVORITES_LIMIT);
  try{
    localStorage.setItem(INSPIRATION_FAVORITES_KEY,JSON.stringify(next));
    window.dispatchEvent(new CustomEvent(INSPIRATION_FAVORITES_EVENT,{detail:next}));
    return {ok:true,codes:next,reason:null};
  }catch{
    const current=readInspirationFavorites();
    window.dispatchEvent(new CustomEvent(INSPIRATION_FAVORITES_ERROR_EVENT,{detail:{message:'Não foi possível salvar seus favoritos neste navegador.'}}));
    return {ok:false,codes:current,reason:'storage' as const};
  }
}

export default function InspirationFavoriteButton({code}:{code:string}){
  const [saved,setSaved]=useState(false);
  const [message,setMessage]=useState('');
  useEffect(()=>{
    const sync=()=>setSaved(readInspirationFavorites().includes(code));
    const onError=()=>{setMessage('Favoritos indisponíveis neste navegador.');window.setTimeout(()=>setMessage(''),3000);};
    sync();
    window.addEventListener(INSPIRATION_FAVORITES_EVENT,sync);
    window.addEventListener(INSPIRATION_FAVORITES_ERROR_EVENT,onError);
    window.addEventListener('storage',sync);
    return()=>{window.removeEventListener(INSPIRATION_FAVORITES_EVENT,sync);window.removeEventListener(INSPIRATION_FAVORITES_ERROR_EVENT,onError);window.removeEventListener('storage',sync);};
  },[code]);

  function toggle(){
    const current=readInspirationFavorites();
    const result=writeInspirationFavorites(saved?current.filter(item=>item!==code):[...current,code]);
    if(result.ok){setSaved(result.codes.includes(code));setMessage(result.codes.includes(code)?'Salvo nos favoritos.':'Removido dos favoritos.');window.setTimeout(()=>setMessage(''),1800);}
  }

  return <span className="favorite-control"><button type="button" className={`inspiration-favorite${saved?' is-saved':''}`} aria-pressed={saved} aria-label={saved?'Remover dos favoritos':'Adicionar aos favoritos'} title={saved?'Remover dos favoritos':'Salvar inspiração'} onClick={toggle}><Heart size={18} fill={saved?'currentColor':'none'}/></button>{message&&<span className="sr-only" role="status">{message}</span>}</span>;
}
