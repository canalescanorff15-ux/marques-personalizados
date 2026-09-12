'use client';

import { Check, Share2 } from 'lucide-react';
import { useState } from 'react';

export default function InspirationShareButton({title,code}:{title:string;code:string}){
  const [status,setStatus]=useState('');
  async function share(){
    const url=window.location.href;
    const text=`${code} — ${title} | Merlin Encantos em Papel`;
    try{
      if(navigator.share){await navigator.share({title,text,url});setStatus('Compartilhado');}
      else if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(url);setStatus('Link copiado');}
      else{setStatus('Copie o endereço da página');}
    }catch(error){
      if(error instanceof DOMException&&error.name==='AbortError')return;
      setStatus('Não foi possível compartilhar');
    }
    window.setTimeout(()=>setStatus(''),2200);
  }
  return <button type="button" className="inspiration-share-button" onClick={share}>{status?<Check size={16}/>:<Share2 size={16}/>} {status||'Compartilhar referência'}</button>;
}
