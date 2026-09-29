import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Layers3, MessageCircle, Sparkles } from 'lucide-react';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopperLevelVisual from '@/components/TopperLevelVisual';
import { getSiteSettings } from '@/lib/db';
import { topperLevelBySlug } from '@/lib/topper-catalog';
import { topperBasePriceNote, topperPriceForSlug } from '@/lib/topper-pricing';

type Props={params:Promise<{slug:string}>};

export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {slug}=await params;const level=topperLevelBySlug(slug);
 if(!level)return{title:'Topos de bolo | Merlin Encantos em Papel'};
 return{title:`${level.name} | Merlin Encantos em Papel`,description:level.description};
}

export const dynamic='force-dynamic';

export default async function TopperLevelPage({params}:Props){
 const {slug}=await params;const level=topperLevelBySlug(slug);
 if(!level)redirect('/catalogo');
 const settings=await getSiteSettings();
 const price=topperPriceForSlug(level.slug);
 return <main className="premium-site product-premium-page public-v712 v823-pricing-detail"><Header settings={settings}/><section className="product-page"><div className="container">
  <Link className="back-link" href="/catalogo"><ArrowLeft size={16}/> Voltar aos níveis</Link>
  <div className="product-page-grid"><div className="product-page-visual"><TopperLevelVisual level={level}/><div className="product-level-badge"><small>{level.code}</small><strong>{level.eyebrow}</strong><span>{level.complexity}</span></div></div><div className="product-page-info"><div className="eyebrow">{level.code} • {level.eyebrow}</div><h1>{level.name}</h1><p className="product-page-description">{level.description}</p><div className="product-facts large"><span><b>Complexidade</b>{level.complexity}</span><span className="v823-detail-price"><b>Valor inicial</b>A partir de R$ {price}</span><span><b>Produção</b>Sob encomenda</span></div>
  <p className="v823-base-price-note">{topperBasePriceNote}</p>
  <div className="product-premium-notes">{level.features.map(feature=><span key={feature}><Layers3 size={15}/>{feature}</span>)}</div>
  <div className="product-signature"><div><small>01</small><strong>Ideal para</strong><p>{level.idealFor}</p></div><div><small>02</small><strong>Materiais possíveis</strong><p>{level.materials.join(' • ')}</p></div><div><small>03</small><strong>Personalização</strong><p>Tema, nome, idade, cores e tamanho são definidos para o seu bolo.</p></div></div>
  <div className="product-primary-actions"><Link className="btn btn-primary" href={`/monte-seu-pedido?produto=topo&nivel=${level.slug}`}><MessageCircle size={16}/> Pedir orçamento no WhatsApp</Link><Link className="btn" href="/inspiracoes"><Sparkles size={16}/> Escolher tema</Link></div>
  </div></div>
 </div></section><Footer settings={settings}/></main>;
}
