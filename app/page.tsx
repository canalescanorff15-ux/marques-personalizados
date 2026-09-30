import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, BookOpen, Box, Gift, KeyRound, Layers3, MessageCircle, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import HomeRealWorkCarousel from '@/components/HomeRealWorkCarousel';
import { getSiteSettings } from '@/lib/db';
import { siteUrl } from '@/lib/config';
import { publicTopperInspirations } from '@/lib/topper-inspirations';

export const dynamic='force-dynamic';
function digits(v:string){return v.replace(/\D/g,'');}

const OFFICIAL_LOGO='https://merlin-topper-assets.floot.app/_cdn/static/7a6e5cde-d985-43f2-8086-bab7676c0660-merlin-logo-oficial.webp';
const REAL_WORKS=[
  {src:'https://merlin-topper-assets.floot.app/_cdn/static/a49f67d2-8791-4123-a284-22150488ab15-topo-gotico-real.webp',title:'Topo de bolo personalizado',copy:'Produção real • camadas e acabamento temático',fitScale:.78,fitPosition:'50% 50%'},
  {src:'https://merlin-topper-assets.floot.app/_cdn/static/f67e7060-7eee-4c2e-afb4-662a2491768c-marcadores-literarios-real.webp',title:'Marcadores literários',copy:'Produção real • impressão, corte e acabamento',fitScale:.92,fitPosition:'50% 50%'},
  {src:'https://merlin-topper-assets.floot.app/_cdn/static/61eafead-9c67-4a4d-b160-18980f734786-marcadores-personalizados-real.webp',title:'Marcadores personalizados',copy:'Produção real • temas variados e sob encomenda',fitScale:.9,fitPosition:'50% 50%'},
  {src:'https://merlin-topper-assets.floot.app/_cdn/static/3c3a473f-0045-4027-a9a7-d04623c6d5b8-topo-dragon-ball-real-2026-09-28.jpeg',title:'Topo temático em camadas',copy:'Produção real • impressão, recorte, volume e haste em acetato',fitScale:.82,fitPosition:'50% 50%'}
];
const homeInspirationCodes=['INSP-TOP-74','INSP-TOP-86','INSP-TOP-98'];
// Compatibilidade V8.08: ['INSP-TOP-48','INSP-TOP-49','INSP-TOP-50']

