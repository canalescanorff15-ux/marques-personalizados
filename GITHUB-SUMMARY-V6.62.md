## Merlin — Encantos em Papel V6.62

### Summary
A V6.62 transforma o catálogo da Merlin em uma vitrine comercial completa, mantendo toda a V6.61. O site passa a ter preços iniciais transparentes, 21 produtos estruturados, 6 coleções comerciais, imagens próprias e fallback seguro caso o banco esteja incompleto.

### Principais mudanças
- 21 produtos iniciais com valores **A PARTIR DE**.
- 6 categorias comerciais com descrições próprias.
- Novo guia de preços na Home.
- Preço por unidade/peça e quantidade mínima visíveis.
- Valor inicial do pedido mínimo exibido quando aplicável.
- Aviso de variação por tema, quantidade, camadas, acabamento, urgência e frete.
- 21 mockups SVG de produto e 6 artes SVG de categoria.
- Imagens conceituais identificadas como **Imagem ilustrativa**.
- Placeholder antigo é substituído automaticamente pelo mockup correto sem sobrescrever fotos reais cadastradas pelo admin.
- Seed idempotente para catálogo, preços, categorias e identidade Merlin.
- Fallback local completo quando o banco não estiver disponível.
- V6.61 Meu Projeto preservada.
- Novo `check:catalog-commercial` no `npm run verify` e GitHub Actions.

### Correção do banco ativo
A auditoria encontrou a tabela `products` vazia e `site_settings` ainda com “Marques Papelaria”. O Neon foi corrigido sem DELETE:
- 21 produtos cadastrados;
- 0 sem preço;
- 0 sem categoria;
- preços entre R$ 0,90 e R$ 199,90 conforme o tipo de peça/kit;
- 6 categorias ativas;
- marca atualizada para `Merlin Encantos em Papel`;
- logo oficial `/merlin-logo.webp`.

### Validação
- 56/56 checks estruturais aprovados.
- 191 arquivos TS/TSX: 0 erros de sintaxe.
- 27 arquivos SVG: XML válido.
- catálogo: 21/21 produtos com preço positivo e imagem própria.
- banco ativo: 21 produtos, 0 sem preço, 0 sem `category_id`.
- `package-lock.json` preservado com SHA original.
- `npm ci` local não concluiu por timeout do ambiente; typecheck/build oficiais continuam sendo executados no GitHub Actions.

### Compatibilidade
- Base estável: V6.60.1 + V6.61 Meu Projeto.
- Schema: 27.
- Migração de schema: NÃO.
- Exclusão de dados: NÃO.
- Repositório completo: SIM.

### Status
V6.62 pronta para CI/deploy. Depois do CI verde, esta passa a ser a base oficial para as próximas melhorias.
