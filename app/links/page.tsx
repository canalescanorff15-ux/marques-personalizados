import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Heart, Layers3, MessageCircle, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SafeImage from '@/components/SafeImage';
import SocialLinks from '@/components/SocialLinks';
import { getSiteSettings } from '@/lib/db';
import { normalizeWhatsapp } from '@/lib/links';
import { topperLevels } from '@/lib/topper-catalog';

export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Links | Merlin Encantos em Papel',description:'Acesse inspirações, níveis de acabamento, Monte seu Topo e canais oficiais da Merlin Encantos em Papel.',robots:{index:false,follow:true}};

export default async function LinksPage(){
 const settings=await getSiteSettings();
 const phone=normalizeWhatsapp(settings.whatsapp_number);
 const wa=phone?`https://wa.me/${phone}?text=${encodeURIComponent('Olá! Vim pelo link da Merlin Encantos em Papel e quero orçamento para um topo de bolo.')}`:'';
 return <main className="premium-site public-v712 public-links-page">
  <Header settings={settings}/>
  <section className="public-links-hero">
   <div className="public-shell public-links-hero-inner">
    <div className="public-links-brand">
     <span className="public-links-logo"><SafeImage src={settings.logo_url||'/merlin-logo.webp'} fallback="/merlin-logo.webp" alt="" width={112} height={112} sizes="112px"/></span>
     <div><span className="public-kicker"><Sparkles size={14}/> Topos de bolo personalizados</span><h1>{settings.brand_name}</h1><p>Escolha uma inspiração, compare os seis níveis de acabamento ou monte seu briefing. O pedido é personalizado e confirmado por orçamento.</p><SocialLinks settings={settings} showLabels/></div>
    </div>
    <div className="public-links-actions">
     <Link className="public-primary-button" href="/inspiracoes"><Sparkles size={17}/> Ver inspirações <ArrowUpRight size={16}/></Link>
     <Link className="public-secondary-button" href="/monte-seu-topo"><Layers3 size={17}/> Montar meu topo</Link>
     {wa&&<a className="public-links-whatsapp" href={wa} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Pedir orçamento no WhatsApp</a>}
    </div>
   </div>
  </section>

  <section className="public-links-content">
   <div className="public-shell public-links-grid">
    <article className="public-links-panel">
     <div className="public-links-panel-head"><div><small>NOSSOS TOPOS</small><h2>Escolha o acabamento</h2></div><Layers3 size={22}/></div>
     <div className="public-links-list">{topperLevels.map(level=><Link key={level.slug} href={`/catalogo/${level.slug}`}><span><small>{level.code}</small><strong>{level.name}</strong><em>{level.complexity}</em></span><ArrowUpRight size={16}/></Link>)}</div>
    </article>

    <article className="public-links-panel public-links-shortcuts">
     <div className="public-links-panel-head"><div><small>ATALHOS</small><h2>Continue seu pedido</h2></div><Sparkles size={22}/></div>
     <Link href="/inspiracoes?favoritos=1"><Heart size={18}/><span><strong>Meus Favoritos</strong><small>Veja as inspirações que você salvou neste navegador.</small></span><ArrowUpRight size={16}/></Link>
     <Link href="/catalogo"><Layers3 size={18}/><span><strong>Comparar os seis níveis</strong><small>Do Topo Simples ao Elite com shaker + acetato.</small></span><ArrowUpRight size={16}/></Link>
     <Link href="/guia-de-precos"><Sparkles size={18}/><span><strong>Níveis & preços</strong><small>Entenda o que muda o acabamento e o orçamento.</small></span><ArrowUpRight size={16}/></Link>
     <Link href="/monte-seu-topo"><Layers3 size={18}/><span><strong>Meu Pedido</strong><small>Continue o rascunho de um topo ou comece um novo briefing.</small></span><ArrowUpRight size={16}/></Link>
    </article>
   </div>
  </section>
  <Footer settings={settings}/>
 </main>;
}
