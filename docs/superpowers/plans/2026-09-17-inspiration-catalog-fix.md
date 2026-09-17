# V6.95 Inspiration & Catalog Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminar repetição visual na galeria de inspirações, substituir arquivos comprimidos demais por fotos de detalhe em alta resolução, integrar somente imagens válidas e exclusivas, e corrigir a rota raiz `/catalogo` sem quebrar `/catalogo/[slug]`.

**Architecture:** `InspirationArtwork` usa apenas mapeamentos explícitos para INSPs com foto exclusiva e placeholder neutro para pendentes. Contratos estáticos garantem unicidade e qualidade mínima do WebP antes do merge. A rota `/catalogo` vira uma vitrine real dos produtos públicos existentes usando as APIs atuais de `lib/db`.

**Tech Stack:** Next.js 16, React 19, TypeScript, GitHub Actions, Vinext/Cloudflare Workers.

**Spec:** requisitos aprovados na conversa em 2026-09-17: 1 INSP = 1 imagem própria; não publicar imagem temática errada; fotos precisam preservar detalhes ao abrir; corrigir `/catalogo`; validar antes do merge.

## Global Constraints

- Nunca mapear o mesmo arquivo de imagem para dois códigos INSP distintos.
- Não considerar uma geração inválida como concluída.
- Foto mapeada precisa ter no mínimo 1100 px no lado maior, 800 px no menor e 90 KB após compressão WebP.
- Não reutilizar as antigas imagens de 300 px como versão de detalhe.
- Preservar `/catalogo/[slug]` e o fluxo de orçamento.
- Imagens de inspiração permanecem assets estáticos/cacheáveis em `public/inspirations/reais/`.
- Não alterar Neon nem R2 nesta rodada.

---

### Task 1: Contratos de unicidade e qualidade

**Files:**
- Modify: `components/InspirationArtwork.tsx`
- Create: `scripts/inspiration-image-uniqueness-check.mjs`
- Create: `scripts/inspiration-image-quality-check.mjs`
- Modify: `scripts/inspiration-detail-contract-check.mjs`

- [x] Criar teste estático que falhe se dois códigos diferentes tiverem o mesmo `src`.
- [x] Remover fallback fotográfico compartilhado do caminho público e usar placeholder neutro somente quando a INSP ainda não tiver foto própria.
- [x] Criar gate que leia as dimensões reais do WebP e rejeite imagens pequenas/comprimidas demais.
- [ ] Fazer todos os arquivos mapeados passarem no novo gate de qualidade.

### Task 2: Substituir ativos de baixa resolução e integrar imagens válidas

**Files:**
- Replace: `public/inspirations/reais/insp-001.webp` ... `insp-010.webp`
- Replace: `public/inspirations/reais/insp-041.webp` ... `insp-050.webp`
- Create: novas imagens auditadas conforme `codePhotos`
- Modify: `components/InspirationArtwork.tsx`

- [ ] Regenerar/substituir os 20 arquivos V6.94 que têm somente cerca de 300 px.
- [ ] Reexportar as 45 imagens novas a partir dos PNGs originais em resolução de detalhe, sem reduzir para 800 px.
- [ ] Usar WebP de alta qualidade preservando textura de papel, recortes, texto e acabamento.
- [ ] Adicionar cada arquivo a um único código INSP.
- [ ] Incluir somente imagens cuja cena corresponde ao título real da inspiração.
- [ ] Rodar unicidade e qualidade antes de avançar.

### Task 3: Corrigir `/catalogo`

**Files:**
- Replace: `app/catalogo/page.tsx`
- Create: `app/catalog-index-v695.css`
- Test: `scripts/catalog-commercial-contract-check.mjs`

- [ ] Substituir a cópia incorreta da página de produto por uma página de listagem real.
- [ ] Buscar configurações, categorias e produtos públicos com APIs de `lib/db` já existentes.
- [ ] Renderizar cards clicáveis para `/catalogo/[slug]` com imagem, categoria, nome, preço/status e CTA.
- [ ] Manter `/catalogo/[slug]` inalterado.
- [ ] Adicionar contrato que falhe se `/catalogo/page.tsx` voltar a exigir `params.slug` ou chamar `notFound()` como página de produto.

### Task 4: Validação e publicação

**Files:**
- Create: `V6.95-CHANGELOG.md`
- Create: `GITHUB-SUMMARY-V6.95.md`

- [ ] Rodar contratos específicos de inspiração e catálogo.
- [ ] Rodar typecheck e build via GitHub Actions.
- [ ] Rodar Cloudflare Workers compatibility build/dry-run.
- [ ] Abrir/atualizar PR, aguardar CI verde e fazer merge na `main`.
- [ ] Confirmar workflow pós-merge e só então considerar a versão pronta para produção.
