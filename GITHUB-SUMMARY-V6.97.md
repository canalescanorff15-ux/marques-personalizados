# V6.97 — Topos Only

## Objetivo

Reposicionar o storefront público da Merlin Encantos em Papel para um único produto: **topos de bolo personalizados**.

A mudança reduz a complexidade comercial para o estágio atual do ateliê sem apagar o histórico técnico ou os dados antigos do banco.

## Linha pública de produtos

1. TOP-01 — Topo Essencial
2. TOP-02 — Topo em Camadas 3D
3. TOP-03 — Topo Premium
4. TOP-04 — Topo Shaker
5. TOP-05 — Topo com Acetato
6. TOP-06 — Topo Elite Shaker + Acetato

O TOP-06 representa o nível mais completo e acompanha a direção do prompt premium em desenvolvimento.

## Jornada nova

**Escolher nível → escolher tema → informar nome/idade/cores/tamanho do bolo → pedir orçamento.**

O site não publica preços artificiais. Enquanto a tabela comercial real não for definida, os níveis usam **Sob orçamento**.

## Superfícies públicas alteradas

- Home: comunicação 100% focada em topos.
- /catalogo: seis níveis de topo.
- /catalogo/[slug]: somente slugs dos seis níveis; produto legado redireciona.
- /inspiracoes: famílias de temas para topos, sem galeria de caixas/kits/cenários.
- /monte-seu-topo: novo configurador dedicado.
- /monte-seu-kit: redireciona para /monte-seu-topo.
- /orcamento: briefing exclusivo de topo.
- /guia-de-precos: comparação de níveis, sem preço inventado.
- /links: atalhos apenas para a nova linha.
- categorias/temas/projeto/comparador/fichas antigas: redirecionados para superfícies atuais.
- sitemap e metadados: removem indexação do catálogo misto antigo.

## Dados antigos

Produtos, categorias e ativos antigos **não foram apagados do banco**. Eles ficam preservados para possível expansão futura, mas deixam de ser promovidos pelo storefront público.

## Contratos atualizados

Os antigos testes de kit/galeria mista foram convertidos em gates da nova estratégia:

- exatamente 6 níveis TOP;
- códigos/slugs únicos;
- briefing inclui tamanho do bolo;
- shaker e acetato presentes nos níveis avançados;
- nenhum link público para Monte seu Kit;
- rotas legadas redirecionadas;
- catálogo público não depende do starter catalog misto;
- preços não são inventados;
- segurança de API, PWA e CSP continua obrigatória.

## Regra de release

Não publicar enquanto TypeScript, Next.js, Cloudflare Workers Compatibility e contratos do CI não estiverem verdes. Depois do deploy, verificar visualmente o site público antes de declarar a V6.97 concluída.
