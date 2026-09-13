'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Heart, Menu, MessageCircle, PackagePlus, Search, Sparkles } from 'lucide-react';
import type { SiteSettings } from '@/lib/db';
import { whatsappUrl } from '@/lib/links';
import GlobalSearch from './GlobalSearch';
import { QuoteListTrigger } from './QuoteListProvider';

export default function Header({settings}:{settings:SiteSettings}){
  const [compact,setCompact]=useState(false);
  useEffect(()=>{
    let frame=0;let last=false;
    const update=()=>{frame=0;const next=window.scrollY>24;if(next!==last){last=next;setCompact(next);}};
    const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
    update();window.addEventListener('scroll',onScroll,{passive:true});
    return()=>{window.removeEventListener('scroll',onScroll);if(frame)cancelAnimationFrame(frame);};
  },[]);
  const wa=whatsappUrl(settings.whatsapp_number,'Olá! Vim pelo catálogo da Merlin Encantos em Papel e gostaria de fazer um orçamento.');
  const now=Date.now();
  const campaignStart=settings.announcement_start_at?new Date(settings.announcement_start_at).getTime():null;
  const campaignEnd=settings.announcement_end_at?new Date(settings.announcement_end_at).getTime():null;
  const campaignLive=Boolean(settings.announcement)&&(!campaignStart||campaignStart<=now)&&(!campaignEnd||campaignEnd>now);
  const announcementContent=settings.announcement_link?(settings.announcement_link.startsWith('/')?<Link href={settings.announcement_link}>{settings.announcement}<span>Ver mais →</span></Link>:<a href={settings.announcement_link} target="_blank" rel="noreferrer">{settings.announcement}<span>Ver mais →</span></a>):<span>{settings.announcement}</span>;
  const logo=settings.logo_url||'/merlin-logo.webp';
  return <>
    {campaignLive&&<div className="announcement">{announcementContent}</div>}
    <header className={`site-header kf-site-header ${compact?'is-compact':''}`}>
      <div className="container nav">
        <Link className="brand kf-brand" href="/" aria-label={settings.brand_name}>
          <span className="kf-brand-logo"><img src={logo} alt="" width={54} height={50} decoding="async" onError={event=>{const image=event.currentTarget;if(image.dataset.fallback==='1')return;image.dataset.fallback='1';image.src='/merlin-logo.webp';}}/></span>
          <span className="brand-copy"><strong>Merlin Encantos em Papel</strong><small>planejar • personalizar • encantar</small></span>
        </Link>
        <nav className="nav-links" aria-label="Principal">
          <Link href="/inspiracoes"><Sparkles size={13}/> Inspirações</Link>
          <Link href="/catalogo">Catálogo</Link>
          <Link href="/guia-de-precos">Preços</Link>
          <Link href="/monte-seu-kit"><PackagePlus size={13}/> Monte seu kit</Link>
        </nav>
        <div className="nav-tools">
          <Link className="nav-project" href="/meu-projeto" aria-label="Meu projeto"><Heart size={17}/><span>Projeto</span></Link>
          <QuoteListTrigger compact/>
          <GlobalSearch/>
          <Link className="btn btn-primary nav-cta" href="/orcamento"><MessageCircle size={17}/> Orçamento</Link>
        </div>
        <div className="mobile-header-tools">
          <button type="button" className="mobile-search-trigger" onClick={()=>window.dispatchEvent(new CustomEvent('marques:open-search'))} aria-label="Buscar"><Search size={19}/></button>
          <QuoteListTrigger compact/>
          <details className="mobile-nav"><summary aria-label="Abrir menu"><Menu size={21}/><span>Menu</span></summary><div>
            <Link href="/inspiracoes"><Sparkles size={16}/> Inspirações</Link>
            <Link href="/catalogo">Catálogo</Link>
            <Link href="/guia-de-precos">Preços</Link>
            <Link href="/monte-seu-kit"><PackagePlus size={16}/> Monte seu kit</Link>
            <Link href="/meu-projeto"><Heart size={16}/> Meu projeto</Link>
            <Link href="/orcamento"><MessageCircle size={16}/> Orçamento</Link>
            <Link href="/links">Links & redes</Link>
            {wa&&<a href={wa} target="_blank" rel="noreferrer"><MessageCircle size={16}/> WhatsApp</a>}
          </div></details>
        </div>
      </div>
    </header>
    {wa&&<a className="floating-wa kf-floating-wa" href={wa} target="_blank" rel="noreferrer" aria-label="Falar pelo WhatsApp"><MessageCircle size={19}/><span>WhatsApp</span></a>}
  </>;
}
