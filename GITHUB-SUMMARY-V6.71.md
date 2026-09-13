## Merlin — Encantos em Papel V6.71

### Summary
A V6.71 prepara a aplicação completa para migrar do Runsite para **Netlify + Neon + Cloudflare R2** sem transformar o projeto em site estático e sem remover backend, Admin, CRM, APIs, autenticação ou backups.

### Principais mudanças
- Novo `netlify.toml` para Next.js híbrido/OpenNext.
- Build Netlify roda `check:netlify`, preflight de produção e `next build`.
- Node 22.23.2 preservado.
- Netlify skew protection habilitada.
- Novo guia `NETLIFY.md` com migração e rollback.
- Novo `.env.netlify.example` sem segredos reais.
- Cloudflare R2 passa a ser o storage recomendado para mídia.
- A camada S3-compatible existente é reaproveitada; Cloudinary não é necessário.
- Bucket de mídia e backup documentados como destinos separados.
- Runsite mantido apenas como referência/rollback legado.
- Novo `check:netlify` incluído no `npm run verify`.
- GitHub Actions executa o contrato Netlify/R2.
- Nenhuma migração do schema 27.
- Nenhuma dependência nova.

### Segurança preservada
- MFA/TOTP.
- Sessões revogáveis.
- CSP do Admin.
- Upload de até 8 MiB validado em memória.
- Storage remoto content-addressed por SHA-256.
- Media lifecycle/leases.
- Backup V9 assinado e criptografado.
- Disaster recovery e tombstones.

### Compatibilidade
- Base: V6.70.
- Next.js: 16.3.4.
- Node: 22.23.2.
- npm: 10.9.8.
- Schema: 27.
- Banco: Neon existente.
- Storage recomendado: Cloudflare R2 Standard.
- Deploy recomendado: Netlify Free/OpenNext.

### Validação
- 58/58 checks estruturais aprovados.
- 199 arquivos TS/TSX validados.
- 0 erros de sintaxe.
- `netlify.toml` validado como TOML.
- 0 arquivos excluídos em relação à V6.70.
- `package-lock.json` preservado.

### Status
Pronta para conectar o repositório ao Netlify, configurar variáveis e executar o primeiro deploy de validação no subdomínio `*.netlify.app` antes de mover o domínio definitivo.
