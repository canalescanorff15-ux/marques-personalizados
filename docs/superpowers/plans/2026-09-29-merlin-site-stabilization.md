# Merlin Site Stabilization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corrigir orçamento/WhatsApp, simplificar navegação e Home, atualizar identidade visual e nomes dos topos, e publicar trabalhos reais sem quebrar as 36 inspirações ou os slugs atuais.

**Architecture:** Preservar o backend, banco e slugs existentes. Concentrar mudanças em componentes públicos, catálogo, fluxo de orçamento, CSS e contratos estáticos; corrigir a origem confiável sem afrouxar CSRF. Assets reais entram em `public/` e são referenciados pela Home.

**Tech Stack:** Next.js 16, React 19, TypeScript, Neon, Cloudflare Workers/Vinext, CSS, Node contract checks.

**Spec:** `docs/superpowers/specs/2026-09-29-merlin-site-stabilization-design.md`

## Global Constraints

- Preservar as 36 inspirações e seus códigos.
- Preservar os slugs `essencial`, `camadas-3d`, `premium`, `shaker`, `acetato`, `elite-shaker-acetato`.
- Não criar venda de alimentos nem Kits.
- Manter proteção CSRF; não aceitar origem arbitrária.
- Novo Worker configurado como `merlin`.
- Novo domínio público esperado: `https://merlin.encantos.workers.dev`.
- Orçamento deve persistir quando possível e sempre oferecer continuidade pelo WhatsApp em contingência.

## Review Focus

- Domínio antigo em `NEXT_PUBLIC_SITE_URL` não pode bloquear o POST quando o request chega no domínio atual.
- Origem externa continua rejeitada.
- Emojis e acentos precisam sobreviver à URL do WhatsApp.
- Dock móvel não pode aparecer no Admin e deve persistir nas páginas públicas.
- Mudanças de nomes não podem alterar slugs ou quebrar as inspirações existentes.

---

### Task 1: Contratos de estabilização e origem

**Files:**
- Create: `scripts/v821-stabilization-contract-check.mjs`
- Modify: `scripts/request-origin-self-test.mjs`
- Modify: `lib/request-origin.ts`
- Modify: `wrangler.jsonc`

**Interfaces:**
- Produces: origem confiável que aceita o host atual explicitamente e mantém rejeição cross-site; Worker `merlin`.

- [ ] Escrever contrato falhando cobrindo domínio atual, Worker `merlin`, nomes dos 6 níveis e dock compartilhado.
- [ ] Rodar o contrato e observar falha.
- [ ] Implementar origem confiável com alias explícito do domínio atual sem confiar em headers encaminhados.
- [ ] Atualizar `wrangler.jsonc` para `name: "merlin"`.
- [ ] Rodar contrato e `node scripts/request-origin-self-test.mjs` até verde.

### Task 2: Nomes públicos dos topos e catálogo

**Files:**
- Modify: `lib/topper-catalog.ts`
- Modify: contracts que ainda exigem nomes antigos.

**Interfaces:**
- Produces: seis nomes públicos claros mantendo os seis slugs atuais.

- [ ] Atualizar contrato para esperar: Topo Essencial; Topo 3D em Camadas; Topo Premium; Topo com Movimento (Shaker); Topo com Acetato; Topo Luxo — Movimento + Acetato.
- [ ] Rodar contrato e observar falha.
- [ ] Atualizar somente copy/nome/descrição/complexidade quando necessário, preservando slug e imagens.
- [ ] Rodar contratos do catálogo e Merlin até verde.

### Task 3: Header e dock móvel persistente

**Files:**
- Modify: `components/PublicTopperHeader.tsx`
- Modify: `components/MerlinMobileDock.tsx`
- Modify: `app/page.tsx`
- Modify: `app/v8-global-clean.css`
- Modify: contratos públicos relacionados.

**Interfaces:**
- Produces: dock móvel compartilhado em todas as rotas públicas que usam `Header`, com estado ativo por pathname.

