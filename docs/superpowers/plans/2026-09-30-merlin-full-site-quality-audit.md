# Merlin V8.29 — Full-Site Quality Audit

## Objetivo

Eliminar inconsistências reais entre interface, validação, persistência, APIs e WhatsApp em todo o site público da Merlin, começando pelo bug reproduzido no orçamento em que campos visíveis válidos eram rejeitados por um campo técnico invisível.

## Evidência inicial / causa raiz confirmada

- `components/OrderBuilder.tsx` envia `getAttribution()` dentro de `brief.attribution`.
- `lib/attribution-client.ts` inclui `referrer_host: ''` em acessos diretos.
- `lib/validation.ts` aceita `referrer_host` apenas quando casa com `^[a-z0-9.-]+$`, portanto a string vazia falha no `inquirySchema`.
- `app/api/inquiries/route.ts` transforma qualquer falha do schema em `Confira seu nome, WhatsApp e os dados do orçamento.`, escondendo o campo técnico que realmente falhou.

Resultado: nome, WhatsApp, data e resumo podem estar corretos e ainda assim o POST falha com 400.

## Princípios

1. Corrigir causa raiz, não esconder mensagens de erro.
2. Cliente e servidor devem aceitar/rejeitar o mesmo estado útil.
3. Campos técnicos opcionais vazios não podem invalidar pedidos válidos.
4. Dados antigos de `sessionStorage`/`localStorage` devem ser normalizados antes do envio.
5. O rascunho nunca deve ser apagado em falha de persistência.
6. Same-origin/CSRF e limites de payload/rate limit permanecem estritos.
7. Nenhum dado de inspiração pode ser apresentado como trabalho real.
8. Não reintroduzir Kits/Doces públicos nem alterar regras comerciais atuais.

## Fase 1 — Orçamento / WhatsApp / validação

- Criar teste de regressão para acesso direto com `referrer_host` vazio.
- Normalizar atribuição no cliente e validar de forma tolerante a opcionais vazios no servidor.
- Sanitizar atribuição recuperada do `sessionStorage` antes de reutilizá-la.
- Melhorar erro de schema para apontar o primeiro campo público relevante sem expor detalhes internos.
- Verificar telefone, data, e-mail, resumo, request_id, brief e itens.
- Verificar que erro é limpo quando o usuário altera/corrige um campo.
- Verificar fallback WhatsApp e preservação do rascunho.

## Fase 2 — Consistência dos fluxos públicos

Auditar Home, Catálogo, categorias, Personalizados, Inspirações, detalhe de inspiração, comparação, Monte seu Pedido, Monte seu Topo, Orçamento, Meu Projeto, páginas legais e erros globais.

Checar:
- links quebrados e rotas obsoletas;
- CTAs que apontam para fluxo incorreto;
- parâmetros de URL que não chegam ao formulário;
- slugs e categorias inconsistentes;
- estados vazios/erro/carregamento;
- cópia comercial contraditória;
- elementos antigos de Kits/Doces;
- diferenciação entre trabalho real e inspiração.

## Fase 3 — Dados e persistência

- Auditar `order-draft`, `topper-draft`, atribuição e restauração de rascunho.
- Compatibilidade de versões antigas dos drafts.
- Normalização de campos vazios, datas, telefone e referências.
- Idempotência do envio e duplicação de pedidos.
- Falha de banco: manter draft e gerar WhatsApp corretamente.

## Fase 4 — APIs públicas e segurança

- `/api/inquiries` e demais endpoints públicos usados pela jornada.
- Same-origin, CSRF, limites, rate limiting, sanitização e mensagens de erro.
- Rejeições 4xx devem corresponder a entradas realmente inválidas.
- Falhas 5xx/503 não devem apagar dados do usuário.

## Fase 5 — UI / responsividade / acessibilidade

- Formulários em desktop e mobile.
- Foco, labels, required, min/max, mensagens de erro e `aria-live`/roles.
- Overflows, sobreposição de dock/CTA e conteúdo cortado.
- Contraste e legibilidade das mensagens de erro/sucesso.
- Nenhum erro persistente após o campo ser corrigido.

## Fase 6 — Verificação completa

Antes de integrar:
- contratos/regressões V8.29;
- contratos públicos existentes;
- TypeScript;
- build de produção;
- E2E HTTP;
- smoke/load local;
- Workers compatibility + dry-run;
- revisão final do diff.

Depois do merge:
- CI fresco do `main`;
- `build-workers` fresco do `main`;
- `Workers Builds: merlin` com Build ID e Version ID do SHA final.

## Critério de conclusão

A auditoria não será declarada concluída apenas porque o build ficou verde. Cada inconsistência encontrada deve ter causa documentada, correção verificável e, quando regressível, um teste/contrato que impeça retorno do problema.