import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, Layers3, MessageCircle, Scissors, Sparkles, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MerlinMobileDock from '@/components/MerlinMobileDock';
import JsonLd from '@/components/JsonLd';
import { getSiteSettings, getTestimonials } from '@/lib/db';
import { siteUrl } from '@/lib/config';
import { topperLevels, topperThemes } from '@/lib/topper-catalog';

export const dynamic='force-dynamic';
function digits(v:string){return v.replace(/\D/g,'');}

export default async function HomePage(){
  const [settings,testimonials]=await Promise.all([getSiteSettings(),getTestimonials()]);
  const phone=digits(settings.whatsapp_number);
  const wa=phone?`https://wa.me/${phone}?text=${encodeURIComponent('Olá! Vim pelo site da Merlin Encantos em Papel e gostaria de pedir um orçamento para um topo de bolo personalizado.')}`:'';
  const organizationJsonLd={"@context":"https://schema.org","@type":"Store",name:settings.brand_name,url:siteUrl||undefined,description:'Topos de bolo personalizados sob encomenda, do essencial ao Elite com shaker e acetato.',logo:settings.logo_url||undefined,telephone:settings.whatsapp_number,areaServed:settings.location};
  return <main className="premium-site kf-theme home-v672 home-v673 home-v680">
    <Header settings={settings}/><JsonLd data={organizationJsonLd}/>

    <section className="hero premium-hero kf-hero" id="inicio"><div className="container hero-grid"><div className="hero-copy-column" data-reveal>
      <div className="eyebrow"><i/> MERLIN • TOPOS DE BOLO PERSONALIZADOS</div>
      <h1>Do topo simples<br/><span>ao Elite com shaker e acetato.</span></h1>
      <p className="hero-copy">Começamos focados no que podemos fazer com mais cuidado: topos de bolo sob encomenda. Você escolhe o nível, o tema e as cores; nós adaptamos a composição para o seu bolo.</p>
      <div className="hero-actions"><Link className="btn btn-primary btn-luxury" href="/catalogo">Ver níveis de topo <Layers3 size={17}/></Link><Link className="btn btn-ghost" href="/monte-seu-topo">Montar meu topo <ArrowUpRight size={16}/></Link>{wa&&<a className="home-hero-whatsapp" href={wa} target="_blank" rel="noreferrer"><MessageCircle size={16}/> WhatsApp</a>}</div>
      <div className="trust-row"><span><CheckCircle2 size={15}/> Projeto personalizado</span><span><Scissors size={15}/> Corte e montagem artesanal</span><span><Sparkles size={15}/> Shaker e acetato nos modelos avançados</span></div>
    </div><div className="hero-visual kf-hero-visual" data-reveal><div className="hero-card main kf-logo-card"><img src={settings.logo_url||'/merlin-logo.webp'} alt={settings.brand_name}/><span className="hero-image-label">MERLIN • ENCANTOS EM PAPEL</span></div><div className="hero-badge"><span>linha com</span><strong>{topperLevels.length} níveis</strong><small>do essencial ao Elite</small></div></div></div></section>

    <section className="category-showcase premium-categories home-categories" id="topos"><div className="container">
      <div className="section-index" data-reveal><span>01</span><i/><small>NÍVEIS DE TOPO</small></div>
      <div className="catalog-head" data-reveal><div><div className="eyebrow">Escolha pelo acabamento</div><h2 className="section-title">Comece simples.<br/><em>Evolua até o Elite.</em></h2></div><p className="muted">A diferença entre os modelos está na quantidade de camadas, profundidade e acabamentos como shaker e acetato.</p></div>
      <div className="category-grid editorial-grid home-category-grid">{topperLevels.map((level,i)=><Link className="category-card editorial-category" href={`/catalogo/${level.slug}`} key={level.slug} data-reveal><div className="category-card-art"><span>{level.code}</span><div className="category-overlay"/></div><div className="category-copy"><small>{String(i+1).padStart(2,'0')}</small><strong>{level.name}</strong><span>{level.complexity}</span><span className="category-link">Ver detalhes <ArrowUpRight size={15}/></span></div></Link>)}</div>
    </div></section>

    <section className="event-pathways kf-order-pathways home-start"><div className="container"><div className="section-index" data-reveal><span>02</span><i/><small>COMO PEDIR</small></div><div className="event-pathways-shell" data-reveal><div className="event-pathways-copy"><div className="eyebrow">Pedido direto e sem complicação</div><h2>Três passos.<br/><em>Um topo feito para o seu bolo.</em></h2><p>Escolha o nível, informe tema/nome/idade e envie o briefing para orçamento.</p></div><div className="event-pathways-primary"><Link href="/catalogo"><small>01 • NÍVEL</small><strong>Escolher o tipo de topo</strong><span>Ver opções <ArrowUpRight size={15}/></span></Link><Link href="/inspiracoes"><small>02 • ESTILO</small><strong>Escolher tema e linguagem</strong><span>Ver ideias <ArrowUpRight size={15}/></span></Link><Link href="/monte-seu-topo"><small>03 • BRIEFING</small><strong>Montar meu topo</strong><span>Enviar pedido <ArrowUpRight size={15}/></span></Link></div></div></div></section>

    <section className="home-catalog-preview"><div className="container"><div className="section-index" data-reveal><span>03</span><i/><small>TEMAS</small></div><div className="home-preview-head" data-reveal><div><div className="eyebrow">Seu tema, no seu nível</div><h2 className="section-title">O mesmo tema pode ser<br/><em>simples ou super elaborado.</em></h2></div><Link className="btn btn-primary" href="/inspiracoes">Ver inspirações <ArrowUpRight size={16}/></Link></div><div className="craft-grid">{topperThemes.slice(0,8).map((theme,i)=><article key={theme.slug} data-reveal><span>{String(i+1).padStart(2,'0')}</span><Sparkles/><h3>{theme.label}</h3><p>{theme.description}</p></article>)}</div></div></section>

    <section className="craft-section home-craft"><div className="container"><div className="section-index" data-reveal><span>04</span><i/><small>ACABAMENTO</small></div><div className="craft-head" data-reveal><div><div className="eyebrow">Feito para recortar, montar e fotografar bem</div><h2>Detalhe onde importa.</h2></div><p>O projeto cresce em complexidade apenas quando isso melhora o resultado. Nada de colocar material ou camada só para “encher” o topo.</p></div><div className="craft-grid"><article><span>01</span><Scissors/><h3>Recorte limpo</h3><p>Peças pensadas para produção real.</p></article><article><span>02</span><Layers3/><h3>Camadas com função</h3><p>Profundidade sem perder leitura.</p></article><article><span>03</span><Sparkles/><h3>Shaker</h3><p>Movimento controlado e acabamento fechado.</p></article><article><span>04</span><Sparkles/><h3>Acetato</h3><p>Efeito suspenso e leve nos modelos avançados.</p></article></div></div></section>

    {testimonials.length>0&&<section className="testimonial-section home-testimonials"><div className="container"><div className="section-index" data-reveal><span>05</span><i/><small>CLIENTES</small></div><div className="testimonial-grid">{testimonials.slice(0,3).map(t=><article key={t.id}><div className="testimonial-stars">{Array.from({length:t.rating}).map((_,n)=><Star size={13} fill="currentColor" key={n}/>)}</div><blockquote>“{t.quote}”</blockquote><footer><strong>{t.name}</strong></footer></article>)}</div></div></section>}

    <section className="premium-cta home-final-cta"><div className="container"><div className="cta-box" data-reveal><div><div className="eyebrow">Seu topo começa aqui</div><h2>Escolha o nível.<br/><em>O resto a gente personaliza.</em></h2><p>Envie tema, nome, idade, cores e tamanho do bolo para receber o orçamento.</p></div><div className="home-final-actions"><Link className="btn btn-primary btn-luxury" href="/monte-seu-topo">Montar meu topo <ArrowUpRight size={16}/></Link>{wa&&<a className="btn btn-ghost" href={wa} target="_blank" rel="noreferrer"><MessageCircle size={17}/> WhatsApp</a>}</div></div></div></section>
    <MerlinMobileDock whatsapp={settings.whatsapp_number}/><Footer settings={settings}/>
  </main>;
}
