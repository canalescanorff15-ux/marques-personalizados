import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Box, Gift, KeyRound, PackageOpen, Sparkles, Sticker } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSiteSettings } from '@/lib/db';

export const dynamic='force-dynamic';

export const metadata:Metadata={
  title:'Papelaria & Personalizados | Merlin Encantos em Papel',
  description:'Caixinhas, lembrancinhas, adesivos, chaveiros, itens para doces e kits personalizados sob encomenda.'
};

const products=[
  {id:'caixinhas',icon:Box,title:'Caixinhas',copy:'Milk, bala, pirâmide, sushi e outros modelos.',href:'/monte-seu-pedido?produto=caixinhas'},
  {id:'lembrancinhas',icon:Gift,title:'Lembrancinhas',copy:'Mimos, embalagens e peças personalizadas.',href:'/monte-seu-pedido?produto=lembrancinhas'},
  {id:'adesivos-chaveiros',icon:KeyRound,title:'Adesivos & Chaveiros',copy:'Personalização com nome, foto ou tema.',href:'/monte-seu-pedido?produto=chaveiros'},
  {id:'doces',icon:Sticker,title:'Doces & Complementos',copy:'Toppers, wrappers, tags e plaquinhas.',href:'/monte-seu-pedido?produto=doces'},
  {id:'kits',icon:PackageOpen,title:'Kits Personalizados',copy:'Peças combinadas com a mesma identidade visual.',href:'/monte-seu-pedido?produto=kit'},
  {id:'outros',icon:Sparkles,title:'Outros Personalizados',copy:'Envie sua referência e conte a sua ideia.',href:'/monte-seu-pedido?produto=outro'}
];

export default async function PersonalizadosPage(){
  const settings=await getSiteSettings();

  return <main className="premium-site public-v712 v8-storefront-page v8-storefront-personalizados">
    <Header settings={settings}/>

    <section className="v8-storefront-hero">
      <div className="container">
        <span className="eyebrow"><Sparkles size={14}/> PERSONALIZADOS</span>
        <h1>Escolha o produto.<br/><em>A gente personaliza.</em></h1>
        <p>Escolha a categoria e monte seu pedido.</p>
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
              <b>Montar pedido <ArrowUpRight size={14}/></b>
            </Link>;
          })}
        </div>

        <div className="v8-storefront-note">
          <span>Referências mostram o produto. Cenário e decoração não estão inclusos por padrão.</span>
        </div>
      </div>
    </section>

    <Footer settings={settings}/>
  </main>;
}
