import Link from 'next/link';
import { Layers3, MessageCircle, Sparkles } from 'lucide-react';

export default function MerlinMobileDock({whatsapp}:{whatsapp:string}){
  return <nav className="merlin-mobile-dock" aria-label="Ações rápidas">
    <Link href="/catalogo"><Layers3 size={18}/><span>Topos</span></Link>
    <Link href="/inspiracoes"><Sparkles size={18}/><span>Ideias</span></Link>
    <Link href="/monte-seu-topo"><Layers3 size={18}/><span>Montar topo</span></Link>
    <Link className="is-primary" href="/orcamento"><MessageCircle size={18}/><span>Orçamento</span></Link>
  </nav>;
}
