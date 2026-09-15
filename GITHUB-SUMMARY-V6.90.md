# GitHub Summary — V6.90

## Objetivo
Trocar a aparência genérica/vetorial das inspirações por imagens fotográficas reais, coerentes com o tipo de item que o cliente está escolhendo.

## Implementado
- adicionada biblioteca local com 6 fotografias reais em WebP;
- `InspirationArtwork` deixou de desenhar SVG e passa a selecionar a fotografia mais adequada por grupo, título, ocasião, estilo e tags;
- catálogo, ficha, comparador, curadoria e Monte seu Kit herdam automaticamente a nova apresentação;
- fotos usam `object-fit: cover`, foco por família e zoom discreto no hover;
- fallback determinístico cobre as 128 inspirações sem card vazio;
- contrato automatizado exige os 6 assets e bloqueia retorno a SVG/monogramas como arte principal.

## Preservado
Sem mudanças em banco/schema, CRM, preços, autenticação, MFA, sessões, backups, service worker ou contrato de pedidos.

## Próxima expansão
A arquitetura aceita novas fotografias por família. À medida que novas referências forem aprovadas, elas podem ser adicionadas sem reescrever catálogo, comparação ou Kit Builder.
