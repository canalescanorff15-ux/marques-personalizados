# Merlin Encantos em Papel — deploy no Netlify Free

## Arquitetura recomendada V6.71

- **GitHub**: código-fonte e CI.
- **Netlify Free**: Next.js 16, App Router, SSR, Route Handlers e APIs.
- **Neon Free**: PostgreSQL existente.
- **Cloudflare R2 Standard**: mídia do catálogo e, opcionalmente, backups em buckets separados.

O projeto não é um site estático: o Admin, autenticação, `/api/*`, CRM, pedidos, health checks e consultas ao Neon dependem de execução server-side.

## Por que R2, e não Cloudinary, nesta base

A aplicação já possui uma camada S3-compatible completa (`lib/storage.ts`) com upload, verificação por SHA-256, listagem, exclusão, lifecycle, espelhamento e disaster recovery. O Cloudflare R2 expõe uma API S3-compatible e encaixa nessa arquitetura sem reescrever o fluxo de mídia. Cloudinary continua sendo uma alternativa válida, mas exigiria um adapter novo para upload/list/delete/backup.

## 1. Criar o site no Netlify

1. Conecte o repositório GitHub da Merlin ao Netlify.
2. Framework: Next.js (detecção automática).
3. Build command: `npm run build`.
4. Publish directory: `.next`.
5. Node: 22.23.2 (também está em `.nvmrc` e `netlify.toml`).
6. Não habilite `next export` e não crie rewrite SPA `/* /index.html 200`.

O `netlify.toml` deste projeto já contém as configurações mínimas e habilita skew protection.

## 2. Variáveis obrigatórias no Netlify

Cadastre em **Site configuration → Environment variables**. Nunca faça commit dos valores reais.

### Site

- `NEXT_PUBLIC_SITE_NAME=Merlin Encantos em Papel`
- `NEXT_PUBLIC_SITE_URL=https://<seu-site>.netlify.app` inicialmente; depois troque pelo domínio final.
- `NEXT_PUBLIC_LOCATION=Santa Inês - MA`
- `NEXT_PUBLIC_WHATSAPP_NUMBER=<seu número com DDI>`
- links sociais que você realmente usa.

### Banco / autenticação

- `DATABASE_URL` — conexão do Neon.
- `SESSION_SECRET` — segredo aleatório forte.
- `PRIVACY_HASH_SECRET` — segredo estável forte.
- `ADMIN_PASSWORD_HASH` — gerado por `npm run admin:hash-password -- "senha"`.
- `ADMIN_TOTP_SECRET` — MFA/TOTP do Admin.

### Backup criptografado

- `BACKUP_SIGNING_SECRET`
- `BACKUP_SIGNING_KEY_ID`
- `BACKUP_ENCRYPTION_SECRET`
- `BACKUP_ENCRYPTION_KEY_ID`

### Identidade de release

No Netlify, **não é necessário preencher manualmente** `APP_RELEASE_ID`, `APP_RELEASE_COMMIT` nem `APP_DEPLOYED_AT`. O build captura `COMMIT_REF`, usa a versão do `package.json` como ID padrão e grava o horário real da compilação no bundle. Isso evita metadados congelados entre deploys.

Essas três variáveis continuam suportadas apenas como overrides explícitos para outros ambientes ou procedimentos especiais de release.

## 3. Cloudflare R2 para imagens

Crie um bucket **Standard** para mídia, por exemplo `merlin-media`.

Use uma API Token R2 com acesso somente ao bucket necessário e configure inicialmente:

```env
S3_ENDPOINT=https://<ACCOUNT_ID>.r2.cloudflarestorage.com
S3_BUCKET=merlin-media
S3_ACCESS_KEY_ID=<R2_ACCESS_KEY_ID>
S3_SECRET_ACCESS_KEY=<R2_SECRET_ACCESS_KEY>
S3_PUBLIC_BASE_URL=https://<origem-publica-do-bucket>
S3_REQUIRED=0
```

`S3_PUBLIC_BASE_URL` pode ser a URL pública r2.dev habilitada para o bucket ou, preferencialmente no futuro, um domínio próprio. Não inclua `/` final.

