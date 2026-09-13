# GitHub Summary — V6.78

## Objetivo da rodada
Reduzir trabalho de JavaScript e CSS durante a renderização inicial sem mudar a identidade visual, o catálogo, o fluxo comercial ou a infraestrutura do projeto.

## Melhorias aplicadas
- Scroll progress agora é atualizado no máximo uma vez por frame com `requestAnimationFrame`.
- Movimento da aura do ponteiro também é coalescido por frame, evitando escrita de CSS variables em cada evento bruto do mouse.
- O `MutationObserver` deixa de recalcular altura/scroll a cada mutação do DOM.
- Alterações reais de altura passam a ser acompanhadas por `ResizeObserver`, também com atualização agendada por frame.
- Page view de analytics é enviado em idle time, com fallback temporizado, evitando competir com a primeira renderização.
- TTFB, LCP e CLS continuam sendo observados, mas a telemetria é enviada em lote após a janela inicial ou quando a página é ocultada.
- O CSS exclusivo da página de orçamento deixa de ser global e passa a ser carregado somente no segmento `/orcamento`.

## Preservado
- Identidade visual e animações premium.
- Acessibilidade e `prefers-reduced-motion`.
- Analytics de cliques em WhatsApp e redes sociais.
- Coleta de Web Vitals.
- Fluxo de orçamento e checkout V6.77.
- Neon, CRM, autenticação, MFA, R2, backups, restauração, APIs e schema.

## Arquivos centrais
- `components/PremiumExperience.tsx`
- `components/SiteAnalytics.tsx`
- `components/WebVitalsReporter.tsx`
- `app/layout.tsx`
- `app/orcamento/layout.tsx`

## Resultado esperado
Menos trabalho na main thread durante carregamento, scroll e movimento do mouse, menos CSS desnecessário fora do orçamento e menor competição de telemetria com a renderização inicial.
