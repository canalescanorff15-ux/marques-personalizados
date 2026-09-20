import Link from 'next/link';
import {
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  Eye,
  Heart,
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
import { topperLevels } from '@/lib/topper-catalog';
import { publicTopperInspirations } from '@/lib/topper-inspirations';

export const dynamic='force-dynamic';

function digits(value:string){return value.replace(/\D/g,'');}

const homeInspirationCodes=['INSP-TOP-48','INSP-TOP-49','INSP-TOP-32','INSP-TOP-36','INSP-TOP-42','INSP-TOP-26'];

const productCategories=[
  {
    title:'Topos de bolo',
    description:'Modelos personalizados com nome, idade, tema, cores e acabamento escolhidos para o seu bolo.',
    href:'/inspiracoes',
    action:'Ver inspirações',
    icon:Layers3
  },
  {
    title:'Caixinhas personalizadas',
    description:'Peças para complementar a comemoração com a mesma identidade visual do tema.',
    href:'/orcamento?produto=caixinhas',
    action:'Pedir orçamento',
    icon:BadgeCheck
  },
  {
    title:'Adesivos & chaveiros',
    description:'Personalizações para lembranças, presentes, eventos e pequenos detalhes que fazem diferença.',
    href:'/orcamento?produto=adesivos-chaveiros',
    action:'Consultar opções',
    icon:Sparkles
  },
  {
    title:'Doces & brigadeiros',
    description:'Toppers, tags, wrappers e complementos de papelaria para valorizar doces e lembranças.',
    href:'/orcamento?produto=doces-brigadeiros',
    action:'Consultar opções',
    icon:Star
  },
  {
    title:'Lembrancinhas',
    description:'Peças personalizadas pensadas para combinar com o tema e deixar a entrega mais especial.',
    href:'/orcamento?produto=lembrancinhas',
    action:'Pedir orçamento',
    icon:Heart
  },
  {
    title:'Kits personalizados',
    description:'Combinações de produtos com a mesma linguagem visual para deixar tudo mais organizado.',
    href:'/orcamento?produto=kit-personalizado',
    action:'Montar uma ideia',
    icon:Palette
  }
];

export default async function HomePage(){
  const [settings,testimonials]=await Promise.all([getSiteSettings(),getTestimonials()]);
  const phone=digits(settings.whatsapp_number);
  const wa=phone
    ?'https://wa.me/'+phone+'?text='+encodeURIComponent('Olá! Vim pelo site da Merlin Encantos em Papel e gostaria de pedir um orçamento para um produto personalizado.')
    :'';

  const featuredInspirations=homeInspirationCodes
    .map(code=>publicTopperInspirations.find(item=>item.code===code))
    .filter(Boolean) as typeof publicTopperInspirations;

  const heroInspiration=featuredInspirations[0];

  const organizationJsonLd={
    '@context':'https://schema.org',
    '@type':'Store',
    name:settings.brand_name,
    url:siteUrl||undefined,
    description:'Topos de bolo personalizados e papelaria sob encomenda para aniversários, comemorações e momentos especiais.',
    logo:settings.logo_url||undefined,
    telephone:settings.whatsapp_number,
    areaServed:settings.location
  };

  return <main className="premium-site kf-theme public-v712 v8-home">
    <Header settings={settings}/>
    <JsonLd data={organizationJsonLd}/>

    <section className="v8-hero" id="inicio">
      <div className="container v8-hero-grid">
        <div className="v8-hero-copy" data-reveal>
          <div className="v8-brand-signature">
            <span><SafeImage src={settings.logo_url||'/merlin-logo.webp'} fallback="/merlin-logo.webp" alt="" width={58} height={54} sizes="58px" priority/></span>
            <div>
              <strong>{settings.brand_name}</strong>
              <small>topos de bolo personalizados • papelaria sob encomenda</small>
            </div>
          </div>

          <div className="eyebrow"><i/> MERLIN • TOPOS DE BOLO PERSONALIZADOS • PAPELARIA SOB ENCOMENDA</div>
          <h1>Papelaria personalizada para <em>celebrações que merecem detalhe.</em></h1>
          <p>Topos de bolo, lembranças e personalizados criados a partir do seu tema, cores e referências — com foco no produto que você realmente vai receber.</p>

          <div className="v8-hero-actions">
            <Link className="btn btn-primary btn-luxury" href="/inspiracoes">Ver inspirações <Sparkles size={17}/></Link>
            <Link className="btn btn-ghost" href="/orcamento">Pedir orçamento <ArrowUpRight size={16}/></Link>
          </div>

          <div className="v8-hero-trust">
            <span><CheckCircle2 size={15}/><b>Feito sob encomenda</b></span>
            <span><Palette size={15}/><b>Cores e detalhes adaptáveis</b></span>
            <span><BadgeCheck size={15}/><b>Orçamento antes da produção</b></span>
          </div>

          {wa&&<a className="v8-hero-whatsapp" href={wa} target="_blank" rel="noreferrer">
            <MessageCircle size={17}/>
            <span><small>PREFERE CONVERSAR?</small><strong>Fale direto no WhatsApp</strong></span>
            <ArrowUpRight size={14}/>
          </a>}
        </div>

        <div className="v8-hero-product" data-reveal>
          {heroInspiration&&<>
            <Link className="v8-hero-photo" href={'/inspiracoes/'+heroInspiration.code}>
              <img src={heroInspiration.image} alt={'Bolo com topo '+heroInspiration.title}/>
            </Link>
            <div className="v8-hero-photo-copy">
              <small>INSPIRAÇÃO EM DESTAQUE</small>
              <strong>{heroInspiration.title}</strong>
              <span>{heroInspiration.category}</span>
              <Link href={'/inspiracoes/'+heroInspiration.code}>Ver detalhes <ArrowUpRight size={14}/></Link>
            </div>
          </>}
        </div>
      </div>
    </section>

    <section className="v8-trust-strip" aria-label="Diferenciais">
      <div className="container">
        <span><Scissors size={17}/><strong>Produção artesanal</strong><small>acabamento pensado para cada peça</small></span>
        <span><Sparkles size={17}/><strong>Personalização real</strong><small>tema, nome, idade, cores e detalhes</small></span>
        <span><CheckCircle2 size={17}/><strong>Clareza no pedido</strong><small>você sabe o que está incluso antes de produzir</small></span>
        <span><MessageCircle size={17}/><strong>Atendimento direto</strong><small>briefing e orçamento pelo site ou WhatsApp</small></span>
      </div>
    </section>

    <section className="v8-products" id="produtos">
      <div className="container">
        <div className="v8-section-head" data-reveal>
          <div>
            <div className="eyebrow"><i/> O QUE PODEMOS CRIAR</div>
            <h2>Escolha o produto.<br/><em>Depois a gente dá a sua cara.</em></h2>
          </div>
          <p>Você não precisa conhecer nomes técnicos ou ter tudo decidido. Comece pelo produto ou pela ideia que já tem em mente.</p>
        </div>

        <div className="v8-product-categories">
          {productCategories.map((item,index)=>{
            const Icon=item.icon;
            return <Link className="v8-product-category" href={item.href} key={item.title} data-reveal>
              <div className="v8-product-category-top">
                <span><Icon size={22}/></span>
                <small>{String(index+1).padStart(2,'0')}</small>
              </div>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
              <b>{item.action} <ArrowUpRight size={15}/></b>
            </Link>;
          })}
        </div>
      </div>
    </section>

    <section className="v8-home-inspirations">
      <div className="container">
        <div className="v8-section-head v8-section-head-dark" data-reveal>
          <div>
            <div className="eyebrow"><i/> INSPIRAÇÕES REAIS DE PRODUTO</div>
            <h2>Veja o bolo e o topo.<br/><em>Sem cenário escondendo o que importa.</em></h2>
          </div>
          <div>
            <p>A vitrine prioriza referências em que o produto aparece de verdade. Mesas completas e cenários que podem confundir o que está sendo vendido ficam fora da galeria pública.</p>
            <Link href="/inspiracoes">Abrir galeria completa <ArrowUpRight size={15}/></Link>
          </div>
        </div>

        <div className="v8-inspiration-grid">
          {featuredInspirations.map(item=>{
            const level=topperLevels.find(level=>level.slug===item.levelSlug);
            return <Link className="v8-inspiration-card" href={'/inspiracoes/'+item.code} key={item.code} data-reveal>
              <div className="v8-inspiration-photo"><img src={item.image} alt={'Bolo com topo '+item.title}/><span>{item.code}</span></div>
              <div className="v8-inspiration-copy">
                <small>{item.category}</small>
                <strong>{item.title}</strong>
                <span>{level?.name||'Personalizado'} <ArrowUpRight size={13}/></span>
              </div>
            </Link>;
          })}
        </div>
      </div>
    </section>

    <section className="v8-included">
      <div className="container">
        <div className="v8-section-head" data-reveal>
          <div>
            <div className="eyebrow"><i/> TRANSPARÊNCIA</div>
            <h2>O que a imagem mostra<br/><em>e o que você está comprando.</em></h2>
          </div>
          <p>Uma inspiração serve para visualizar estilo e composição. O orçamento confirma exatamente quais peças fazem parte do pedido.</p>
        </div>

        <div className="v8-included-grid">
          <article className="v8-included-card is-included" data-reveal>
            <span><CheckCircle2 size={22}/></span>
            <small>NO PEDIDO DE TOPO</small>
            <h3>O produto personalizado</h3>
            <ul>
              <li>topo de bolo escolhido ou criado a partir da referência;</li>
              <li>nome, idade, cores e elementos definidos no briefing;</li>
              <li>acabamento confirmado no orçamento;</li>
              <li>adaptação ao tamanho do bolo informado.</li>
            </ul>
          </article>

          <article className="v8-included-card is-reference" data-reveal>
            <span><Eye size={22}/></span>
            <small>ELEMENTOS DE CENÁRIO</small>
            <h3>Não são incluídos automaticamente</h3>
            <ul>
              <li>bolo, doces e alimentos;</li>
              <li>balões, painel e mobiliário;</li>
              <li>mesa decorada e ambientação completa;</li>
              <li>qualquer item que não esteja descrito no orçamento.</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section className="v8-levels" id="topos">
      <div className="container">
        <div className="v8-section-head" data-reveal>
          <div>
            <div className="eyebrow"><i/> ACABAMENTOS PARA TOPOS</div>
            <h2>O nível entra depois.<br/><em>Primeiro vem a sua ideia.</em></h2>
          </div>
          <p>Do modelo mais direto ao Elite com shaker e acetato, o acabamento define profundidade e efeitos — não limita o tema.</p>
        </div>

        <div className="v8-levels-grid">
          {topperLevels.map(level=><Link className="v8-level-card" href={'/catalogo/'+level.slug} key={level.slug} data-reveal>
            <div className="v8-level-visual"><TopperLevelVisual level={level} compact/></div>
            <div className="v8-level-copy">
              <small>{level.eyebrow}</small>
              <strong>{level.name}</strong>
              <span>{level.complexity}</span>
              <b>Ver acabamento <ArrowUpRight size={14}/></b>
            </div>
          </Link>)}
        </div>

        <div className="v8-levels-action"><Link className="btn btn-ghost" href="/catalogo">Comparar todos os níveis <ArrowUpRight size={15}/></Link></div>
      </div>
    </section>

    <section className="v8-process">
      <div className="container">
        <div className="v8-section-head" data-reveal>
          <div>
            <div className="eyebrow"><i/> COMO PEDIR</div>
            <h2>Da referência ao pedido<br/><em>sem complicação.</em></h2>
          </div>
          <p>Uma foto, um tema, uma paleta ou uma ideia já são suficientes para começar.</p>
        </div>

        <div className="v8-process-grid">
          <article data-reveal><span><Eye size={20}/></span><small>PASSO 01</small><strong>Escolha uma referência</strong><p>Veja inspirações ou envie uma imagem sua para explicar o estilo que deseja.</p></article>
          <article data-reveal><span><Send size={20}/></span><small>PASSO 02</small><strong>Conte os detalhes</strong><p>Informe produto, tema, nome, idade, cores, quantidade e, no caso de topo, o tamanho do bolo.</p></article>
          <article data-reveal><span><Palette size={20}/></span><small>PASSO 03</small><strong>Defina o acabamento</strong><p>Escolha o nível de camadas e efeitos que fizer sentido para o seu pedido.</p></article>
          <article data-reveal><span><CheckCircle2 size={20}/></span><small>PASSO 04</small><strong>Confirme o orçamento</strong><p>Antes da produção, você recebe a confirmação do que será feito e do valor combinado.</p></article>
        </div>

        <div className="v8-process-actions">
          <Link className="btn btn-primary" href="/orcamento">Começar meu pedido <ArrowUpRight size={15}/></Link>
          <Link className="btn btn-ghost" href="/monte-seu-topo">Quero montar um topo</Link>
        </div>
      </div>
    </section>

    <section className="v8-home-about" id="sobre">
      <div className="container v8-about-grid">
        <div data-reveal>
          <div className="eyebrow"><i/> SOBRE A MERLIN</div>
          <h2>O detalhe precisa valorizar o momento — <em>não competir com ele.</em></h2>
          <p>A personalização começa entendendo o que você quer destacar. Tema, cores, proporção, recorte e acabamento são organizados para o produto ficar bonito de perto e nas fotos.</p>
        </div>
        <div className="v8-about-points" data-reveal>
          <span><CheckCircle2 size={17}/><div><strong>Feito sob encomenda</strong><small>cada pedido parte das informações do cliente</small></div></span>
          <span><CheckCircle2 size={17}/><div><strong>Adaptável</strong><small>cores, nome, idade, elementos e acabamento podem mudar</small></div></span>
          <span><CheckCircle2 size={17}/><div><strong>Pensado para produção real</strong><small>recorte, montagem e legibilidade entram na decisão</small></div></span>
          <span><CheckCircle2 size={17}/><div><strong>Produto em primeiro plano</strong><small>a vitrine mostra o que você realmente pode pedir</small></div></span>
        </div>
      </div>
    </section>

    {testimonials.length>0&&<section className="v8-testimonials">
      <div className="container">
        <div className="v8-section-head" data-reveal><div><div className="eyebrow"><i/> EXPERIÊNCIAS REAIS</div><h2>Quem já pediu<br/><em>conta como foi.</em></h2></div></div>
        <div className="v8-testimonial-grid">{testimonials.slice(0,3).map(t=><article key={t.id} data-reveal>
          <div>{Array.from({length:t.rating}).map((_,n)=><Star size={13} fill="currentColor" key={n}/>)}</div>
          <blockquote>“{t.quote}”</blockquote>
          <strong>{t.name}</strong>
        </article>)}</div>
      </div>
    </section>}

    <section className="v8-faq" id="duvidas">
      <div className="container">
        <div className="v8-section-head" data-reveal>
          <div><div className="eyebrow"><i/> DÚVIDAS FREQUENTES</div><h2>Antes de pedir,<br/><em>vale saber.</em></h2></div>
          <p>As respostas abaixo deixam claro como funciona a personalização e o que cada inspiração representa.</p>
        </div>

        <div className="v8-faq-grid">
          <details><summary>A decoração inteira da foto está inclusa?</summary><p>Não. A inspiração mostra estilo e contexto visual. O orçamento informa exatamente quais produtos personalizados fazem parte do pedido.</p></details>
          <details><summary>O bolo vem junto com o topo?</summary><p>Não. Quando o pedido é de topo, o bolo aparece apenas para mostrar proporção e aplicação do produto.</p></details>
          <details><summary>Posso enviar uma foto ou referência minha?</summary><p>Sim. Você pode enviar uma imagem, paleta ou ideia para orientar tema, cores, composição e detalhes.</p></details>
          <details><summary>Posso mudar nome, idade e cores?</summary><p>Sim. Esses elementos são adaptados ao seu pedido, respeitando a composição e o acabamento escolhidos.</p></details>
          <details><summary>Vocês fazem outros produtos além de topo?</summary><p>Sim. A linha está sendo ampliada com caixinhas, adesivos, chaveiros, lembrancinhas e papelaria para doces. Consulte disponibilidade no orçamento.</p></details>
          <details><summary>Como o preço é definido?</summary><p>O valor depende do produto, quantidade, tamanho, complexidade, materiais, acabamento e prazo. O orçamento é confirmado antes da produção.</p></details>
        </div>
      </div>
    </section>

    <section className="v8-home-contact" id="contato">
      <div className="container">
        <div className="v8-home-contact-shell" data-reveal>
          <div>
            <div className="eyebrow"><i/> VAMOS CRIAR?</div>
            <h2>Conte o que você imaginou.<br/><em>A gente organiza o resto.</em></h2>
            <p>Você pode começar com uma inspiração do site, uma foto sua ou apenas o tema. Antes da produção, os detalhes e o orçamento são confirmados.</p>
          </div>
          <div className="v8-contact-actions">
            <Link className="btn btn-primary" href="/orcamento">Pedir orçamento <ArrowUpRight size={16}/></Link>
            <Link className="btn btn-ghost" href="/inspiracoes">Ver inspirações</Link>
            {wa&&<a className="v8-contact-wa" href={wa} target="_blank" rel="noreferrer"><MessageCircle size={18}/><span><small>ATENDIMENTO DIRETO</small><strong>Chamar no WhatsApp</strong></span><ArrowUpRight size={15}/></a>}
          </div>
        </div>
      </div>
    </section>

    <Footer settings={settings}/>
    <MerlinMobileDock whatsapp={wa}/>
  </main>;
}
