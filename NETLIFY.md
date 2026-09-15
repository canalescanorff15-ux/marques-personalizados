# Merlin Encantos em Papel — Netlify legado / rollback

> **A partir da V6.93, o Netlify não é mais a hospedagem principal.** A produção-alvo é Cloudflare Workers com vinext. Consulte `CLOUDFLARE.md` para a configuração atual.

Este arquivo preserva a trilha de rollback enquanto a primeira publicação no Workers é homologada. O `netlify.toml` permanece versionado para que seja possível reconstruir a hospedagem anterior sem alterar Neon ou R2.

## Arquitetura de rollback

- **GitHub**: código-fonte e CI.
- **Netlify**: fallback temporário para Next.js 16.
- **Neon**: PostgreSQL — continua sendo a autoridade do banco em qualquer hospedagem.
- **Cloudflare R2**: mídia e backups S3-compatible — também permanece independente da hospedagem.

O projeto não é estático: Admin, autenticação, `/api/*`, CRM, pedidos, health checks e consultas ao Neon exigem execução server-side.

## Configuração preservada

O `netlify.toml` mantém:

- `npm run check:netlify`;
- preflight de produção;
- `npm run build`;
- publish em `.next`;
- Node 22.23.2;
- skew protection;
- headers e redirects de segurança já validados.

Nunca adicione `next export` nem rewrite SPA `/* /index.html 200`.

## Variáveis necessárias em um rollback

Use os mesmos valores operacionais documentados em `.env.example` e `CLOUDFLARE.md`, especialmente:

- `NEXT_PUBLIC_SITE_URL`;
- `DATABASE_URL`;
- `SESSION_SECRET`;
- `PRIVACY_HASH_SECRET`;
- `ADMIN_PASSWORD_HASH`;
- `ADMIN_TOTP_SECRET`;
- `BACKUP_SIGNING_SECRET`;
- `BACKUP_ENCRYPTION_SECRET`;
- `S3_ENDPOINT`;
- `S3_BUCKET`;
- `S3_ACCESS_KEY_ID`;
- `S3_SECRET_ACCESS_KEY`;
- `S3_PUBLIC_BASE_URL`.

No Netlify, `COMMIT_REF` continua disponível como fallback de identidade do release. No Cloudflare Workers Builds, a origem equivalente é `WORKERS_CI_COMMIT_SHA`.

## R2

A troca de hospedagem **não move nem recria os buckets**. O upload administrativo continua usando a camada S3-compatible existente, com verificação de conteúdo, lifecycle, tombstones e diagnóstico completo.

Em um rollback:

1. comece com `S3_REQUIRED=0`;
2. publique o site;
3. acesse Admin → Biblioteca de mídia;
4. execute **Testar R2**;
5. confirme Put/Head/List/Delete;
6. somente então habilite `S3_REQUIRED=1`, se essa for a política operacional.

Backups devem continuar em bucket privado separado da mídia pública.

## Validação de rollback

Antes de promover um deploy Netlify como produção:

```bash
npm ci --ignore-scripts --no-fund --no-audit
npm run check:netlify
npm run typecheck
npm run build
```

Depois, valide `/api/health`, `/catalogo`, `/inspiracoes`, `/orcamento`, login Admin/MFA e o diagnóstico R2.

## Motivo da migração

O Netlify Free atingiu o teto de créditos do ciclo e passou a pular deploys de produção. Por isso o projeto migra para Workers, cuja arquitetura gratuita é baseada principalmente em limites diários de execução, enquanto Static Assets ficam fora do consumo de CPU do Worker.

**Não apague este fallback até a produção Cloudflare estar homologada e o rollback documentado ter sido testado.**
