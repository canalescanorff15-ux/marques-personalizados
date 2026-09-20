'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Menu, ShoppingBag } from 'lucide-react';
import { usePathname } from 'next/navigation';
import type { SiteSettings } from '@/lib/db';
import SafeImage from './SafeImage';

const navItems=[
  {href:'/',label:'Início'},
  {href:'/catalogo',label:'Topos de bolo'},
  {href:'/personalizados',label:'Personalizados'},
  {href:'/inspiracoes',label:'Inspirações'}
];

export default function PublicTopperHeader({settings}:{settings:SiteSettings}){
  const pathname=usePathname();
  const [menuOpen,setMenuOpen]=useState(false);
  const menuButtonRef=useRef<HTMLButtonElement>(null);
  const mobileMenuRef=useRef<HTMLElement>(null);
  const logo=settings.logo_url||'/merlin-logo.webp';

  useEffect(()=>{
    if(!menuOpen)return;
    const firstLink=mobileMenuRef.current?.querySelector<HTMLAnchorElement>('a');
    firstLink?.focus();
    const onKeyDown=(event:KeyboardEvent)=>{
      if(event.key==='Escape'){
        setMenuOpen(false);
        requestAnimationFrame(()=>menuButtonRef.current?.focus());
      }
    };
    window.addEventListener('keydown',onKeyDown);
    return()=>window.removeEventListener('keydown',onKeyDown);
  },[menuOpen]);

  const activeHref=useMemo(()=>{
    if(pathname.startsWith('/inspiracoes'))return '/inspiracoes';
    if(pathname.startsWith('/catalogo')||pathname.startsWith('/guia-de-precos'))return '/catalogo';
    if(pathname.startsWith('/personalizados'))return '/personalizados';
    return pathname==='/'?'/':'';
  },[pathname]);

  return <header className="public-topper-header v8-simple-header">
    <div className="public-header-top">
      <div className="public-shell public-header-top-inner">
        <Link className="public-brand" href="/" aria-label={settings.brand_name+' — início'}>
          <span className="public-brand-logo"><SafeImage src={logo} fallback="/merlin-logo.webp" alt="" width={58} height={54} sizes="58px" priority/></span>
          <span><strong>{settings.brand_name}</strong><small>topos de bolo personalizados • papelaria sob encomenda</small></span>
        </Link>

        <nav className="v8-simple-nav" aria-label="Navegação principal">
          {navItems.map(item=><Link key={item.href} href={item.href} className={activeHref===item.href?'is-active':''} aria-current={activeHref===item.href?'page':undefined}>{item.label}</Link>)}
        </nav>

        <div className="v8-simple-header-actions">
          <Link className="v8-simple-order-cta" href="/monte-seu-pedido"><ShoppingBag size={17}/> Monte seu Pedido</Link>
          <button ref={menuButtonRef} type="button" className="public-menu-toggle" aria-expanded={menuOpen} aria-controls="public-mobile-menu" onClick={()=>setMenuOpen(value=>!value)}><Menu size={22}/><span>Menu</span></button>
        </div>
      </div>
    </div>

    {menuOpen&&<nav ref={mobileMenuRef} id="public-mobile-menu" className="public-mobile-menu v8-simple-mobile-menu" aria-label="Navegação móvel">
      <div className="public-shell">
        {navItems.map(item=><Link key={item.href} href={item.href} onClick={()=>setMenuOpen(false)}>{item.label}</Link>)}
        <Link className="is-primary" href="/monte-seu-pedido" onClick={()=>setMenuOpen(false)}>Monte seu Pedido</Link>
        <Link href="/orcamento" onClick={()=>setMenuOpen(false)}>Orçamento</Link>
      </div>
    </nav>}
  </header>;
}
