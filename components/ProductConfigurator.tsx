'use client';
import { useMemo, useState } from 'react';
import { Calculator, Check, Minus, Plus, ShoppingBag, SlidersHorizontal, Users } from 'lucide-react';
import type { Product } from '@/lib/db';
import { formatCatalogMoney } from '@/lib/catalog-merchandising';
import { suggestProductQuantity } from '@/lib/quote-planning';
import ProductCustomizationFields from './ProductCustomizationFields';
import { useQuoteList } from './QuoteListProvider';

export default function ProductConfigurator({product}:{product:Product}){
  const fields=product.customization_fields||[];const quote=useQuoteList();const existing=quote.items.find(item=>item.product_id===product.id);
  const suggestion=useMemo(()=>suggestProductQuantity(product,quote.brief.guest_count),[product,quote.brief.guest_count]);
  const min=Math.max(1,product.min_quantity||1);
  const [values,setValues]=useState<Record<string,string>>(()=>existing?.customizations||{});const [quantity,setQuantityState]=useState(()=>existing?.quantity||suggestion.quantity||min);const [error,setError]=useState('');
  const quantitySafe=Math.min(99999,Math.max(min,Math.floor(Number(quantity)||min)));
  const requiredFields=useMemo(()=>fields.filter(field=>field.required),[fields]);
  const filledRequired=useMemo(()=>requiredFields.filter(field=>Boolean((values[field.id]||'').trim())).length,[requiredFields,values]);
  const complete=filledRequired===requiredFields.length;
  const progress=requiredFields.length?Math.round((filledRequired/requiredFields.length)*100):100;
  const total=typeof product.price_cents==='number'?product.price_cents*quantitySafe:null;
  const presets=useMemo(()=>[...new Set([min,Math.max(min,suggestion.quantity),min*2,min*5])].filter(value=>value<=99999).sort((a,b)=>a-b).slice(0,4),[min,suggestion.quantity]);
  function change(id:string,value:string){setValues(current=>({...current,[id]:value}));setError('');}
  function changeQuantity(next:number){setQuantityState(Math.min(99999,Math.max(min,Math.floor(Number(next)||min))));}
  function add(){if(!complete){setError('Preencha os campos obrigatórios antes de adicionar esta peça.');return;}const cleaned=Object.fromEntries(Object.entries(values).filter((entry):entry is [string,string]=>typeof entry[1]==='string'&&Boolean(entry[1].trim())).map(([key,value])=>[key,value.trim()]));quote.addProduct(product,cleaned,quantitySafe);}
  const added=quote.includes(product.id);
  return <section className="product-configurator" id="personalizacao-produto"><div className="product-configurator-head"><span><SlidersHorizontal size={16}/> PERSONALIZAÇÃO + QUANTIDADE</span><h3>Deixe esta peça pronta para entrar no orçamento.</h3><p>Preencha só o que é necessário, ajuste a quantidade e confira a estimativa sem sair desta página.</p></div>{requiredFields.length>0&&<div className={`product-configurator-progress ${complete?'is-complete':''}`} role="status"><div><span>DETALHES OBRIGATÓRIOS</span><strong>{complete?'Tudo preenchido':`${filledRequired} de ${requiredFields.length} preenchidos`}</strong></div><div aria-hidden="true"><i style={{width:`${progress}%`}}/></div></div>}<ProductCustomizationFields fields={fields} values={values} onChange={change}/>
    <div className="product-configurator-commerce"><div className="product-configurator-suggestion"><Users size={16}/><div><strong>{suggestion.label}</strong><span>{suggestion.reason}</span></div>{suggestion.quantity!==quantitySafe&&<button type="button" onClick={()=>changeQuantity(suggestion.quantity)}>Usar {suggestion.quantity}</button>}</div><div className="product-quantity-presets" aria-label="Atalhos de quantidade"><span>Quantidade rápida</span><div>{presets.map(value=><button type="button" key={value} className={value===quantitySafe?'active':''} aria-pressed={value===quantitySafe} onClick={()=>changeQuantity(value)}>{value} un.</button>)}</div></div><div className="product-order-controls"><div className="product-quantity-control" aria-label={`Quantidade de ${product.name}`}><button type="button" onClick={()=>changeQuantity(quantitySafe-1)} disabled={quantitySafe<=min} aria-label="Diminuir quantidade"><Minus size={16}/></button><input inputMode="numeric" value={quantitySafe} onChange={e=>changeQuantity(Number(e.target.value)||min)} aria-label="Quantidade"/><button type="button" onClick={()=>changeQuantity(quantitySafe+1)} aria-label="Aumentar quantidade"><Plus size={16}/></button><span>un.</span></div><div className="product-order-estimate"><small><Calculator size={13}/> {total===null?'VALOR':'ESTIMATIVA MÍNIMA'}</small><strong>{total===null?'Sob consulta':formatCatalogMoney(total)}</strong>{product.price_cents!==null&&<span>{formatCatalogMoney(product.price_cents)} × {quantitySafe}</span>}</div></div></div>
    {error&&<div className="error" role="alert">{error}</div>}<div className="product-order-actions"><button type="button" className={`btn btn-primary product-order-add ${added?'is-added':''}`} onClick={add}>{added?<Check size={17}/>:<ShoppingBag size={17}/>} {added?'Atualizar item na lista':complete?'Adicionar configurado à lista':'Concluir personalização'}</button>{added&&<button type="button" className="product-order-review" onClick={()=>quote.setOpen(true)}>Revisar minha lista</button>}</div></section>;
}
