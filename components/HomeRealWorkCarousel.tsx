'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';

type RealWork={
  src:string;
  title:string;
  copy:string;
  fitScale?:number;
  fitPosition?:string;
};

type Props={works:RealWork[]};

const AUTO_ROTATE_MS=6000;

export default function HomeRealWorkCarousel({works}:Props){
  const [index,setIndex]=useState(0);

  useEffect(()=>{
    for(const work of works){
      const image=new window.Image();
      image.src=work.src;
    }
  },[works]);

  useEffect(()=>{
    if(works.length<2)return;
    const timer=window.setInterval(()=>setIndex(current=>(current+1)%works.length),AUTO_ROTATE_MS);
    return()=>window.clearInterval(timer);
  },[works.length]);

  if(!works.length)return null;
  const active=works[index%works.length];
  const previous=()=>setIndex(current=>(current-1+works.length)%works.length);
  const next=()=>setIndex(current=>(current+1)%works.length);
  const photoStyle={
    '--v827-photo-scale':String(active.fitScale??.86),
    '--v827-photo-position':active.fitPosition??'50% 50%'
  } as CSSProperties;

  return <div
    className="v824-real-work-carousel"
    aria-roledescription="carrossel"
    aria-label="Trabalhos reais da Merlin"
  >
    <div className="v824-carousel-stage">
      <Image
        className="v824-carousel-backdrop"
        src={active.src}
        alt=""
        fill
        sizes="(max-width: 900px) 100vw, 46vw"
        quality={60}
        aria-hidden="true"
      />
      <div className="v826-carousel-photo-safe" style={photoStyle}>
        <Image
          className="v824-carousel-image"
          src={active.src}
          alt={active.title}
          fill
          sizes="(max-width: 900px) 92vw, 42vw"
          priority={index===0}
          quality={84}
        />
      </div>
      <span className="v824-carousel-badge"><Sparkles size={14}/> Produção Merlin</span>
      {works.length>1&&<div className="v824-carousel-controls" aria-label="Controles do carrossel">
        <button type="button" onClick={previous} aria-label="Trabalho anterior"><ArrowLeft size={17}/></button>
        <span>{String(index+1).padStart(2,'0')} / {String(works.length).padStart(2,'0')}</span>
        <button type="button" onClick={next} aria-label="Próximo trabalho"><ArrowRight size={17}/></button>
      </div>}
      <div className="v824-carousel-shade" aria-hidden="true"/>
      <div className="v824-carousel-caption" aria-live="polite">
        <div>
          <strong>{active.title}</strong>
          <span>{active.copy}</span>
        </div>
        <Link href="/orcamento">Quero algo assim <ArrowRight size={14}/></Link>
      </div>
    </div>
  </div>;
}
