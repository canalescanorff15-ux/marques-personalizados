# GitHub Summary — V6.93

- Cloudflare Workers passa a ser a hospedagem principal preparada do projeto.
- Migração baseada no caminho oficial `vinext` para Next.js 16.
- `vinext check`: 93% compatível; 6/6 imports usados suportados.
- `next build`: aprovado.
- `vinext build`: aprovado para RSC/SSR/client.
- dry-run de deploy Workers: aprovado.
- Static Assets + Workers Cache habilitados.
- KV e Cloudflare Images não são obrigatórios nesta primeira release.
- Worker fixado como `merlin-encantos-em-papel`.
- `WORKERS_CI_COMMIT_SHA` integrado à identidade de release.
- Neon e R2 preservados sem migração destrutiva.
- UI/Admin de mídia atualizada para Cloudflare Workers + R2.
- Netlify preservado somente como rollback temporário.
- Contrato `check:cloudflare` e workflow de compatibilidade passam a proteger a nova plataforma.
- Documentação operacional: `CLOUDFLARE.md` como guia principal; `NETLIFY.md` como rollback.

## Gate

Integrar somente com CI principal e Cloudflare Workers Compatibility completamente verdes no PR. Após merge, repetir os dois gates na `main` antes da criação/publicação final no Workers.
