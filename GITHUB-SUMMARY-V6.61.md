## Merlin — Encantos em Papel V6.61

### Summary
A V6.61 adiciona o **Meu Projeto Merlin**, um painel local que transforma favoritos e comparações em uma seleção final organizada antes do orçamento.

### Principais mudanças
- Nova rota `/meu-projeto` com resumo central das escolhas do cliente.
- Inspirações salvas e itens em comparação aparecem no mesmo painel.
- Shortlist final limitada a até 6 referências, compatível com o `Monte seu Kit`.
- Deep-link transporta a seleção final diretamente para o construtor de pedido.
- Resumo pode ser compartilhado via Web Share API ou copiado para a área de transferência.
- WhatsApp recebe mensagem contextual com os códigos e títulos das referências escolhidas.
- Estado do painel permanece somente no navegador/aparelho até o envio do pedido.
- Header, menu móvel, dock, favoritos e comparador passam a apontar para o Meu Projeto.
- `npm run verify` passa a executar também os contratos Merlin adicionados nas versões recentes.
- Novo contrato `check:project-board` adicionado ao GitHub Actions.

### Validação
- Contrato de Meu Projeto protege limite, persistência local, privacidade e handoff para Kit/WhatsApp.
- Fluxos existentes de favoritos, comparação, Orçamento Express e Monte seu Kit preservados.
- Schema preservado: 27.
- `package-lock.json` não é substituído por este patch.

### Compatibilidade
- Base estável: V6.60.1.
- Patch cumulativo: SIM.
- Contém as melhorias Merlin V6.51 → V6.60.1 + V6.61.
- Sem migração de banco nesta rodada.

### Status
V6.61 pronta para substituir a V6.60.1 após CI verde.
