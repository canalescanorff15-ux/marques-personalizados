# GitHub Summary — V6.91

## Objetivo
Levar o padrão fotográfico da V6.90 também para o catálogo comercial de produtos e categorias, removendo da exibição os SVGs antigos que ainda davam aparência genérica aos itens.

## Implementado
- mapa único de referências fotográficas para as 6 categorias e os 21 produtos iniciais;
- catálogo, home, guia de preços, categorias, busca e páginas de produto passam a receber WebP fotográfico pelo mesmo motor de merchandising;
- imagens SVG antigas gravadas no Neon são tratadas como legado visual e substituídas em leitura pela referência fotográfica correspondente;
- fotos reais que forem cadastradas pelo painel/admin continuam tendo prioridade e não são sobrescritas;
- as referências fotográficas continuam identificadas como imagens de apresentação, sem fingir que são fotos de um pedido já produzido;
- contrato automatizado verifica cobertura 6/6 categorias e 21/21 produtos, extensão WebP e existência física dos assets.

## Preservado
Sem migração de schema e sem regravar produtos no Neon. CRM, preços, orçamento, autenticação, MFA, sessões, backups, R2 e pedidos permanecem intactos.

## Próxima expansão
Adicionar novas fotografias específicas por tipo de peça para reduzir repetição visual entre itens da mesma família, mantendo o mapa centralizado e sem voltar a placeholders/SVGs.
