import Link from 'next/link';
import { MessageCircle, PackagePlus, Sparkles } from 'lucide-react';
import { whatsappUrl } from '@/lib/links';

export default function MerlinMobileDock({whatsapp}:{whatsapp:string}){
  const wa=whatsappUrl(whatsapp,'Olá! Vim pelo site da Merlin Encantos em Papel e gostaria de iniciar um orçamento personalizado.');
  return <nav className="merlin-mobile-dock" aria-label="Ações rápidas">
    <Link href="/inspiracoes"><Sparkles size={18}/><span>Inspirações</span></Link>
    <Link href="/monte-seu-kit"><PackagePlus size={18}/><span>Montar kit</span></Link>
    {wa?<a className="is-primary" href={wa} target="_blank" rel="noreferrer"><MessageCircle size={18}/><span>Orçamento</span></a>:<Link className="is-primary" href="/#contato"><MessageCircle size={18}/><span>Orçamento</span></Link>}
  </nav>;
}
