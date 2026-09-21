import Link from 'next/link';
import { ArrowUpRight, Layers3, MessageCircle, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MerlinMobileDock from '@/components/MerlinMobileDock';
import JsonLd from '@/components/JsonLd';
import SafeImage from '@/components/SafeImage';
import { getSiteSettings } from '@/lib/db';
import { siteUrl } from '@/lib/config';
import { publicTopperInspirations } from '@/lib/topper-inspirations';

export const dynamic='force-dynamic';
function digits(v:string){return v.replace(/\D/g,'');}

const homeInspirationCodes=['INSP-TOP-48','INSP-TOP-49','INSP-TOP-50'];

export default async function HomePage(){
  const settings=await getSiteSettings();
  const phone=digits(settings.whatsapp_number);
  const wa=phone?`https://wa.me/${phone}?text=${encodeURIComponent('Olá! Vim pelo site da Merlin Encantos em Papel e gostaria de pedir um orçamento de papelaria personalizada.')}`:'';
  const featuredInspirations=homeInspirationCodes.map(code=>publicTopperInspirations.find(item=>item.code===code)).filter(Boolean) as typeof publicTopperInspirations;
  const organizationJsonLd={"@context":"https://schema.org","@type":"Store",name:settings.brand_name,url:siteUrl||undefined,description:'Topos de bolo e papelaria personalizada feitos sob encomenda para festas e momentos especiais.',logo:settings.logo_url||undefined,telephone:settings.whatsapp_number,areaServed:settings.location};

  return <main className="premium-site kf-theme home-v672 home-v673 home-v680 public-v712 home-v717 home-v719 v8-clean-home v8-essential-home-v814">
    <Header settings={settings}/>
    <JsonLd data={organizationJsonLd}/>

    <section className="hero premium-hero home-v717-hero v8-clean-hero" id="inicio">
      <div className="container hero-grid">
        <div className="hero-copy-column" data-reveal>
          <h1>Detalhes personalizados que fazem <span>o seu momento ter identidade.</span></h1>
          <p className="hero-copy">Topos de bolo e personalizados criados para combinar com o seu tema, suas cores e a sua comemoração.</p>
          <div className="hero-actions">
            <Link className="btn btn-primary btn-luxury" href="/inspiracoes">Ver inspirações <Sparkles size={17}/></Link>
            <Link className="btn btn-ghost" href="/orcamento">Pedir orçamento <ArrowUpRight size={16}/></Link>
          </div>
        </div>

        {featuredInspirations[0]&&<Link className="home-v717-showcase v8-clean-hero-media" href={'/inspiracoes/'+featuredInspirations[0].code} data-reveal>
          <img src={featuredInspirations[0].image} alt={'Inspiração de topo '+featuredInspirations[0].title}/>
        </Link>}
      </div>
    </section>

    <section className="v8-home-products v8-clean-products" id="personalizados">
      <div className="container">
        <div className="v8-clean-section-head" data-reveal>
          <div><h2>Escolha o que procura.</h2></div>
          <Link href="/personalizados">Ver todos os personalizados <ArrowUpRight size={15}/></Link>
        </div>

        <div className="v8-home-products-grid v8-clean-products-grid">
          <Link href="/catalogo" className="v8-home-product-card is-featured"><span><Layers3 size={20}/></span><h3>Topos de Bolo</h3></Link>
          <Link href="/personalizados#caixinhas" className="v8-home-product-card"><h3>Caixinhas</h3></Link>
          <Link href="/personalizados#lembrancinhas" className="v8-home-product-card"><h3>Lembrancinhas</h3></Link>
          <Link href="/personalizados#adesivos-chaveiros" className="v8-home-product-card"><h3>Adesivos & Chaveiros</h3></Link>
          <Link href="/personalizados#doces" className="v8-home-product-card"><h3>Doces & Complementos</h3></Link>
          <Link href="/personalizados#kits" className="v8-home-product-card"><h3>Kits</h3></Link>
        </div>
      </div>
    </section>

    <section className="home-v717-inspiration-story v8-clean-inspirations">
      <div className="container">
        <div className="home-v717-story-head v8-clean-section-head" data-reveal>
          <div><h2>Inspirações para <em>começar sua ideia.</em></h2></div>
          <Link href="/inspiracoes">Ver todas <ArrowUpRight size={15}/></Link>
        </div>

        <div className="home-v717-gallery-grid v8-clean-gallery">
          {featuredInspirations.map(item=><Link className="home-v717-gallery-card" href={'/inspiracoes/'+item.code} key={item.code}>
            <img src={item.image} alt={'Inspiração de topo '+item.title}/>
            <div className="home-v717-gallery-info"><strong>{item.title}</strong></div>
          </Link>)}
        </div>

        <p className="v8-home-scope-note">As fotos mostram o topo aplicado ao bolo. Bolo e cenário não estão inclusos.</p>
      </div>
    </section>

    <section className="v8-clean-contact" id="contato">
      <div className="container home-v717-contact-shell">
        <div><h2>Conte sua ideia.</h2></div>
        <div>
          <Link className="btn btn-primary btn-luxury" href="/monte-seu-pedido">Monte seu Pedido <ArrowUpRight size={16}/></Link>
          {wa&&<a className="btn btn-ghost" href={wa} target="_blank" rel="noreferrer"><MessageCircle size={16}/> WhatsApp</a>}
        </div>
      </div>
    </section>

    <Footer settings={settings}/>
    <MerlinMobileDock whatsapp={wa}/>
  </main>;
}
