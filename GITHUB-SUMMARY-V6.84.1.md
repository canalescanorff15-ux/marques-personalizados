# GitHub Summary — V6.84.1

## Objetivo

Restabelecer a validação real da V6.84 no Netlify após o Deploy Preview #30 falhar por configuração de ambiente, sem enfraquecer a segurança de produção.

## Diagnóstico confirmado

- GitHub CI da V6.84 passava em TypeScript, `next build`, E2E e contratos.
- O Netlify executa o preflight estrito `check:env -- --production` também no contexto `deploy-preview`.
- `NEXT_PUBLIC_WHATSAPP_NUMBER` existia apenas em `production`; todas as demais variáveis obrigatórias já tinham valor em `deploy-preview`.
- A variável é pública e representa o contato comercial exibido pelo próprio site.

## Correção de infraestrutura

- `NEXT_PUBLIC_WHATSAPP_NUMBER` habilitada em `deploy-preview`.
- `NEXT_PUBLIC_WHATSAPP_NUMBER` habilitada em `branch-deploy`.
- Segredos administrativos, banco, MFA, sessão, backup e R2 mantiveram seus escopos protegidos.

## Prova no ambiente real

- PR #31: `V6.84.1 — corrigir ambiente dos Deploy Previews no Netlify`.
- Head validado: `f17698c3a8603d6ecfec05f2ef7dff7654d9d8d8`.
- GitHub CI #77: `success`.
- Netlify Deploy Preview #31: `ready`.
- Deploy Preview ID: `6aa720fd2030c70008b19734`.
- O preview compilou Next.js, publicou 1 função e 1 edge function, sem ocorrências no secret scan.

## Merge

- PR #31 integrado à `main`.
- Merge commit: `9b7cc462dc8fed1b066d79f06939648b02ee1e12`.
- GitHub CI #78 da `main`: `success`.

## Estado funcional

A correção não altera layout, catálogo, Neon, schema, CRM, orçamento, autenticação, MFA, R2 ou backups. Ela corrige exclusivamente a consistência dos contextos de build do Netlify para que a mesma base que passa na CI também possa ser validada em Deploy Preview.
