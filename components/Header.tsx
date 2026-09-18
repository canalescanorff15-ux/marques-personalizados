'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Layers3, Menu, MessageCircle, Sparkles } from 'lucide-react';
import type { SiteSettings } from '@/lib/db';
import { whatsappUrl } from '@/lib/links';
import SafeImage from './SafeImage';

export default function Header({settings}:{settings:SiteSettings}){
  const [compact,setCompact]=useState(false);
  useEffect(()=>{
    let frame=0;let last=false;
    const update=()=>{frame=0;const next=window.scrollY>24;if(next!==last){last=next;setCompact(next);}};
    const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
    update();window.addEventListener('scroll',onScroll,{passive:true});
    return()=>{window.removeEventListener('scroll',onScroll);if(frame)cancelAnimationFrame(frame);};
  },[]);
  const wa=whatsappUrl(settings.whatsapp_number,'Olá! Vim pelo site da Merlin Encantos em Papel e gostaria de pedir um orçamento para um topo de bolo personalizado.');
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
          <span className="kf-brand-logo"><SafeImage src={logo} fallback="/merlin-logo.webp" alt="" width={54} height={50} sizes="54px" priority/></span>
          <span className="brand-copy"><strong>Merlin Encantos em Papel</strong><small>topos personalizados • sob encomenda</small></span>
        </Link>
        <nav className="nav-links" aria-label="Principal">
          <Link href="/catalogo"><Layers3 size={13}/> Topos</Link>
          <Link href="/inspiracoes"><Sparkles size={13}/> Inspirações</Link>
          <Link href="/guia-de-precos">Níveis & preços</Link>
          <Link href="/monte-seu-topo">Monte seu topo</Link>
        </nav>
        <div className="nav-tools">
          <Link className="btn btn-primary nav-cta" href="/orcamento"><MessageCircle size={17}/> Orçamento</Link>
        </div>
        <div className="mobile-header-tools">
          <details className="mobile-nav"><summary aria-label="Abrir menu"><Menu size={21}/><span>Menu</span></summary><div>
            <Link href="/catalogo"><Layers3 size={16}/> Topos</Link>
            <Link href="/inspiracoes"><Sparkles size={16}/> Inspirações</Link>
            <Link href="/guia-de-precos">Níveis & preços</Link>
            <Link href="/monte-seu-topo">Monte seu topo</Link>
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
