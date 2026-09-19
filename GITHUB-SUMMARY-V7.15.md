# GitHub Summary — V7.15

## Objetivo

A V7.15 reorganiza a experiência pública do **Merlin Encantos em Papel** para funcionar melhor como mostruário comercial de topos de bolo: menos ruído, hierarquia textual mais clara, melhor encaixe de conteúdo e uma jornada simples de **inspiração → acabamento → briefing → orçamento**.

## Principais mudanças

- nova camada visual `app/public-v715.css`, carregada depois da V7.12/V7.14;
- largura máxima, escala tipográfica, line-height, espaçamentos e ritmo vertical unificados;
- header e navegação refinados sem alterar os caminhos aprovados;
- hero da Home simplificado para inspirações, níveis e WhatsApp;
- guia de níveis & preços reposicionado dentro da seção de acabamentos;
- cards de níveis, temas, FAQ, contato e CTA final com proporções e textos mais previsíveis;
- página de Inspirações reescrita para deixar claro que os modelos são referências adaptáveis;
- cards da galeria com dimensão visual estável e hierarquia consistente;
- detalhe da inspiração passa a explicar explicitamente o que pode ser personalizado;
- Monte seu Topo ganha uma entrada mais simples e formulário mais escaneável;
- ajustes responsivos dedicados a desktop, tablet, mobile e 390 px;
- V7.14 continua protegendo drawer de filtros em 1024 px e uma coluna de inspirações em 390 px.

## Imagens de inspirações

O catálogo público atual mantém **17 inspirações exclusivas**.

- artes locais em SVG permanecem vetoriais em prancha `1200 × 1200`;
- imagens da galeria e do detalhe reservam `width=1200` e `height=1200`, reduzindo mudança de layout durante o carregamento;
- o contrato V7.15 bloqueia regressão de dimensão nos SVGs locais;
- o contrato existente continua exigindo imagens exclusivas e pelo menos 6 inspirações reais hospedadas em alta qualidade.

## Proteções adicionadas

Novo gate:

`scripts/public-v715-contract-check.mjs`

Ele verifica:

- camada CSS V7.15 e ordem de importação;
- largura de leitura e hierarquia de títulos;
- organização do hero e CTAs;
- estrutura dos cards;
- página de inspirações e detalhe;
- formulário de briefing;
- breakpoints 820 / 640 / 390 px;
- qualidade estrutural das imagens de inspiração.

O novo gate foi integrado a:

`scripts/merlin-commercial-ux-contract-check.mjs`

## Escopo preservado

A V7.15 **não altera**:

- Admin;
- schema do Neon;
- dados comerciais;
- autenticação;
- secrets;
- R2;
- fluxo de pagamento;
- regra de orçamento manual.

## Validação para promoção

O PR #64 só deve ser promovido após:

1. CI completa verde;
2. TypeScript verde;
3. production build verde;
4. E2E e concorrência verdes;
5. Cloudflare Workers Compatibility verde;
6. build vinext + dry-run de deploy verdes;
7. smoke visual pós-publicação em Home, Inspirações, detalhe e Monte seu Topo;
8. `/api/health` mantendo database OK, schema 27 e blockers vazios.

## Resultado esperado

Um site mais limpo, coerente e fácil de entender, no qual o cliente consegue visualizar o tipo de trabalho oferecido, comparar acabamentos e enviar a própria ideia sem sentir que está navegando por uma loja complexa.
