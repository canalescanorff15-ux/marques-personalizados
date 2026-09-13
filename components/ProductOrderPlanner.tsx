'use client';
import { useMemo, useState } from 'react';
import { Calculator, Check, Minus, Plus, ShoppingBag, Users } from 'lucide-react';
import type { Product } from '@/lib/db';
import { formatCatalogMoney } from '@/lib/catalog-merchandising';
import { suggestProductQuantity } from '@/lib/quote-planning';
import { useQuoteList } from './QuoteListProvider';

export default function ProductOrderPlanner({product}:{product:Product}){
  const quote=useQuoteList();
  const suggestion=useMemo(()=>suggestProductQuantity(product,quote.brief.guest_count),[product,quote.brief.guest_count]);
  const existing=quote.items.find(item=>item.product_id===product.id);
  const min=Math.max(1,product.min_quantity||1);
  const [quantity,setQuantityState]=useState(()=>existing?.quantity||suggestion.quantity||min);
  const quantitySafe=Math.min(99999,Math.max(min,Math.floor(Number(quantity)||min)));
  const total=typeof product.price_cents==='number'?product.price_cents*quantitySafe:null;
  const added=quote.includes(product.id);
  const presets=useMemo(()=>[...new Set([min,Math.max(min,suggestion.quantity),min*2,min*5])].filter(value=>value<=99999).sort((a,b)=>a-b).slice(0,4),[min,suggestion.quantity]);
  function change(next:number){setQuantityState(Math.min(99999,Math.max(min,Math.floor(Number(next)||min))));}
  function add(){quote.addProduct(product,{},quantitySafe);}
  return <section className="product-order-planner" id="planejar-pedido" aria-labelledby="order-planner-title">
    <div className="product-order-planner-head"><span><Calculator size={16}/> SIMULADOR INICIAL</span><h3 id="order-planner-title">Escolha a quantidade antes de adicionar.</h3><p>Veja a estimativa sem precisar abrir outra página. O valor final continua sendo confirmado conforme arte, acabamento, urgência e frete.</p></div>
    {quote.brief.guest_count?<div className="product-quantity-suggestion"><Users size={16}/><div><strong>{suggestion.label}</strong><span>{suggestion.reason}</span></div><button type="button" onClick={()=>change(suggestion.quantity)}>Usar {suggestion.quantity}</button></div>:<div className="product-quantity-suggestion is-muted"><Users size={16}/><div><strong>{suggestion.label}</strong><span>{suggestion.reason}</span></div><a href="/orcamento">Informar convidados</a></div>}
    <div className="product-quantity-presets" aria-label="Atalhos de quantidade"><span>Quantidade rápida</span><div>{presets.map(value=><button type="button" key={value} className={value===quantitySafe?'active':''} aria-pressed={value===quantitySafe} onClick={()=>change(value)}>{value} un.</button>)}</div></div>
    <div className="product-order-controls"><div className="product-quantity-control" aria-label={`Quantidade de ${product.name}`}><button type="button" onClick={()=>change(quantitySafe-1)} disabled={quantitySafe<=min} aria-label="Diminuir quantidade"><Minus size={16}/></button><input inputMode="numeric" value={quantitySafe} onChange={e=>change(Number(e.target.value)||min)} aria-label="Quantidade"/><button type="button" onClick={()=>change(quantitySafe+1)} aria-label="Aumentar quantidade"><Plus size={16}/></button><span>un.</span></div><div className="product-order-estimate"><small>{total===null?'VALOR':'ESTIMATIVA MÍNIMA'}</small><strong>{total===null?'Sob consulta':formatCatalogMoney(total)}</strong>{product.price_cents!==null&&<span>{formatCatalogMoney(product.price_cents)} × {quantitySafe}</span>}</div></div>
    <div className="product-order-actions"><button type="button" className={`btn btn-primary product-order-add ${added?'is-added':''}`} onClick={add}>{added?<Check size={17}/>:<ShoppingBag size={17}/>} {added?'Atualizar quantidade na lista':'Adicionar à minha lista'}</button>{added&&<button type="button" className="product-order-review" onClick={()=>quote.setOpen(true)}>Revisar minha lista</button>}</div>
  </section>;
}
