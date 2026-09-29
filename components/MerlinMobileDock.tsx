'use client';

import Link from 'next/link';
import { House, Layers3, MessageCircle, ShoppingBag, Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';

const dockItems=[
  {href:'/',label:'Início',icon:House},
  {href:'/catalogo',label:'Topos',icon:Layers3},
  {href:'/inspiracoes',label:'Ideias',icon:Sparkles},
  {href:'/monte-seu-pedido',label:'Pedido',icon:ShoppingBag},
  {href:'/orcamento',label:'Orçamento',icon:MessageCircle,primary:true}
];

export default function MerlinMobileDock(){
  const pathname=usePathname();
  const activeHref=pathname.startsWith('/catalogo')||pathname.startsWith('/guia-de-precos')
    ?'/catalogo'
    :pathname.startsWith('/inspiracoes')
      ?'/inspiracoes'
      :pathname.startsWith('/monte-seu-pedido')
        ?'/monte-seu-pedido'
        :pathname.startsWith('/orcamento')
          ?'/orcamento'
          :pathname==='/'?'/':'';

  return <nav className="merlin-mobile-dock" aria-label="Navegação rápida">
    {dockItems.map(item=>{
      const Icon=item.icon;
      const active=activeHref===item.href;
      return <Link
        key={item.href}
        href={item.href}
        className={`${item.primary?'is-primary ':''}${active?'is-active':''}`.trim()}
        aria-current={active?'page':undefined}
      >
        <Icon size={18}/><span>{item.label}</span>
      </Link>;
    })}
  </nav>;
}
