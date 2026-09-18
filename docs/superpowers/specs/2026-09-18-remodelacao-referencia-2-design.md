# Remodelação do site — referência visual 2

Data: 18/09/2026. Estado: visual aprovado; escopo funcional aguardando revisão de Tiago.

## 1. Resultado esperado

Remodelar a experiência pública inteira de Merlin Encantos em Papel seguindo a imagem escolhida por Tiago: **Inspirações de Topos de Bolo.png**, a segunda referência apresentada nesta conversa. A galeria será a principal referência de fidelidade; as demais páginas usarão a mesma identidade e componentes.

Manter fundo branco/rosa muito claro, destaque rosa vivo, títulos decorativos pontuais, texto escuro legível, cabeçalho com busca, navegação horizontal, banner compacto, filtros laterais, fotografias em destaque e cards alinhados. Preservar a marca e a logo oficiais configuradas no projeto; a referência contém uma logo KF diferente da atual e não autoriza, por si só, uma troca de marca.

O cliente deve conseguir descobrir uma inspiração, consultar detalhes, personalizar um topo e solicitar orçamento com continuidade entre as etapas. O site continua dedicado a **topos de bolo sob encomenda**, sem pagamento automático.

## 2. Base conferida e limites desta inspeção

- Repositório: `canalescanorff15-ux/marques-personalizados`, `main`, commit `081302875f28b64f57befeae6bcb930f0debeea2`, intitulado V7.00.
- Site público: `https://merlin-encantos-em-papel.canalescanorff15.workers.dev`.
- Foram lidos o código das páginas e componentes relevantes e o conteúdo público de início, catálogo, inspirações, montagem e orçamento. A auditoria visual interativa e os testes de execução serão feitos na implementação; não estão concluídos.
- A fonte atual possui 17 inspirações e seis níveis. A página ainda contém o título fixo “12 ideias iniciais”.
- Onze inspirações usam SVGs locais e seis usam imagens raster externas. A aparência fotográfica de todos os cards da referência ainda não está comprovadamente disponível nos arquivos do site.
- A galeria atual não monta os filtros/favoritos da referência. Existe um componente legado de favoritos reutilizável, mas ele precisa de integração e tratamento de falha de armazenamento.
- Os detalhes em `/inspiracoes/[code]` atualmente redirecionam à galeria. O formulário `TopperBuilder` já recebe tema, inspiração e nível por URL e envia a solicitação a `/api/inquiries`.
- Há autenticação de Admin, mas nenhuma área de conta de cliente na árvore de rotas consultada.
- O CSS público reúne estilos de várias versões, incluindo regras gerais que também afetam o Admin. A remodelação precisa isolar os estilos públicos.

## 3. Abordagem escolhida

**Reconstruir a camada visual pública sobre a aplicação existente.** Preservar Cloudflare Workers/vinext, a compatibilidade Next.js, Neon, APIs, dados, configurações e administração. Reorganizar os componentes e os estilos que servem à jornada pública.

Alternativas consideradas: apenas retocar o CSS teria menor alcance, mas não resolveria busca, detalhes e continuidade do pedido; reescrever a aplicação inteira ampliaria o trabalho e o risco sobre funções que não precisam mudar. A reconstrução da vitrine oferece o alcance pedido mantendo as integrações existentes.

Não adicionar conta de cliente, checkout, processamento de pagamento, serviços pagos ou migração de hospedagem nesta remodelação. A área administrativa permanece preservada, com testes para impedir interferência visual da nova vitrine.

## 4. Identidade e composição

