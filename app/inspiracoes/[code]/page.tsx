import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Layers3, Palette, Sparkles } from 'lucide-react';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSiteSettings } from '@/lib/db';
import { topperInspirationByCode } from '@/lib/topper-inspirations';
import { topperLevelBySlug } from '@/lib/topper-catalog';

type Props={params:Promise<{code:string}>};

export async function generateMetadata({params}:Props):Promise<Metadata>{
  const {code}=await params;
  const inspiration=topperInspirationByCode(decodeURIComponent(code));
  if(!inspiration)return{title:'Inspirações de topos | Merlin Encantos em Papel'};
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

  const [settings]=await Promise.all([getSiteSettings()]);
  const level=topperLevelBySlug(inspiration.levelSlug);
  const builderHref='/monte-seu-topo?inspiracao='+encodeURIComponent(inspiration.slug)+'&nivel='+encodeURIComponent(inspiration.levelSlug)+'&tema='+encodeURIComponent(inspiration.title);

  return <main className="merlin-public public-inspiration-detail-page">
    <Header settings={settings}/>
    <section className="public-detail-section">
      <div className="public-shell">
        <Link className="public-back-link" href="/inspiracoes"><ArrowLeft size={16}/> Voltar às inspirações</Link>
        <div className="public-detail-grid">
          <div className="public-detail-media">
            <img src={inspiration.image} alt={'Inspiração de topo '+inspiration.title}/>
            <span>{inspiration.code}</span>
          </div>
          <div className="public-detail-copy">
            <span className="public-kicker"><Sparkles size={14}/> {inspiration.category}</span>
            <h1>{inspiration.title}</h1>
            <p className="public-detail-description">{inspiration.description}</p>

            <div className="public-detail-facts">
              <div><Layers3 size={17}/><span><small>nível sugerido</small><strong>{level?.name||'Topo personalizado'}</strong></span></div>
              <div><Palette size={17}/><span><small>paleta</small><strong>{inspiration.palette.join(' • ')}</strong></span></div>
            </div>

            <div className="public-detail-tags">{inspiration.tags.map(tag=><span key={tag}>#{tag}</span>)}</div>

            <div className="public-detail-note">
              <strong>Esta inspiração é adaptável.</strong>
              <p>Nome, idade, cores e detalhes podem mudar. O nível sugerido é apenas um ponto de partida; você pode escolher outro acabamento no formulário.</p>
            </div>

            <div className="public-detail-actions">
              <Link className="public-primary-button" href={builderHref}>Quero esse modelo <ArrowUpRight size={16}/></Link>
              <Link className="public-secondary-button" href="/catalogo">Comparar acabamentos</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer settings={settings}/>
  </main>;
}
