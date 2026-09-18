import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Layers3, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopperLevelVisual from '@/components/TopperLevelVisual';
import { getSiteSettings } from '@/lib/db';
import { topperLevels } from '@/lib/topper-catalog';

export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Topos de bolo | Merlin Encantos em Papel',description:'Conheça os níveis de topos de bolo personalizados da Merlin: Simples, Básico 3D, Premium, Shaker, Acetato e Elite Shaker + Acetato.'};

export default async function CatalogPage(){
 const settings=await getSiteSettings();
 return <main className="premium-site kf-theme inspiration-page"><Header settings={settings}/>
  <section className="inspiration-page-hero"><div className="container"><div className="eyebrow"><Layers3 size={14}/> Catálogo de topos</div><h1>Um topo para cada<br/><em>nível de acabamento.</em></h1><p>Nosso catálogo é dedicado a topos de bolo personalizados, do modelo simples ao Elite com shaker e acetato. Escolha o nível de acabamento e depois personalize tema, nome, idade, cores e tamanho.</p><a className="btn btn-primary btn-luxury" href="#niveis">Comparar níveis <ArrowUpRight size={16}/></a></div></section>
  <section className="inspiration-discovery investment" id="niveis"><div className="container"><div className="inspiration-discovery-head"><div><div className="eyebrow"><Sparkles size={14}/> Linha completa</div><h2>Do TOP-01 ao TOP-06.<br/><em>Você escolhe quanto detalhe quer.</em></h2></div><p>O tema pode ser o mesmo em qualquer nível. O que muda é a quantidade de camadas, profundidade e acabamento.</p></div><div className="inspiration-investment-grid topper-level-grid">{topperLevels.map(item=><Link href={`/catalogo/${item.slug}`} key={item.slug}><TopperLevelVisual level={item} compact/><span>{item.code}</span><div><strong>{item.name}</strong><p>{item.description}</p><small>{item.complexity}</small></div><Layers3 size={18}/></Link>)}</div></div></section>
  <section className="price-guide-rules"><div className="container"><div className="price-guide-rule"><Layers3 size={20}/><div><strong>Sem pacote obrigatório.</strong><p>Você pode pedir somente um topo. O orçamento considera o nível, tema, tamanho e acabamento escolhido.</p></div></div><div className="price-guide-rule"><Sparkles size={20}/><div><strong>Shaker e acetato são acabamentos avançados.</strong><p>Eles aparecem nos modelos próprios para isso e não são colocados à força em todo tema.</p></div></div></div></section>
  <Footer settings={settings}/>
 </main>;
}
