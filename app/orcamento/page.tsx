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
  return <main className="premium-site public-v712 v8-order-page v8-order-minimal-v815 v821-order-compact">
    <Header settings={settings}/>
    <section className="v8-order-hero">
      <div className="container">
        <div>
          <div className="eyebrow">ORÇAMENTO PERSONALIZADO</div>
          <h1>Seu pedido,<br/><em>sem complicação.</em></h1>
          <p>Escolha o produto, informe os detalhes e envie. No final, o WhatsApp abre com o resumo pronto.</p>
        </div>
      </div>
    </section>
    <section className="v8-order-main"><div className="container"><OrderBuilder/></div></section>
    <Footer settings={settings}/>
  </main>;
}