O upload administrativo continua em `/api/admin/upload`. O arquivo é validado em memória, enviado ao R2 e verificado por `HEAD` + SHA-256; nenhum upload depende do disco persistente do Netlify.

### Ativação segura do R2

Não mude `S3_REQUIRED` para `1` apenas porque as cinco variáveis foram cadastradas. Siga esta ordem:

1. mantenha `S3_REQUIRED=0`;
2. faça um deploy com as credenciais do bucket de mídia;
3. entre no Admin → Biblioteca de mídia;
4. clique em **Testar R2**;
5. o diagnóstico cria uma sentinela efêmera em `catalog/_diagnostic/` e comprova `PutObject`, `HeadObject`, `ListObjectsV2`, `DeleteObject` e a ausência do objeto após a exclusão;
6. o teste nunca retorna access key, secret key, endpoint privado ou conteúdo das credenciais;
7. somente depois de todas as etapas ficarem verdes, altere `S3_REQUIRED=1` e faça o deploy de ativação;
8. confirme `/api/health?mode=deep` e faça um upload real pequeno pelo Admin.

Se a configuração estiver ausente, parcial, inválida ou sem alguma permissão, o diagnóstico falha fechado e o catálogo continua funcionando com URLs externas enquanto `S3_REQUIRED=0`.

## 4. Backups no R2

Para manter isolamento, use um segundo bucket privado, por exemplo `merlin-backups`:

```env
BACKUP_OFFSITE_ENABLED=1
BACKUP_S3_ENDPOINT=https://<ACCOUNT_ID>.r2.cloudflarestorage.com
BACKUP_S3_REGION=auto
BACKUP_S3_BUCKET=merlin-backups
BACKUP_S3_ACCESS_KEY_ID=<BACKUP_ACCESS_KEY_ID>
BACKUP_S3_SECRET_ACCESS_KEY=<BACKUP_SECRET_ACCESS_KEY>
BACKUP_S3_PREFIX=merlin-backups
BACKUP_S3_FORCE_PATH_STYLE=1
```

O bucket de backup NÃO deve ser o mesmo bucket público de mídia. Se habilitar o recovery drill de mídia, use um terceiro bucket isolado.

## 5. GitHub Actions

O CI continua sendo a autoridade para `npm ci`, contratos, TypeScript e `next build`.

A V6.71 adiciona `npm run check:netlify`, que protege contra:

- export estático acidental;
- ausência do `netlify.toml`;
- build/publish incorretos;
- Node diferente do contrato;
- remoção da camada S3-compatible;
- upload que dependa de gravação persistente em disco;
- ausência das variáveis documentadas para Neon, autenticação e R2;
- remoção do diagnóstico completo de capacidade do R2 antes da ativação obrigatória.

## 6. Primeiro deploy

Depois que o deploy ficar verde:

1. Abra `/api/health?mode=live`.
2. Abra `/api/health`.
3. Abra `/api/health?mode=deep`.
4. Teste `/admin/login`.
5. Faça login com MFA.
6. Com `S3_REQUIRED=0`, execute **Testar R2** na Biblioteca de mídia.
7. Só após o diagnóstico verde, use `S3_REQUIRED=1`.
8. Envie uma imagem pequena pelo Admin.
9. Confirme que ela aparece na biblioteca e no catálogo.
10. Crie um pedido de teste pelo site e confirme a entrada no CRM.
11. Execute `npm run check:deploy -- https://<seu-site>.netlify.app --require-storage` de uma máquina/CI com acesso ao domínio.

## 7. Mudança de domínio

Só altere o domínio do Runsite depois que todos os testes acima passarem. Primeiro publique no subdomínio `*.netlify.app`; depois aponte o domínio final. Isso mantém rollback simples.

## Custo

O código não depende de serviço pago do Runsite. O custo pode permanecer em R$ 0 enquanto Netlify, Neon e R2 permanecerem dentro de seus respectivos free tiers. O Netlify Free possui limite rígido mensal; ao atingir o limite, o projeto pode pausar até a renovação do ciclo em vez de gerar recarga automática.
