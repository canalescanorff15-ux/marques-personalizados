import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InspirationFavoriteButton from '@/components/InspirationFavoriteButton';
import InspirationShareButton from '@/components/InspirationShareButton';
import { getSiteSettings } from '@/lib/db';
import { isPublicTopperInspiration, publicTopperInspirations, topperInspirationByCode } from '@/lib/topper-inspirations';

type Props={params:Promise<{code:string}>};

export async function generateMetadata({params}:Props):Promise<Metadata>{
  const {code}=await params;
  const inspiration=topperInspirationByCode(decodeURIComponent(code));
  if(!inspiration||!isPublicTopperInspiration(inspiration.code))return{title:'Inspirações | Merlin Encantos em Papel'};
  return{title:inspiration.title+' | Merlin Encantos em Papel',description:inspiration.description};
}

export const dynamic='force-dynamic';

export default async function InspirationDetailPage({params}:Props){
  const {code}=await params;
  const inspiration=topperInspirationByCode(decodeURIComponent(code));
  if(!inspiration)redirect('/inspiracoes');
  if(!isPublicTopperInspiration(inspiration.code))redirect('/inspiracoes');

  const settings=await getSiteSettings();
  const builderHref='/monte-seu-pedido?produto=topo&inspiracao='+encodeURIComponent(inspiration.slug)+'&nivel='+encodeURIComponent(inspiration.levelSlug)+'&tema='+encodeURIComponent(inspiration.title);
  const related=publicTopperInspirations.filter(item=>item.code!==inspiration.code).slice(0,2);

  return <main className="merlin-public public-inspiration-detail-page v8-inspiration-detail v8-storefront-detail">
    <Header settings={settings}/>

    <section className="v8-detail-hero">
      <div className="public-shell">
        <Link className="v8-detail-back" href="/inspiracoes"><ArrowLeft size={16}/> Voltar</Link>

        <div className="v8-detail-grid">
          <div className="v8-detail-media-column">
            <figure className="v8-detail-media">
              <img src={inspiration.image} alt={'Inspiração de topo '+inspiration.title} width={1200} height={1200} decoding="async"/>
            </figure>
            <div className="v8-detail-media-actions">
              <InspirationFavoriteButton code={inspiration.code}/>
              <InspirationShareButton title={inspiration.title} code={inspiration.code}/>
            </div>
          </div>

          <div className="v8-detail-copy">
            <span className="v8-detail-kicker"><Sparkles size={14}/> {inspiration.category}</span>
            <h1>{inspiration.title}</h1>
            <p className="v8-detail-description">{inspiration.description}</p>

            <div className="v8-detail-personalize public-detail-customize">
              <span><CheckCircle2 size={15}/> Nome e idade</span>
              <span><CheckCircle2 size={15}/> Cores e elementos</span>
              <span><CheckCircle2 size={15}/> Acabamento</span>
            </div>

            <div className="v8-detail-actions">
              <Link className="btn btn-primary btn-luxury" href={builderHref}>Quero esse modelo <ArrowUpRight size={16}/></Link>
            </div>

            <p className="v8-storefront-disclaimer">Imagem de referência. Bolo e decoração do ambiente não estão inclusos por padrão.</p>
          </div>
        </div>
      </div>
    </section>

    {related.length>0&&<section className="v8-detail-related v8-storefront-related">
      <div className="public-shell">
        <div className="v8-storefront-related-head"><small>OUTRAS IDEIAS</small><Link href="/inspiracoes">Ver todas <ArrowUpRight size={14}/></Link></div>
        <div className="v8-detail-related-grid">
          {related.map(item=><Link href={'/inspiracoes/'+encodeURIComponent(item.code)} className="v8-detail-related-card" key={item.code}>
            <div><img src={item.image} alt={'Inspiração '+item.title} loading="lazy"/></div>
            <strong>{item.title}</strong>
          </Link>)}
        </div>
      </div>
    </section>}

    <Footer settings={settings}/>
  </main>;
}
