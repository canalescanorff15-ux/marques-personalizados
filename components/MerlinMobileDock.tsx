'use client';

import Link from 'next/link';
import { Home, Layers3, MessageCircle, ShoppingBag, Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';

const items=[
  {href:'/',label:'Início',icon:Home},
  {href:'/catalogo',label:'Topos',icon:Layers3},
  {href:'/inspiracoes',label:'Inspirações',icon:Sparkles},
  {href:'/monte-seu-pedido',label:'Meu Pedido',icon:ShoppingBag},
  {href:'/orcamento',label:'Orçamento',icon:MessageCircle,primary:true}
];

function activeFor(pathname:string,href:string){
  if(href==='/')return pathname==='/';
  if(href==='/catalogo')return pathname.startsWith('/catalogo')||pathname.startsWith('/guia-de-precos');
  if(href==='/monte-seu-pedido')return pathname.startsWith('/monte-seu-pedido');
  if(href==='/orcamento')return pathname.startsWith('/orcamento');
  return pathname.startsWith(href);
}

export default function MerlinMobileDock(){
  const pathname=usePathname();
  return <nav className="merlin-mobile-dock" aria-label="Navegação rápida">
    {items.map(item=>{
      const Icon=item.icon;
      const active=activeFor(pathname,item.href);
      return <Link
        key={item.href}
        href={item.href}
        className={`${item.primary?'is-primary ':''}${active?'is-active':''}`.trim()}
        aria-current={active?'page':undefined}
      ><Icon size={18}/><span>{item.label}</span></Link>;
    })}
  </nav>;
}
