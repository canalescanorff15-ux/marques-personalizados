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
  {id:'marcadores',icon:BookOpen,title:'Marcadores de Página',copy:'Literários, temáticos ou totalmente personalizados.',href:'/monte-seu-pedido?produto=marcadores',badge:'Já fazemos'},
  {id:'lembrancinhas',icon:Gift,title:'Lembrancinhas',copy:'Mimos, embalagens e peças personalizadas para ocasiões especiais.',href:'/monte-seu-pedido?produto=lembrancinhas',badge:'Sob encomenda'},
  {id:'adesivos-chaveiros',icon:KeyRound,title:'Adesivos & Chaveiros',copy:'Personalização com nome, foto, frase ou tema.',href:'/monte-seu-pedido?produto=chaveiros',badge:'Já fazemos'},
  {id:'caixinhas',icon:Box,title:'Caixinhas',copy:'Milk, bala, pirâmide, sushi e outros modelos conforme a referência.',href:'/monte-seu-pedido?produto=caixinhas',badge:'Sob consulta'},
  {id:'outros',icon:Sparkles,title:'Outros Personalizados',copy:'Envie sua referência e conte o que você gostaria de produzir.',href:'/monte-seu-pedido?produto=outro',badge:'Sob consulta'}
];

export default async function PersonalizadosPage(){
  const settings=await getSiteSettings();

  return <main className="premium-site public-v712 v8-storefront-page v8-storefront-personalizados v821-personalizados">
    <Header settings={settings}/>

    <section className="v8-storefront-hero v821-storefront-hero">
      <div className="container">
        <span className="eyebrow"><Sparkles size={14}/> PERSONALIZADOS</span>
        <h1>Escolha o que você quer <em>personalizar.</em></h1>
        <p>Trabalhamos sob encomenda. Se tiver uma referência, pode enviar junto com o pedido.</p>
      </div>
    </section>

    <section className="v8-storefront-grid-section" id="produtos">
      <div className="container">
        <div className="v8-storefront-grid v821-personalizados-grid">
          {products.map(product=>{
            const Icon=product.icon;
            return <Link href={product.href} id={product.id} className="v8-storefront-card v8-storefront-product-card v821-personalizado-card" key={product.id}>
              <span className="v8-storefront-icon"><Icon size={22}/></span>
              <small>{product.badge}</small>
              <h2>{product.title}</h2>
              <p>{product.copy}</p>
              <b>Montar pedido <ArrowUpRight size={14}/></b>
            </Link>;
          })}
        </div>

        <div className="v8-storefront-note v821-scope-note">
          <span>Não produzimos bolo, brigadeiros, bombons ou outros alimentos. Nosso trabalho é a papelaria personalizada e seus complementos em papel.</span>
        </div>
      </div>
    </section>

    <Footer settings={settings}/>
  </main>;
}
