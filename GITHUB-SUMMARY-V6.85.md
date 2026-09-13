# GitHub Summary — V6.85

## Objetivo
Melhorar a experiência móvel instalável e a resiliência offline sem transformar o catálogo em conteúdo potencialmente obsoleto.

## Implementado
- manifest PWA reforçado com `id`, `scope`, ícones PNG 192/512 e ícone maskable;
- Apple Touch Icon dedicado e metadados de web app no layout;
- atalhos instaláveis para Inspirações, Catálogo e Orçamento;
- service worker público registrado de forma tardia e apenas em contexto seguro;
- fallback offline estático e leve para navegação sem conexão;
- cache deliberadamente limitado a assets estáveis do shell PWA;
- `/admin` e `/api/*` ficam explicitamente fora da interceptação/cache;
- respostas HTML comerciais continuam network-first e não são persistidas no cache do service worker;
- `sw.js` recebe política de atualização imediata e escopo raiz explícito;
- o contrato público existente foi ampliado para impedir regressões de segurança/offline da PWA.

## Preservado
Nenhuma alteração em Neon, schema, CRM, pedidos, orçamento, preços, autenticação, MFA, sessões, R2, backups ou regras comerciais.

## Validação
A release só deve ser integrada após CI completa, build de produção, E2E, smoke de concorrência e Deploy Preview do Netlify em verde.
