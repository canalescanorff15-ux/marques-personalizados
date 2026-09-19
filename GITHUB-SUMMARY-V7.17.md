# GitHub Summary — V7.17

## Objetivo

Remodelar a página inicial para deixar de parecer apenas um catálogo organizado e passar a funcionar como uma vitrine editorial de ateliê: mais visual, mais autoral, mais sofisticada e com maior presença das inspirações.

## Direção visual

A Home V7.17 preserva a identidade pública já aprovada e adiciona:

- composição editorial;
- mais contraste entre seções;
- uso de inspirações reais já cadastradas no projeto;
- hierarquia tipográfica mais forte;
- menos repetição de CTAs;
- progressão visual entre os níveis;
- detalhes gráficos próprios para acabamento;
- ritmo de página mais próximo de uma marca artesanal premium.

## Hero

O antigo hero baseado em texto + logo foi substituído por:

- nova mensagem focada diretamente em topos de bolo;
- dois CTAs principais: inspirações e briefing;
- WhatsApp como contato secundário;
- três provas rápidas sobre acabamento, personalização e orçamento;
- colagem editorial com três inspirações reais do catálogo;
- selo discreto de produção personalizada.

## Níveis

Os seis níveis deixam de parecer uma fileira compacta de cards e passam a usar:

- grid editorial 3x2 no desktop;
- imagem oficial do nível;
- progressão numerada;
- complexidade em chip próprio;
- descrição com melhor medida de leitura;
- destaque especial para Elite Shaker + Acetato;
- CTA “Explorar este nível”.

## Inspirações

Nova seção visual escura com uma composição assimétrica usando:

- Jardim das Abelhinhas;
- Casamento Floral Dourado;
- Bailarina 15 Anos;
- Dino Aventura;
- Formatura Preto & Dourado;
- Floral Rosé.

A seção também apresenta atalhos pelos principais grupos de tema.

## Como pedir

O processo passa a usar três cards visuais:

1. Encontre sua inspiração;
2. Escolha o acabamento;
3. Conte como quer o seu topo.

Cada etapa tem iconografia, texto curto e CTA próprio.

## Acabamento

A antiga grade de texto recebe quatro ilustrações gráficas desenvolvidas em CSS para explicar visualmente:

- recorte;
- camadas;
- shaker;
- acetato.

Nenhuma imagem fictícia de produto foi adicionada.

## Sobre a Merlin

A seção deixa de explicar apenas “como o site funciona” e passa a comunicar a lógica do trabalho:

- feito sob encomenda;
- adaptável;
- pensado para produção real.

Sem números, prazos ou promessas inventadas.

## FAQ

Ampliação de 4 para 6 questões, incluindo:

- envio de referências;
- diferença entre inspiração e resultado final;
- personalização;
- níveis;
- shaker/acetato;
- orçamento.

## Contato e fechamento

O final da página passa a usar um bloco escuro editorial com:

- briefing como CTA principal;
- acesso ao pedido;
- WhatsApp como atendimento direto;
- assinatura visual “Inspirar • Personalizar • Encantar”.

## Responsividade

A V7.17 possui tratamentos dedicados para:

- desktop;
- notebook;
- tablet;
- celular;
- celular estreito;
- reduced motion.

## Proteção de regressão

Novo contrato:

`scripts/public-v717-contract-check.mjs`

Valida hero, inspirações reais, níveis, processo, acabamento, sobre, FAQ, contato, importação CSS e breakpoints.

O contrato foi integrado ao gate comercial principal.
