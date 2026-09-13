'use client';
import { ArrowRight, CheckCircle2, ShoppingBag } from 'lucide-react';
import { estimateQuote, moneyBRL, quoteReadiness } from '@/lib/quote-planning';
import { useQuoteList } from './QuoteListProvider';

export default function QuoteCheckoutBar(){
  const quote=useQuoteList();
  if(!quote.items.length)return null;
  const estimate=estimateQuote(quote.items);
  const readiness=quoteReadiness({itemCount:quote.items.length,occasion:quote.brief.occasion,theme:quote.brief.theme,eventDate:quote.brief.event_date,guestCount:quote.brief.guest_count,budgetRange:quote.brief.budget_range});
  return <aside className="quote-mobile-checkout" aria-label="Resumo rápido do orçamento">
    <div className="quote-mobile-checkout-copy"><ShoppingBag size={17}/><span><small>{quote.items.length} {quote.items.length===1?'PEÇA':'PEÇAS'} • BRIEFING {readiness.percent}%</small><strong>{estimate.pricedCount?moneyBRL(estimate.totalCents):'Valor sob consulta'}</strong></span></div>
    <button type="button" onClick={()=>quote.setOpen(true)} aria-label="Continuar para envio do orçamento"><CheckCircle2 size={16}/><span>Finalizar</span><ArrowRight size={15}/></button>
  </aside>;
}
