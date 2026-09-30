'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

type RealWork={
  src:string;
  title:string;
  copy:string;
};

type Props={works:RealWork[]};

const AUTO_ROTATE_MS=6000;

export default function HomeRealWorkCarousel({works}:Props){
  const [index,setIndex]=useState(0);
  const [reduceMotion,setReduceMotion]=useState(false);

  useEffect(()=>{
    const media=window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync=()=>setReduceMotion(media.matches);
    sync();
    media.addEventListener?.('change',sync);
    return()=>media.removeEventListener?.('change',sync);
  },[]);

  useEffect(()=>{
    if(reduceMotion||works.length<2)return;
    const timer=window.setInterval(()=>setIndex(current=>(current+1)%works.length),AUTO_ROTATE_MS);
    return()=>window.clearInterval(timer);
  },[reduceMotion,works.length,index]);

  if(!works.length)return null;
  const active=works[index%works.length];
  const previous=()=>setIndex(current=>(current-1+works.length)%works.length);
  const next=()=>setIndex(current=>(current+1)%works.length);

  return <div
    className="v824-real-work-carousel"
    aria-roledescription="carrossel"
    aria-label="Trabalhos reais da Merlin"
  >
    <div className="v824-carousel-stage">
      <Image
        key={`backdrop-${active.src}`}
        className="v824-carousel-backdrop"
        src={active.src}
        alt=""
        fill
        sizes="(max-width: 900px) 100vw, 46vw"
        quality={60}
        aria-hidden="true"
      />
      <Image
        key={active.src}
        className="v824-carousel-image"
        src={active.src}
        alt={active.title}
        fill
        sizes="(max-width: 900px) 100vw, 46vw"
        priority={index===0}
        quality={84}
      />
      <span className="v824-carousel-badge"><Sparkles size={14}/> Produção Merlin</span>
      <div className="v824-carousel-shade" aria-hidden="true"/>
      <div className="v824-carousel-caption" aria-live="polite">
        <div>
          <strong>{active.title}</strong>
          <span>{active.copy}</span>
        </div>
        <Link href="/orcamento">Quero algo assim <ArrowRight size={14}/></Link>
      </div>
      {works.length>1&&<div className="v824-carousel-controls" aria-label="Controles do carrossel">
        <button type="button" onClick={previous} aria-label="Trabalho anterior"><ArrowLeft size={17}/></button>
        <span>{String(index+1).padStart(2,'0')} / {String(works.length).padStart(2,'0')}</span>
        <button type="button" onClick={next} aria-label="Próximo trabalho"><ArrowRight size={17}/></button>
      </div>}
    </div>

    {works.length>1&&<div className="v824-carousel-dots" aria-label="Selecionar trabalho">
      {works.map((work,workIndex)=><button
        type="button"
        key={work.src}
        className={workIndex===index?'is-active':''}
        onClick={()=>setIndex(workIndex)}
        aria-label={`Exibir ${work.title}`}
        aria-current={workIndex===index?'true':undefined}
      />)}
    </div>}
  </div>;
}
