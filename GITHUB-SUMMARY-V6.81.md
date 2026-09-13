# GitHub Summary — V6.81

## Release
**V6.81 — Image Performance & CSS Scope**

## Base
`main` em `207d67bb1599470c0ea27fcc33e26b91f560ee81`.

## Escopo concluído
- camada pública `SafeImage` migrada de `<img>` simples para `next/image`;
- fallback de imagem preservado;
- AVIF/WebP e `srcset` passam a ser aproveitados pelas imagens dinâmicas do catálogo;
- `sizes` responsivos aplicados em galeria, busca e vistos recentemente;
- logo do header unificada com a camada resiliente de imagem;
- CSS antigo exclusivo da Home removido do layout raiz;
- `shell-v681.css` criado para manter apenas estilos realmente compartilhados;
- Home passa a importar `home-v672.css`, `home-v673.css` e `home-v680.css` somente na própria rota.

## Arquivos alterados
- `app/layout.tsx`
- `app/page.tsx`
- `app/shell-v681.css`
- `components/SafeImage.tsx`
- `components/Header.tsx`
- `components/ProductGallery.tsx`
- `components/GlobalSearch.tsx`
- `components/RecentlyViewed.tsx`
- `V6.81-CHANGELOG.md`
- `GITHUB-SUMMARY-V6.81.md`

## Impacto esperado
Menor transferência de imagens, melhor seleção de resolução por viewport e menos CSS da Home entregue a páginas internas. O comportamento comercial e os contratos de backend permanecem inalterados.

## Infraestrutura preservada
Neon, schema 27, APIs, CRM, inquiries, autenticação, MFA, sessões revogáveis, Cloudflare R2, backups e disaster recovery não foram alterados.

## Validação
Preencher após o CI e o deploy de produção.
