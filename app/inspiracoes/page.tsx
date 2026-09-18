import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Layers3, Sparkles, Tags } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopperLevelVisual from '@/components/TopperLevelVisual';
import { getSiteSettings } from '@/lib/db';
import { topperLevels, topperThemes } from '@/lib/topper-catalog';
import { topperInspirations } from '@/lib/topper-inspirations';

export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Inspirações de topos | Merlin Encantos em Papel',description:'Escolha temas e estilos para criar seu topo de bolo personalizado, do modelo simples ao Elite com shaker e acetato.'};

export default async function InspirationsPage(){
 const settings=await getSiteSettings();
 return <main className="premium-site kf-theme inspiration-page"><Header settings={settings}/>
  <section className="inspiration-page-hero"><div className="container"><div className="eyebrow"><Sparkles size={14}/> Inspirações de topos</div><h1>Escolha o tema.<br/><em>Depois escolha o nível.</em></h1><p>Aqui você escolhe a direção visual do seu topo: tema, estilo e nível de acabamento. Cada ideia pode ser adaptada ao tamanho do bolo, nome, idade e cores da festa.</p><div className="inspiration-hero-stats"><span><strong>{topperThemes.length}</strong> famílias de tema</span><span><strong>{topperLevels.length}</strong> níveis de acabamento</span><span><strong>1</strong> foco: topos de bolo</span></div></div></section>
  <section className="inspiration-discovery topper-inspiration-showcase"><div className="container"><div className="inspiration-discovery-head"><div><div className="eyebrow"><Sparkles size={14}/> Modelos para se inspirar</div><h2>12 ideias iniciais.<br/><em>Todas podem ser personalizadas.</em></h2></div><p>Escolha uma base visual. Nome, idade, cores e acabamento podem mudar sem perder a ideia principal.</p></div><div className="topper-inspiration-grid">{topperInspirations.map(item=>{const level=topperLevels.find(option=>option.slug===item.levelSlug);return <article className="topper-inspiration-card" key={item.code}><div className="topper-inspiration-media"><img src={item.image} alt={`Inspiração de topo ${item.title}`} loading="lazy" decoding="async"/><span>{item.code}</span></div><div className="topper-inspiration-copy"><small>{item.category}</small><h3>{item.title}</h3><p>{item.description}</p><div className="topper-inspiration-meta"><span><Layers3 size={14}/> Sugestão: {level?.name||'Topo personalizado'}</span><span>{item.palette.join(' • ')}</span></div><Link className="btn btn-primary" href={`/monte-seu-topo?inspiracao=${encodeURIComponent(item.slug)}&nivel=${encodeURIComponent(item.levelSlug)}&tema=${encodeURIComponent(item.title)}`}>Quero esse modelo <ArrowUpRight size={15}/></Link></div></article>})}</div></div></section>
  <section className="inspiration-discovery theme-discovery"><div className="container"><div className="inspiration-discovery-head"><div><div className="eyebrow"><Tags size={14}/> Temas</div><h2>Escolha uma direção.<br/><em>A arte final será personalizada.</em></h2></div><p>Essas famílias servem como ponto de partida. Você também pode enviar uma foto, print ou ideia totalmente diferente.</p></div><div className="inspiration-theme-grid">{topperThemes.map(item=><Link href={`/monte-seu-topo?tema=${encodeURIComponent(item.label)}`} key={item.slug}><span><Tags size={16}/></span><div><strong>{item.label}</strong><small>{item.description}</small></div><ArrowUpRight size={15}/></Link>)}</div></div></section>
  <section className="inspiration-discovery investment"><div className="container"><div className="inspiration-discovery-head"><div><div className="eyebrow"><Layers3 size={14}/> Níveis</div><h2>Transforme a ideia<br/><em>no acabamento que cabe no seu pedido.</em></h2></div><p>Do simples ao Elite com shaker + acetato.</p></div><div className="inspiration-investment-grid topper-level-grid">{topperLevels.map(item=><Link href={`/monte-seu-topo?nivel=${item.slug}`} key={item.slug}><TopperLevelVisual level={item} compact/><span>{item.code}</span><div><strong>{item.name}</strong><p>{item.description}</p></div><Layers3 size={18}/></Link>)}</div></div></section>
  <Footer settings={settings}/>
 </main>;
}
