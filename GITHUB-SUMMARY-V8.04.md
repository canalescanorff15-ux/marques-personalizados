# GitHub Summary — V8.04 Inspirações Premium

## Objetivo

Transformar a rota de Inspirações em uma galeria premium clara, com fotografia como protagonista e sem máscaras ou áreas escuras cobrindo os produtos.

## Alterações visuais

- header da rota passa a seguir a linguagem clara da V8;
- hero editorial sai do preto pesado e usa marfim, blush e champagne;
- benefícios viram cards claros;
- busca e chips ganham superfícies brancas e contraste mais limpo;
- drawer de filtros fica claro e coerente com a identidade V8;
- grid desktop passa de 4 para 3 colunas para aumentar o tamanho das imagens;
- tablet usa 2 colunas e mobile 1 coluna;
- cards passam a ter fundo branco, borda fina e sombra leve;
- imagem permanece em 4:3, opacity 1 e sem filtros;
- qualquer shade/máscara sobre a foto fica explicitamente desativado;
- código e favorito ficam discretos em superfícies claras;
- informações do produto ficam abaixo da fotografia;
- faixa de confiança e CTA inferior foram refinados.

## Política de imagem

A fotografia deve mostrar o produto com clareza. Nenhuma camada preta, gradiente opaco ou filtro de escurecimento pode cobrir a imagem.

## Proteção automática

Novo contrato `scripts/v8-inspirations-contract-check.mjs` integrado ao gate comercial do CI.

## Escopo preservado

Sem alterações em banco, schema, Admin, autenticação, orçamento, favoritos, R2 ou dados das inspirações.
