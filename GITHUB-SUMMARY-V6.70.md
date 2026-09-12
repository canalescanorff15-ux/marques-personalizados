## Merlin — Encantos em Papel V6.70

### Summary
A V6.70 é uma evolução comercial ampla sobre a V6.62. Ela transforma catálogo, produto e lista de orçamento em uma jornada assistida de compra, mantendo a natureza sob encomenda da papelaria personalizada: o cliente vê preço inicial, simula quantidade, informa convidados e investimento, compara o prazo com a data do evento e revisa tudo antes de enviar o atendimento.

### Principais mudanças
- Nova rota `/orcamento` com workspace completo de orçamento.
- Nova rota pública `/guia-de-precos` com os 21 produtos e pedidos mínimos.
- Simulador de quantidade e estimativa mínima em cada produto.
- Produtos com campos personalizados agora combinam personalização + quantidade no mesmo fluxo.
- Sugestão de quantidade baseada em convidados quando o tipo de peça permite.
- Estimativa mínima total da seleção, sem tratar o valor como preço final.
- Comparação automática da estimativa com a faixa de investimento do cliente.
- Análise de prazo em dias úteis considerando data do evento e maior janela inicial de produção da seleção.
- Checklist de briefing com indicador de completude.
- Novo guia “Antes de pedir” em cada produto, com uso ideal, decisões necessárias, fatores de preço e preparação.
- Home ganha planejamento por investimento e por número de convidados.
- Guia inicial de preços passa a apontar para Meu orçamento, tabela completa e Monte seu Kit.
- Catálogo recebe filtro por faixa de preço inicial com estado sincronizado na URL.
- API e consulta pública do catálogo suportam `min_price` e `max_price`.
- Header, footer e dock mobile priorizam o orçamento interno antes do WhatsApp.
- Lista de orçamento preserva prazo de produção e quantidade escolhida.
- Compartilhamento da lista continua sem expor dados de personalização locais.
- `/guia-de-precos` entra no sitemap; `/orcamento` permanece `noindex` e fora do sitemap.
- Dados estruturados de produto passam a informar quantidade mínima elegível.
- Novo contrato `check:commerce-v670` + self-test de planejamento de orçamento.
- CI executa explicitamente o novo contrato.

### Regras comerciais preservadas
- Valores exibidos continuam sendo “A PARTIR DE”.
- Não existe cobrança automática nem checkout enganoso.
- Personalização, acabamento, materiais, urgência, agenda e frete continuam sujeitos à confirmação final.
- Quantidade sugerida é uma referência e respeita o pedido mínimo do produto.
- Prazo mostrado é diagnóstico inicial; vaga de produção só é confirmada no atendimento.

### Validação
- 57/57 checks estruturais aprovados.
- `check:commerce-v670`: aprovado.
- Self-test de orçamento/faixa/prazo/quantidade: aprovado.
- Segurança, CRM, backup/DR, privacidade e mídia: aprovados.
- Kit Builder, branding Merlin, inspirações, comparador, Meu Projeto e catálogo comercial: aprovados.
- 199 arquivos TS/TSX analisados no passe de transpile, com 0 erros de sintaxe.
- Schema permanece 27.
- Nenhuma migração de banco necessária.
- `package-lock.json` original preservado.

### Compatibilidade
- Base anterior: V6.62.
- Base CI estável conhecida: V6.60.1.
- Patch cumulativo: V6.62 → V6.70.
- Identidade oficial: Merlin Encantos em Papel.
- Banco: Neon, schema 27.

### Observação de build
Os contratos estruturais foram executados localmente. `npm ci`, typecheck completo e `next build` devem continuar sendo validados pelo GitHub Actions com o `package-lock.json` oficial do repositório.

### Status
V6.70 pronta para CI. Após o GitHub Actions ficar verde, pode substituir a V6.62 como nova base comercial oficial.
