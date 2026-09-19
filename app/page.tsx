import Link from 'next/link';
import {
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  Eye,
  Layers3,
  MessageCircle,
  Palette,
  Scissors,
  Send,
  Sparkles,
  Star
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopperLevelVisual from '@/components/TopperLevelVisual';
import MerlinMobileDock from '@/components/MerlinMobileDock';
import JsonLd from '@/components/JsonLd';
import SafeImage from '@/components/SafeImage';
import { getSiteSettings, getTestimonials } from '@/lib/db';
import { siteUrl } from '@/lib/config';
import { topperLevels, topperThemes } from '@/lib/topper-catalog';
import { topperInspirations } from '@/lib/topper-inspirations';

export const dynamic='force-dynamic';
function digits(v:string){return v.replace(/\D/g,'');}

const homeInspirationCodes=['INSP-TOP-13','INSP-TOP-16','INSP-TOP-17','INSP-TOP-14','INSP-TOP-10','INSP-TOP-05'];

export default async function HomePage(){
  const [settings,testimonials]=await Promise.all([getSiteSettings(),getTestimonials()]);
  const phone=digits(settings.whatsapp_number);
  const wa=phone?`https://wa.me/${phone}?text=${encodeURIComponent('Olá! Vim pelo site da Merlin Encantos em Papel e gostaria de pedir um orçamento para um topo de bolo personalizado.')}`:'';
  const featuredInspirations=homeInspirationCodes.map(code=>topperInspirations.find(item=>item.code===code)).filter(Boolean) as typeof topperInspirations;
  const organizationJsonLd={"@context":"https://schema.org","@type":"Store",name:settings.brand_name,url:siteUrl||undefined,description:'Topos de bolo personalizados sob encomenda, do simples ao Elite com shaker e acetato.',logo:settings.logo_url||undefined,telephone:settings.whatsapp_number,areaServed:settings.location};

  return <main className="premium-site kf-theme home-v672 home-v673 home-v680 public-v712 home-v717">
    <Header settings={settings}/><JsonLd data={organizationJsonLd}/>

    <section className="hero premium-hero home-v717-hero" id="inicio">
      <div className="home-v717-hero-glow" aria-hidden="true"/>
      <div className="container hero-grid">
        <div className="hero-copy-column" data-reveal>
          <div className="home-v718-brand-signature">
            <span><SafeImage src={settings.logo_url||'/merlin-logo.webp'} fallback="/merlin-logo.webp" alt="" width={58} height={54} sizes="58px" priority/></span>
            <div><strong>Merlin Encantos em Papel</strong><small>topos personalizados • feitos sob encomenda</small></div>
          </div>
          <div className="eyebrow"><i/> MERLIN • TOPOS DE BOLO PERSONALIZADOS • FEITOS SOB ENCOMENDA</div>
          <h1>Topos de bolo que parecem feitos <span>só para o seu momento.</span></h1>
          <p className="hero-copy">Escolha uma inspiração, diga o que quer mudar e transforme tema, nome, idade e cores em uma composição pensada para o seu bolo.</p>
          <div className="hero-actions">
            <Link className="btn btn-primary btn-luxury" href="/inspiracoes">Ver inspirações <Sparkles size={17}/></Link>
            <Link className="btn btn-ghost" href="/monte-seu-topo">Montar meu topo <ArrowUpRight size={16}/></Link>
          </div>
          <div className="home-v717-hero-meta">
            <span><BadgeCheck size={16}/> 6 níveis de acabamento</span>
            <span><Palette size={16}/> Cores, nome e idade adaptáveis</span>
            <span><CheckCircle2 size={16}/> Orçamento antes da produção</span>
          </div>
          {wa&&<a className="home-v717-whatsapp-link" href={wa} target="_blank" rel="noreferrer"><MessageCircle size={16}/> Prefere conversar? Fale direto no WhatsApp <ArrowUpRight size={14}/></a>}
        </div>

        <div className="home-v717-showcase" data-reveal aria-label="Seleção de inspirações Merlin">
          {featuredInspirations[0]&&<Link className="home-v717-showcase-main" href={'/inspiracoes/'+featuredInspirations[0].code}>
            <img src={featuredInspirations[0].image} alt={'Inspiração '+featuredInspirations[0].title}/>
            <span className="home-v717-photo-shade"/>
            <div><small>DESTAQUE DO ATELIÊ</small><strong>{featuredInspirations[0].title}</strong><span>{featuredInspirations[0].category}</span></div>
          </Link>}
          <div className="home-v717-showcase-side">
            {featuredInspirations.slice(1,3).map(item=><Link href={'/inspiracoes/'+item.code} key={item.code}>
              <img src={item.image} alt={'Inspiração '+item.title}/>
              <span className="home-v717-photo-shade"/>
              <div><small>{item.category}</small><strong>{item.title}</strong></div>
            </Link>)}
          </div>
          <div className="home-v717-showcase-seal"><Sparkles size={17}/><strong>feito para combinar</strong><span>com o seu tema e o seu bolo</span></div>
        </div>
      </div>
    </section>

    <section className="home-v717-intro-strip" aria-label="Como funciona">
      <div className="container">
        <span><b>01</b><strong>Escolha uma referência</strong><small>Veja estilos que combinam com você.</small></span>
        <i/>
        <span><b>02</b><strong>Personalize os detalhes</strong><small>Nome, idade, cores e composição.</small></span>
        <i/>
        <span><b>03</b><strong>Defina o acabamento</strong><small>Do simples ao Elite com efeitos especiais.</small></span>
      </div>
    </section>

    <section className="category-showcase premium-categories home-categories home-v717-levels" id="topos">
      <div className="container">
        <div className="section-index" data-reveal><span>01</span><i/><small>NÍVEIS DE TOPO</small></div>
        <div className="catalog-head" data-reveal>
          <div>
            <div className="eyebrow">Uma evolução de acabamento</div>
            <h2 className="section-title">Do essencial ao efeito<br/><em>mais marcante.</em></h2>
            <Link className="public-inline-guide" href="/guia-de-precos">Comparar níveis e detalhes <ArrowUpRight size={14}/></Link>
          </div>
          <p className="muted">Cada nível aumenta presença, profundidade e possibilidades de acabamento. Você escolhe quanto detalhe faz sentido para o seu bolo.</p>
        </div>
        <div className="home-v717-level-progress" aria-hidden="true"><span/><span/><span/><span/><span/><span/></div>
        <div className="home-v717-level-grid">
          {topperLevels.map((level,i)=><Link className={'home-v717-level-card '+(level.slug==='elite-shaker-acetato'?'is-elite':'')} href={`/catalogo/${level.slug}`} key={level.slug} data-reveal>
            <div className="home-v717-level-art">
              <TopperLevelVisual level={level} compact/>
              <span className="home-v717-level-number">{String(i+1).padStart(2,'0')}</span>
              {level.slug==='elite-shaker-acetato'&&<span className="home-v717-level-featured">MAIS COMPLETO</span>}
            </div>
            <div className="home-v717-level-copy">
              <div><small>{level.eyebrow}</small><strong>{level.name}</strong></div>
              <span className="home-v717-complexity"><Layers3 size={14}/>{level.complexity}</span>
              <p>{level.description}</p>
              <b>Explorar este nível <ArrowUpRight size={15}/></b>
            </div>
          </Link>)}
        </div>
      </div>
    </section>

    <section className="home-v717-inspiration-story">
      <div className="container">
        <div className="section-index" data-reveal><span>02</span><i/><small>INSPIRAÇÕES</small></div>
        <div className="home-v717-story-head" data-reveal>
          <div><div className="eyebrow">Veja antes de imaginar</div><h2>Referências que ajudam a<br/><em>enxergar o resultado.</em></h2></div>
          <div><p>Você não precisa começar com a ideia pronta. Veja composições, paletas e estilos; depois adapte tudo para o seu pedido.</p><Link href="/inspiracoes">Abrir galeria completa <ArrowUpRight size={15}/></Link></div>
        </div>
        <div className="home-v717-gallery-grid">
          {featuredInspirations.map((item,i)=>{
            const level=topperLevels.find(level=>level.slug===item.levelSlug);
            return <Link className={'home-v717-gallery-card home-v717-gallery-card-'+(i+1)} href={'/inspiracoes/'+item.code} key={item.code} data-reveal>
              <img src={item.image} alt={'Inspiração de topo '+item.title}/>
              <span className="home-v717-photo-shade"/>
              <div className="home-v717-gallery-info"><small>{item.category}</small><strong>{item.title}</strong><span>{level?.name||'Personalizado'} <ArrowUpRight size={13}/></span></div>
            </Link>;
          })}
        </div>
        <div className="home-v717-theme-cloud" aria-label="Temas disponíveis">
          {topperThemes.slice(0,9).map(theme=><Link href={'/inspiracoes?categoria='+encodeURIComponent(theme.label)} key={theme.slug}>{theme.label}</Link>)}
        </div>
      </div>
    </section>

    <section className="event-pathways kf-order-pathways home-start home-v717-process">
      <div className="container">
        <div className="section-index" data-reveal><span>03</span><i/><small>COMO PEDIR</small></div>
        <div className="home-v717-process-head" data-reveal><div><div className="eyebrow">Sem complicação</div><h2>Três passos para tirar<br/><em>a ideia do papel.</em></h2></div><p>Comece pelo que você já sabe. Uma referência, uma cor ou apenas o tema já são suficientes para iniciar o briefing.</p></div>
        <div className="home-v717-process-grid">
          <Link href="/inspiracoes" data-reveal><span><Eye size={20}/></span><small>PASSO 01</small><strong>Encontre sua inspiração</strong><p>Explore estilos, cores e composições que se aproximam do que você imaginou.</p><b>Ver ideias <ArrowUpRight size={15}/></b></Link>
          <Link href="/catalogo" data-reveal><span><Palette size={20}/></span><small>PASSO 02</small><strong>Escolha o acabamento</strong><p>Compare os níveis e decida quanta profundidade e efeito você quer no resultado.</p><b>Comparar níveis <ArrowUpRight size={15}/></b></Link>
          <Link href="/monte-seu-topo" data-reveal><span><Send size={20}/></span><small>PASSO 03</small><strong>Conte como quer o seu topo</strong><p>Envie tema, nome, idade, cores, tamanho do bolo e as referências que quiser.</p><b>Preencher briefing <ArrowUpRight size={15}/></b></Link>
        </div>
      </div>
    </section>

    <section className="craft-section home-craft home-v717-craft">
      <div className="container">
        <div className="section-index" data-reveal><span>04</span><i/><small>ACABAMENTO</small></div>
        <div className="craft-head" data-reveal><div><div className="eyebrow">Detalhes que aparecem no resultado</div><h2>Bonito de perto.<br/><em>Equilibrado no bolo.</em></h2></div><p>O acabamento não entra só para enfeitar. Cada camada, recorte e efeito precisa contribuir para leitura, profundidade e presença.</p></div>
        <div className="home-v717-detail-grid">
          <article data-reveal><div className="home-v717-detail-visual detail-cut"><span/><i/><b/></div><Scissors size={19}/><small>01</small><h3>Recorte preciso</h3><p>Contornos limpos e peças pensadas para produção real.</p></article>
          <article data-reveal><div className="home-v717-detail-visual detail-layers"><span/><i/><b/></div><Layers3 size={19}/><small>02</small><h3>Profundidade com função</h3><p>Camadas que criam volume sem esconder nome, idade ou tema.</p></article>
          <article data-reveal><div className="home-v717-detail-visual detail-shaker"><span/><i/><b/></div><Sparkles size={19}/><small>03</small><h3>Shaker com movimento</h3><p>Janela fechada e elementos internos usados como destaque.</p></article>
          <article data-reveal><div className="home-v717-detail-visual detail-acetate"><span/><i/><b/></div><BadgeCheck size={19}/><small>04</small><h3>Acetato com leveza</h3><p>Elementos suspensos para um efeito mais leve e sofisticado.</p></article>
        </div>
      </div>
    </section>

    <section className="public-home-about home-v717-about" id="sobre">
      <div className="container">
        <div className="home-v717-about-grid">
          <div className="home-v717-about-title" data-reveal><div className="eyebrow">Sobre a Merlin</div><h2>Não é só colocar um nome em cima do bolo.</h2><p>É organizar tema, cores, proporção e acabamento para o topo conversar com o bolo — e não competir com ele.</p></div>
          <div className="home-v717-about-card" data-reveal>
            <Sparkles size={22}/>
            <blockquote>“A inspiração é o começo. O resultado precisa ter a cara do seu pedido.”</blockquote>
            <div><span><CheckCircle2 size={15}/><b>Feito sob encomenda</b><small>cada pedido parte das informações do cliente</small></span><span><CheckCircle2 size={15}/><b>Adaptável</b><small>cores, nome, idade e elementos podem mudar</small></span><span><CheckCircle2 size={15}/><b>Pensado para produção</b><small>recorte, montagem e legibilidade entram na decisão</small></span></div>
          </div>
        </div>
      </div>
    </section>

    {testimonials.length>0&&<section className="testimonial-section home-testimonials home-v717-testimonials"><div className="container"><div className="section-index" data-reveal><span>05</span><i/><small>CLIENTES</small></div><div className="home-v717-testimonial-head"><div><div className="eyebrow">Experiência de quem já pediu</div><h2>Detalhes que também aparecem<br/><em>na experiência.</em></h2></div></div><div className="testimonial-grid">{testimonials.slice(0,3).map(t=><article key={t.id}><div className="testimonial-stars">{Array.from({length:t.rating}).map((_,n)=><Star size={13} fill="currentColor" key={n}/>)}</div><blockquote>“{t.quote}”</blockquote><footer><strong>{t.name}</strong></footer></article>)}</div></div></section>}

    <section className="public-home-faq home-v717-faq" id="duvidas">
      <div className="container">
        <div className="home-v717-faq-head" data-reveal><div><div className="eyebrow">Dúvidas frequentes</div><h2>Antes de pedir,<br/><em>vale saber.</em></h2></div><p>As respostas abaixo ajudam a entender até onde a personalização pode ir antes de você preencher o briefing.</p></div>
        <div className="public-home-faq-grid">
          <details><summary>Posso mudar as cores de uma inspiração?</summary><p>Sim. Nome, idade, cores e detalhes podem ser adaptados ao seu pedido.</p></details>
          <details><summary>Posso enviar uma foto ou referência minha?</summary><p>Sim. A referência ajuda a explicar tema, paleta, composição e detalhes que você gostaria de aproveitar.</p></details>
          <details><summary>Preciso escolher o nível sugerido da inspiração?</summary><p>Não. O nível sugerido é apenas um ponto de partida; você pode escolher outro acabamento no briefing.</p></details>
          <details><summary>O topo fica idêntico à inspiração?</summary><p>As inspirações são pontos de partida. O resultado é adaptado ao nome, idade, cores, elementos e acabamento do seu pedido.</p></details>
          <details><summary>Shaker e acetato entram em qualquer topo?</summary><p>São acabamentos avançados usados quando combinam com a composição e com o nível escolhido.</p></details>
          <details><summary>Como recebo o valor?</summary><p>O orçamento considera nível, complexidade do tema, materiais, tamanho e prazo. O site não faz pagamento automático.</p></details>
        </div>
      </div>
    </section>

    <section className="public-home-contact home-v717-contact" id="contato">
      <div className="container">
        <div className="home-v717-contact-shell" data-reveal>
          <div className="home-v717-contact-copy"><div className="eyebrow">Agora é com a sua ideia</div><h2>Encontrou uma referência<br/><em>que tem a sua cara?</em></h2><p>Envie o briefing e conte o que você quer manter, mudar ou acrescentar. Antes da produção, os detalhes e o orçamento são confirmados.</p></div>
          <div className="home-v717-contact-actions">
            <Link className="btn btn-primary btn-luxury" href="/monte-seu-topo">Montar meu topo <ArrowUpRight size={16}/></Link>
            <Link className="btn btn-ghost" href="/orcamento">Ver meu pedido</Link>
            {wa&&<a className="home-v717-contact-wa" href={wa} target="_blank" rel="noreferrer"><MessageCircle size={17}/><span><small>ATENDIMENTO DIRETO</small><strong>Falar no WhatsApp</strong></span><ArrowUpRight size={15}/></a>}
          </div>
        </div>
      </div>
    </section>

    <section className="home-v717-closing" aria-label="Encerramento">
      <div className="container"><span>INSPIRAR</span><i/> <span>PERSONALIZAR</span><i/> <span>ENCANTAR</span></div>
    </section>

    <MerlinMobileDock whatsapp={settings.whatsapp_number}/><Footer settings={settings}/>
  </main>;
}
