import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, BookOpen, Box, Gift, KeyRound, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSiteSettings } from '@/lib/db';

export const dynamic='force-dynamic';

export const metadata:Metadata={
  title:'Papelaria & Personalizados | Merlin Encantos em Papel',
  description:'Marcadores de página, lembrancinhas, adesivos, chaveiros, caixinhas sob consulta e outros personalizados feitos sob encomenda.'
};

const products=[
  {id:'marcadores',icon:BookOpen,title:'Marcadores de Página',copy:'Literários, temáticos ou totalmente personalizados.',href:'/monte-seu-pedido?produto=marcadores',badge:'FEITO POR NÓS'},
  {id:'lembrancinhas',icon:Gift,title:'Lembrancinhas',copy:'Mimos, embalagens e peças personalizadas para presentear.',href:'/monte-seu-pedido?produto=lembrancinhas'},
  {id:'adesivos-chaveiros',icon:KeyRound,title:'Adesivos & Chaveiros',copy:'Personalização com nome, foto, arte ou tema.',href:'/monte-seu-pedido?produto=chaveiros'},
  {id:'caixinhas',icon:Box,title:'Caixinhas — sob consulta',copy:'Modelos como milk, bala, pirâmide e sushi preparados conforme o pedido.',href:'/monte-seu-pedido?produto=caixinhas',badge:'SOB CONSULTA'},
  {id:'outros',icon:Sparkles,title:'Outros Personalizados',copy:'Envie uma referência ou conte a sua ideia para avaliarmos.',href:'/monte-seu-pedido?produto=outro'}
];

export default async function PersonalizadosPage(){
  const settings=await getSiteSettings();

  return <main className="premium-site public-v712 v8-storefront-page v8-storefront-personalizados v821-personalizados">
    <Header settings={settings}/>

    <section className="v8-storefront-hero">
      <div className="container">
        <span className="eyebrow"><Sparkles size={14}/> PERSONALIZADOS</span>
        <h1>Escolha o que precisa.<br/><em>A gente personaliza.</em></h1>
        <p>Trabalhamos com papelaria personalizada sob encomenda. Se ainda estiver em dúvida, envie sua ideia pelo orçamento.</p>
      </div>
    </section>

    <section className="v8-storefront-grid-section" id="produtos">
      <div className="container">
        <div className="v8-storefront-grid">
          {products.map(product=>{
            const Icon=product.icon;
            return <Link href={product.href} id={product.id} className="v8-storefront-card v8-storefront-product-card" key={product.id}>
              <span className="v8-storefront-icon"><Icon size={22}/></span>
              {product.badge&&<small className="v821-product-badge">{product.badge}</small>}
              <h2>{product.title}</h2>
              <small className="v821-product-copy">{product.copy}</small>
              <b>Montar pedido <ArrowUpRight size={14}/></b>
            </Link>;
          })}
        </div>

        <div className="v8-storefront-note">
          <span>Produzimos papelaria personalizada. Não vendemos bolo, doces ou decoração completa.</span>
          <small>Caixinhas são avaliadas sob consulta conforme modelo, quantidade e prazo.</small>
        </div>
      </div>
    </section>

    <Footer settings={settings}/>
  </main>;
}
