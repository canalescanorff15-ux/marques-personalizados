# GitHub Summary — V6.84

## Objetivo da rodada
Fortalecer a segurança do navegador nas páginas públicas e remover a dependência de `script-src 'unsafe-inline'`, sem alterar banco, CRM, orçamento ou identidade visual.

## Entregas principais
- CSP pública passa a ser criada por requisição com nonce criptográfico único.
- `script-src` público usa nonce + `strict-dynamic` e não permite `unsafe-inline`.
- O Admin mantém sua política nonce já existente e seus controles `no-store` / `noindex`.
- Assets, imagens, APIs, sitemap, robots e manifest ficam fora do proxy de páginas.
- O CSP estático foi removido do `next.config.ts` para evitar políticas duplicadas; os demais headers de segurança continuam globais.
- `Permissions-Policy` ganhou bloqueio explícito de `browsing-topics`.
- JSON-LD da Home, produtos, categorias, temas e inspirações agora recebe o mesmo nonce da resposta por meio do componente `JsonLd`.
- O contrato HTTP/CSP foi atualizado para impedir regressão para `unsafe-inline` em scripts públicos.

## Preservado
Sem mudanças em Neon, schema, migrations, APIs comerciais, CRM, autenticação, MFA, sessões, Cloudflare R2, backups ou restauração.

## Validação esperada
A CI deve validar TypeScript, build, contratos de segurança e E2E. Após merge, o deploy do Netlify deve ser conferido pelo SHA exato e pelo Lighthouse; a nota de Best Practices será reportada como resultado, sem assumir aumento antecipadamente.
