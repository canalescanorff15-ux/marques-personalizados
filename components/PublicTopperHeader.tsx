'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Heart, Menu, MessageCircle, Search, ShoppingBag } from 'lucide-react';
import { usePathname } from 'next/navigation';
import type { SiteSettings } from '@/lib/db';
import { whatsappUrl } from '@/lib/links';
import { INSPIRATION_FAVORITES_EVENT, readInspirationFavorites } from './InspirationFavoriteButton';
import { TOPPER_DRAFT_EVENT, hasTopperDraft, readTopperDraft } from '@/lib/topper-draft';
import SafeImage from './SafeImage';

const navItems=[
  {href:'/',label:'Início'},
  {href:'/catalogo',label:'Nossos Topos'},
  {href:'/inspiracoes',label:'Inspirações'},
  {href:'/monte-seu-topo',label:'Monte seu Topo'},
  {href:'/guia-de-precos',label:'Níveis & Preços'},
  {href:'/orcamento',label:'Contato'}
];

export default function PublicTopperHeader({settings}:{settings:SiteSettings}){
  const pathname=usePathname();
  const [favoriteCount,setFavoriteCount]=useState(0);
  const [orderCount,setOrderCount]=useState(0);
  const [menuOpen,setMenuOpen]=useState(false);
  const wa=whatsappUrl(settings.whatsapp_number,'Olá! Vim pelo site da Merlin Encantos em Papel e gostaria de pedir um orçamento para um topo de bolo personalizado.');
  const logo=settings.logo_url||'/merlin-logo.webp';

  useEffect(()=>{
    const syncFavorites=()=>setFavoriteCount(readInspirationFavorites().length);
    const syncDraft=()=>setOrderCount(hasTopperDraft(readTopperDraft())?1:0);
    syncFavorites();syncDraft();
    window.addEventListener(INSPIRATION_FAVORITES_EVENT,syncFavorites);
    window.addEventListener(TOPPER_DRAFT_EVENT,syncDraft);
    window.addEventListener('storage',syncFavorites);
    return()=>{window.removeEventListener(INSPIRATION_FAVORITES_EVENT,syncFavorites);window.removeEventListener(TOPPER_DRAFT_EVENT,syncDraft);window.removeEventListener('storage',syncFavorites);};
  },[]);

  const activeHref=useMemo(()=>{
    if(pathname.startsWith('/inspiracoes'))return '/inspiracoes';
    if(pathname.startsWith('/catalogo'))return '/catalogo';
    if(pathname.startsWith('/guia-de-precos'))return '/guia-de-precos';
    if(pathname.startsWith('/monte-seu-topo'))return '/monte-seu-topo';
    if(pathname.startsWith('/orcamento'))return '/orcamento';
    return '/';
  },[pathname]);

  return <header className="public-topper-header">
    <div className="public-header-top">
      <div className="public-shell public-header-top-inner">
        <Link className="public-brand" href="/" aria-label={settings.brand_name+' — início'}>
          <span className="public-brand-logo"><SafeImage src={logo} fallback="/merlin-logo.webp" alt="" width={64} height={60} sizes="64px" priority/></span>
          <span><strong>{settings.brand_name}</strong><small>topos de bolo personalizados</small></span>
        </Link>

        <form className="public-header-search" action="/inspiracoes" method="get" role="search">
          <Search size={18}/>
          <label className="sr-only" htmlFor="public-topper-search">Buscar inspirações de topo</label>
          <input id="public-topper-search" name="busca" placeholder="Buscar por tema, código, cor ou estilo..." autoComplete="off"/>
          <button type="submit">Buscar</button>
        </form>

        <div className="public-header-actions">
          <Link href="/inspiracoes?favoritos=1" className="public-header-action"><Heart size={19}/><span>Meus Favoritos<small>{favoriteCount} salvo{favoriteCount===1?'':'s'}</small></span></Link>
          <Link href="/monte-seu-topo" className="public-header-action"><ShoppingBag size={19}/><span>Meu Pedido<small>{orderCount}/1 topo em rascunho</small></span></Link>
          {wa&&<a href={wa} target="_blank" rel="noreferrer" className="public-header-whatsapp"><MessageCircle size={18}/> WhatsApp</a>}
          <button type="button" className="public-menu-toggle" aria-expanded={menuOpen} aria-controls="public-mobile-menu" onClick={()=>setMenuOpen(value=>!value)}><Menu size={22}/><span>Menu</span></button>
        </div>
      </div>
    </div>

    <div className="public-header-nav-row">
      <div className="public-shell">
        <nav className="public-main-nav" aria-label="Navegação principal">
          {navItems.map(item=><Link key={item.href} href={item.href} className={activeHref===item.href?'is-active':''} aria-current={activeHref===item.href?'page':undefined}>{item.label}</Link>)}
        </nav>
      </div>
    </div>

    {menuOpen&&<nav id="public-mobile-menu" className="public-mobile-menu" aria-label="Navegação móvel">
      <div className="public-shell">{navItems.map(item=><Link key={item.href} href={item.href} onClick={()=>setMenuOpen(false)}>{item.label}</Link>)}<Link href="/inspiracoes?favoritos=1" onClick={()=>setMenuOpen(false)}>Meus Favoritos ({favoriteCount})</Link></div>
    </nav>}
  </header>;
}