- Fundo principal branco, superfícies rosa muito claro, texto azul-marinho/quase preto e rosa como cor de ação. Reservar verde para WhatsApp.
- Paleta inicial: fundo `#fffafb`, superfície `#ffffff`, faixa `#fdebf2`, borda `#f0e2e8`, texto `#192033`, texto secundário `#586174`, ação `#c91862`, rosa decorativo `#ed4082`. Ajustar a cor final de cada uso conforme a medição de contraste; texto normal deve atingir 4,5:1.
- Título decorativo restrito a títulos principais; menus, filtros, campos e cards usam fonte simples. Priorizar fontes locais com licença adequada e fallback legível. Nunca transformar o conteúdo textual em imagem.
- Containers largos, com limite de 1600 px, margens de 16–24 px, cards com cantos suaves e sombra discreta. Fotografias sem corte de nomes ou partes importantes do topo, com proporção consistente e ponto focal próprio quando necessário.
- Cabeçalho em duas faixas no desktop: marca, busca, contato e ações na primeira; menu na segunda. Navegação ativa identificável também sem depender exclusivamente da cor.
- Banner baixo, semelhante ao da referência, deixando a primeira fileira de modelos visível na tela inicial da galeria em desktop.
- Sem aura no cursor, animações extensas ou conteúdo inicialmente escondido por efeitos. Movimento reduzido deve ser respeitado.

### Adaptações funcionais da referência

| Elemento da imagem | Comportamento no site |
| --- | --- |
| Logo KF | Usar a logo oficial atual, no mesmo espaço e com escala legível; sem alterar a marca por suposição. |
| Minha Conta | Usar **Meus Favoritos**, levando à galeria filtrada pelos modelos salvos; não criar um login sem serviço correspondente. |
| Meu Pedido | Abrir o resumo do topo em montagem; contador 0 ou 1 para um rascunho de topo, identificado como pedido sob orçamento, sem carrinho de pagamento. |
| “30 inspirações” | Exibir a quantidade real encontrada após os filtros, inicialmente derivada dos 17 registros. |
| Ordenação | Oferecer “Ordem do catálogo”, “Nome A–Z” e “Nome Z–A”; não simular datas de publicação inexistentes. |
| Selos comerciais | Usar informações confirmáveis: produção sob encomenda, personalização e atendimento; não inventar avaliações, entrega, garantia ou pagamento seguro. |

## 5. Páginas e navegação

| Página | Remodelação |
| --- | --- |
| `/` | Cabeçalho novo, apresentação compacta com imagem de produto, inspirações em destaque, seis acabamentos, três passos para pedir, sobre o ateliê, dúvidas e contato. Depoimentos somente quando houver dados reais. |
| `/inspiracoes` | Banner da referência, filtros laterais, busca, ordenação, quantidade real, grade fotográfica, favoritos e acesso aos detalhes. |
| `/inspiracoes/[code]` | Detalhe para cada código atual `INSP-TOP-xx`: imagem ampliada, tema, nível sugerido, paleta, descrição e botão “Quero esse modelo”. Manter o redirecionamento legado para os demais códigos. |
| `/catalogo` | Comparação visual dos seis níveis de acabamento, com imagens, diferenças claras e links de personalização. |
| `/catalogo/[slug]` | Detalhe do nível com visual de referência, materiais possíveis, características e personalização; preservar slugs existentes. |
| `/guia-de-precos` | Comparação legível, valor sob orçamento e explicação curta do que influencia o preço, sem inventar valores. |
| `/monte-seu-topo` | Jornada de três etapas: acabamento; personalização; contato e revisão. Resumo visível e continuidade do modelo escolhido. |
| `/orcamento` | Acesso direto à mesma jornada e ao mesmo rascunho; não manter uma segunda lógica divergente. |
| `/links`, `/privacidade`, `/termos` | Aplicar identidade, cabeçalho, rodapé e leitura responsiva; preservar informações legais e destinos existentes. |
| Erro, carregamento e página não encontrada | Estados consistentes, mensagens claras e caminho de retorno; não prometer recuperação de dados que não ocorreu. |

