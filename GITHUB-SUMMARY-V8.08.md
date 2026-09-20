# GitHub Summary — V8.08

## Objetivo

Deixar a Home mais premium e clean, com menos informação, menos blocos e mais foco em produto e imagem. Corrigir definitivamente o oval escuro que ainda aparecia sobre todas as fotos da galeria de inspirações.

## Causa do oval escuro

O componente de favorito retorna um `span.favorite-control` como filho direto da imagem.

Uma regra legada aplicava a qualquer `.public-inspiration-image > span`:
- `left`;
- `bottom`;
- padding;
- fundo escuro;
- `border-radius:999px`.

Outra regra moderna aplicava ao mesmo `.favorite-control`:
- `top`;
- `right`.

Com top/right + left/bottom, o elemento se esticava por quase toda a foto e o fundo escuro arredondado virava exatamente o grande oval visto no navegador.

## Correção técnica

- reset explícito do `.favorite-control`:
  - left/bottom = auto;
  - width/height automáticos;
  - padding = 0;
  - background transparente;
  - border-radius = 0;
  - sem box-shadow/backdrop no wrapper;
- botão de favorito permanece pequeno e circular;
- `::before`, `::after` e shades fotográficos são desativados na imagem;
- imagem fica com `opacity:1`, `filter:none` e `mix-blend-mode:normal`;
- código da inspiração continua pequeno e discreto.

## Nova Home clean

A Home foi reduzida para:

1. Hero com uma única imagem forte;
2. Faixa curta de confiança;
3. Produtos em cards compactos;
4. Apenas 3 níveis representativos de topo;
5. Apenas 3 inspirações;
6. Processo em 3 passos;
7. Sobre a Merlin em uma frase;
8. FAQ com 3 perguntas essenciais;
9. CTA final.

## Removido da Home

- galeria grande;
- nuvem de temas;
- excesso de metadados no hero;
- seção longa de acabamento;
- depoimentos na Home;
- blocos extensos de explicação;
- efeitos decorativos circulares antigos;
- overlays escuros nas imagens.

## Política visual

- fotografia é protagonista;
- sem máscara preta;
- menos texto;
- mais espaço em branco;
- cards simples;
- rosé/blush apenas como acento;
- fundo claro predominante;
- grafite reservado ao CTA final e rodapé.

## Proteção

Novo contrato `v8-clean-premium-contract-check.mjs` garante:
- Home clean;
- overlay oval não pode voltar;
- CSS V8.08 carregado depois das principais camadas V8;
- metadados e blocos longos antigos não retornam silenciosamente.

## Escopo preservado

Sem alterações em:
- banco;
- Admin;
- schema;
- R2;
- autenticação;
- API de orçamento;
- favoritos;
- Monte seu Pedido;
- catálogo;
- inspirações cadastradas.
