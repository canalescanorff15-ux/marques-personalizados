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
  return <main className="premium-site kf-theme kit-builder-page">
    <Header settings={settings}/>
    <section className="kit-builder-hero"><div className="container"><div className="kit-builder-hero-copy">
      <div className="eyebrow"><Layers3 size={14}/> Topos de bolo sob encomenda</div>
      <h1>Monte seu topo.<br/><em>Do simples ao Elite.</em></h1>
      <p>Escolha o nível de acabamento e passe o essencial: tema, nome, idade, cores e tamanho do bolo. O projeto final é personalizado para você.</p>
      <div className="kit-builder-hero-actions"><a className="btn btn-primary btn-luxury" href="#montar-topo">Começar agora <ArrowUpRight size={16}/></a><a className="btn btn-ghost" href="/catalogo"><Sparkles size={16}/> Ver níveis de topo</a></div>
    </div><div className="kit-builder-hero-card" aria-hidden="true"><span>01</span><strong>Escolha<br/>o nível.</strong><i/><span>02</span><strong>Defina<br/>o tema.</strong><i/><span>03</span><strong>Envie para<br/>orçamento.</strong></div></div></section>
    <section className="kit-builder-main" id="montar-topo"><div className="container"><TopperBuilder/></div></section>
    <Footer settings={settings}/>
  </main>;
}
