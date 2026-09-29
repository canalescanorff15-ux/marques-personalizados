import Link from 'next/link';
import { ArrowUpRight, Bookmark, Box, Gift, KeyRound, Layers3, MessageCircle, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import SafeImage from '@/components/SafeImage';
import { getSiteSettings } from '@/lib/db';
import { siteUrl } from '@/lib/config';
import { publicTopperInspirations } from '@/lib/topper-inspirations';

export const dynamic='force-dynamic';
function digits(v:string){return v.replace(/\D/g,'');}

const officialLogo='https://merlin-topper-assets.floot.app/_cdn/static/273a6c2e-69e9-460f-b9ca-fd60d3f2b2e5-merlin-logo-v821.webp';
const homeInspirationCodes=['INSP-TOP-74','INSP-TOP-92','INSP-TOP-104'];
// Compatibilidade V8.08: ['INSP-TOP-48','INSP-TOP-49','INSP-TOP-50']

const realWorks=[
  {src:'https://merlin-topper-assets.floot.app/_cdn/static/ec045c31-6c8f-45ba-a86b-29e10b606f07-topo-gotico-real.webp',alt:'Topo de bolo personalizado em vermelho e preto produzido pela Merlin',title:'Topo de bolo personalizado'},
  {src:'https://merlin-topper-assets.floot.app/_cdn/static/86d1c523-1929-44a6-b12d-fb14c113612d-marcadores-literarios-real.webp',alt:'Marcadores de página literários escuros e dourados produzidos pela Merlin',title:'Marcadores literários'},
  {src:'https://merlin-topper-assets.floot.app/_cdn/static/ab2c0dc2-2c23-4693-bb94-d2bd3de904dc-marcadores-personalizados-real.webp',alt:'Marcadores de página personalizados produzidos pela Merlin',title:'Marcadores personalizados'}
];

export default async function HomePage(){
  const settings=await getSiteSettings();
  const phone=digits(settings.whatsapp_number);
  const wa=phone?`https://wa.me/${phone}?text=${encodeURIComponent('Olá! Vim pelo site da Merlin Encantos em Papel e gostaria de pedir um orçamento de papelaria personalizada.')}`:'';
  const featuredInspirations=homeInspirationCodes.map(code=>publicTopperInspirations.find(item=>item.code===code)).filter(Boolean) as typeof publicTopperInspirations;
  const organizationJsonLd={"@context":"https://schema.org","@type":"Store",name:settings.brand_name,url:siteUrl||undefined,description:'Topos de bolo e papelaria personalizada feitos sob encomenda para festas e momentos especiais.',logo:officialLogo,telephone:settings.whatsapp_number,areaServed:settings.location};

  return <main className="premium-site kf-theme home-v672 home-v673 home-v680 public-v712 home-v717 home-v719 v8-clean-home v8-essential-home-v814 v821-home">
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
          <div><h2>O que fazemos.</h2></div>
          <Link href="/personalizados">Ver personalizados <ArrowUpRight size={15}/></Link>
        </div>

        <div className="v8-home-products-grid v8-clean-products-grid v821-product-grid">
          <Link href="/catalogo" className="v8-home-product-card is-featured"><span><Layers3 size={20}/></span><h3>Topos de Bolo</h3></Link>
          <Link href="/personalizados#marcadores" className="v8-home-product-card"><span><Bookmark size={19}/></span><h3>Marcadores de Página</h3></Link>
          <Link href="/personalizados#lembrancinhas" className="v8-home-product-card"><span><Gift size={19}/></span><h3>Lembrancinhas</h3></Link>
          <Link href="/personalizados#adesivos-chaveiros" className="v8-home-product-card"><span><KeyRound size={19}/></span><h3>Adesivos & Chaveiros</h3></Link>
          <Link href="/personalizados#caixinhas" className="v8-home-product-card"><span><Box size={19}/></span><h3>Caixinhas <small>sob consulta</small></h3></Link>
          <Link href="/personalizados#outros" className="v8-home-product-card"><span><Sparkles size={19}/></span><h3>Outros Personalizados</h3></Link>
        </div>
      </div>
    </section>

    <section className="v821-real-work" aria-labelledby="feito-por-nos">
      <div className="container">
        <div className="v8-clean-section-head" data-reveal>
          <div><h2 id="feito-por-nos">Feito por Nós</h2><p>Alguns trabalhos reais que já saíram do papel.</p></div>
        </div>
        <div className="v821-real-work-grid">
          {realWorks.map(item=><article className="v821-real-work-card" key={item.src}>
            <SafeImage src={item.src} fallback="/placeholder-topo.svg" alt={item.alt} width={720} height={920} sizes="(max-width: 720px) 100vw, 33vw"/>
            <div><small>TRABALHO REAL</small><strong>{item.title}</strong></div>
          </article>)}
        </div>
      </div>
    </section>

    <section className="home-v717-inspiration-story v8-clean-inspirations">
      <div className="container">
        <div className="home-v717-story-head v8-clean-section-head" data-reveal>
          <div><h2>Inspirações para <em>começar sua ideia.</em></h2><p>Referências para adaptar ao seu tema, nome, idade e cores.</p></div>
          <Link href="/inspiracoes">Ver todas <ArrowUpRight size={15}/></Link>
        </div>

        <div className="home-v717-gallery-grid v8-clean-gallery">
          {featuredInspirations.map(item=><Link className="home-v717-gallery-card" href={'/inspiracoes/'+item.code} key={item.code}>
            <img src={item.image} alt={'Inspiração de topo '+item.title}/>
            <div className="home-v717-gallery-info"><strong>{item.title}</strong></div>
          </Link>)}
        </div>

        <p className="v8-home-scope-note">As imagens desta seção são referências de inspiração. Bolo e cenário não estão inclusos.</p>
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
  </main>;
}
