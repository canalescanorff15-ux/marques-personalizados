# V6.95 Inspiration & Catalog Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminar repetição visual na galeria de inspirações, integrar somente imagens válidas e exclusivas já geradas, e corrigir a rota raiz `/catalogo` sem quebrar as páginas `/catalogo/[slug]`.

**Architecture:** `InspirationArtwork` passa a usar apenas mapeamentos explícitos para INSPs com foto exclusiva e um fallback visual neutro sem reutilizar fotografia de outra inspiração. Um contrato estático garante unicidade de `src` entre códigos. A rota `/catalogo` vira uma vitrine dos produtos públicos existentes usando as funções de banco já disponíveis.

**Tech Stack:** Next.js 16, React 19, TypeScript, GitHub Actions, Vinext/Cloudflare Workers.

**Spec:** requisitos aprovados na conversa em 2026-09-17: 1 INSP = 1 imagem própria; não publicar imagem temática errada; corrigir `/catalogo`; validar antes do merge.

## Global Constraints

- Nunca mapear o mesmo arquivo de imagem para dois códigos INSP distintos.
- Não considerar uma geração inválida como concluída.
- Preservar `/catalogo/[slug]` e o fluxo de orçamento.
- Imagens de inspiração permanecem assets estáticos em `public/inspirations/reais/`.
- Não alterar Neon nem R2 nesta rodada.

---

### Task 1: Contrato de unicidade das inspirações

**Files:**
- Modify: `components/InspirationArtwork.tsx`
- Create: `scripts/inspiration-image-uniqueness-check.mjs`
- Modify: `package.json`

- [ ] Criar teste estático que leia `codePhotos` e falhe se dois códigos diferentes tiverem o mesmo `src`.
- [ ] Fazer o teste falhar contra fallback fotográfico compartilhado.
- [ ] Remover fallback fotográfico compartilhado do caminho público e usar placeholder neutro somente quando a INSP ainda não tiver foto própria.
- [ ] Rodar `npm run check:inspiration-images` na CI.

### Task 2: Integrar imagens válidas já geradas

**Files:**
- Create: `public/inspirations/reais/insp-011.webp` ... conforme lista auditada
- Modify: `components/InspirationArtwork.tsx`

- [ ] Converter as imagens válidas para WebP otimizado.
- [ ] Adicionar cada arquivo a um único código INSP.
- [ ] Incluir somente imagens cuja cena corresponde ao título real da inspiração.
- [ ] Rodar o contrato de unicidade e conferir que todos os arquivos mapeados existem.

### Task 3: Corrigir `/catalogo`

**Files:**
- Replace: `app/catalogo/page.tsx`
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
- [ ] Abrir PR, aguardar CI verde e fazer merge na `main`.
- [ ] Confirmar workflow pós-merge e só então considerar a versão pronta para produção.
