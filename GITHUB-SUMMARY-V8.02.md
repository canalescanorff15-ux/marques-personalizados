# GitHub Summary — V8.02 Home Produto-First

## Objetivo

Reconstruir a Home para apresentar a Merlin Encantos em Papel como uma marca de papelaria personalizada premium, sem deixar os níveis de acabamento dominarem a experiência.

## Nova lógica comercial

A Home passa a seguir esta ordem:

1. marca e proposta de valor;
2. produto que o cliente quer;
3. inspirações reais de produto;
4. clareza sobre o que está incluso;
5. acabamentos de topo;
6. processo do pedido;
7. sobre a marca;
8. depoimentos reais quando existirem;
9. FAQ;
10. CTA final de orçamento.

## Hero

- headline ampliada para papelaria personalizada;
- apenas dois CTAs principais: inspirações e orçamento;
- fotografia limpa de bolo + topo;
- descrição da inspiração fora da foto;
- três sinais de confiança;
- acesso direto ao WhatsApp.

## Produtos

Nova seção “O que podemos criar” com:

- Topos de bolo;
- Caixinhas personalizadas;
- Adesivos & chaveiros;
- Doces & brigadeiros;
- Lembrancinhas;
- Kits personalizados.

Os produtos que ainda não possuem catálogo próprio encaminham para orçamento, sem inventar estoque ou preço.

## Inspirações

- usa apenas `publicTopperInspirations`;
- seis destaques curados dentro de INSP-TOP-18..50;
- fotos sem shade ou máscara preta;
- título e metadados ficam fora da imagem;
- texto explica explicitamente que a galeria prioriza o produto.

## Clareza comercial

Nova seção diferencia:

### Incluído no pedido de topo
- topo personalizado;
- nome, idade, cores e elementos confirmados;
- acabamento escolhido;
- adaptação ao tamanho do bolo.

### Não incluído automaticamente
- bolo, doces e alimentos;
- balões, painel e mobiliário;
- mesa decorada;
- qualquer item não descrito no orçamento.

## Acabamentos

Os seis níveis continuam disponíveis e usam os visuais oficiais, porém aparecem depois do produto e da inspiração.

Shaker e Acetato permanecem comunicados como acabamentos, não como identidade principal da marca.

## Processo

Novo fluxo em quatro passos:

1. referência;
2. detalhes;
3. acabamento;
4. confirmação do orçamento.

## FAQ

Inclui respostas diretas sobre:
- cenário da foto;
- bolo;
- envio de referências;
- personalização;
- outros produtos;
- formação do preço.

## Design

Novo arquivo `app/v8-home.css`:

- marfim, rosé, blush e grafite;
- grids editoriais;
- fotos limpas;
- captions separadas;
- responsividade 1100 / 900 / 640 / 390 px;
- reduced-motion preservado.

## Contratos migrados

Contratos V7.15, V7.17, V7.18 e V7.19 agora reconhecem a Home V8 sem obrigar headlines, colagens e destaques antigos.

Novo contrato:
- `scripts/v8-home-contract-check.mjs`
- comando `check:v8-home`
- executado pelo gate comercial existente do CI.

## Escopo preservado

Sem alterações em:
- Neon;
- schema;
- Admin;
- autenticação;
- orçamento backend;
- favoritos;
- comparador;
- R2;
- rotas de catálogo e inspirações.
