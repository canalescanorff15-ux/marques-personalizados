# GitHub Summary — V6.87

## Objetivo
Elevar a qualidade visual do catálogo de inspirações, que ainda usava iniciais e geometria abstrata apesar do restante do catálogo já ter linguagem premium.

## Implementado
- `InspirationArtwork.tsx`: composição vetorial determinística e copyright-safe baseada nos dados já existentes de cada inspiração;
- oito arquétipos visuais reutilizáveis para temas, peças e ocasiões;
- integração nos cards da Home e do catálogo de inspirações;
- CSS próprio da V6.87, com contraste por paleta e comportamento responsivo;
- remoção do monograma como arte principal;
- contrato de inspiração ampliado para proteger a nova camada visual.

## Performance e acessibilidade
A arte é SVG inline, sem download externo, sem raster pesado e sem novo estado/hook. O SVG é decorativo (`aria-hidden`) e o conteúdo textual continua sendo a fonte semântica do card.

## Preservado
Sem mudanças em Neon, schema, CRM, pedidos, orçamento, preços, autenticação, MFA, sessões, R2, backups, restores ou service worker.

## Gate
Integrar somente após CI completa e Deploy Preview do Netlify em verde. A nota Best Practices do Deploy Preview deve ser interpretada com a interferência já diagnosticada do Netlify Drawer; produção deve ser validada separadamente.
