import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Layers3, Palette, Sparkles } from 'lucide-react';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InspirationFavoriteButton from '@/components/InspirationFavoriteButton';
import InspirationShareButton from '@/components/InspirationShareButton';
import { getSiteSettings } from '@/lib/db';
import { isPublicTopperInspiration, publicTopperInspirations, topperInspirationByCode } from '@/lib/topper-inspirations';
import { topperLevelBySlug } from '@/lib/topper-catalog';

type Props={params:Promise<{code:string}>};

export async function generateMetadata({params}:Props):Promise<Metadata>{
  const {code}=await params;
  const inspiration=topperInspirationByCode(decodeURIComponent(code));
  if(!inspiration||!isPublicTopperInspiration(inspiration.code))return{title:'Inspirações de topos | Merlin Encantos em Papel'};
  return{
    title:inspiration.title+' | Inspirações Merlin',
    description:inspiration.description
  };
}

export const dynamic='force-dynamic';

export default async function InspirationDetailPage({params}:Props){
  const {code}=await params;
  const inspiration=topperInspirationByCode(decodeURIComponent(code));
  if(!inspiration)redirect('/inspiracoes');
  if(!isPublicTopperInspiration(inspiration.code))redirect('/inspiracoes');

  const [settings]=await Promise.all([getSiteSettings()]);
  const level=topperLevelBySlug(inspiration.levelSlug);
  const builderHref='/monte-seu-pedido?produto=topo&inspiracao='+encodeURIComponent(inspiration.slug)+'&nivel='+encodeURIComponent(inspiration.levelSlug)+'&tema='+encodeURIComponent(inspiration.title);
  const sameCategory=publicTopperInspirations.filter(item=>item.code!==inspiration.code&&item.category===inspiration.category);
  const fallback=publicTopperInspirations.filter(item=>item.code!==inspiration.code&&!sameCategory.some(related=>related.code===item.code));
  const related=[...sameCategory,...fallback].slice(0,3);

  return <main className="merlin-public public-inspiration-detail-page v8-inspiration-detail">
    <Header settings={settings}/>

    <section className="v8-detail-hero">
      <div className="public-shell">
        <Link className="v8-detail-back" href="/inspiracoes"><ArrowLeft size={16}/> Voltar às inspirações</Link>

        <div className="v8-detail-grid">
          <div className="v8-detail-media-column">
            <figure className="v8-detail-media">
              <img src={inspiration.image} alt={'Inspiração de topo '+inspiration.title} width={1200} height={1200} decoding="async"/>
              <figcaption>
                <span>{inspiration.code}</span>
                <strong>Referência visual do produto</strong>
              </figcaption>
            </figure>

            <div className="v8-detail-media-actions">
              <InspirationFavoriteButton code={inspiration.code}/>
              <InspirationShareButton title={inspiration.title} code={inspiration.code}/>
            </div>

            <div className="v8-detail-scope">
              <strong>O que a imagem representa</strong>
              <p>Esta referência ajuda a visualizar estilo, paleta e composição do topo. Bolo, doces, painel, balões, mesa, flores de cenário e decoração do ambiente não fazem parte do produto, salvo quando estiverem descritos separadamente no orçamento.</p>
            </div>
          </div>

          <div className="v8-detail-copy">
            <span className="v8-detail-kicker"><Sparkles size={14}/> {inspiration.category}</span>
            <h1>{inspiration.title}</h1>
            <p className="v8-detail-description">{inspiration.description}</p>

            <div className="v8-detail-facts">
              <article><Layers3 size={18}/><div><small>nível sugerido</small><strong>{level?.name||'Topo personalizado'}</strong></div></article>
              <article><Palette size={18}/><div><small>Paleta da referência</small><strong>{inspiration.palette.join(' • ')}</strong></div></article>
            </div>

            <div className="v8-detail-personalize public-detail-customize">
              <small>PODE SER PERSONALIZADO</small>
              <div>
                <span><CheckCircle2 size={15}/> Nome e idade</span>
                <span><CheckCircle2 size={15}/> Cores e elementos</span>
                <span><CheckCircle2 size={15}/> Acabamento</span>
                <span><CheckCircle2 size={15}/> Tema e composição</span>
              </div>
            </div>

            <div className="v8-detail-tags">{inspiration.tags.map(tag=><span key={tag}>#{tag}</span>)}</div>

            <div className="v8-detail-note">
              <strong>Use esta referência como ponto de partida.</strong>
              <p>O resultado final é adaptado ao seu pedido. Você pode manter a ideia principal e mudar nome, idade, cores, detalhes e acabamento para combinar melhor com o bolo e com o evento.</p>
            </div>

            <div className="v8-detail-actions">
              <Link className="btn btn-primary btn-luxury" href={builderHref}>Quero esse modelo <ArrowUpRight size={16}/></Link>
              <Link className="btn btn-ghost" href="/catalogo">Comparar acabamentos</Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    {related.length>0&&<section className="v8-detail-related">
      <div className="public-shell">
        <div className="v8-detail-related-head">
          <div><span className="eyebrow"><i/> CONTINUE EXPLORANDO</span><h2>Outras referências que<br/><em>podem combinar com sua ideia.</em></h2></div>
          <Link href="/inspiracoes">Ver galeria completa <ArrowUpRight size={15}/></Link>
        </div>
        <div className="v8-detail-related-grid">
          {related.map(item=><Link href={'/inspiracoes/'+encodeURIComponent(item.code)} className="v8-detail-related-card" key={item.code}>
            <div><img src={item.image} alt={'Inspiração '+item.title} loading="lazy"/><span>{item.code}</span></div>
            <small>{item.category}</small>
            <strong>{item.title}</strong>
            <b>Ver referência <ArrowUpRight size={14}/></b>
          </Link>)}
        </div>
      </div>
    </section>}

    <section className="v8-detail-final-cta">
      <div className="public-shell">
        <div><small>NÃO PRECISA SER IGUAL</small><strong>Gostou da ideia, mas quer mudar detalhes?</strong><p>Comece por esta referência e conte no briefing o que deseja manter, trocar ou acrescentar.</p></div>
        <Link className="btn btn-primary btn-luxury" href={builderHref}>Personalizar esta referência <ArrowUpRight size={16}/></Link>
      </div>
    </section>

    <Footer settings={settings}/>
  </main>;

}
