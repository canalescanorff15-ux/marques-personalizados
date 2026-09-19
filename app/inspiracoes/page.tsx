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
  return <main className="merlin-public public-inspirations-page public-v712">
    <Header settings={settings}/>

    <section className="public-inspiration-banner">
      <div className="public-shell public-inspiration-banner-inner">
        <div>
          <span className="public-kicker"><Sparkles size={15}/> Inspirações de topos</span>
          <h1>Escolha o estilo que mais se aproxima<br/><em>da sua ideia.</em></h1>
          <p>Use as inspirações como referência visual. Você não precisa copiar um modelo: nome, idade, cores, elementos e nível de acabamento podem ser adaptados ao seu pedido.</p>
        </div>
        <div className="public-banner-summary">
          <strong>{topperInspirations.length}</strong>
          <span>referências para comparar com calma</span>
          <Link href="/monte-seu-topo">Já sei o que quero <ArrowUpRight size={15}/></Link>
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
        <div><span>Não encontrou exatamente o que imaginou?</span><h2>A referência pode vir de qualquer lugar.</h2><p>Envie uma foto, uma paleta, um tema ou descreva o que você quer. As inspirações do site existem para facilitar a conversa, não para limitar a criação.</p></div>
        <Link className="public-primary-button" href="/monte-seu-topo">Contar minha ideia <ArrowUpRight size={16}/></Link>
      </div>
    </section>

    <Footer settings={settings}/>
  </main>;
}
