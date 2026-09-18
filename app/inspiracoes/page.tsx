import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopperInspirationGallery from '@/components/TopperInspirationGallery';
import { getSiteSettings } from '@/lib/db';
import { topperInspirations } from '@/lib/topper-inspirations';

export const dynamic='force-dynamic';
export const metadata:Metadata={
  title:'Inspirações de topos | Merlin Encantos em Papel',
  description:'Explore inspirações de topos de bolo, filtre por categoria e acabamento e personalize o modelo que mais combina com a sua festa.'
};

export default async function InspirationsPage(){
  const settings=await getSiteSettings();
  return <main className="merlin-public public-inspirations-page">
    <Header settings={settings}/>

    <section className="public-inspiration-banner">
      <div className="public-shell public-inspiration-banner-inner">
        <div>
          <span className="public-kicker"><Sparkles size={15}/> Inspirações de topos</span>
          <h1>Encontre uma ideia.<br/><em>Depois deixe com a sua cara.</em></h1>
          <p>Escolha um modelo para começar. Nome, idade, cores e nível de acabamento podem ser adaptados ao seu pedido.</p>
        </div>
        <div className="public-banner-summary">
          <strong>{topperInspirations.length}</strong>
          <span>inspirações disponíveis</span>
          <Link href="/monte-seu-topo">Já tenho uma ideia <ArrowUpRight size={15}/></Link>
        </div>
      </div>
    </section>

    <section className="public-gallery-section">
      <div className="public-shell">
        <TopperInspirationGallery/>
      </div>
    </section>

    <section className="public-inspiration-after">
      <div className="public-shell public-after-card">
        <div><span>Não encontrou exatamente o que imaginou?</span><h2>Seu topo não precisa copiar nenhum modelo.</h2><p>As inspirações são pontos de partida. Você pode enviar uma foto, referência ou descrever uma ideia totalmente diferente.</p></div>
        <Link className="public-primary-button" href="/monte-seu-topo">Montar meu topo <ArrowUpRight size={16}/></Link>
      </div>
    </section>

    <Footer settings={settings}/>
  </main>;
}