export default async function HomePage(){
  const settings=await getSiteSettings();
  const phone=digits(settings.whatsapp_number);
  const wa=phone?`https://wa.me/${phone}?text=${encodeURIComponent('Olá! Vim pelo site da Merlin Encantos em Papel e gostaria de pedir um orçamento.')}`:'';
  const featuredInspirations=homeInspirationCodes.map(code=>publicTopperInspirations.find(item=>item.code===code)).filter(Boolean) as typeof publicTopperInspirations;
  const organizationJsonLd={"@context":"https://schema.org","@type":"Store",name:'Merlin Encantos em Papel',url:siteUrl||undefined,description:'Topos de bolo, marcadores e papelaria personalizada feitos sob encomenda.',logo:OFFICIAL_LOGO,telephone:settings.whatsapp_number,areaServed:settings.location};

  return <main className="premium-site kf-theme home-v672 home-v673 home-v680 public-v712 home-v717 home-v719 v8-clean-home v8-essential-home-v814 v821-home v822-home">
    <Header settings={settings}/>
    <JsonLd data={organizationJsonLd}/>

    <section className="hero premium-hero home-v717-hero v8-clean-hero v821-home-hero v822-home-hero" id="inicio">
      <div className="container hero-grid">
        <div className="hero-copy-column" data-reveal>
          <span className="v822-hero-kicker">FEITO SOB ENCOMENDA</span>
          <h1>Personalizados feitos para <span>ter a sua cara.</span></h1>
          <p className="hero-copy">Topos de bolo, marcadores e papelaria personalizada criados sob encomenda para o seu tema, suas cores e o seu momento.</p>
          <div className="hero-actions">
            <Link className="btn btn-primary btn-luxury" href="/orcamento">Pedir orçamento <ArrowUpRight size={16}/></Link>
            <Link className="btn btn-ghost" href="/catalogo">Ver topos <Layers3 size={17}/></Link>
          </div>
          <div className="v822-hero-trust" aria-label="Diferenciais Merlin">
            <span>Produção artesanal</span><span>Personalizado para você</span><span>Atendimento pelo WhatsApp</span>
          </div>
        </div>

        <div className="v822-hero-visual" data-reveal>
          <HomeRealWorkCarousel works={REAL_WORKS}/>
        </div>
      </div>
    </section>

    <section className="v8-home-products v8-clean-products v821-home-products" id="personalizados">
      <div className="container">
        <div className="v8-clean-section-head" data-reveal>
          <div><small className="v822-section-kicker">PERSONALIZADOS</small><h2>O que fazemos.</h2></div>
          <Link href="/personalizados">Ver personalizados <ArrowUpRight size={15}/></Link>
        </div>

        <div className="v8-home-products-grid v8-clean-products-grid v821-product-grid">
          <Link href="/catalogo" className="v8-home-product-card v822-product-card is-featured"><span><Layers3 size={20}/></span><h3>Topos de Bolo</h3><i>Ver modelos</i></Link>
          <Link href="/personalizados#marcadores" className="v8-home-product-card v822-product-card"><span><BookOpen size={20}/></span><h3>Marcadores de Página</h3><i>Personalizados</i></Link>
          <Link href="/personalizados#lembrancinhas" className="v8-home-product-card v822-product-card"><span><Gift size={20}/></span><h3>Lembrancinhas</h3><i>Sob encomenda</i></Link>
          <Link href="/personalizados#adesivos-chaveiros" className="v8-home-product-card v822-product-card"><span><KeyRound size={20}/></span><h3>Adesivos & Chaveiros</h3><i>Nome, foto ou tema</i></Link>
          <Link href="/personalizados#caixinhas" className="v8-home-product-card v822-product-card"><span><Box size={20}/></span><h3>Caixinhas</h3><small>Sob consulta</small></Link>
          <Link href="/personalizados#outros" className="v8-home-product-card v822-product-card"><span><Sparkles size={20}/></span><h3>Outros Personalizados</h3><i>Conte sua ideia</i></Link>
        </div>
      </div>
    </section>

    <section className="home-v717-inspiration-story v8-clean-inspirations v821-inspirations v822-inspirations">
      <div className="container">
        <div className="home-v717-story-head v8-clean-section-head" data-reveal>
          <div><small>REFERÊNCIAS</small><h2>Inspirações para <em>começar sua ideia.</em></h2><p className="v822-section-copy">Escolha uma referência e nós adaptamos cores, nome, idade e detalhes ao seu pedido.</p></div>
          <Link href="/inspiracoes">Ver todas <ArrowUpRight size={15}/></Link>
        </div>

        <div className="home-v717-gallery-grid v8-clean-gallery v822-inspiration-grid">
          {featuredInspirations.map(item=><Link className="home-v717-gallery-card v822-inspiration-card" href={'/inspiracoes/'+item.code} key={item.code}>
            <Image src={item.image} alt={'Inspiração de topo '+item.title} width={900} height={675} sizes="(max-width: 680px) 100vw, 33vw" quality={76}/>
            <div className="home-v717-gallery-info"><strong>{item.title}</strong><span>Usar como referência <ArrowUpRight size={14}/></span></div>
          </Link>)}
        </div>

        <p className="v8-home-scope-note">Inspirações são referências visuais. Bolo e cenário não estão inclusos; cada peça é adaptada ao pedido.</p>
      </div>
    </section>

    <section className="v8-clean-contact v822-contact" id="contato">
      <div className="container home-v717-contact-shell">
        <div><small>SEU PEDIDO COMEÇA AQUI</small><h2>Conte sua ideia.</h2><p>Envie tema, data e os detalhes que você imagina. A gente organiza o restante com você.</p></div>
        <div>
          <Link className="btn btn-primary btn-luxury" href="/monte-seu-pedido">Monte seu Pedido <ArrowUpRight size={16}/></Link>
          {wa&&<a className="btn btn-ghost" href={wa} target="_blank" rel="noreferrer"><MessageCircle size={16}/> WhatsApp</a>}
        </div>
      </div>
    </section>

    <Footer settings={settings}/>
  </main>;
}
