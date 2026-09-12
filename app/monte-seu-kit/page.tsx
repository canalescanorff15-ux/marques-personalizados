import type { Metadata } from 'next';
import { ArrowUpRight, Gift, Heart, PackagePlus, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import KitBuilder from '@/components/KitBuilder';
import { getSiteSettings } from '@/lib/db';

export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Monte seu kit | Merlin Encantos em Papel',description:'Monte um kit personalizado com topos, caixas, lembrancinhas e detalhes, escolha inspirações e envie a composição completa para orçamento pelo WhatsApp.'};

export default async function KitBuilderPage(){
  const settings=await getSiteSettings();
  return <main className="premium-site kf-theme kit-builder-page"><Header settings={settings}/>
    <section className="kit-builder-hero"><div className="container"><div className="kit-builder-hero-copy"><div className="eyebrow"><PackagePlus size={14}/> Pedido guiado Merlin</div><h1>Monte seu kit.<br/><em>Ajuste do seu jeito.</em></h1><p>Escolha uma base pronta ou monte peça por peça. O rascunho fica salvo no aparelho e, no final, a composição completa entra no atendimento com tema, convidados, referências e quantidades.</p><div className="kit-builder-hero-actions"><a className="btn btn-primary btn-luxury" href="#montar-kit">Começar agora <ArrowUpRight size={16}/></a><a className="btn btn-ghost" href="/inspiracoes"><Sparkles size={16}/> Ver inspirações</a></div><div className="kit-builder-trust"><span><Gift size={15}/> quantidades editáveis</span><span><Heart size={15}/> usa inspirações salvas</span><span><Sparkles size={15}/> orçamento sem compromisso</span></div></div><div className="kit-builder-hero-card" aria-hidden="true"><span>01</span><strong>Escolha<br/>as peças.</strong><i/><span>02</span><strong>Defina<br/>o estilo.</strong><i/><span>03</span><strong>Envie para<br/>orçamento.</strong></div></div></section>
    <section className="kit-builder-main" id="montar-kit"><div className="container"><KitBuilder/></div></section>
    <Footer settings={settings}/>
  </main>;
}
