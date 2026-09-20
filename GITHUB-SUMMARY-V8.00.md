# GitHub Summary — V8.00 Design System Foundation

## Objetivo

Iniciar a reformulação V8 criando uma camada única de autoridade visual, carregada depois dos estilos legados, sem remover funcionalidades existentes.

## Diagnóstico

O site acumulou várias gerações de CSS simultâneas (public-v710, v712, v715, v716, v717, v718, v719, v721). Isso aumentou a chance de conflitos de especificidade, especialmente em imagens, cards e cabeçalho.

## Entregue nesta etapa

- novo arquivo `app/v8-design-system.css`, importado por último;
- tokens próprios V8 para cores, superfícies, bordas, sombras, raios, foco e largura de conteúdo;
- header público unificado em marfim/off-white com contraste premium;
- rodapé grafite com acentos blush/champagne;
- botões e links com linguagem visual consistente;
- foco de teclado e acessibilidade preservados;
- regra explícita para impedir máscara preta/opaca em imagens de inspiração;
- fotos públicas sem filtro de saturação/opacidade forçado;
- cards de inspiração com superfície consistente;
- controle preventivo dos overlays antigos para que não virem placas escuras;
- assinatura de marca do header ampliada de apenas "topos" para "papelaria personalizada";
- descrição institucional e metadata ampliadas para papelaria personalizada + topos de bolo;
- theme-color alinhada ao novo marfim V8.

## Direção visual

- Marfim / off-white: superfícies e header;
- Grafite profundo: rodapé e áreas de impacto;
- Blush / rosé: interação e identidade;
- Champagne: detalhe premium;
- Fotografia permanece visível e prioritária.

## Escopo preservado

Nenhuma alteração em:
- banco Neon;
- schema;
- Admin;
- orçamento;
- autenticação;
- favoritos;
- comparador;
- R2;
- regras de produção;
- rotas existentes.

## Próximas etapas

1. limpeza e curadoria visual completa das imagens;
2. reconstrução da Home;
3. nova navegação comercial;
4. galeria e produtos criativos;
5. páginas de detalhe e fluxo "Monte seu Pedido".
