# GitHub Summary — V6.82

## Objetivo
Reduzir CSS enviado para rotas que não usam catálogo ou página de produto, preservando o comparador global e a aparência atual da Home.

## Implementado
- `catalog-v674.css` deixa de ser carregado no layout raiz.
- `catalog-v675.css` deixa de ser carregado no layout raiz.
- `catalog-v676.css` fica reduzido ao shell global do comparador, que precisa continuar disponível durante a navegação.
- estilos de simulador, personalização, guia de compra, orçamento e carrosséis da página de produto foram movidos para `catalog-product-v682.css`.
- `/catalogo` ganhou layout próprio para carregar os estilos completos do catálogo e produto apenas nesse segmento.
- `/categorias` ganhou layout próprio para carregar os cards de catálogo somente quando necessário.
- a Home preserva seu acabamento de cards e coleções através de `home-merch-v682.css`, sem depender do CSS completo do catálogo.

## Resultado estrutural
Rotas institucionais, orçamento, links, projeto, preços e outras páginas deixam de receber os blocos visuais específicos de catálogo/produto. O comparador continua global porque a seleção persiste entre páginas.

## Segurança da mudança
Não houve alteração em banco, Neon, schema, migrations, APIs, autenticação, MFA, sessões, CRM, orçamento, Cloudflare R2, backups ou restauração.

## Validação esperada
- TypeScript
- build de produção
- contratos de projeto
- contratos de catálogo e fluxo público
- E2E HTTP
- validação final em CI antes do merge
