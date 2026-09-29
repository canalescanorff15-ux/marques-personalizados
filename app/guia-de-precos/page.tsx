import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Info, Layers3, ShieldCheck, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSiteSettings } from '@/lib/db';
import { topperLevels } from '@/lib/topper-catalog';
import { topperBasePriceNote, topperLaunchPriceNote, topperPriceForSlug } from '@/lib/topper-pricing';

export const dynamic='force-dynamic';
export const metadata:Metadata={
 title:'Preços de topos | Merlin Encantos em Papel',
 description:'Consulte os valores de lançamento das quatro linhas atuais de topos de bolo da Merlin Encantos em Papel.'
};

export default async function PriceGuidePage(){
 const settings=await getSiteSettings();
 return <main className="premium-site price-guide-page public-v712 v823-price-guide"><Header settings={settings}/>
  <section className="price-guide-hero"><div className="container"><div className="eyebrow">VALORES DE LANÇAMENTO</div><h1>Quatro acabamentos.<br/><em>Valores claros para começar.</em></h1><p>Escolha a linha que combina com o seu projeto. O valor exibido é a base da categoria e a personalização é definida antes da produção.</p><div><Link className="btn btn-primary" href="/monte-seu-pedido?produto=topo"><Layers3 size={17}/> Pedir orçamento</Link><Link className="btn" href="/catalogo">Ver os topos</Link></div></div></section>
  <section className="price-guide-catalog"><div className="container"><section className="price-guide-category"><header><div><span>01</span></div><div><small>LINHA DE TOPOS</small><h2>4 acabamentos atuais</h2><p>Todos personalizados e produzidos sob encomenda.</p></div></header><div className="price-guide-table v823-price-guide-table" role="table"><div className="price-guide-row price-guide-row-head"><span>Modelo</span><span>Complexidade</span><span>Valor inicial</span><span>Ideal para</span><span/></div>{topperLevels.map(item=><div className="price-guide-row" role="row" key={item.slug}><div><span><strong>{item.code} — {item.name}</strong><small>{item.eyebrow}</small></span></div><b>{item.complexity}</b><span>A partir de R$ {topperPriceForSlug(item.slug)}</span><span>{item.idealFor}</span><Link href={`/catalogo/${item.slug}`} aria-label={`Ver ${item.name}`}><ArrowUpRight size={16}/></Link></div>)}</div><p className="v823-price-guide-note">{topperLaunchPriceNote}</p></section></div></section>
  <section className="price-guide-rules"><div className="container"><div className="price-guide-rule"><Info size={20}/><div><strong>O que pode alterar o valor?</strong><p>{topperBasePriceNote}</p></div></div><div className="price-guide-rule"><ShieldCheck size={20}/><div><strong>Critério objetivo.</strong><p>A variação considera somente características do projeto e dos materiais. O valor não muda conforme a pessoa que está pedindo.</p></div></div><div className="price-guide-rule"><Sparkles size={20}/><div><strong>Projetos acima do padrão.</strong><p>Quando a quantidade de detalhes ultrapassar claramente o padrão da categoria escolhida, o topo poderá ser reclassificado para a categoria imediatamente superior antes da aprovação do orçamento.</p></div></div></div></section>
  <Footer settings={settings}/>
 </main>;
}
