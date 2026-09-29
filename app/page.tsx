import Link from 'next/link';
import { ArrowUpRight, BookOpen, Box, Gift, KeyRound, Layers3, MessageCircle, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import SafeImage from '@/components/SafeImage';
import { getSiteSettings } from '@/lib/db';
import { siteUrl } from '@/lib/config';
import { publicTopperInspirations } from '@/lib/topper-inspirations';

export const dynamic='force-dynamic';
function digits(v:string){return v.replace(/\D/g,'');}

const OFFICIAL_LOGO='https://merlin-topper-assets.floot.app/_cdn/static/fc9617e0-d9e3-4afa-b08f-4a93729b0aed-merlin-logo-oficial.webp';
const homeInspirationCodes=['INSP-TOP-74','INSP-TOP-92','INSP-TOP-104'];
// Compatibilidade V8.08: ['INSP-TOP-48','INSP-TOP-49','INSP-TOP-50']

const realWork=[
  {src:'https://merlin-topper-assets.floot.app/_cdn/static/4a19b88c-1f47-4413-9d77-390a25cef683-trabalho-topo-gotico-real.webp',title:'Topo de bolo personalizado',copy:'Produção real feita sob encomenda.'},
  {src:'https://merlin-topper-assets.floot.app/_cdn/static/a6f584d3-5ac8-45d7-b179-b9ec7c3da8fb-trabalho-marcadores-literarios-real.webp',title:'Marcadores literários',copy:'Marcadores impressos e recortados por nós.'},
  {src:'https://merlin-topper-assets.floot.app/_cdn/static/ee9a825f-1ab3-479d-83d0-806944f52709-trabalho-marcadores-personalizados-real.webp',title:'Marcadores personalizados',copy:'Temas e estilos diferentes conforme o pedido.'}
];

export default async function HomePage(){
  const settings=await getSiteSettings();
  const phone=digits(settings.whatsapp_number);
  const wa=phone?`https://wa.me/${phone}?text=${encodeURIComponent('Olá! Vim pelo site da Merlin Encantos em Papel e gostaria de pedir um orçamento de papelaria personalizada.')}`:'';
  const featuredInspirations=homeInspirationCodes.map(code=>publicTopperInspirations.find(item=>item.code===code)).filter(Boolean) as typeof publicTopperInspirations;
  const organizationJsonLd={"@context":"https://schema.org","@type":"Store",name:settings.brand_name,url:siteUrl||undefined,description:'Topos de bolo e papelaria personalizada feitos sob encomenda para festas e momentos especiais.',logo:OFFICIAL_LOGO,telephone:settings.whatsapp_number,areaServed:settings.location};

  return <main className="premium-site kf-theme home-v672 home-v673 home-v680 public-v712 home-v717 home-v719 v8-clean-home v8-essential-home-v814 v821-home">
    <Header settings={settings}/>
    <JsonLd data={organizationJsonLd}/>

    <section className="hero premium-hero home-v717-hero v8-clean-hero v821-home-hero" id="inicio">
      <div className="container">
        <div className="hero-copy-column" data-reveal>
          <h1>Detalhes personalizados que fazem <span>o seu momento ter identidade.</span></h1>
          <p className="hero-copy">Topos de bolo, marcadores e personalizados feitos sob encomenda para combinar com o seu tema e a sua comemoração.</p>
          <div className="hero-actions">
            <Link className="btn btn-primary btn-luxury" href="/inspiracoes">Ver inspirações <Sparkles size={17}/></Link>
            <Link className="btn btn-ghost" href="/orcamento">Pedir orçamento <ArrowUpRight size={16}/></Link>
          </div>
        </div>
      </div>
    </section>

    <section className="v8-home-products v8-clean-products" id="personalizados">
      <div className="container">
        <div className="v8-clean-section-head" data-reveal>
          <div><h2>O que fazemos.</h2></div>
          <Link href="/personalizados">Ver personalizados <ArrowUpRight size={15}/></Link>
        </div>

        <div className="v8-home-products-grid v8-clean-products-grid v821-service-grid">
          <Link href="/catalogo" className="v8-home-product-card is-featured"><span><Layers3 size={20}/></span><h3>Topos de Bolo</h3></Link>
          <Link href="/personalizados#marcadores" className="v8-home-product-card"><span><BookOpen size={20}/></span><h3>Marcadores de Página</h3></Link>
          <Link href="/personalizados#lembrancinhas" className="v8-home-product-card"><span><Gift size={20}/></span><h3>Lembrancinhas</h3></Link>
          <Link href="/personalizados#adesivos-chaveiros" className="v8-home-product-card"><span><KeyRound size={20}/></span><h3>Adesivos & Chaveiros</h3></Link>
          <Link href="/personalizados#caixinhas" className="v8-home-product-card"><span><Box size={20}/></span><h3>Caixinhas — sob consulta</h3></Link>
          <Link href="/monte-seu-pedido?produto=outro" className="v8-home-product-card"><span><Sparkles size={20}/></span><h3>Outros Personalizados</h3></Link>
        </div>
      </div>
    </section>

    <section className="v821-real-work" aria-labelledby="feito-por-nos">
      <div className="container">
        <div className="v8-clean-section-head" data-reveal>
          <div><h2 id="feito-por-nos">Feito por Nós</h2><p>Fotos de trabalhos que já produzimos de verdade.</p></div>
          <Link href="/personalizados">Quero algo personalizado <ArrowUpRight size={15}/></Link>
        </div>
        <div className="v821-real-work-grid">
          {realWork.map(item=><article className="v821-real-work-card" key={item.src}>
            <SafeImage src={item.src} alt={item.title} width={900} height={1100} sizes="(max-width: 700px) 100vw, 33vw"/>
            <div><strong>{item.title}</strong><small>{item.copy}</small></div>
          </article>)}
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

        <p className="v8-home-scope-note">As imagens desta seção são inspirações. Bolo e cenário não estão inclusos.</p>
      </div>
    </section>

    <section className="v8-clean-contact" id="contato">
      <div className="container home-v717-contact-shell">
        <div><h2>Conte sua ideia.</h2><p>Escolha o produto, informe os detalhes e envie o pedido.</p></div>
        <div>
          <Link className="btn btn-primary btn-luxury" href="/monte-seu-pedido">Monte seu Pedido <ArrowUpRight size={16}/></Link>
          {wa&&<a className="btn btn-ghost" href={wa} target="_blank" rel="noreferrer"><MessageCircle size={16}/> WhatsApp</a>}
        </div>
      </div>
    </section>

    <Footer settings={settings}/>
  </main>;
}
