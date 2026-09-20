import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, Layers3, MessageCircle, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopperLevelVisual from '@/components/TopperLevelVisual';
import MerlinMobileDock from '@/components/MerlinMobileDock';
import JsonLd from '@/components/JsonLd';
import SafeImage from '@/components/SafeImage';
import { getSiteSettings } from '@/lib/db';
import { siteUrl } from '@/lib/config';
import { topperLevels } from '@/lib/topper-catalog';
import { publicTopperInspirations } from '@/lib/topper-inspirations';

export const dynamic='force-dynamic';
function digits(v:string){return v.replace(/\D/g,'');}

const homeInspirationCodes=['INSP-TOP-48','INSP-TOP-49','INSP-TOP-50'];

export default async function HomePage(){
  const settings=await getSiteSettings();
  const phone=digits(settings.whatsapp_number);
  const wa=phone?`https://wa.me/${phone}?text=${encodeURIComponent('Olá! Vim pelo site da Merlin Encantos em Papel e gostaria de pedir um orçamento de papelaria personalizada.')}`:'';
  const featuredInspirations=homeInspirationCodes.map(code=>publicTopperInspirations.find(item=>item.code===code)).filter(Boolean) as typeof publicTopperInspirations;
  const featuredLevels=['essencial','premium','elite-shaker-acetato']
    .map(slug=>topperLevels.find(level=>level.slug===slug))
    .filter(Boolean) as typeof topperLevels;
  const organizationJsonLd={"@context":"https://schema.org","@type":"Store",name:settings.brand_name,url:siteUrl||undefined,description:'Topos de bolo e papelaria personalizada feitos sob encomenda para festas e momentos especiais.',logo:settings.logo_url||undefined,telephone:settings.whatsapp_number,areaServed:settings.location};

  return <main className="premium-site kf-theme home-v672 home-v673 home-v680 public-v712 home-v717 home-v719 v8-clean-home">
    <Header settings={settings}/>
    <JsonLd data={organizationJsonLd}/>

    <section className="hero premium-hero home-v717-hero v8-clean-hero" id="inicio">
      <div className="container hero-grid">
        <div className="hero-copy-column" data-reveal>
          <div className="home-v718-brand-signature">
            <span><SafeImage src={settings.logo_url||'/merlin-logo.webp'} fallback="/merlin-logo.webp" alt="" width={58} height={54} sizes="58px" priority/></span>
            <div><strong>Merlin Encantos em Papel</strong><small>Topos de bolo • Papelaria personalizada</small></div>
          </div>
          <div className="eyebrow">MERLIN • TOPOS DE BOLO PERSONALIZADOS • PAPELARIA PERSONALIZADA</div>
          <h1>Detalhes personalizados que fazem <span>o seu momento ter identidade.</span></h1>
          <p className="hero-copy">Topos de bolo e personalizados criados para combinar com o seu tema, suas cores e a sua comemoração.</p>
          <div className="hero-actions">
            <Link className="btn btn-primary btn-luxury" href="/inspiracoes">Ver inspirações <Sparkles size={17}/></Link>
            <Link className="btn btn-ghost" href="/orcamento">Pedir orçamento <ArrowUpRight size={16}/></Link>
          </div>
        </div>

        {featuredInspirations[0]&&<Link className="home-v717-showcase v8-clean-hero-media" href={'/inspiracoes/'+featuredInspirations[0].code} data-reveal>
          <img src={featuredInspirations[0].image} alt={'Inspiração '+featuredInspirations[0].title}/>
          <div><small>INSPIRAÇÃO EM DESTAQUE</small><strong>{featuredInspirations[0].title}</strong></div>
        </Link>}
      </div>
    </section>

    <section className="home-v717-intro-strip v8-clean-trust" aria-label="Diferenciais">
      <div className="container">
        <span><CheckCircle2 size={15}/><strong>Feito sob encomenda</strong></span>
        <span><CheckCircle2 size={15}/><strong>Personalizável</strong></span>
        <span><CheckCircle2 size={15}/><strong>Orçamento confirmado antes da produção</strong></span>
      </div>
    </section>

    <section className="v8-home-products v8-clean-products" id="personalizados">
      <div className="container">
        <div className="v8-clean-section-head" data-reveal>
          <div><small>ESCOLHA O QUE PROCURA</small><h2>Poucas escolhas.<br/><em>Mais clareza.</em></h2></div>
          <Link href="/personalizados">Ver todos os personalizados <ArrowUpRight size={15}/></Link>
        </div>

        <div className="v8-home-products-grid v8-clean-products-grid">
          <Link href="/inspiracoes" className="v8-home-product-card is-featured"><span><Layers3 size={20}/></span><h3>Topos de Bolo</h3></Link>
          <Link href="/personalizados#caixinhas" className="v8-home-product-card"><h3>Caixinhas</h3></Link>
          <Link href="/personalizados#lembrancinhas" className="v8-home-product-card"><h3>Lembrancinhas</h3></Link>
          <Link href="/personalizados#adesivos-chaveiros" className="v8-home-product-card"><h3>Adesivos & Chaveiros</h3></Link>
          <Link href="/personalizados#doces" className="v8-home-product-card"><h3>Doces & Complementos</h3></Link>
          <Link href="/personalizados#kits" className="v8-home-product-card"><h3>Kits</h3></Link>
        </div>
      </div>
    </section>

    <section className="category-showcase premium-categories home-categories home-v717-levels v8-clean-levels" id="topos">
      <div className="container">
        <div className="v8-clean-section-head" data-reveal>
          <div><small>TOPOS DE BOLO</small><h2>Escolha o acabamento<br/><em>sem complicação.</em></h2></div>
          <Link href="/catalogo">Comparar todos os níveis <ArrowUpRight size={15}/></Link>
        </div>
        <div className="home-v717-level-grid v8-clean-level-grid">
          {featuredLevels.map(level=><Link href={'/catalogo/'+level.slug} key={level.slug}>
            <TopperLevelVisual level={level} compact/>
            <div><small>{level.eyebrow}</small><strong>{level.name}</strong></div>
          </Link>)}
        </div>
        <p className="v8-clean-level-note">Do essencial ao Elite com shaker e acetato. O tamanho do bolo ajuda a definir a proporção final.</p>

        <details className="home-v717-detail-grid v8-clean-extra-details">
          <summary>Quer entender melhor os acabamentos?</summary>
          <div><span>Camadas 3D</span><span>Shaker</span><span>Acetato</span></div>
        </details>
      </div>
    </section>

    <section className="home-v717-inspiration-story v8-clean-inspirations">
      <div className="container">
        <div className="home-v717-story-head v8-clean-section-head" data-reveal>
          <div><small>INSPIRAÇÕES</small><h2>Veja o produto.<br/><em>Escolha a sua direção.</em></h2></div>
          <Link href="/inspiracoes">Abrir galeria completa <ArrowUpRight size={15}/></Link>
        </div>
        <div className="home-v717-gallery-grid v8-clean-gallery">
          {featuredInspirations.map(item=><Link className="home-v717-gallery-card" href={'/inspiracoes/'+item.code} key={item.code}>
            <img src={item.image} alt={'Inspiração de topo '+item.title}/>
            <div className="home-v717-gallery-info"><small>{item.category}</small><strong>{item.title}</strong></div>
          </Link>)}
        </div>
      </div>
    </section>

    <section className="event-pathways kf-order-pathways home-start home-v717-process v8-clean-process" id="como-pedir">
      <div className="container">
        <div className="v8-clean-section-head" data-reveal>
          <div><small>COMO PEDIR</small><h2>Três passos.<br/><em>Só o necessário.</em></h2></div>
        </div>
        <div className="home-v717-process-grid v8-clean-process-grid">
          <Link href="/inspiracoes"><b>01</b><strong>Escolha uma inspiração</strong></Link>
          <Link href="/monte-seu-pedido"><b>02</b><strong>Conte os detalhes</strong></Link>
          <Link href="/orcamento"><b>03</b><strong>Receba o orçamento</strong></Link>
        </div>
      </div>
    </section>

    <section className="public-home-about v8-clean-about" id="sobre">
      <div className="container home-v717-about-grid">
        <div><small>SOBRE A MERLIN</small><h2>Personalizado, bonito e pensado para o seu pedido.</h2></div>
        <p>A inspiração é o começo. Cores, nome, idade e detalhes podem ser adaptados para deixar o resultado com a sua cara.</p>
      </div>
    </section>

    <section className="public-home-faq home-v717-faq v8-clean-faq" id="duvidas">
      <div className="container">
        <div className="v8-clean-section-head"><div><small>DÚVIDAS RÁPIDAS</small><h2>Antes de pedir.</h2></div></div>
        <div className="public-home-faq-grid">
          <details><summary>O bolo e a decoração da foto estão inclusos?</summary><p>Não. As imagens mostram a inspiração do produto. Bolo, doces, mesa, painel, balões e cenário não estão inclusos por padrão.</p></details>
          <details><summary>Posso enviar uma foto ou referência minha?</summary><p>Sim. Você pode enviar sua própria referência e pedir uma adaptação.</p></details>
          <details><summary>Vocês fazem outros personalizados além de topo de bolo?</summary><p>Sim. Há caixinhas, lembrancinhas, adesivos, chaveiros, itens para doces e kits personalizados.</p></details>
        </div>
      </div>
    </section>

    <section className="v8-clean-contact" id="contato">
      <div className="container home-v717-contact-shell">
        <div><small>PRONTO PARA COMEÇAR?</small><h2>Conte sua ideia.</h2></div>
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
