# GitHub Summary — V7.18

## Objetivo

Aplicar um refinamento premium global ao site público da Merlin Encantos em Papel, deixando toda a experiência mais coerente com uma papelaria personalizada premium e mais conectada à logo e à identidade da marca.

## Escopo

A V7.18 atua globalmente em:

- Header;
- Home;
- Inspirações;
- Catálogo;
- Guia de níveis & preços;
- detalhes de inspiração;
- detalhes dos seis níveis;
- Monte seu Topo;
- Orçamento;
- páginas institucionais;
- Footer;
- botões, cards, filtros e formulários compartilhados.

## Identidade da marca

- novos tokens globais de cor, papel, rosa, dourado e sombras;
- superfícies com aparência mais próxima de papel fino;
- bordas, sombras e divisões com menos aparência de template;
- microdetalhes inspirados em recorte e camadas;
- logo com moldura própria no Header e Footer;
- assinatura da logo adicionada ao Hero da Home;
- Footer passa a exibir “Papelaria personalizada • feito sob encomenda”.

## Home

- logo passa a aparecer também como assinatura discreta no Hero;
- selo “feito para combinar com o seu tema e o seu bolo” é mantido;
- no desktop, o selo sai mais para fora da foto principal com `left:-62px`;
- selo ganha borda interna, sombra refinada, tipografia e proporção mais elegantes;
- em tablet/mobile o selo retorna para dentro de uma área segura para evitar overflow;
- moldura interna sutil adicionada às imagens editoriais do Hero.

## Header

- logo maior e enquadrada como peça de papelaria;
- nome da marca usa tipografia editorial;
- subtítulo recebe linguagem de marca;
- busca ganha acabamento mais fino;
- botão Buscar entra na paleta da marca;
- ações recebem hover mais discreto;
- WhatsApp mantém destaque próprio;
- navegação ativa recebe linha animada em rosa.

## Inspirações

- cards com superfície tipo papel;
- borda interna discreta;
- filtros tratados como pasta/mostruário;
- imagens com fundo mais suave;
- paleta separada por linha tracejada;
- hover mais refinado;
- CTA e badges preservados.

## Catálogo e detalhes

- cards dos níveis recebem o mesmo acabamento premium;
- páginas individuais ganham superfícies mais delicadas;
- badge do nível, notas e facts seguem a identidade da marca;
- detalhe das inspirações recebe moldura interna na imagem e blocos de personalização mais coerentes.

## Guia de níveis & preços

- mantém a correção V7.16 de legibilidade;
- cabeçalho, linhas e regras ganham acabamento visual premium;
- rótulos semânticos continuam protegidos.

## Formulários / Briefing

- fundo sutil inspirado em papel;
- blocos com borda dupla discreta;
- etapas e números ganham a cor principal da marca;
- inputs, selects e textarea passam a ter foco visual consistente;
- presets recebem estados hover/ativo mais claros.

## Páginas institucionais

- Links, Privacidade e Termos passam a compartilhar a mesma linguagem de papel e marca;
- superfícies e sombras padronizadas.

## Footer

- novo fundo escuro editorial;
- linha superior multiton;
- logo maior dentro de uma moldura clara;
- assinatura “Papelaria personalizada • feito sob encomenda”;
- contatos e links com contraste e organização refinados.

## Responsividade

A V7.18 preserva:

- desktop;
- notebook;
- tablet;
- celular;
- 390 px;
- reduced motion.

O selo do Hero tem comportamento específico por breakpoint para nunca criar overflow.

## Proteção de regressão

Novo contrato:

`scripts/public-v718-contract-check.mjs`

Protege:

- ordem da camada CSS;
- uso da logo configurável;
- assinatura da marca no Hero;
- selo mantido e afastado;
- refinamento do Header;
- cards, filtros, formulários e Footer;
- breakpoints principais.

O contrato foi integrado ao gate comercial principal.
