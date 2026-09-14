# GitHub Summary — V6.86

## Objetivo
Eliminar falsos negativos de Best Practices no Deploy Preview sem enfraquecer a segurança da produção nem poluir a telemetria comercial.

## Diagnóstico comprovado
- Lighthouse 9.6.8 executado diretamente na produção V6.85: Best Practices 100.
- O Deploy Preview partia de 83 por interferências do tooling do Netlify, não por defeito da Home em produção.
- A telemetria executada fora da origem canônica provocava `403` em `/api/events`; o envio foi isolado à origem de `NEXT_PUBLIC_SITE_URL`.
- O Drawer do Netlify injeta `/.netlify/scripts/cdp`. Com `strict-dynamic`, esse script de preview era bloqueado e gerava erro de console/Inspector.
- A política exclusiva de preview `script-src-elem 'self' 'nonce-…'` + `frame-src https://app.netlify.com` removeu os erros CSP e elevou o diagnóstico independente do preview de 83 para 92.
- O único audit ponderado ainda reprovado no preview é um `Inspector Issue` de cookie gerado por `https://app.netlify.com/cdp/`, pertencente ao Drawer do Netlify. Não é emitido pelo código da Merlin.
- A tentativa de remover `strict-dynamic` não melhorou o score e foi descartada.

## Implementado
- CSP pública preserva nonce criptográfico por requisição, `strict-dynamic`, `script-src-attr 'none'` e scripts inline sem `unsafe-inline`.
- Produção continua com `frame-src 'none'` e não recebe a exceção de `script-src-elem` usada pelo tooling de preview.
- Somente hosts no padrão estrito `deploy-preview-<n>--<site>.netlify.app` recebem `script-src-elem 'self' 'nonce-…'` e `frame-src https://app.netlify.com`.
- Analytics e Web Vitals só são enviados quando `window.location.origin` coincide com a origem canônica de `NEXT_PUBLIC_SITE_URL`.
- Contrato HTTP/CSP ampliado para impedir regressões nessa separação entre produção e preview.
- Toda instrumentação temporária de diagnóstico Lighthouse foi removida antes do gate final.

## Decisão arquitetural
Não enfraquecer a CSP de produção nem alterar comportamento comercial para perseguir 100 no Deploy Preview. A produção já mede Best Practices 100; os 8 pontos restantes do preview pertencem ao cookie do Drawer da plataforma. A correção adequada desse último item é desabilitar o Drawer/Collaboration tools no próprio Netlify quando esse controle estiver disponível, não flexibilizar a aplicação.

## Preservado
Sem mudanças em catálogo, preços, pedidos, orçamento, Neon, CRM, autenticação, MFA, sessões, R2, backups ou regras comerciais.

## Gate
Integrar somente após CI completa verde e Deploy Preview do commit final em `ready`, com secret scan limpo.
