# GitHub Summary — V6.86

## Objetivo
Recuperar a pontuação de Best Practices sem enfraquecer a política pública de scripts nem provocar bloqueios de runtime do Next.js.

## Implementado
- nonce público continua único por requisição;
- `script-src-attr 'none'` continua ativo;
- scripts inline continuam sem `unsafe-inline`;
- scripts próprios do Next.js permanecem explicitamente autorizados por `'self'`;
- `strict-dynamic` foi removido somente da CSP pública para evitar que navegadores modernos ignorem `'self'` e bloqueiem chunks legítimos sem nonce;
- CSP administrativa permanece inalterada e continua usando `strict-dynamic`;
- contrato de segurança atualizado para impedir a reintrodução desse conflito na CSP pública.

## Preservado
Sem mudanças em catálogo, banco, CRM, orçamento, autenticação, MFA, sessões, R2, backups, preços ou regras comerciais.

## Gate
Integrar apenas se CI completa e Deploy Preview do Netlify permanecerem verdes e o Lighthouse confirmar ausência de regressão.
