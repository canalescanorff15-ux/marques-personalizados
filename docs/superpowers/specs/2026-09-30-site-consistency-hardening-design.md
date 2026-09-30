# V8.29 — Site Consistency & Stability Hardening

## Goal

Eliminar inconsistências públicas que fazem o cliente encontrar erros mesmo quando preenche corretamente o site, começando pelo fluxo `/orcamento`, e criar verificações automáticas para impedir regressões equivalentes.

## Confirmed production symptom

Na etapa “Revise e envie para o WhatsApp”, um pedido visualmente válido pode receber `400` com a mensagem genérica “Confira seu nome, WhatsApp e os dados do orçamento.”.

## Root-cause direction

`OrderBuilder` envia metadados de atribuição junto com dados principais do pedido. `captureAttribution()` reutiliza diretamente qualquer objeto previamente salvo no `sessionStorage`, sem revalidar ou normalizar o formato. O `inquirySchema`, por outro lado, valida rigidamente todos os campos de atribuição. Metadados legados ou malformados podem portanto derrubar um pedido cujo nome, WhatsApp, data e personalização estejam válidos.

Além disso, a API devolve uma mensagem genérica para qualquer falha do schema, e o cliente descarta os detalhes estruturados; isso mascara a causa real e orienta o usuário para campos que podem estar corretos.

## Required behavior

1. Dados essenciais do pedido têm prioridade sobre metadados opcionais de marketing.
2. Metadados de atribuição antigos devem ser migrados/sanitizados no cliente antes do envio.
3. O backend deve ser defensivo: atribuição inválida não pode invalidar um orçamento válido.
4. Validações de campos realmente obrigatórios devem produzir mensagens úteis e específicas.
5. O rascunho preenchido nunca deve ser perdido quando a API falhar.
6. O fluxo deve continuar seguro: same-origin/CSRF, rate limit, limites de payload e idempotência permanecem.
7. O WhatsApp continua sendo a etapa final do orçamento; nenhum pagamento ocorre no site.
8. A auditoria deve cobrir rotas públicas essenciais e adicionar regressões ao CI.
9. Não alterar banco, catálogo, preços, slugs públicos ou regras comerciais sem necessidade comprovada.

## Audit scope

- `/`, `/catalogo`, `/catalogo/[slug]`, `/inspiracoes`, `/inspiracoes/[code]`, `/personalizados`, `/monte-seu-pedido`, `/orcamento`.
- Cliente: drafts, attribution, `fetchJson`, mensagens de erro e preservação de estado.
- API pública: inquiries, same-origin, schema boundary, fallback WhatsApp.
- Contratos/E2E: payload realista positivo, payload com atribuição legada, mensagens de validação e rotas públicas essenciais.
- CSS público: estados de erro/status não devem parecer links ou texto cru de navegador.

## Acceptance criteria

- Um payload equivalente ao da captura (nome, WhatsApp, data futura e topo personalizado) é aceito.
- O mesmo payload continua aceito se a atribuição legada contiver valores nulos, tipos incorretos ou campos desconhecidos; esses metadados são descartados/sanitizados.
- Nome inválido, WhatsApp inválido e data passada continuam rejeitados com mensagem correta.
- Erro de API não apaga o pedido.
- CI executa a nova proteção automaticamente.
- TypeScript, production build, HTTP E2E, load smoke e Cloudflare Workers compatibility ficam verdes antes do merge.