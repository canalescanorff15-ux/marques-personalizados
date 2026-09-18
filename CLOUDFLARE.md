# Cloudflare Workers — produção principal

A partir da V6.93, a arquitetura-alvo do **Merlin Encantos em Papel** é:

**GitHub → Cloudflare Workers (vinext) → Neon PostgreSQL + Cloudflare R2**

O Netlify permanece apenas como rollback temporário enquanto a primeira publicação no Workers é validada.

## Por que esta configuração cabe melhor no plano Free

- `public/` e os bundles do cliente são publicados como **Workers Static Assets**.
- O `cdnAdapter()` do vinext usa **Workers Cache** para páginas/ISR quando aplicável.
- O projeto atual não usa `use cache`, `unstable_cache`, `revalidateTag` ou `revalidatePath`; por isso **Workers KV não é obrigatório** nesta release.
- O catálogo já usa fotografias WebP e não depende de transformação dinâmica; por isso **Cloudflare Images não é obrigatório** na primeira publicação.
- Neon continua sendo a autoridade do banco.
- R2 continua sendo o storage S3-compatible de mídia e backup, sem mover objetos durante a migração.

## Compatibilidade já comprovada

A migração usa o caminho recomendado para Next.js 16: **vinext + @vinext/cloudflare**. A branch de migração precisa passar simultaneamente:

```bash
npm ci --ignore-scripts --no-fund --no-audit
npm run typecheck
npm run build
npm run check:cloudflare
npm run build:vinext
npm run deploy:vinext -- --dry-run
```

`next build` permanece como trilha de referência/rollback; `vinext build` é a trilha do Workers.

## Configuração do Workers Builds

Crie/importa o Worker com o nome exato **`merlin-encantos-em-papel`** e conecte o repositório:

`canalescanorff15-ux/marques-personalizados`

Configuração recomendada:

- Production branch: `main`
- Root directory: `/`
- Build command: `npm run check:cloudflare && npm run typecheck && npm run build:vinext`
- Deploy command: `npm run deploy:vinext -- --skip-build`
- Non-production branch deploy command: `npm run deploy:vinext -- --skip-build --preview`
- Build cache: habilitado

O `wrangler.jsonc` já fixa o nome do Worker, Static Assets, `nodejs_compat` e version metadata.

## Variáveis e segredos de runtime

Configure em **Worker → Settings → Variables & Secrets**. Não coloque segredos no GitHub ou no `wrangler.jsonc`.

### Públicas / configuração

- `NODE_ENV=production`
- `NEXT_PUBLIC_SITE_NAME`
- `NEXT_PUBLIC_SITE_URL` — URL HTTPS final do Worker/domínio; também é a origem canônica do CSRF
- `NEXT_PUBLIC_LOCATION`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- URLs sociais `NEXT_PUBLIC_*` que forem usadas
- `APP_RELEASE_ID`
- `APP_RELEASE_COMMIT` — pode usar o SHA da publicação
- `APP_DEPLOYED_AT`
- `S3_REQUIRED` conforme a política operacional

### Segredos

- `DATABASE_URL`
- `SESSION_SECRET`
- `PRIVACY_HASH_SECRET`
- `ADMIN_PASSWORD_HASH`
- `ADMIN_TOTP_SECRET`
- `BACKUP_SIGNING_SECRET`
- `BACKUP_ENCRYPTION_SECRET`
- opcionais de webhook/rotação descritos em `.env.example`

### R2 / mídia

- `S3_ENDPOINT`
- `S3_BUCKET`
- `S3_ACCESS_KEY_ID`
- `S3_SECRET_ACCESS_KEY`
- `S3_PUBLIC_BASE_URL`

Os buckets de backup/drill continuam usando as variáveis `BACKUP_S3_*` e `DRILL_S3_*` quando esses jobs estiverem habilitados.

## Identidade de build

Workers Builds fornece `WORKERS_CI_COMMIT_SHA` no build. Para o runtime, a aplicação continua usando `APP_RELEASE_COMMIT` como autoridade explícita. Isso evita depender de variáveis específicas de uma hospedagem e mantém rollback verificável.

## Primeira publicação

1. Autorizar o GitHub na conta Cloudflare.
2. Importar este repositório e criar/conectar o Worker `merlin-encantos-em-papel`.
3. Aplicar os comandos de build/deploy acima.
4. Cadastrar as variáveis/segredos de runtime.
5. Publicar e obter a URL `*.workers.dev`.
6. Definir `NEXT_PUBLIC_SITE_URL` para a URL final e publicar novamente.
7. Validar `/api/health`, `/`, `/catalogo`, `/inspiracoes`, `/orcamento`, login Admin e `Testar R2`.
8. Somente depois disso retirar o Netlify da posição de produção.

## Rollback

Enquanto a migração não estiver homologada, `netlify.toml` e `NETLIFY.md` continuam no repositório. Não apague Neon, R2, buckets ou dados para fazer rollback: a troca de hospedagem não altera as autoridades de dados.

## Promoção V7.14

- alvo de produção: `main` com a revisão responsiva V7.14;
- commit funcional validado: `63d19a52e5f81340f2c2bfd204c7ce2daeb87596`;
- o push de promoção deve ser consumido pelo Cloudflare Workers Builds conectado à branch `main`;
- após publicar, validar `/`, `/inspiracoes`, `/monte-seu-topo`, `/links` e confirmar os breakpoints de 390 px e 1024 px antes de considerar a release concluída.
### Bootstrap Node no Workers Builds

O `.nvmrc` usa `22` para selecionar a linha Node 22 no bootstrap do Workers Builds e permitir o reaproveitamento da versão pré-instalada pela imagem do Cloudflare. O alvo reproduzível continua sendo `22.23.2` em `platform-contract.json`, no Docker e na validação do runtime/CI. Isso evita que o Workers Builds tente reinstalar desnecessariamente o Node exato antes de instalar as dependências.
\n