import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopperInspirationGallery from '@/components/TopperInspirationGallery';
import { getSiteSettings } from '@/lib/db';

export const dynamic='force-dynamic';

export const metadata:Metadata={
  title:'Inspirações | Merlin Encantos em Papel',
  description:'Veja referências de topos de bolo e escolha uma ideia para personalizar.'
};

export default async function InspirationsPage(){
  const settings=await getSiteSettings();

  return <main className="merlin-public public-inspirations-page public-v712 public-inspirations-v721 v8-storefront-inspirations">
    <Header settings={settings}/>

    <section className="public-inspiration-banner public-inspiration-banner-v721 v8-storefront-hero">
      <div className="public-shell">
        <span className="eyebrow"><Sparkles size={14}/> INSPIRAÇÕES</span>
        <h1>Encontre uma ideia.<br/><em>Depois deixe com a sua cara.</em></h1>
        <p>Escolha uma referência e personalize.</p>
      </div>
    </section>

    <section className="public-gallery-section public-gallery-section-v721">
      <div className="public-shell">
        <TopperInspirationGallery/>
      </div>
    </section>

    <section className="v8-storefront-simple-cta">
      <div className="public-shell">
        <strong>Tem outra ideia?</strong>
        <Link className="btn btn-primary btn-luxury" href="/monte-seu-pedido?produto=topo">Enviar referência <ArrowUpRight size={16}/></Link>
      </div>
    </section>

    <Footer settings={settings}/>
  </main>;
}
