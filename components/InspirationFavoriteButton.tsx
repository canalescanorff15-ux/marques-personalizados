'use client';
import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

export const INSPIRATION_FAVORITES_KEY='kf_inspiration_favorites_v1';
export const INSPIRATION_FAVORITES_EVENT='kf-inspiration-favorites-change';

export function readInspirationFavorites(){
  if(typeof window==='undefined')return [] as string[];
  try{const parsed=JSON.parse(localStorage.getItem(INSPIRATION_FAVORITES_KEY)||'[]');return Array.isArray(parsed)?parsed.filter((value):value is string=>typeof value==='string').slice(0,24):[];}catch{return [];}
}

export function writeInspirationFavorites(codes:string[]){
  const next=[...new Set(codes)].slice(0,24);
  localStorage.setItem(INSPIRATION_FAVORITES_KEY,JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(INSPIRATION_FAVORITES_EVENT,{detail:next}));
  return next;
}

export default function InspirationFavoriteButton({code}:{code:string}){
  const [saved,setSaved]=useState(false);
  useEffect(()=>{const sync=()=>setSaved(readInspirationFavorites().includes(code));sync();window.addEventListener(INSPIRATION_FAVORITES_EVENT,sync);window.addEventListener('storage',sync);return()=>{window.removeEventListener(INSPIRATION_FAVORITES_EVENT,sync);window.removeEventListener('storage',sync);};},[code]);
  function toggle(){const current=readInspirationFavorites();writeInspirationFavorites(saved?current.filter(item=>item!==code):[...current,code]);}
  return <button type="button" className={`inspiration-favorite${saved?' is-saved':''}`} aria-pressed={saved} aria-label={saved?'Remover dos modelos salvos':'Salvar modelo para comparar'} title={saved?'Remover dos salvos':'Salvar inspiração'} onClick={toggle}><Heart size={16} fill={saved?'currentColor':'none'}/></button>;
}
