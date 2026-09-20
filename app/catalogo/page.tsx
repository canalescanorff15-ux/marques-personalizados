import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Layers3 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopperLevelVisual from '@/components/TopperLevelVisual';
import { getSiteSettings } from '@/lib/db';
import { topperLevels } from '@/lib/topper-catalog';

export const dynamic='force-dynamic';
export const metadata:Metadata={
  title:'Topos de bolo | Merlin Encantos em Papel',
  description:'Escolha o acabamento do seu topo de bolo e personalize tema, nome, idade e cores.'
};

export default async function CatalogPage(){
  const settings=await getSiteSettings();

  return <main className="premium-site public-v712 v8-storefront-page v8-storefront-catalog">
    <Header settings={settings}/>

    <section className="v8-storefront-hero">
      <div className="container">
        <span className="eyebrow"><Layers3 size={14}/> TOPOS DE BOLO</span>
        <h1>Escolha o acabamento.<br/><em>O tema é do seu jeito.</em></h1>
        <p>Seis níveis de acabamento. Depois você personaliza nome, idade, cores e tema.</p>
      </div>
    </section>

    <section className="v8-storefront-grid-section" id="niveis">
      <div className="container">
        <div className="v8-storefront-grid v8-storefront-level-grid">
          {topperLevels.map(item=><Link href={`/catalogo/${item.slug}`} className="v8-storefront-card v8-storefront-level-card" key={item.slug}>
            <TopperLevelVisual level={item} compact/>
            <div>
              <small>{item.code}</small>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <span>Ver acabamento <ArrowUpRight size={14}/></span>
            </div>
          </Link>)}
        </div>

        <div className="v8-storefront-bottom-cta">
          <div><small>JÁ TEM UM TEMA EM MENTE?</small><strong>Comece seu pedido.</strong></div>
          <Link className="btn btn-primary btn-luxury" href="/monte-seu-pedido?produto=topo">Montar meu topo <ArrowUpRight size={16}/></Link>
        </div>
      </div>
    </section>

    <Footer settings={settings}/>
  </main>;
}
