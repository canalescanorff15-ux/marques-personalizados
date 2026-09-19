# GitHub Summary — V7.15.1

## Problema observado

A V7.15 foi publicada no Worker no commit `0954e834cf72c017827f0d625758c9bd3c88283d`, mas o novo runtime iniciou sem `DATABASE_URL`. O frontend V7.15 entrou no ar, porém `/api/health` passou a retornar 503 com `database.configured=false` e schema 0.

## Correção

- `wrangler.jsonc` passa a usar `keep_vars: true`;
- `DATABASE_URL` passa a ser declarada em `secrets.required`;
- o contrato Cloudflare valida as duas proteções;
- documentação operacional registra o procedimento de recuperação.

## Efeito esperado

- variáveis/bindings cadastrados no dashboard deixam de ser sobrescritos por deploys subsequentes;
- se `DATABASE_URL` não estiver configurada como Secret, o deploy deve falhar antes de promover uma versão incompleta;
- nenhum valor secreto entra no GitHub.

## Validação

Antes do merge:

- `npm run check:cloudflare`;
- TypeScript;
- build Next;
- build vinext;
- dry-run Cloudflare;
- CI completa.

Depois do merge e da reaplicação do segredo:

- `/api/health` = 200;
- `database.ok=true`;
- `schema.version=27`;
- `blockers=[]`;
- release permanece V7.15.
