'use client';

import Link from 'next/link';
import { Home, Layers3, MessageCircle, ShoppingBag, Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';

const items=[
  {href:'/',label:'Início',icon:Home,match:(path:string)=>path==='/'},
  {href:'/catalogo',label:'Topos',icon:Layers3,match:(path:string)=>path.startsWith('/catalogo')||path.startsWith('/guia-de-precos')},
  {href:'/inspiracoes',label:'Ideias',icon:Sparkles,match:(path:string)=>path.startsWith('/inspiracoes')},
  {href:'/monte-seu-pedido',label:'Meu pedido',icon:ShoppingBag,match:(path:string)=>path.startsWith('/monte-seu-pedido')},
  {href:'/orcamento',label:'Orçamento',icon:MessageCircle,match:(path:string)=>path.startsWith('/orcamento')}
];

export default function MerlinMobileDock(){
  const pathname=usePathname();
  return <nav className="merlin-mobile-dock" aria-label="Ações rápidas">
    {items.map(item=>{
      const Icon=item.icon;
      const active=item.match(pathname);
      return <Link key={item.href} href={item.href} className={`${item.href==='/orcamento'?'is-primary ':''}${active?'is-active':''}`.trim()} aria-current={active?'page':undefined}>
        <Icon size={18}/><span>{item.label}</span>
      </Link>;
    })}
  </nav>;
}
