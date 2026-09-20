# GitHub Summary — V7.22.2

## Objetivo

Corrigir a camada escura que estava cobrindo quase toda a foto dos cards de inspirações.

## Causa

Uma regra antiga da galeria, `.public-inspiration-image > span`, estava sendo aplicada ao elemento usado como shade da V7.21. Como esse shade também era um `span`, ele herdava fundo azul-escuro, padding e borda arredondada, formando um grande retângulo sobre cada imagem.

## Correção

- o shade deixa de usar `span` e passa a usar um elemento neutro para esse contexto;
- o CSS recebe seletor específico da V7.21;
- são zerados padding, border e border-radius no shade;
- o degradê foi suavizado e concentrado no rodapé do card;
- a foto permanece visível enquanto título e nível continuam legíveis;
- favoritos, código, CTA, filtros e responsividade são preservados.

## Escopo preservado

Sem alterações em banco, schema, Admin, preços, assets, ordenação das inspirações ou lógica comercial.
