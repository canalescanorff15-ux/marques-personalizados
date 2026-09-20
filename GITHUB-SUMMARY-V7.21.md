# GitHub Summary — V7.21

## Objetivo

Transformar o mockup premium da galeria de inspirações em uma interface real, funcional e responsiva no site Merlin Encantos em Papel.

## Página /inspiracoes

A página passa a ter:
- fundo escuro editorial;
- Header escuro exclusivo da rota;
- marcador “02 • INSPIRAÇÕES”;
- título “Referências que ajudam a enxergar o resultado.”;
- três diferenciais: Design exclusivo, Para todos os temas e Feito com carinho;
- busca principal grande;
- chips de categoria no topo;
- favoritos em chip;
- filtros avançados preservados em drawer;
- cards fotográficos maiores com texto sobre a imagem;
- CTA circular para abrir detalhes;
- faixa inferior rosa com três benefícios;
- CTA complementar para briefing personalizado.

## Funcionalidade preservada

Continuam funcionando:
- busca;
- filtros por categoria;
- filtros por nível;
- favoritos;
- ordenação;
- paginação “Ver mais inspirações”;
- detalhe por código;
- fallback de imagem;
- URL sincronizada com filtros.

## Responsividade

- 4 cards por linha no desktop largo;
- 3 em notebook;
- 2 em tablet;
- 1 no celular;
- chips viram trilho horizontal no mobile;
- filtros avançados permanecem em drawer.

## Proteção

Novo contrato:
`scripts/public-v721-inspirations-contract-check.mjs`

Integrado ao gate comercial principal.

## Escopo preservado

Sem mudanças em:
- banco;
- schema;
- Admin;
- autenticação;
- preços;
- lógica de orçamento;
- catálogo de níveis.
