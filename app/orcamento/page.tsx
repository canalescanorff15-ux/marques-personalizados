import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OrderBuilder from '@/components/OrderBuilder';
import { getSiteSettings } from '@/lib/db';

export const dynamic='force-dynamic';
export const metadata:Metadata={
  title:'Orçamento personalizado | Merlin Encantos em Papel',
  description:'Escolha o produto e envie tema, quantidade, cores e detalhes para receber um orçamento personalizado.',
  robots:{index:false,follow:true}
};

export default async function QuotePage(){
  const settings=await getSiteSettings();
  return <main className="premium-site public-v712 v8-order-page">
    <Header settings={settings}/>
    <section className="v8-order-hero">
      <div className="container">
        <div>
          <div className="eyebrow">ORÇAMENTO PERSONALIZADO</div>
          <h1>Conte sua ideia.<br/><em>Escolha o produto.</em></h1>
          <p>Topos, caixinhas, lembrancinhas, chaveiros, adesivos, itens para doces, kits e outros personalizados. O formulário adapta as perguntas conforme o produto escolhido.</p>
        </div>
        <aside className="v8-order-hero-card" aria-label="Sobre o orçamento">
          <span><b>01</b><strong>Escolha o produto</strong></span>
          <span><b>02</b><strong>Informe os detalhes</strong></span>
          <span><b>03</b><strong>Receba a confirmação</strong></span>
        </aside>
      </div>
    </section>
    <section className="v8-order-main"><div className="container"><OrderBuilder/></div></section>
    <Footer settings={settings}/>
  </main>;
}
