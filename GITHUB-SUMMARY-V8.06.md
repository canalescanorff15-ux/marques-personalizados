# GitHub Summary — V8.06

## Objetivo

Evoluir "Monte seu Topo" para uma jornada principal "Monte seu Pedido", capaz de receber diferentes tipos de papelaria personalizada sem perder o fluxo especializado de topo de bolo.

## Nova rota principal

- `/monte-seu-pedido`

## Produtos disponíveis

- Topo de bolo
- Caixinhas personalizadas
- Lembrancinhas
- Chaveiros personalizados
- Adesivos personalizados
- Doces & complementos
- Kit personalizado
- Outro personalizado

## Formulário adaptativo

O formulário muda de acordo com o produto.

### Topo
- nível de acabamento;
- inspiração;
- tema;
- nome;
- idade;
- tamanho do bolo;
- cores;
- referência.

### Caixinhas
- modelo (Milk, Bala, Pirâmide, Sushi ou outro);
- quantidade;
- tema;
- nome/idade;
- cores.

### Chaveiros
- formato;
- quantidade;
- frente ou frente/verso;
- medidas;
- tema/referência.

### Adesivos
- formato;
- quantidade;
- medidas;
- acabamento.

### Doces & complementos
- topper, tag, wrapper, forminha, plaquinha ou outro;
- quantidade;
- tema e dados personalizados.

### Kit
- lista livre dos itens desejados;
- identidade visual compartilhada.

### Outro
- descrição livre da ideia.

## Rascunho

Novo armazenamento de sessão `merlin_order_draft_v1`, sem remover o rascunho legado de topo.

## CRM / WhatsApp

- continua usando `/api/inquiries`;
- mantém request ID e atribuição;
- produto escolhido entra em `product_name`;
- detalhes específicos entram no resumo;
- `desired_categories` recebe o tipo selecionado;
- não inventa categoria administrativa, evitando rejeição por categoria inexistente.

## Compatibilidade

- `/monte-seu-topo` continua disponível como fluxo legado especializado;
- `/monte-seu-kit` e `/meu-projeto` apontam para `/monte-seu-pedido`;
- links públicos novos usam a rota V8.06.

## Navegação

Header, footer, dock mobile, Home, catálogo, detalhes de inspiração, guia de acabamentos e página de personalizados foram ligados à nova jornada.

## SEO / sitemap

- `/monte-seu-pedido` entra no sitemap;
- `/personalizados` entra no sitemap;
- a rota antiga deixa de ser a principal indexada.

## Segurança / backend

Sem alteração de schema, autenticação, banco, R2 ou regras administrativas.
