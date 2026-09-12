import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InspirationCompareWorkspace from '@/components/InspirationCompareWorkspace';
import { getSiteSettings } from '@/lib/db';

export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Comparar inspirações | Merlin Encantos em Papel',description:'Compare lado a lado as inspirações que você selecionou no catálogo Merlin e leve as referências escolhidas para montar seu kit.',robots:{index:false,follow:true}};

export default async function CompareInspirationsPage(){
  const settings=await getSiteSettings();
  return <main className="premium-site kf-theme inspiration-compare-page"><Header settings={settings}/><InspirationCompareWorkspace/><Footer settings={settings}/></main>;
}
