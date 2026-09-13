# GitHub Summary — V6.77

## Objetivo da rodada
Encurtar a etapa final do orçamento, principalmente no celular, reduzindo a sensação de que o cliente precisa revisar a mesma informação várias vezes antes de enviar o pedido.

## Entregas principais
- Novo resumo fixo de checkout no mobile da página `/orcamento`.
- O resumo mostra quantidade de peças, percentual do briefing e estimativa inicial sem ocupar a tela inteira.
- Botão `Finalizar` abre diretamente a etapa de envio do orçamento.
- Ao abrir o drawer a partir do planejador completo, os campos de briefing já revisados deixam de ser repetidos visualmente.
- A lista de itens no drawer fica mais compacta quando o cliente já está na página de orçamento.
- O atalho redundante `Abrir orçamento completo` é ocultado quando o usuário já está nessa página.
- A barra mobile desaparece automaticamente enquanto o drawer estiver aberto para evitar CTAs sobrepostos.
- Compatibilidade preservada com o dock mobile da Merlin, safe-area do iPhone e telas muito estreitas.

## Escopo técnico
A rodada atua somente na experiência pública de orçamento e checkout. Não altera schema Neon, API de inquiries, CRM, autenticação, MFA, R2, backups, restauração ou regras de persistência.

## Arquivos centrais
- `components/QuoteCheckoutBar.tsx`
- `app/orcamento/page.tsx`
- `app/quote-v677.css`
- `app/layout.tsx`

## Resultado esperado
No celular, o cliente não precisa chegar ao fim de uma página longa para descobrir como continuar. O resumo de checkout permanece acessível durante a revisão e a etapa final deixa de repetir o briefing que já foi preenchido no planejador.
