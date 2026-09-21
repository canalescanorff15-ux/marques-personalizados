import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OrderBuilder from '@/components/OrderBuilder';
import { getSiteSettings } from '@/lib/db';

export const dynamic='force-dynamic';

export const metadata:Metadata={
  title:'Monte seu pedido | Merlin Encantos em Papel',
  description:'Escolha o produto, informe tema, cores, quantidade e detalhes e envie seu briefing para receber um orçamento personalizado.'
};

export default async function OrderBuilderPage(){
  const settings=await getSiteSettings();
  return <main className="premium-site public-v712 v8-order-page v8-order-minimal-v815">
    <Header settings={settings}/>

    <section className="v8-order-hero">
      <div className="container">
        <div>
          <div className="eyebrow"><Sparkles size={14}/> PEDIDO PERSONALIZADO</div>
          <h1>Escolha o produto.<br/><em>Conte como você imagina.</em></h1>
          <p>Escolha o produto e conte os detalhes do seu pedido.</p>
          <div className="hero-actions">
            <a className="btn btn-primary btn-luxury" href="#montar-pedido">Começar meu pedido <ArrowUpRight size={16}/></a>
            <Link className="btn btn-ghost" href="/inspiracoes">Ver inspirações <Sparkles size={16}/></Link>
          </div>
        </div>

      </div>
    </section>

    <section className="v8-order-main" id="montar-pedido">
      <div className="container"><OrderBuilder/></div>
    </section>

    <Footer settings={settings}/>
  </main>;
}
