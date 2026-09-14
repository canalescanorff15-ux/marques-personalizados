# GitHub Summary — V6.88

## Objetivo
Completar a linguagem visual introduzida na V6.87, eliminando os últimos placeholders de iniciais/monogramas nas superfícies públicas que trabalham com inspirações.

## Implementado
- ficha individual usa `InspirationArtwork` com a mesma cena do card correspondente;
- comparador usa as cenas vetoriais em todas as referências selecionadas;
- fallback do “Monte sua Festa” usa a mesma arte conceitual;
- CSS do sistema visual ganhou ajustes específicos de escala e hierarquia para ficha, comparador e curadoria;
- contrato de inspiração agora protege catálogo, ficha, comparador e concierge contra regressão aos placeholders antigos.

## Performance e acessibilidade
Nenhum asset externo novo e nenhum novo estado/hook. As cenas continuam SVG inline e `aria-hidden`; o conteúdo semântico permanece em texto real.

## Preservado
Sem mudanças em banco, schema, CRM, pedidos, orçamento, preços, autenticação, MFA, sessões, storage, backups ou service worker.

## Gate
Integrar somente após CI completa e Deploy Preview em verde. O score Best Practices do Deploy Preview pode continuar inferior ao da produção por interferência já diagnosticada do tooling do próprio Netlify.
