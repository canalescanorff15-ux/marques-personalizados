# GitHub Summary — V8.10 Storefront Essentials

## Objetivo

Aplicar a regra aprovada para toda a frente pública:

> produto primeiro, imagem forte, texto mínimo e ação clara.

A V8.10 reduz informação nas páginas principais sem remover os caminhos de venda.

## Catálogo de topos

- hero reduzido a uma mensagem curta;
- seis níveis continuam disponíveis;
- cada card mostra visual, nome, uma descrição curta e ação;
- removidos blocos explicativos extensos;
- CTA final direto para Monte seu Pedido.

## Personalizados

- removido o painel de promessa;
- removido o bloco grande de escopo;
- removido o passo a passo longo;
- seis categorias em cards simples;
- cada card contém apenas:
  - ícone;
  - nome;
  - uma linha de exemplo;
  - CTA;
- observação de escopo comercial virou uma única nota discreta.

## Inspirações

- hero reduzido;
- removidos três cards de benefícios;
- removida faixa intermediária de pontos;
- removido bloco longo de referência personalizada;
- galeria passa a ser o conteúdo principal;
- CTA final curto para quem quer enviar referência própria.

## Detalhe da inspiração

- foto continua como elemento principal;
- favoritos e compartilhamento preservados;
- removidos:
  - facts cards;
  - tags;
  - bloco explicativo longo;
  - segundo CTA repetido;
  - seção final duplicada;
- personalização resumida em três chips;
- um único CTA principal: "Quero esse modelo";
- aviso comercial reduzido a uma frase;
- apenas duas inspirações relacionadas.

## Visual

Nova camada `app/v8-storefront-clean.css`:
- marfim/branco como base;
- rosé apenas como acento;
- menos sombras;
- menos caixas dentro de caixas;
- mais respiro;
- cards simples;
- responsividade preservada.

## Proteção

Novo contrato `v8-storefront-essentials-contract-check.mjs` impede regressões para páginas carregadas de informação.

## Escopo preservado

Sem alterações em:
- Neon;
- schema;
- Admin;
- R2;
- autenticação;
- API de orçamento;
- favoritos;
- Monte seu Pedido;
- dados das inspirações;
- níveis do catálogo.
