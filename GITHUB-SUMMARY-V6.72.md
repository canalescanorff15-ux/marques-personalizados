## Merlin — Encantos em Papel V6.72

### Summary
A V6.72 transforma a Home em uma landing page comercial mais curta e premium. O objetivo principal é reduzir drasticamente a rolagem sem remover as funções do site: inspirações, catálogo, preços, kit, projeto, orçamento e WhatsApp continuam disponíveis em rotas próprias.

### Principais mudanças
- Header reconstruído para evitar marca espremida, sobreposição e excesso de navegação.
- Home reduzida para uma jornada objetiva: apresentação → inspirações → categorias → como começar → seleção de produtos → ateliê → briefing → orçamento.
- Inspirações da Home reduzidas de 12 para 6; filtros completos permanecem em `/inspiracoes`.
- Coleções limitadas às 6 categorias principais na Home.
- Catálogo completo removido da Home e substituído por uma seleção curta de 4 peças; busca e filtros continuam em `/catalogo`.
- Removidos da Home os blocos redundantes de preços, guia por investimento, lookbook, manifesto gigante, FAQ completo, formulário completo e repetições de processo.
- Preços continuam em `/guia-de-precos`.
- Orçamento completo continua em `/orcamento`.
- Monte seu kit continua em `/monte-seu-kit`.
- Corrigido o risco de overflow horizontal e textos gigantes cortados.
- Áreas de conteúdo receberam espaçamento mais compacto e tipografia responsiva.
- Cards escuros do catálogo receberam contraste reforçado para títulos, preços e descrições.
- Responsividade revista para desktop, tablet e celular.
- `prefers-reduced-motion` preservado.

### Segurança funcional
Nenhum endpoint, autenticação, CRM, Neon, R2, MFA, backup ou schema foi alterado. A mudança é concentrada na apresentação pública e mantém as rotas comerciais existentes.

### Validação esperada
A revisão preserva os contratos de branding e da jornada Merlin: `event-pathways-primary`, `merlin-briefing-section`, os quatro campos de briefing e `MerlinMobileDock` permanecem no código.
