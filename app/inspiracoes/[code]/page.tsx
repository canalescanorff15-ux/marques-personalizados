import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Info, Layers3, Palette, Sparkles } from 'lucide-react';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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

  const settings=await getSiteSettings();
  const level=topperLevelBySlug(inspiration.levelSlug);
  const builderHref='/monte-seu-topo?inspiracao='+encodeURIComponent(inspiration.slug)+'&nivel='+encodeURIComponent(inspiration.levelSlug)+'&tema='+encodeURIComponent(inspiration.title);
  const related=[
    ...publicTopperInspirations.filter(item=>item.code!==inspiration.code&&item.category===inspiration.category),
    ...publicTopperInspirations.filter(item=>item.code!==inspiration.code&&item.category!==inspiration.category)
  ].slice(0,3);

  return <main className="merlin-public public-inspiration-detail-page v8-inspiration-detail">
    <Header settings={settings}/>

    <section className="public-detail-section v8-detail-section">
      <div className="public-shell">
        <Link className="public-back-link v8-detail-back" href="/inspiracoes"><ArrowLeft size={16}/> Voltar às inspirações</Link>

        <div className="public-detail-grid v8-detail-grid">
          <div className="public-detail-media v8-detail-media">
            <div className="v8-detail-photo">
              <img src={inspiration.image} alt={'Inspiração de topo '+inspiration.title} width={1200} height={1200} decoding="async"/>
              <span className="v8-detail-code">{inspiration.code}</span>
            </div>
            <p className="public-detail-image-scope v8-detail-image-scope"><Info size={16}/><span><strong>Imagem de referência do produto.</strong> O destaque é o topo/papelaria personalizada; o cenário serve apenas como contexto visual.</span></p>
          </div>

          <div className="public-detail-copy v8-detail-copy">
            <span className="public-kicker v8-detail-kicker"><Sparkles size={14}/> {inspiration.category}</span>
            <h1>{inspiration.title}</h1>
            <p className="public-detail-description">{inspiration.description}</p>

            <div className="public-detail-facts v8-detail-facts">
              <div><Sparkles size={17}/><span><small>produto</small><strong>Topo de bolo personalizado</strong></span></div>
              <div><Layers3 size={17}/><span><small>nível sugerido</small><strong>{level?.name||'Topo personalizado'}</strong></span></div>
              <div><Palette size={17}/><span><small>paleta</small><strong>{inspiration.palette.join(' • ')}</strong></span></div>
            </div>

            <div className="public-detail-tags v8-detail-tags">{inspiration.tags.map(tag=><span key={tag}>#{tag}</span>)}</div>

            <div className="public-detail-customize v8-detail-customize" aria-label="O que pode ser personalizado">
              <span><CheckCircle2 size={16}/><strong>Nome e idade</strong><small>feitos para o seu pedido</small></span>
              <span><CheckCircle2 size={16}/><strong>Cores e elementos</strong><small>podem ser ajustados</small></span>
              <span><CheckCircle2 size={16}/><strong>Acabamento</strong><small>você escolhe o nível</small></span>
            </div>

            <div className="v8-detail-scope" aria-label="O que está incluído">
              <div className="is-included">
                <span><CheckCircle2 size={18}/></span>
                <div><small>O QUE VOCÊ ESTÁ ESCOLHENDO</small><strong>Topo / papelaria personalizada</strong><p>Produzido conforme o briefing confirmado com você.</p></div>
              </div>
              <div className="is-reference">
                <span><Info size={18}/></span>
                <div><small>NÃO FAZ PARTE AUTOMATICAMENTE</small><strong>Cenário da fotografia</strong><p>Bolo, doces, mesa, painel, balões e decoração do ambiente só entram quando forem contratados separadamente.</p></div>
              </div>
            </div>

            <div className="public-detail-note v8-detail-note">
              <strong>Use esta inspiração como ponto de partida.</strong>
              <p>O resultado final não precisa ser uma cópia. Vamos adaptar composição, cores e detalhes para combinar com o seu bolo e com o nível de acabamento escolhido.</p>
            </div>

            <div className="public-detail-actions v8-detail-actions">
              <Link className="public-primary-button" href={builderHref}>Quero esse modelo como referência <ArrowUpRight size={16}/></Link>
              <Link className="public-secondary-button" href="/catalogo">Ver níveis de acabamento</Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    {related.length>0&&<section className="v8-related-inspirations" aria-labelledby="v8-related-title">
      <div className="public-shell">
        <div className="v8-related-head">
          <div><span>CONTINUE EXPLORANDO</span><h2 id="v8-related-title">Outras inspirações que podem combinar com você.</h2></div>
          <Link href="/inspiracoes">Ver todas <ArrowUpRight size={15}/></Link>
        </div>
        <div className="v8-related-grid">
          {related.map(item=><Link className="v8-related-card" href={'/inspiracoes/'+encodeURIComponent(item.code)} key={item.code}>
            <div><img src={item.image} alt={'Inspiração de topo '+item.title} width={900} height={675} loading="lazy" decoding="async"/></div>
            <span>{item.category}</span>
            <strong>{item.title}</strong>
            <small>Ver inspiração <ArrowUpRight size={13}/></small>
          </Link>)}
        </div>
      </div>
    </section>}

    <Footer settings={settings}/>
  </main>;
}
