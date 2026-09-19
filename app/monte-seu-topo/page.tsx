import type { Metadata } from 'next';
import { ArrowUpRight, Layers3, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopperBuilder from '@/components/TopperBuilder';
import { getSiteSettings } from '@/lib/db';

export const dynamic='force-dynamic';
export const metadata:Metadata={
  title:'Monte seu topo | Merlin Encantos em Papel',
  description:'Escolha o nível do topo de bolo, tema, nome, idade, tamanho do bolo e acabamento para receber um orçamento personalizado.'
};

export default async function TopperBuilderPage(){
  const settings=await getSiteSettings();
  return <main className="premium-site kf-theme kit-builder-page public-v712">
    <Header settings={settings}/>
    <section className="kit-builder-hero"><div className="container"><div className="kit-builder-hero-copy">
      <div className="eyebrow"><Layers3 size={14}/> Topos de bolo sob encomenda</div>
      <h1>Conte como você imagina<br/><em>o seu topo.</em></h1>
      <p>Do simples ao Elite, você escolhe o acabamento e passa apenas o essencial: tema, nome, idade, cores e tamanho do bolo. Não precisa ter tudo decidido para pedir o orçamento.</p>
      <div className="kit-builder-hero-actions"><a className="btn btn-primary btn-luxury" href="#montar-topo">Preencher meu briefing <ArrowUpRight size={16}/></a><a className="btn btn-ghost" href="/inspiracoes"><Sparkles size={16}/> Ver inspirações</a></div>
    </div><div className="kit-builder-hero-card" aria-hidden="true"><span>01</span><strong>Escolha o<br/>acabamento.</strong><i/><span>02</span><strong>Personalize<br/>os detalhes.</strong><i/><span>03</span><strong>Envie para<br/>orçamento.</strong></div></div></section>
    <section className="kit-builder-main" id="montar-topo"><div className="container"><TopperBuilder/></div></section>
    <Footer settings={settings}/>
  </main>;
}
