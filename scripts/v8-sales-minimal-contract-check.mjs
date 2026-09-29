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

for(const token of ['v8-storefront-catalog','topperLevels.map','Montar meu topo']){
  if(!catalog.includes(token))errors.push('Catálogo V8.11 sem '+token);
}
if(catalog.includes('<p>{item.description}</p>'))errors.push('Catálogo V8.11 voltou a exibir descrição longa nos cards');
if(catalog.includes('<small>{item.code}</small>'))errors.push('Catálogo V8.11 voltou a exibir código técnico nos cards');

for(const token of ['v8-storefront-personalizados','Marcadores de Página','Caixinhas — sob consulta','Lembrancinhas','Montar pedido']){
  if(!personalizados.includes(token))errors.push('Personalizados V8.21 sem '+token);
}
if(!personalizados.includes('<p>{product.copy}</p>'))errors.push('Personalizados V8.21 deve explicar cada produto com uma frase curta');
if(!v821.includes('.v821-personalizados .v8-storefront-product-card p'))errors.push('V8.21 sem estilo compacto para a explicação dos personalizados');

if(!inspirations.includes('Escolha uma referência e personalize.'))errors.push('Inspirações V8.11 sem microcopy curta');
if(!inspirations.includes('Envie sua própria referência.'))errors.push('Inspirações V8.11 sem liberdade de referência');
if(!inspirations.includes('Contar minha ideia'))errors.push('Inspirações V8.11 sem CTA essencial');

if(!quote.includes('No final, o WhatsApp abre com o resumo pronto.'))errors.push('Orçamento V8.21 sem orientação curta sobre o envio');
if(quote.includes('v8-order-hero-card'))errors.push('Orçamento V8.21 voltou a exibir painel explicativo no hero');
if(!quote.includes('v821-order-compact'))errors.push('Orçamento V8.21 não usa layout compacto');

for(const token of [
  '.v8-storefront-product-card',
  '.v8-storefront-level-card',
  '.v8-order-page .v8-order-hero-card',
  '.v8-simple-footer-brand p',
  '@media(max-width:640px)'
]){
  if(!css.includes(token))errors.push('CSS V8.11 sem '+token);
}

const minimalIndex=layout.indexOf("import './v8-sales-minimal.css';");
const storefrontIndex=layout.indexOf("import './v8-storefront-clean.css';");
if(minimalIndex<0)errors.push('layout não importa v8-sales-minimal.css');
if(storefrontIndex<0||minimalIndex<storefrontIndex)errors.push('v8-sales-minimal.css precisa carregar depois de v8-storefront-clean.css');
if(!layout.includes("import './v821-stabilization.css';"))errors.push('layout sem camada V8.21');

if(errors.length){
  console.error('V8 Venda Essencial Contract: FALHOU ('+errors.length+')');
  for(const error of errors)console.error('- '+error);
  process.exit(1);
}
console.log('V8.21 Venda Essencial Contract: OK — cards curtos, produtos claros e orçamento compacto.');
