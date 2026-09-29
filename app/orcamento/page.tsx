import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OrderBuilder from '@/components/OrderBuilder';
import { getSiteSettings } from '@/lib/db';

export const dynamic='force-dynamic';
export const metadata:Metadata={
  title:'Orçamento personalizado | Merlin Encantos em Papel',
  description:'Escolha o produto, informe os detalhes e envie o pedido para o WhatsApp da Merlin Encantos em Papel.',
  robots:{index:false,follow:true}
};

export default async function QuotePage(){
  const settings=await getSiteSettings();
  return <main className="premium-site public-v712 v8-order-page v8-order-minimal-v815 v821-order-page">
    <Header settings={settings}/>
    <section className="v8-order-hero v821-order-hero">
      <div className="container">
        <div>
          <div className="eyebrow">ORÇAMENTO</div>
          <h1>Escolha. Personalize. <em>Envie.</em></h1>
          <p>Preencha apenas o necessário. No final, o resumo abre pronto no WhatsApp.</p>
        </div>
      </div>
    </section>
    <section className="v8-order-main" id="montar-pedido"><div className="container"><OrderBuilder/></div></section>
    <Footer settings={settings}/>
  </main>;
}
