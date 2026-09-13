# GitHub Summary — V6.83

## Objetivo
Reduzir trabalho e JavaScript não crítico no carregamento inicial, principalmente na Home, sem remover recursos essenciais do catálogo, orçamento ou atendimento.

## Implementado
- telemetria de `page_view` e Web Vitals passa a ser carregada somente quando o navegador entra em idle ou atinge um timeout curto;
- atribuição de campanha continua imediata para não perder parâmetros de origem;
- status de rede continua imediato para preservar feedback offline;
- `PremiumExperience` agora reage à rota ativa e só mantém `MutationObserver` de animações quando a página realmente possui elementos `data-reveal`;
- a Home compacta deixa de hidratar botões de favorito e comparação dentro dos quatro cards de inspiração;
- favoritos e comparação continuam disponíveis normalmente no catálogo completo de inspirações;
- links repetitivos de filtros e detalhes das inspirações deixam de fazer prefetch agressivo;
- seções abaixo da dobra na Home usam `content-visibility:auto` quando o navegador suporta, adiando pintura/layout até se aproximarem da viewport.

## Preservado
- Neon e schema;
- API e CRM;
- orçamento e lista;
- autenticação, MFA e sessões;
- Cloudflare R2;
- backups e disaster recovery;
- SEO e dados estruturados;
- experiência completa de favoritos/comparação fora da vitrine compacta da Home.

## Validação
A versão deve passar pelo CI completo antes do merge, incluindo TypeScript, build de produção, contratos comerciais, segurança, E2E HTTP e smoke de concorrência.