- [ ] Atualizar contrato para exigir dock dentro do header compartilhado e ausência do dock duplicado na Home.
- [ ] Rodar e observar falha.
- [ ] Renderizar dock no header público; adicionar `Início`, `Topos`, `Inspirações`, `Meu Pedido`, `Orçamento` e estado ativo.
- [ ] Encurtar copy da marca para `Merlin` / `ENCANTOS EM PAPEL`, evitando repetição visual.
- [ ] Ajustar CSS para dock fixo apenas no mobile e reserva de espaço no rodapé da página.
- [ ] Rodar contratos de navegação pública.

### Task 4: Home, Personalizados e trabalhos reais

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/personalizados/page.tsx`
- Modify: `app/v8-home-minimal.css`
- Modify: `app/v8-storefront-clean.css`
- Add binary assets: `public/merlin-logo.webp`, `public/trabalhos/topo-gotico-real.webp`, `public/trabalhos/marcadores-literarios-real.webp`, `public/trabalhos/marcadores-personalizados-real.webp`
- Modify: contratos Home/Storefront.

**Interfaces:**
- Produces: Home compacta, categorias corretas e seção `Feito por Nós` com fotografias reais.

- [ ] Atualizar contratos para esconder Kits/Doces, exigir Marcadores de Página e `Feito por Nós`.
- [ ] Rodar e observar falha.
- [ ] Substituir logo oficial e inserir 3 fotos reais em WebP.
- [ ] Home: Topos, Marcadores, Lembrancinhas, Adesivos & Chaveiros, Caixinhas — sob consulta, Outros Personalizados.
- [ ] Criar `Feito por Nós` separado de `Inspirações`.
- [ ] Personalizados: remover Kits/Doces e adicionar Marcadores; Caixinhas como sob consulta.
- [ ] Ajustar CSS para reduzir grandes vazios/rolagem.
- [ ] Rodar contratos Home/Storefront.

### Task 5: Orçamento e mensagem de WhatsApp

**Files:**
- Modify: `components/OrderBuilder.tsx`
- Modify: `app/api/inquiries/route.ts`
- Modify: `app/orcamento/page.tsx`
- Modify: `app/monte-seu-pedido/page.tsx`
- Modify: `app/v8-order-builder.css`
- Modify: contratos do OrderBuilder/fluxo público.

**Interfaces:**
- Produces: formulário menor; categorias atuais; mensagem WhatsApp com resumo completo e emojis; contingência sem perda de rascunho.

- [ ] Adicionar contrato que exige cabeçalho `🎂 NOVO PEDIDO — MERLIN` e campos principais na mensagem.
- [ ] Rodar e observar falha.
- [ ] Remover opções `doces` e `kit`; adicionar `marcadores` sem quebrar tipos persistidos legados.
- [ ] Formatar WhatsApp no servidor com cliente, telefone, data, produto, tema, nome, idade, cores, medidas, referência e observações.
- [ ] Garantir que contingência mantenha rascunho e mostre CTA direto para WhatsApp.
- [ ] Compactar heros e etapas para reduzir área branca/rolagem.
- [ ] Rodar contratos do OrderBuilder, request boundary e fluxo público.

### Task 6: Verificação, CI e produção

**Files:**
- Modify only if verification reveals a regression.

**Interfaces:**
- Consumes: Tasks 1–5.

- [ ] Rodar `npm run typecheck`.
- [ ] Rodar `npm run check:merlin-commercial`.
- [ ] Rodar `npm run check:v8-home`.
- [ ] Rodar `npm run check:public-flow`.
- [ ] Rodar `npm run build`.
- [ ] Rodar `npm run verify` se o ambiente local permitir todas as dependências/segredos de CI.
- [ ] Conferir GitHub Actions para o commit final e corrigir qualquer job vermelho.
- [ ] Verificar publicamente Home, Catálogo, Personalizados, Inspirações, Meu Pedido e Orçamento no domínio atual.
