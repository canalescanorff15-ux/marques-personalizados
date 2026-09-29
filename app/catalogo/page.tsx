import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Layers3, MessageCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopperLevelVisual from '@/components/TopperLevelVisual';
import { getSiteSettings } from '@/lib/db';
import { topperLevels } from '@/lib/topper-catalog';
import { topperLaunchPriceNote, topperPriceForSlug } from '@/lib/topper-pricing';

export const dynamic='force-dynamic';
export const metadata:Metadata={
  title:'Topos de bolo | Merlin Encantos em Papel',
  description:'Conheça os quatro acabamentos atuais de topos de bolo, com valores de lançamento e personalização sob encomenda.'
};

export default async function CatalogPage(){
  const settings=await getSiteSettings();

  return <main className="premium-site public-v712 v8-storefront-page v8-storefront-catalog v823-pricing-page">
    <Header settings={settings}/>

    <section className="v8-storefront-hero">
      <div className="container">
        <span className="eyebrow"><Layers3 size={14}/> TOPOS DE BOLO</span>
        <h1>Escolha o acabamento.<br/><em>O tema é do seu jeito.</em></h1>
        <p>Quatro opções atuais, com valor inicial claro e personalização conforme o seu pedido.</p>
      </div>
    </section>

    <section className="v8-storefront-grid-section" id="niveis">
      <div className="container">
        <div className="v8-storefront-grid v8-storefront-level-grid">
          {topperLevels.map(item=>{
            const price=topperPriceForSlug(item.slug);
            return <article className="v8-storefront-card v8-storefront-level-card v823-pricing-card" key={item.slug}>
              <Link href={`/catalogo/${item.slug}`} className="v823-card-visual" aria-label={`Ver detalhes de ${item.name}`}>
                <TopperLevelVisual level={item} compact/>
              </Link>
              <div className="v823-card-copy">
                <small>{item.eyebrow}</small>
                <h2><Link href={`/catalogo/${item.slug}`}>{item.name}</Link></h2>
                <strong className="v823-price-badge">A partir de R$ {price}</strong>
                <div className="v823-card-actions">
                  <Link href={`/catalogo/${item.slug}`}>Ver acabamento <ArrowUpRight size={14}/></Link>
                  <Link className="v823-whatsapp-cta" href={`/monte-seu-pedido?produto=topo&nivel=${item.slug}`}><MessageCircle size={14}/> Pedir orçamento no WhatsApp</Link>
                </div>
              </div>
            </article>;
          })}
        </div>

        <p className="v823-launch-note">{topperLaunchPriceNote}</p>

        <div className="v8-storefront-bottom-cta">
          <strong>Já sabe o que quer?</strong>
          <Link className="btn btn-primary btn-luxury" href="/monte-seu-pedido?produto=topo">Montar meu topo <ArrowUpRight size={16}/></Link>
        </div>
      </div>
    </section>

    <Footer settings={settings}/>
  </main>;
}
