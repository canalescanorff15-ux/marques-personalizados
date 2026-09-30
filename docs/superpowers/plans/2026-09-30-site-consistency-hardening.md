# V8.29 Site Consistency Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corrigir o erro real de orçamento mostrado em produção, endurecer a compatibilidade de dados públicos e ampliar os testes para detectar inconsistências antes do deploy.

**Architecture:** Manter o fluxo atual e corrigir as fronteiras onde dados opcionais/legados atravessam cliente → API. Sanitizar atribuição no cliente, tolerar metadados opcionais inválidos no backend sem afrouxar dados essenciais e ampliar contratos/E2E em vez de reescrever o sistema.

**Tech Stack:** Next.js 16.3.4, React 19.2.8, TypeScript 5.7.2, Zod 3.24.2, Neon, Cloudflare Workers, Node contract checks.

**Spec:** `docs/superpowers/specs/2026-09-30-site-consistency-hardening-design.md`

## Global Constraints

- Preservar same-origin/CSRF, rate limit, limites de payload e idempotência.
- Não alterar banco, preços, slugs públicos ou regras comerciais sem evidência de necessidade.
- WhatsApp continua sendo a etapa final do orçamento.
- Falha de API não pode apagar rascunho.
- Nenhuma conclusão de estabilidade sem CI, build, E2E, smoke e Workers verdes.

## Review Focus

- `sessionStorage` com atribuição legada contendo `null`, arrays, números ou caminho inválido deve ser sanitizado sem derrubar pedido.
- Campos essenciais inválidos devem continuar falhando de forma específica.
- Data futura válida não pode ser rejeitada por diferença de timezone.
- Pedido válido sem e-mail e sem atribuição deve funcionar.
- Qualquer falha de persistência deve manter conteúdo e oferecer continuidade por WhatsApp.

---

### Task 1: Regression contract for the production bug

**Files:**
- Create: `scripts/v829-site-consistency-contract-check.mjs`
- Modify: `scripts/merlin-commercial-ux-contract-check.mjs`
- Test: same new contract

**Interfaces:**
- Consumes: current `OrderBuilder`, `attribution-client`, inquiry route/schema.
- Produces: one CI-visible V8.29 consistency gate.

- [ ] **Step 1: Write the failing contract**

Assert that attribution restore is sanitized, inquiry validation is defensive for optional attribution, errors can be field-specific, order draft preservation remains present, and `/orcamento` remains wired to `OrderBuilder`.

- [ ] **Step 2: Run through CI and verify RED**

Expected: V8.29 contract fails against current main behavior.

- [ ] **Step 3: Keep the contract nested in Merlin commercial UX**

The existing CI step must execute V8.29 automatically.

### Task 2: Sanitize legacy marketing attribution at the client boundary

**Files:**
- Modify: `lib/attribution-client.ts`
- Test: `scripts/v829-site-consistency-contract-check.mjs`

**Interfaces:**
- Consumes: arbitrary sessionStorage JSON.
- Produces: `MarketingAttribution` containing only bounded strings with a valid `/...` landing path and safe referrer host.

- [ ] **Step 1: Add a normalization function**

Normalize both newly captured and restored attribution objects through the same path; never return stored JSON verbatim.

- [ ] **Step 2: Discard incompatible legacy values**

Unknown keys, nulls, arrays, numbers and invalid path/host values must not propagate to the API.

- [ ] **Step 3: Persist the normalized representation back to sessionStorage**

This migrates old sessions in place.

### Task 3: Make inquiry validation resilient without weakening required fields

**Files:**
- Modify: `lib/validation.ts`
- Modify: `app/api/inquiries/route.ts`
- Test: `scripts/v829-site-consistency-contract-check.mjs`

**Interfaces:**
- Consumes: public inquiry payload.
- Produces: strict validation of name/WhatsApp/date/order data while optional attribution is normalized/dropped when malformed.

- [ ] **Step 1: Separate optional attribution tolerance from essential inquiry validation**

Do not let optional analytics metadata invalidate a valid commercial inquiry.

- [ ] **Step 2: Return a useful first validation message**

Map schema issues to a specific public-safe message instead of blaming name/WhatsApp for every failure.

- [ ] **Step 3: Preserve structured details for debugging while not exposing internal implementation**

Keep field-path information only where safe/useful.

### Task 4: Harden OrderBuilder error UX and state preservation

**Files:**
- Modify: `components/OrderBuilder.tsx`
- Modify: relevant public order CSS file only if needed
- Test: V8.29 contract + E2E

**Interfaces:**
- Consumes: `ApiRequestError` message/status and existing form state.
- Produces: clear error/status UI without clearing form or draft.

- [ ] **Step 1: Keep the current draft after every 4xx/5xx failure**

No reset/clear action occurs on failure.

- [ ] **Step 2: Improve error presentation**

Use a proper alert block with readable text, no link-like styling, and actionable wording.

- [ ] **Step 3: Reset stale error when user edits a field**

A corrected field should not leave a stale red message visible indefinitely.

### Task 5: Expand public E2E coverage

**Files:**
- Modify: `scripts/http-e2e-check.mjs`

**Interfaces:**
- Consumes: running production build with E2E database.
- Produces: assertions across core public routes and positive/negative inquiry cases.

- [ ] **Step 1: Add core route smoke coverage**

Check `/personalizados`, `/inspiracoes`, `/orcamento` in addition to existing routes.

- [ ] **Step 2: Add a realistic positive inquiry**

Use a future date, optional empty e-mail and a valid personalized topper summary.

- [ ] **Step 3: Add a legacy-attribution inquiry**

The request must still be accepted after optional metadata normalization.

- [ ] **Step 4: Keep negative cases**

Invalid name, cross-origin and malformed JSON must continue to fail.

### Task 6: Whole-public-surface consistency sweep

**Files:**
- Modify only files with evidence-backed inconsistencies.
- Extend `scripts/v829-site-consistency-contract-check.mjs` as findings require.

**Interfaces:**
- Consumes: public app/components/lib files.
- Produces: no stale public product categories, no obvious legacy draft/schema conflicts, no hidden required metadata and no broken public CTA routes in audited surface.

- [ ] **Step 1: Audit public routes and shared client utilities**

Compare routes, redirects, form schemas, draft persistence and public API boundaries.

- [ ] **Step 2: Fix only reproducible inconsistencies**

Every fix gets a regression assertion.

- [ ] **Step 3: Re-run full CI surface**

Required green: V8.29 contract, all commercial/public contracts, TypeScript, production build, HTTP E2E, local load smoke, Cloudflare Workers compatibility.

### Task 7: Review and integration

**Files:** none unless review finds issues.

- [ ] **Step 1: Review changed-file list and diff against this plan**

No unrelated backend/catalog redesign.

- [ ] **Step 2: Fix Critical/Important review findings**

Re-run verification after any fix.

- [ ] **Step 3: Merge only after fresh PR checks are green**

Use squash merge and verify the resulting `main` SHA.

- [ ] **Step 4: Verify production deployment**

Require fresh `validate`, `build-workers` and `Workers Builds: merlin` success for the merged SHA, including Cloudflare Version ID.