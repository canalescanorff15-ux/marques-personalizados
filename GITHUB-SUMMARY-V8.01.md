# GitHub Summary — V8.01 Curadoria de Imagens

## Objetivo

Fazer a vitrine pública mostrar somente referências que comuniquem corretamente o produto vendido: bolo + topo em destaque, sem cenário completo dominando a fotografia e sem máscaras escuras sobre as imagens.

## Curadoria aplicada

- 33 referências de bolo permanecem públicas: INSP-TOP-18 até INSP-TOP-50;
- a coleção pública agora é uma lista explícita de códigos aprovados, não uma faixa automática;
- novas inspirações só entram após revisão visual;
- INSP-TOP-51 até INSP-TOP-73 foram classificadas como referências de cenário e ficam fora da vitrine pública;
- referências históricas e cenas completas continuam preservadas internamente;
- páginas individuais arquivadas redirecionam para /inspiracoes;
- sitemap usa apenas a coleção pública curada;
- Home busca destaques somente dentro da coleção pública aprovada.

## Política visual

Uma única camada, `app/v8-image-policy.css`, é carregada por último e funciona como autoridade visual:

- remove qualquer shade preto das fotos;
- garante opacity 1, filter none e mix-blend-mode normal;
- move título, categoria e informações para fora da fotografia na Home;
- deixa a imagem limpa como elemento principal;
- remove overlays e bordas internas que poderiam parecer manchas;
- mantém o código apenas como etiqueta clara e discreta;
- página de detalhe usa fotografia limpa sobre fundo neutro;
- adiciona aviso comercial explícito sobre o que está e não está incluído no produto.

## Transparência comercial

A página de detalhe informa que a referência representa o topo/papelaria personalizada. Bolo, doces, painel, balões, mesa e demais itens de cenário não fazem parte do produto salvo contratação separada.

## Proteção automática

O CI valida:

- coleção pública explícita;
- arquivo de cenários arquivados;
- galeria usando `publicTopperInspirations`;
- páginas arquivadas bloqueadas;
- sitemap sem cenas arquivadas;
- Home sem códigos fora do acervo aprovado;
- política de imagem carregada depois do Design System;
- ausência de máscaras escuras e filtros nas imagens;
- informações da Home fora da fotografia.

## Limpeza técnica

Durante a V8.01 havia duas camadas de CSS concorrentes para imagens. Elas foram consolidadas em uma única política para evitar conflitos futuros.

## Próxima etapa

V8.02 — reconstrução da Home com foco em:
- categorias comerciais;
- Topos de Bolo;
- Papelaria & Personalizados;
- Produtos Criativos;
- inspirações recentes;
- CTA e fluxo de orçamento mais claros.
