'use client';

import { useEffect, useState } from 'react';
import { Layers3 } from 'lucide-react';

export const INSPIRATION_COMPARE_KEY='merlin_inspiration_compare_v1';
export const INSPIRATION_COMPARE_EVENT='merlin-inspiration-compare-change';
export const INSPIRATION_COMPARE_LIMIT=4;

function sanitize(codes:unknown){
  if(!Array.isArray(codes))return [] as string[];
  return [...new Set(codes.filter((value):value is string=>typeof value==='string').map(value=>value.trim().toUpperCase()).filter(value=>/^INSP-\d{3}$/.test(value)))].slice(0,INSPIRATION_COMPARE_LIMIT);
}

export function readInspirationCompare(){
  if(typeof window==='undefined')return [] as string[];
  try{return sanitize(JSON.parse(localStorage.getItem(INSPIRATION_COMPARE_KEY)||'[]'));}catch{return [];}
}

export function writeInspirationCompare(codes:string[]){
  const next=sanitize(codes);
  localStorage.setItem(INSPIRATION_COMPARE_KEY,JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(INSPIRATION_COMPARE_EVENT,{detail:next}));
  return next;
}

export default function InspirationCompareButton({code,compact=false}:{code:string;compact?:boolean}){
  const [codes,setCodes]=useState<string[]>([]);
  const selected=codes.includes(code);
  const full=!selected&&codes.length>=INSPIRATION_COMPARE_LIMIT;
  useEffect(()=>{const sync=()=>setCodes(readInspirationCompare());sync();window.addEventListener(INSPIRATION_COMPARE_EVENT,sync);window.addEventListener('storage',sync);return()=>{window.removeEventListener(INSPIRATION_COMPARE_EVENT,sync);window.removeEventListener('storage',sync);};},[]);
  function toggle(){const current=readInspirationCompare();if(current.includes(code)){writeInspirationCompare(current.filter(item=>item!==code));return;}if(current.length>=INSPIRATION_COMPARE_LIMIT)return;writeInspirationCompare([...current,code]);}
  const label=selected?'Na comparação':full?'Limite de 4':'Comparar';
  return <button type="button" className={`inspiration-compare-button${selected?' is-selected':''}${compact?' is-compact':''}`} aria-pressed={selected} disabled={full} onClick={toggle} title={full?'Você pode comparar até 4 inspirações por vez.':selected?'Remover da comparação':'Adicionar à comparação'}><Layers3 size={compact?14:16}/><span>{label}</span></button>;
}
