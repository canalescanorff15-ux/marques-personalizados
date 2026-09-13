# GitHub Summary — V6.79

## Objetivo da rodada
Melhorar a entrega visual da Home e reduzir trabalho desnecessário no cabeçalho, mantendo a identidade premium e o fluxo comercial já estabilizado.

## Melhorias aplicadas
- A imagem principal da hero passa a usar `next/image`, com prioridade explícita e `sizes` responsivos para favorecer o LCP.
- Imagens das categorias e da seleção rápida de produtos na Home passam a usar otimização nativa do Next, carregamento responsivo e formatos modernos.
- A Home deixa de hidratar instâncias de `SafeImage` para hero, categorias e cards de produto.
- A consulta inicial da Home passa a pedir menos produtos, já que somente quatro são exibidos na seleção rápida.
- O pipeline de imagens permite AVIF/WebP e cache mínimo de uma hora para variantes otimizadas.
- O cabeçalho deixa de executar mudança de estado em todo evento bruto de scroll: o modo compacto é atualizado no máximo uma vez por frame e somente quando o estado realmente muda.
- A pequena logo do cabeçalho passa a usar `img` nativo com dimensões explícitas e fallback direto, removendo uma camada React desnecessária.

## Preservado
- Identidade visual Merlin.
- Layout e composição da Home.
- Catálogo, orçamento, lista, comparador e WhatsApp.
- Fallback da logo do cabeçalho.
- Neon, CRM, autenticação, MFA, R2, backups, restauração, APIs e schema.

## Arquivos centrais
- `app/page.tsx`
- `components/Header.tsx`
- `next.config.ts`

## Resultado esperado
Menor peso de imagem percebido na Home, melhor seleção de resolução por viewport, melhor chance de reduzir o tempo do maior elemento visual e menos trabalho de JavaScript durante rolagem do site.