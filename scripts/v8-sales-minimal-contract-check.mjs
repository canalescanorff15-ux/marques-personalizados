import fs from 'node:fs';

const errors=[];
const read=file=>fs.readFileSync(file,'utf8');

const catalog=read('app/catalogo/page.tsx');
const personalizados=read('app/personalizados/page.tsx');
const inspirations=read('app/inspiracoes/page.tsx');
const quote=read('app/orcamento/page.tsx');
const css=read('app/v8-sales-minimal.css');
const v821=read('app/v821-stabilization.css');
const layout=read('app/layout.tsx');

for(const token of ['v8-storefront-catalog','topperLevels.map','Montar meu topo'])if(!catalog.includes(token))errors.push('Catálogo V8.11 sem '+token);
if(catalog.includes('<p>{item.description}</p>'))errors.push('Catálogo V8.11 voltou a exibir descrição longa nos cards');
if(catalog.includes('<small>{item.code}</small>'))errors.push('Catálogo V8.11 voltou a exibir código técnico nos cards');

for(const token of ['v8-storefront-personalizados','Marcadores de Página','Caixinhas — sob consulta','Lembrancinhas','Adesivos & Chaveiros','Montar pedido'])if(!personalizados.includes(token))errors.push('Personalizados V8.21 sem '+token);
if(!personalizados.includes('<p>{product.copy}</p>'))errors.push('Personalizados V8.21 precisa de uma explicação curta para o cliente entender cada serviço');
for(const forbidden of ['Doces & Complementos','Kits Personalizados'])if(personalizados.includes(forbidden))errors.push('Personalizados V8.21 exibe linha desativada: '+forbidden);

if(!inspirations.includes('Escolha uma referência e personalize.'))errors.push('Inspirações V8.11 sem microcopy curta');
if(!inspirations.includes('Envie sua própria referência.'))errors.push('Inspirações V8.11 sem liberdade de referência');
if(!inspirations.includes('Contar minha ideia'))errors.push('Inspirações V8.11 sem CTA essencial');

if(!quote.includes('Preencha só o necessário. No final, o WhatsApp abre com o resumo do pedido pronto.'))errors.push('Orçamento V8.21 sem orientação curta para WhatsApp');
if(quote.includes('v8-order-hero-card'))errors.push('Orçamento V8.21 voltou a exibir painel explicativo no hero');

for(const token of ['.v8-storefront-product-card','.v8-storefront-level-card','.v8-order-page .v8-order-hero-card','.v8-simple-footer-brand p','@media(max-width:640px)'])if(!css.includes(token))errors.push('CSS V8.11 sem '+token);
for(const token of ['.v821-personalizados .v8-storefront-product-card p','.v821-order-page .v8-order-hero'])if(!v821.includes(token))errors.push('CSS V8.21 sem '+token);

const minimalIndex=layout.indexOf("import './v8-sales-minimal.css';");
const storefrontIndex=layout.indexOf("import './v8-storefront-clean.css';");
const v821Index=layout.indexOf("import './v821-stabilization.css';");
if(minimalIndex<0)errors.push('layout não importa v8-sales-minimal.css');
if(storefrontIndex<0||minimalIndex<storefrontIndex)errors.push('v8-sales-minimal.css precisa carregar depois de v8-storefront-clean.css');
if(v821Index<minimalIndex)errors.push('V8.21 precisa carregar depois da camada de venda essencial');

if(errors.length){console.error('V8.21 Venda Essencial Contract: FALHOU ('+errors.length+')');for(const error of errors)console.error('- '+error);process.exit(1);}
console.log('V8.21 Venda Essencial Contract: OK — produto, explicação curta e CTA sem poluição visual.');
