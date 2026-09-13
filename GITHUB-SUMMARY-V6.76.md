# GitHub Summary — V6.76

## Objetivo da rodada
Transformar a área de decisão de compra em uma experiência mais clara, rápida e premium, reduzindo atrito entre catálogo, comparação, personalização, quantidade e orçamento — especialmente no celular, onde a página ainda podia ficar longa demais.

## Entregas principais
- Comparador de produtos redesenhado na mesma linguagem clara de ateliê usada no catálogo e nas páginas de produto.
- Comparação passa a mostrar **pedido inicial estimado** (preço inicial × quantidade mínima), além de preço, mínimo, prazo, disponibilidade e nível de personalização.
- Produtos com menor investimento inicial conhecido recebem destaque **“Menor entrada”**, facilitando a escolha sem esconder que o valor final depende da personalização.
- A bandeja de comparação ficou mais objetiva: com apenas 1 item pede para escolher mais um; com 2 ou 3 oferece **“Comparar agora”**.
- Personalização obrigatória ganhou indicador de progresso, mostrando quantos campos essenciais já foram preenchidos.
- Simulador de quantidade ganhou atalhos rápidos com valores úteis derivados do mínimo e da sugestão do evento.
- Produtos já adicionados agora oferecem acesso direto a **“Revisar minha lista”**.
- Fluxo da página de produto foi refinado: voltar leva ao catálogo real, breadcrumb aponta para a categoria correta e o CTA mobile diferencia **“Personalizar e calcular”** de **“Planejar quantidade”**.
- Blocos longos no celular foram compactados: guia de compra, etapas do produto e produtos relacionados passam a usar navegação horizontal com snap, reduzindo bastante a rolagem vertical.
- Formulário de orçamento e controles comerciais da página de produto foram harmonizados com o visual claro/premium da V6.75.

## Arquivos centrais
- `app/catalog-v676.css`
- `app/catalogo/[slug]/page.tsx`
- `app/layout.tsx`
- `components/CompareProvider.tsx`
- `components/ProductConfigurator.tsx`
- `components/ProductOrderPlanner.tsx`

## Segurança e infraestrutura
A V6.76 é focada em experiência comercial e apresentação. Não altera schema do Neon, migrations, autenticação, MFA, CRM, permissões, Cloudflare R2, backups, restauração, privacidade nem regras de persistência de pedidos.

## Resultado esperado
O visitante deve conseguir entender melhor quanto precisa comprar, qual é o investimento inicial aproximado, o que falta personalizar e qual é o próximo passo, com menos cliques e menos rolagem — sem transformar o site em uma loja genérica e sem perder a identidade artesanal da Merlin.
