# GitHub Summary — V7.18.1

## Objetivo

Refinar especificamente a posição do selo:

**“feito para combinar / com o seu tema e o seu bolo”**

A frase é mantida integralmente.

## Ajuste

### Desktop largo
- `left: -62px` → `left: -96px`
- `bottom: 52px` → `bottom: 60px`
- largura levemente reduzida: `205px` → `202px`
- `z-index: 6` para manter o selo visualmente limpo sobre a composição

O objetivo é fazer o selo ocupar mais claramente o espaço de respiro entre a coluna de texto e a foto, reduzindo a sensação de que ele está “dentro” do primeiro topo.

### Notebook
- `left: -26px` → `left: -42px`

### Tablet e celular
A posição segura permanece inalterada:
- até 900px: `left: 18px`
- até 640px: `left: 12px`

Assim o ajuste não cria overflow em telas menores.

## Regressão

O contrato `public-v718-contract-check.mjs` passa a exigir `left:-96px!important` no desktop.

## Escopo

Nenhuma alteração em:
- banco;
- Neon;
- schema;
- Admin;
- autenticação;
- lógica comercial;
- imagens;
- textos do selo;
- demais páginas.
