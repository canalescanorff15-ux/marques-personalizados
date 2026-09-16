# GitHub Summary — V6.94

## Inspirações: fotos exclusivas + grade corrigida

A V6.94 corrige a repetição visual e a distribuição irregular da galeria de inspirações.

### Entregas

- 20 imagens WebP individuais adicionadas como Static Assets;
- associação direta por código para `INSP-001..010` e `INSP-041..050`;
- fallback antigo mantido somente para inspirações que ainda não receberam imagem própria;
- paginação global removida da galeria agrupada;
- paginação independente por seção com 10 cards iniciais;
- **Mostrar mais** independente em cada grupo;
- contagem visível/total por seção;
- filtros, ordenação, favoritos e comparação preservados;
- novo gate de regressão exige os 20 assets físicos e impede retorno do corte global antes do agrupamento.

### Validação técnica

O ciclo TDD reproduziu o problema primeiro: o novo Inspiration filter contract falhou na versão antiga. Depois da correção de código e inclusão dos 20 arquivos, o contrato passou no mesmo commit em que a CI principal e o workflow Cloudflare Workers Compatibility ficaram verdes.

Antes do merge definitivo, os workflows são executados novamente sobre o commit final que inclui esta documentação.

### Infraestrutura

- Neon: nenhuma alteração de schema/dados;
- R2: nenhuma alteração;
- Cloudflare: imagens permanecem estáticas/cacheáveis e não precisam de consultas ao banco;
- Netlify: permanece somente como rollback.

### Arquivos principais

- `components/InspirationArtwork.tsx`
- `components/InspirationExplorer.tsx`
- `scripts/inspiration-filter-contract-check.mjs`
- `public/inspirations/reais/insp-001.webp` … `insp-010.webp`
- `public/inspirations/reais/insp-041.webp` … `insp-050.webp`
- `V6.94-CHANGELOG.md`
- `GITHUB-SUMMARY-V6.94.md`
