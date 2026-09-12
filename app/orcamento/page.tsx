import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuoteWorkspace from '@/components/QuoteWorkspace';
import { getSiteSettings } from '@/lib/db';
export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Meu orçamento | Merlin Encantos em Papel',description:'Revise produtos, quantidades, valor inicial, briefing e prazo antes de enviar seu orçamento para a Merlin.',robots:{index:false,follow:true}};
export default async function QuotePage(){const settings=await getSiteSettings();return <main className="premium-site quote-workspace-page"><Header settings={settings}/><section className="quote-workspace-shell"><div className="container"><QuoteWorkspace/></div></section><Footer settings={settings}/></main>;}
