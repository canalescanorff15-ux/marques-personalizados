import assert from 'node:assert/strict';
import { businessDaysUntil, estimateQuote, evaluateBudget, evaluateDeadline, parseBudgetRange, quoteReadiness, suggestProductQuantity } from '../lib/quote-planning.ts';

assert.deepEqual(estimateQuote([{name:'Milk',price_cents:450,quantity:10}]),{totalCents:4500,pricedCount:1,totalCount:1,complete:true});
assert.equal(parseBudgetRange('R$ 150–300')?.min,15000);
assert.equal(parseBudgetRange('R$ 150–300')?.max,30000);
assert.equal(evaluateBudget(20000,'R$ 150–300').state,'within');
assert.equal(evaluateBudget(29000,'R$ 150–300').state,'near-limit');
assert.equal(evaluateBudget(35000,'R$ 150–300').state,'above');
const suggested=suggestProductQuantity({name:'Caixinha Milk',category:'Caixas personalizadas',min_quantity:10,tags:[]},40);
assert.equal(suggested.quantity,40);
const fixed=suggestProductQuantity({name:'Topo Premium',category:'Topos de bolo',min_quantity:1,tags:[]},80);
assert.equal(fixed.quantity,1);
const readiness=quoteReadiness({itemCount:1,occasion:'Aniversário',theme:'Floral',eventDate:'2099-12-20',guestCount:30,budgetRange:'R$ 150–300'});
assert.equal(readiness.percent,100);
const days=businessDaysUntil('2099-12-20',new Date(2099,11,1,12));assert.ok(days!==null&&days>0);
assert.equal(evaluateDeadline([{name:'Topo',price_cents:3000,quantity:1,production_time:'5 a 10 dias úteis'}],'2099-12-20').state,'comfortable');
console.log('QUOTE_PLANNING_SELF_TEST_OK');
