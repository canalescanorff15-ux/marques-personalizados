import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MerlinProjectBoard from '@/components/MerlinProjectBoard';
import { getSiteSettings } from '@/lib/db';

export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Meu projeto | Merlin Encantos em Papel',description:'Organize inspirações salvas e comparadas, escolha sua seleção final e leve as referências para o Monte seu Kit.',robots:{index:false,follow:true}};

export default async function MerlinProjectPage(){
  const settings=await getSiteSettings();
  return <main className="premium-site kf-theme merlin-project-page"><Header settings={settings}/><MerlinProjectBoard whatsapp={settings.whatsapp_number}/><Footer settings={settings}/></main>;
}