Menu principal: **Início · Sobre Nós · Nossos Topos · Inspirações · Monte seu Topo · Dúvidas · Contato**. “Nossos Topos” reúne catálogo e níveis/preços; Sobre Nós, Dúvidas e Contato apontam para seções reais da página inicial. Preservar as URLs públicas existentes e seus redirecionamentos.

## 6. Galeria e imagens

- `lib/topper-inspirations.ts` permanece a fonte canônica das inspirações de topo. Preservar códigos, slugs, nomes e relação com os níveis.
- Filtros por categoria, nível e favoritos, combinados com busca por título, código, categoria, tags e paleta. Normalizar maiúsculas e acentos. Mapear categorias explicitamente, sem reclassificação silenciosa por palavras parciais.
- Estado da busca/filtros/ordenação na URL, com leitura inicial correta e funcionamento de voltar/avançar. Valores desconhecidos retornam ao padrão seguro. Nenhum dado de contato deve ir para a URL.
- Cards: imagem, coração funcional, categoria, título, nível sugerido, amostras de cor com nomes acessíveis e “Ver detalhes”. Uma única ação principal por card.
- Detalhes: informar que nome, idade e cores são adaptáveis. O nível sugerido não restringe a escolha do cliente no formulário.
- Exibir inicialmente 12 resultados e acrescentar até 12 por “Carregar mais”, informando quantos foram exibidos. Reiniciar em 12 ao mudar busca, filtros ou ordenação; não carregar todo o acervo de fotos de uma vez.
- Uma inspiração = uma imagem exclusiva. Preservar os seis raster atuais e conferir o acervo salvo antes de substituir os onze SVGs. Não recortar fotografias da imagem do layout, reutilizar fotos entre modelos nem transformar SVG simples em “foto” por conversão de formato.
- Se uma imagem fotográfica correspondente não estiver disponível, registrar a pendência e manter sua ilustração explicitamente identificada; não declarar fidelidade fotográfica completa. Imagens geradas são referências ilustrativas, não fotografias comprovadas de produtos entregues.
- Falha de imagem deve manter o card e oferecer texto alternativo/placeholder neutro, sem mostrar a fotografia de outra inspiração.

## 7. Pedido, estado e tratamento de falhas

O fluxo é **inspiração → detalhes → personalização → revisão → orçamento/WhatsApp**. Tema, código e nível devem chegar completos ao formulário.

Reaproveitar a submissão de `TopperBuilder` e o contrato de `/api/inquiries`, inclusive `request_id` e atribuição. Extrair um estado compartilhado de rascunho específico de topo para cabeçalho, formulário e revisão. O rascunho suporta um topo por solicitação; não criar registros fictícios de produto para alimentar o carrinho legado.

Persistir na sessão apenas a personalização do topo, com formato versionado, validação de limites e recuperação segura de dados inválidos. Parâmetros válidos e explícitos de inspiração, tema e nível prevalecem sobre os respectivos campos do rascunho; campos não especificados permanecem intactos. Contato, nome do cliente, WhatsApp e e-mail ficam em memória durante a navegação; não vão para armazenamento persistente nem URL. Mostrar quando a gravação local estiver indisponível, sem impedir o uso da página. Permitir limpar o rascunho explicitamente e limpar a cópia de sessão somente depois de uma submissão com `persisted:true`; preservá-la em erro ou contingência.

Favoritos mantêm a chave existente `kf_inspiration_favorites_v1` e seus códigos, inclusive entradas antigas não exibidas nesta galeria. Tratar armazenamento bloqueado ou corrompido, sincronização entre abas e limite de favoritos com feedback explícito; não apagar dados anteriores na montagem do componente.

Ao enviar: desabilitar reenvio enquanto houver requisição, preservar campos em caso de erro e permitir nova tentativa. Se a API retornar `persisted:false`, não mostrar “registrado”; explicar a contingência e oferecer o link de WhatsApp. Se o aplicativo de WhatsApp não abrir, manter um link clicável e opção de copiar o resumo. Não inferir sucesso pelo clique do botão.

