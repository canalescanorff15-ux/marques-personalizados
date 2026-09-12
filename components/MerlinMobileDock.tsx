import Link from 'next/link';
import { Heart, MessageCircle, PackagePlus, Sparkles } from 'lucide-react';

export default function MerlinMobileDock({whatsapp}:{whatsapp:string}){
  return <nav className="merlin-mobile-dock" aria-label="Ações rápidas">
    <Link href="/inspiracoes"><Sparkles size={18}/><span>Inspirações</span></Link>
    <Link href="/monte-seu-kit"><PackagePlus size={18}/><span>Montar kit</span></Link>
    <Link href="/meu-projeto"><Heart size={18}/><span>Meu projeto</span></Link>
    <Link className="is-primary" href="/orcamento"><MessageCircle size={18}/><span>Orçamento</span></Link>
  </nav>;
}
