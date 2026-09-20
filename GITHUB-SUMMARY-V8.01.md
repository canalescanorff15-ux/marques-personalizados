# GitHub Summary — V8.01 Curadoria de Imagens

## Objetivo

Fazer a vitrine pública mostrar somente referências que comuniquem corretamente o produto vendido: bolo + topo em destaque, sem cenário completo dominando a fotografia e sem máscaras escuras sobre as imagens.

## Curadoria aplicada

- coleção pública limitada provisoriamente a INSP-TOP-18..INSP-TOP-50;
- 33 referências de bolo permanecem públicas;
- referências históricas, SVGs e cenas completas continuam preservadas internamente;
- INSP-TOP-51..73 (mesas, celebrações, cenários e composições amplas) deixam a galeria pública;
- páginas individuais arquivadas redirecionam para /inspiracoes;
- sitemap passa a listar somente inspirações públicas;
- Home passa a destacar apenas códigos dentro do lote focado em bolo.

## Política visual

Novo arquivo `app/v8-image-policy.css` carregado por último:

- remove shade preto da Home e da galeria;
- garante opacity 1 e filter none nas fotografias públicas;
- transforma informações sobre fotos da Home em pequenas etiquetas claras;
- impede overlays antigos de virarem placas escuras;
- mantém código como etiqueta clara discreta;
- página de detalhe usa fundo neutro e fotografia sem efeito escuro.

## Proteção automática

Foi criado `scripts/v8-product-image-policy-check.mjs` e o CI agora valida:

- faixa pública curada;
- galeria usando publicTopperInspirations;
- páginas arquivadas bloqueadas;
- sitemap sem referências arquivadas;
- Home sem códigos fora da faixa pública;
- política de imagem carregada depois do Design System;
- ausência de máscaras escuras e filtros nas imagens públicas.

## Próxima etapa

V8.02 — reconstrução da Home com foco em:
- produtos reais;
- categorias comerciais;
- Topos de Bolo;
- Papelaria & Personalizados;
- inspirações recentes;
- CTA e fluxo de orçamento mais claros.