## 8. Estrutura técnica

Separar responsabilidades em componentes de cabeçalho/busca, navegação, banner, filtros, card, detalhe, resumo e formulário. Centralizar tokens visuais e compartilhar estilos/componentes entre todas as páginas públicas.

Isolar a nova vitrine com uma raiz própria e estilos focados, removendo progressivamente as dependências públicas dos estilos legados substituídos. Não empilhar outra versão global de overrides sobre os seletores antigos. Preservar o estilo do Admin e dos componentes legados ainda usados; qualquer retirada deve ter inventário de consumidores e teste de regressão.

Manter componentes de servidor para conteúdo e configurações; usar componentes de cliente apenas onde há estado e interação. A busca pública proposta consulta os dados de topos, evitando reapresentar categorias antigas de outros produtos pelo buscador legado. Nenhuma alteração de schema, segredo, política de acesso, bucket, backup ou autenticação faz parte deste escopo.

## 9. Responsividade e acessibilidade

- Desktop a partir de 1440 px: sidebar de aproximadamente 200–220 px e até seis cards por fileira, como na referência, sem reduzir texto a tamanho ilegível.
- Desktop de 1024–1439 px: sidebar e quatro cards por fileira. Tablet de 768–1023 px: três cards e filtros recolhíveis. De 360–767 px: dois cards; abaixo de 360 px ou quando o zoom exigir, um card.
- No celular, cabeçalho compacto, busca em faixa própria, menu acessível e filtros em painel/modal com fechar, Escape, foco controlado e retorno ao botão de origem.
- Botões interativos com área de toque de pelo menos 44 × 44 px; labels, foco visível, contraste medido, estados anunciados e alternativas textuais para cor e imagem.
- Nenhuma barra de WhatsApp, menu ou resumo pode cobrir campos, botões, conteúdo ou o rodapé. Reservar área segura inferior quando houver ação fixa.

## 10. Critérios de entrega e verificação

1. Comparar capturas da galeria com a referência 2 em desktop, além de revisar início, níveis, detalhe e formulário no mesmo sistema visual.
2. Conferir em 360, 390, 768, 1024 e 1536 px e com zoom de 200%: sem rolagem horizontal indevida, corte de texto ou sobreposição.
3. Testar busca com acentos, combinação e limpeza de filtros, contagem, ordenação, estado vazio, link compartilhável e voltar/avançar.
4. Testar favoritar/desfavoritar, recarga, outras abas, chave inválida e armazenamento bloqueado, preservando favoritos antigos.
5. Testar os 17 códigos, as seis opções de nível e o transporte de inspiração/tema/nível para o formulário.
6. Testar rascunho entre páginas, revisão, limpeza, envio, erro, nova tentativa e contingência `persisted:false` em ambiente de teste, sem criar pedidos fictícios em produção.
7. Executar contratos pertinentes, TypeScript, build Next.js e build vinext; atualizar testes estruturais que dependem do HTML antigo sem remover a cobertura de comportamento.
8. Conferir Admin, APIs, redirecionamentos legados, formulários e ativos existentes contra regressões. Distinguir verificações concluídas de verificações bloqueadas.
9. Antes de publicar, conferir alterações novas em `main`, integrar sem sobrescrever trabalho paralelo e usar o fluxo de publicação já configurado. Não contornar proteções do repositório.
10. Após publicar, conferir a versão servida e as rotas públicas; manter um commit de referência para rollback sem restauração destrutiva de dados.

## 11. Próximo marco

O estilo da referência 2 já foi aprovado. Esta especificação precisa apenas da revisão do escopo funcional — especialmente a preservação da logo atual, **Meus Favoritos** no lugar de conta de cliente e **Meu Pedido** como resumo de um topo sob orçamento. Após essa revisão, produzir o plano executável e implementar em etapas verificáveis, começando pelos componentes compartilhados e pela galeria.
