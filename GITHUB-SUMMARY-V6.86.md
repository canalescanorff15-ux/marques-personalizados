# GitHub Summary — V6.86

## Objetivo
Eliminar falsos negativos de Best Practices no Deploy Preview sem enfraquecer a segurança da produção nem poluir a telemetria comercial.

## Diagnóstico comprovado
- Lighthouse 9.6.8 executado diretamente na produção V6.85: Best Practices 100.
- O score 83 do Deploy Preview era causado por dois eventos específicos do ambiente de preview: `/api/events` respondendo 403 e o script de preview do Netlify tentando abrir `https://app.netlify.com` em frame bloqueado pela CSP.
- Remover `strict-dynamic` não melhorou o score; a hipótese foi descartada.

## Implementado
- CSP pública preserva nonce criptográfico por requisição, `strict-dynamic`, `script-src-attr 'none'` e scripts inline sem `unsafe-inline`.
- Produção continua com `frame-src 'none'`.
- Somente hosts no padrão estrito `deploy-preview-<n>--<site>.netlify.app` podem usar `frame-src https://app.netlify.com`, necessário para o tooling de preview do Netlify.
- Telemetria pública e Web Vitals só são enviados quando `window.location.origin` coincide com a origem canônica configurada em `NEXT_PUBLIC_SITE_URL`; previews deixam de gerar eventos comerciais ou erros de `/api/events`.
- Contrato HTTP/CSP ampliado para impedir regressões nessas regras.

## Preservado
Sem mudanças em catálogo, preços, pedidos, orçamento, Neon, CRM, autenticação, MFA, sessões, R2, backups ou regras comerciais.

## Gate
Integrar somente após CI completa verde e Deploy Preview pronto. A produção já foi medida em Best Practices 100; a validação do preview confirma apenas o isolamento do ambiente de teste.
