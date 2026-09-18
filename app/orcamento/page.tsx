import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopperBuilder from '@/components/TopperBuilder';
import { getSiteSettings } from '@/lib/db';

export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Orçamento de topo | Merlin Encantos em Papel',description:'Envie tema, nome, idade, tamanho do bolo e nível de acabamento para receber um orçamento de topo personalizado.',robots:{index:false,follow:true}};

export default async function QuotePage(){
 const settings=await getSiteSettings();
 return <main className="premium-site kf-theme kit-builder-page"><Header settings={settings}/><section className="kit-builder-hero"><div className="container"><div className="kit-builder-hero-copy"><div className="eyebrow">ORÇAMENTO DE TOPO</div><h1>Conte sua ideia.<br/><em>Escolha o nível.</em></h1><p>O formulário abaixo substitui o antigo orçamento de vários produtos. Agora o atendimento é focado exclusivamente em topos de bolo.</p></div></div></section><section className="kit-builder-main"><div className="container"><TopperBuilder/></div></section><Footer settings={settings}/></main>;
}
