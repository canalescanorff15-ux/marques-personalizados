# GitHub Summary — V6.89

## Objetivo
Fechar a continuidade visual e comercial entre o catálogo de inspirações e o “Monte seu Kit”, removendo o último ponto em que uma referência rica virava apenas um swatch genérico.

## Implementado
- `KitBuilder` reutiliza `InspirationArtwork` nas sugestões e nas referências selecionadas;
- cards do catálogo ganharam CTA direto “Usar no kit” com o código da inspiração;
- o fluxo existente `?inspiracao=` continua sendo a única autoridade para transportar uma referência individual ao construtor;
- CSS mantém hierarquia, responsividade e `prefers-reduced-motion` sem asset externo novo;
- `check:kit-builder` agora protege tanto a presença da arte oficial quanto o atalho direto catálogo → kit.

## Preservado
Sem mudança de banco, schema, CRM, preços, autenticação, MFA, sessões, storage, backups, service worker ou contrato de envio do orçamento.

## Gate
Integrar somente com CI completa e Deploy Preview em verde. Produção permanece separada enquanto o deploy principal do Netlify continuar travado no deploy antigo.
