# GitHub Summary — V8.02 Home Premium

## Objetivo

Reconstruir a proposta comercial da Home para que a Merlin Encantos em Papel deixe de parecer um site exclusivamente de níveis de topo e passe a funcionar como uma vitrine premium de papelaria personalizada.

## Posicionamento

Topos de bolo continuam como produto principal, mas a Home agora apresenta também:
- Caixinhas;
- Lembrancinhas;
- Adesivos & Chaveiros;
- Doces & Complementos;
- Kits personalizados.

## Hero

- nova headline centrada em identidade e personalização;
- texto amplia a marca para papelaria personalizada;
- CTA principal leva às inspirações;
- CTA secundário leva ao orçamento;
- metadados do hero destacam produção sob encomenda, personalização e confirmação prévia do orçamento.

## Nova seção “O que criamos”

Criada a seção `v8-home-products` com seis caminhos comerciais. A composição usa cards premium sem imagens provisórias, evitando inserir fotos inadequadas enquanto o novo acervo de Produtos Criativos ainda está sendo preparado.

## Hierarquia

- produtos passam a aparecer antes dos níveis de acabamento;
- níveis continuam disponíveis, mas como escolha específica para quem deseja Topo de Bolo;
- inspirações passam a ser a terceira etapa editorial;
- processo e acabamento foram renumerados e reposicionados.

## Clareza comercial

FAQ ampliado para esclarecer:
- bolo e decoração da foto não estão incluídos;
- a marca trabalha também com outros personalizados;
- cenário, doces, painel, balões e mesa só entram quando forem contratados separadamente.

## CTA final

A Home termina convidando o cliente a pedir orçamento de topo ou outro personalizado, em vez de limitar o fluxo a “Montar meu Topo”.

## Design

Novo arquivo `app/v8-home.css`:
- cards premium em marfim/off-white;
- card principal de Topos em grafite;
- rosé e champagne como acentos;
- grid 3/2/1 colunas;
- responsividade e reduced-motion;
- sem overlays sobre fotografias.

## Proteção automática

Criado `scripts/v8-home-premium-contract-check.mjs`, integrado ao gate comercial existente. O contrato valida:
- seis grupos de produtos;
- novo hero;
- rotas de orçamento;
- CSS V8.02 carregado depois da política de imagens;
- ausência de shades e selo editorial legado;
- dois CTAs principais no hero.

## Escopo preservado

Sem mudanças em banco, schema, Admin, autenticação, favoritos, R2 ou fluxo de produção.

## Próxima etapa

V8.03 — nova navegação comercial e reorganização estrutural das páginas públicas.
