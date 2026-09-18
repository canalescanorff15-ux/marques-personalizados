import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Info, Layers3, ShieldCheck, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSiteSettings } from '@/lib/db';
import { topperLevels } from '@/lib/topper-catalog';

export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Níveis e preços de topos | Merlin Encantos em Papel',description:'Entenda os níveis de acabamento dos topos de bolo, do Essencial ao Elite com shaker e acetato. Valores são confirmados em orçamento.'};

export default async function PriceGuidePage(){
 const settings=await getSiteSettings();
 return <main className="premium-site price-guide-page"><Header settings={settings}/>
  <section className="price-guide-hero"><div className="container"><div className="eyebrow">DO SIMPLES AO ELITE</div><h1>Escolha o acabamento.<br/><em>O preço vem do projeto real.</em></h1><p>Como estamos começando esta linha, não vamos publicar valores artificiais. Cada orçamento considera tamanho, tema, quantidade de camadas, shaker, acetato, papéis especiais e prazo.</p><div><Link className="btn btn-primary" href="/monte-seu-topo"><Layers3 size={17}/> Montar meu topo</Link><Link className="btn" href="/catalogo">Comparar níveis</Link></div></div></section>
  <section className="price-guide-catalog"><div className="container"><section className="price-guide-category"><header><div><span>01</span></div><div><small>LINHA DE TOPOS</small><h2>6 níveis de acabamento</h2><p>Todos personalizados e produzidos sob encomenda.</p></div></header><div className="price-guide-table" role="table"><div className="price-guide-row price-guide-row-head"><span>Modelo</span><span>Complexidade</span><span>Valor</span><span>Ideal para</span><span/></div>{topperLevels.map(item=><div className="price-guide-row" role="row" key={item.slug}><div><span><strong>{item.code} — {item.name}</strong><small>{item.eyebrow}</small></span></div><b>{item.complexity}</b><span>Sob orçamento</span><span>{item.idealFor}</span><Link href={`/catalogo/${item.slug}`}><ArrowUpRight size={16}/></Link></div>)}</div></section></div></section>
  <section className="price-guide-rules"><div className="container"><div className="price-guide-rule"><Info size={20}/><div><strong>O que altera o valor?</strong><p>Tamanho do topo, número de camadas, complexidade da arte, papéis especiais, shaker, acetato, urgência e quantidade de elementos.</p></div></div><div className="price-guide-rule"><ShieldCheck size={20}/><div><strong>Sem surpresa.</strong><p>O valor é confirmado antes da produção. Nenhum pagamento é feito automaticamente pelo site.</p></div></div><div className="price-guide-rule"><Sparkles size={20}/><div><strong>O Elite é o mais completo.</strong><p>É o nível que reúne multicamadas, shaker e acetato quando a composição comporta esses recursos.</p></div></div></div></section>
  <Footer settings={settings}/>
 </main>;
}
