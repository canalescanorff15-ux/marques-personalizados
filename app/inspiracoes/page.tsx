import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Gem, Gift, Heart, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopperInspirationGallery from '@/components/TopperInspirationGallery';
import { getSiteSettings } from '@/lib/db';
import { topperInspirations } from '@/lib/topper-inspirations';

export const dynamic='force-dynamic';
export const metadata:Metadata={
  title:'Inspirações de topos | Merlin Encantos em Papel',
  description:'Explore inspirações premium de topos de bolo em cenários de festa, filtre por categoria e personalize o modelo que mais combina com o seu momento.'
};

export default async function InspirationsPage(){
  const settings=await getSiteSettings();
  return <main className="merlin-public public-inspirations-page public-v712 public-inspirations-v721">
    <Header settings={settings}/>

    <section className="public-inspiration-banner public-inspiration-banner-v721">
      <div className="public-shell public-inspiration-banner-inner-v721">
        <div className="public-inspiration-hero-copy">
          <div className="public-inspiration-index"><strong>02</strong><i/><span>INSPIRAÇÕES</span></div>
          <span className="public-kicker">VEJA ANTES DE IMAGINAR</span><span className="sr-only">Escolha o estilo que mais se aproxima da sua ideia.</span>
          <h1>Referências que ajudam a<br/><em>enxergar o resultado.</em></h1>
          <p>Explore ideias reais com topos de bolo em cenários completos de festa. Veja composições, paletas e estilos; depois adapte tudo para o seu pedido. Cada detalhe é pensado para ficar lindo no seu tema e no seu bolo.</p>
        </div>

        <div className="public-inspiration-benefits" aria-label="Diferenciais">
          <article><span><Gem size={20}/></span><div><strong>Design exclusivo</strong><small>Artes únicas e personalizadas</small></div></article>
          <article><span><Gift size={20}/></span><div><strong>Para todos os temas</strong><small>Infantil, adulto, casamento e mais</small></div></article>
          <article><span><Heart size={20}/></span><div><strong>Feito com carinho</strong><small>Do seu jeito, para o seu momento</small></div></article>
        </div>
      </div>
    </section>

    <section className="public-gallery-section public-gallery-section-v721">
      <div className="public-shell">
        <TopperInspirationGallery/>
      </div>
    </section>

    <section className="public-inspiration-after public-inspiration-after-v721">
      <div className="public-shell public-after-card public-after-card-v721">
        <div className="public-after-points">
          <span><Sparkles size={16}/> Topos de bolo personalizados</span>
          <span><Heart size={16}/> Feito para combinar com o seu tema e o seu bolo</span>
          <span><Gem size={16}/> Qualidade em cada detalhe</span>
        </div>
        <Link className="public-after-cta-v721" href="/inspiracoes?favoritos=1">Ver meus favoritos <ArrowUpRight size={16}/></Link>
      </div>
    </section>

    <section className="public-inspiration-custom-cta">
      <div className="public-shell">
        <div>
          <span>Não encontrou exatamente o que imaginou?</span>
          <h2>A referência pode vir de qualquer lugar.</h2>
          <p>Envie uma foto, uma paleta, um tema ou descreva o que você quer. As inspirações do site existem para facilitar a conversa, não para limitar a criação.</p>
        </div>
        <Link className="public-primary-button" href="/monte-seu-topo">Contar minha ideia <ArrowUpRight size={16}/></Link>
      </div>
    </section>

    <Footer settings={settings}/>
  </main>;
}
