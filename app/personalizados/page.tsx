import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Bookmark, Box, Gift, KeyRound, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSiteSettings } from '@/lib/db';

export const dynamic='force-dynamic';

export const metadata:Metadata={
  title:'Papelaria & Personalizados | Merlin Encantos em Papel',
  description:'Marcadores de página, lembrancinhas, adesivos, chaveiros, caixinhas sob consulta e outros personalizados feitos sob encomenda.'
};

const products=[
  {id:'marcadores',icon:Bookmark,title:'Marcadores de Página',copy:'Modelos literários, temáticos ou totalmente personalizados.',href:'/monte-seu-pedido?produto=marcadores'},
  {id:'lembrancinhas',icon:Gift,title:'Lembrancinhas',copy:'Mimos, tags, embalagens e peças personalizadas para momentos especiais.',href:'/monte-seu-pedido?produto=lembrancinhas'},
  {id:'adesivos-chaveiros',icon:KeyRound,title:'Adesivos & Chaveiros',copy:'Personalização com nome, foto, tema ou arte de referência.',href:'/monte-seu-pedido?produto=chaveiros'},
  {id:'caixinhas',icon:Box,title:'Caixinhas — sob consulta',copy:'Caixinhas personalizadas feitas sob encomenda conforme modelo e quantidade.',href:'/monte-seu-pedido?produto=caixinhas'},
  {id:'outros',icon:Sparkles,title:'Outros Personalizados',copy:'Tem outra ideia? Envie sua referência e conte o que gostaria de produzir.',href:'/monte-seu-pedido?produto=outro'}
];

export default async function PersonalizadosPage(){
  const settings=await getSiteSettings();

  return <main className="premium-site public-v712 v8-storefront-page v8-storefront-personalizados v821-personalizados">
    <Header settings={settings}/>

    <section className="v8-storefront-hero">
      <div className="container">
        <span className="eyebrow"><Sparkles size={14}/> PERSONALIZADOS</span>
        <h1>Escolha o que precisa.<br/><em>A gente personaliza.</em></h1>
        <p>Produtos em papel feitos sob encomenda, com tema, cores, nome e detalhes escolhidos por você.</p>
      </div>
    </section>

    <section className="v8-storefront-grid-section" id="produtos">
      <div className="container">
        <div className="v8-storefront-grid">
          {products.map(product=>{
            const Icon=product.icon;
            return <Link href={product.href} id={product.id} className="v8-storefront-card v8-storefront-product-card" key={product.id}>
              <span className="v8-storefront-icon"><Icon size={22}/></span>
              <h2>{product.title}</h2>
              <p>{product.copy}</p>
              <b>Montar pedido <ArrowUpRight size={14}/></b>
            </Link>;
          })}
        </div>

        <div className="v8-storefront-note">
          <span>Trabalhamos com papelaria personalizada. Bolo, doces e decoração do ambiente não fazem parte do serviço.</span>
        </div>
      </div>
    </section>

    <Footer settings={settings}/>
  </main>;
}
