# GitHub Summary — V7.16

## Objetivo

A V7.16 nasce de uma auditoria visual global do site público, feita após identificar no navegador que o problema de encaixe não estava restrito a uma página.

A revisão cobriu:

- Home;
- Catálogo;
- seis páginas individuais de nível;
- Inspirações;
- detalhe de inspiração;
- Monte seu Topo;
- Orçamento;
- Guia de níveis & preços;
- Links;
- Privacidade;
- Termos;
- header, navegação, footer e componentes compartilhados.

## Problemas confirmados

### Header / busca

O label acessível `Buscar inspirações de topo` usava `className="sr-only"`, porém o projeto não possuía definição CSS para `.sr-only`. Por isso o texto entrava no grid visual da busca, deslocava o input e fazia o botão **Buscar** quebrar para outra linha.

Correções:

- utilitário `.sr-only` implementado corretamente;
- busca estabilizada em três colunas: ícone / input / botão;
- placeholder encurtado para `Tema, código, cor ou estilo...`;
- botão de busca protegido contra quebra;
- breakpoint intermediário dedicado a notebooks;
- navegação horizontal protegida contra colisão.

### Guia de níveis & preços

A auditoria encontrou palavras e informações cortadas nos seis níveis. O layout antigo também possuía um rótulo responsivo incorreto: o campo de **complexidade** recebia visualmente o texto `Preço inicial:`.

Correções:

- grid desktop com colunas mínimas reais;
- textos podem quebrar naturalmente sem truncar palavras;
- fontes e line-height aumentados;
- a tabela vira cards antes de o conteúdo começar a apertar;
- rótulos responsivos corretos: `Complexidade`, `Valor` e `Ideal para`;
- em telas estreitas os cards passam para uma única coluna.

### Inspirações / filtros

A sidebar usava textos muito pequenos e pouco espaço para nomes longos.

Correções:

- sidebar desktop ligeiramente mais larga;
- botões de filtros maiores e com quebra natural;
- contadores não comprimem o nome da opção;
- campo de busca do filtro com fonte maior;
- toolbar e select mais legíveis;
- títulos e níveis dos cards com melhor line-height;
- nomes de cores deixam de usar ellipsis forçado;
- CTA `Ver detalhes` ganha altura e fonte mais legíveis.

### Catálogo

- filhos do grid passam a usar `min-width:0`;
- textos longos podem quebrar sem encostar na seta;
- seta recebe espaço próprio;
- descrições ganham line-height mais confortável.

## Páginas auditadas sem falha estrutural relevante

- detalhes dos seis níveis;
- detalhe de inspiração;
- orçamento;
- links;
- privacidade;
- termos.

Essas páginas continuam protegidas, mas não receberam remodelação desnecessária.

## Proteção de regressão

Novo contrato:

`scripts/public-v716-contract-check.mjs`

Ele valida:

- existência e ordem da camada V7.16;
- utilitário `.sr-only`;
- busca global de um único input;
- placeholder curto;
- grid estável do header;
- breakpoint de notebook;
- layout antitruncamento do Guia de Preços;
- rótulos responsivos corretos;
- filtros legíveis;
- proteção de paleta e cards.

O contrato foi integrado ao gate:

`scripts/merlin-commercial-ux-contract-check.mjs`

## Escopo preservado

A V7.16 não altera:

- Admin;
- Neon/schema;
- autenticação;
- DATABASE_URL;
- R2;
- regras comerciais;
- fluxo de orçamento;
- dados das inspirações;
- deploy/configuração Cloudflare da V7.15.1.
