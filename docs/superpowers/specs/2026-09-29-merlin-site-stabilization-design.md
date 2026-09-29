# Merlin Encantos em Papel — estabilização comercial e UX

Data: 2026-09-29

## Objetivo

Deixar o site público curto, claro e confiável para clientes comuns, com prioridade absoluta para o fluxo de orçamento via WhatsApp. Preservar o banco, os slugs públicos e as 36 inspirações já publicadas.

## Escopo aprovado

1. Trocar a identidade visual do cabeçalho pela nova logo oficial Merlin Encantos em Papel.
2. Encurtar o texto ao lado da logo para evitar repetição da marca.
3. Renomear os seis níveis de topo com linguagem simples e compreensível:
   - Topo Essencial
   - Topo 3D em Camadas
   - Topo Premium
   - Topo com Movimento (Shaker)
   - Topo com Acetato
   - Topo Luxo — Movimento + Acetato
4. Preservar os slugs técnicos atuais (`essencial`, `camadas-3d`, `premium`, `shaker`, `acetato`, `elite-shaker-acetato`) para não quebrar links, inspirações ou dados.
5. Corrigir o fluxo de orçamento e garantir continuação pelo WhatsApp com mensagem legível, emojis UTF-8 e resumo completo.
6. Compactar o formulário de orçamento em etapas visuais e reduzir rolagem excessiva.
7. Remover/neutralizar grandes áreas vazias ou heros que ocupam espaço sem conteúdo útil.
8. Tornar a barra móvel inferior persistente em todas as páginas públicas que usam o cabeçalho público.
9. Simplificar a Home e mostrar apenas produtos/serviços realmente ofertados ou aceitos sob consulta.
10. Ocultar Kits por enquanto.
11. Não apresentar venda de doces. Se houver papelaria para doces no futuro, usar nomenclatura explícita como “Acessórios para Doces”.
12. Manter Caixinhas como “sob consulta”, não como linha consolidada.
13. Destacar Topos de bolo, Lembrancinhas, Adesivos & Chaveiros e Marcadores de Página.
14. Criar seção “Feito por Nós” na Home usando apenas fotografias reais fornecidas pelo proprietário.
15. Separar visualmente “Feito por Nós” de “Inspirações”.
16. Melhorar a página de Personalizados para explicar claramente o que é produzido.
17. Revisar comportamento mobile e garantir navegação sem depender do menu hambúrguer para ações principais.

## Diagnóstico do orçamento

O endpoint `POST /api/inquiries` usa `sameOriginRequest()`. Em produção, `sameOriginBoundary()` compara Origin/Referer com `NEXT_PUBLIC_SITE_URL`. Como o domínio público foi alterado, uma variável de ambiente ainda apontando para o domínio anterior pode causar `403 Origem inválida` antes da persistência. O fluxo atual também depende da resposta da API para obter `whatsapp_url`; quando a persistência falha, o usuário precisa de uma contingência clara e acionável.

### Correção de arquitetura

- Manter proteção CSRF.
- Fazer a origem canônica acompanhar o domínio público atual e aceitar somente aliases explicitamente confiáveis quando necessário.
- Atualizar os testes de origem para cobrir o domínio atual e rejeitar domínios externos.
- Gerar a mensagem do WhatsApp no servidor com UTF-8/`encodeURIComponent` já usado pelo helper existente.
- Em falha de persistência, manter o rascunho e apresentar imediatamente o CTA de WhatsApp; nunca apagar dados do cliente.
- Em sucesso, persistir primeiro e então abrir o WhatsApp com o resumo pronto.

## Mensagem de WhatsApp

Formato desejado:

- 🎂 NOVO PEDIDO — MERLIN
- 👤 Cliente
- 📱 WhatsApp
- 📅 Data do evento
- 🎨 Produto/modelo
- 🎉 Tema
- ✍️ Nome/texto
- 🎈 Idade/número
- 🎨 Cores
- 📏 Tamanho/medidas quando aplicável
- 🖼️ Referência/inspiração
- 📝 Observações

A mensagem deve permanecer legível mesmo sem emojis e não deve gerar caracteres `?` por erro de codificação.

## Home

Ordem visual compacta:

1. Hero curto com proposta e dois CTAs.
2. O que fazemos.
3. Topos de bolo.
4. Feito por Nós.
5. Inspirações.
6. Como pedir / orçamento.

Categorias públicas iniciais:

- Topos de bolo
- Marcadores de página
- Lembrancinhas
- Adesivos & Chaveiros
- Caixinhas — sob consulta
- Outros personalizados

Ocultos por enquanto:

- Kits
- Doces como produto alimentício

## Feito por Nós

Usar as três fotografias reais fornecidas na conversa:

- topo de bolo gótico/vermelho e preto;
- marcadores literários com acabamento escuro/dourado;
- marcadores personalizados de estilos variados.

As imagens não recebem selo de IA; a seção deve ser identificada como trabalho real. Inspirações continuam em seção separada.

## Navegação móvel

`MerlinMobileDock` passa a ser montado no shell/cabeçalho público compartilhado em vez de somente na Home. A barra mantém quatro ou cinco ações principais, com estado ativo conforme a rota:

- Início
- Topos
- Inspirações
- Meu Pedido
- Orçamento

Não deve aparecer no Admin.

## Página de Personalizados

Cards curtos e autoexplicativos:

- Marcadores de Página — literários, temáticos e personalizados.
- Lembrancinhas — peças e mimos personalizados.
- Adesivos & Chaveiros — com nome, foto ou tema.
- Caixinhas — sob consulta.
- Outros Personalizados — referência ou ideia do cliente.

Remover Kits do catálogo público atual e substituir “Doces & Complementos” por texto que não implique produção de alimentos; se não houver oferta ativa, manter oculto.

## Logo

Usar a nova arte circular fornecida pelo usuário, convertida para WebP otimizado e salva em `public/merlin-logo.webp`. O cabeçalho deve evitar repetir “Merlin Encantos em Papel” ao lado de uma logo que já contém a marca; o texto auxiliar será reduzido ou ocultado conforme largura.

## Testes e critérios de aceite

- Teste de contrato para os seis nomes públicos e preservação dos slugs.
- Teste do boundary de origem para o domínio atual e rejeição cross-site.
- Teste estático/contrato para dock móvel presente no shell público.
- Teste do fluxo de orçamento: payload válido, persistência/contingência e URL de WhatsApp.
- TypeScript sem erros.
- Build de produção concluído.
- Contratos existentes de Merlin/inspirações continuam verdes.
- CI final verde antes de considerar concluído.
- Verificação pública manual: Home, Catálogo, Personalizados, Inspirações, Meu Pedido e Orçamento.

## Fora do escopo

- Não criar venda de alimentos.
- Não criar kits antes de o negócio começar a oferecê-los.
- Não alterar as 36 inspirações nem seus códigos.
- Não migrar banco nem trocar de provedor.
- Não alterar slugs públicos dos níveis de topo nesta etapa.
