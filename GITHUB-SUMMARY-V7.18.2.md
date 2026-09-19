# GitHub Summary — V7.18.2

## Motivo

Correção visual identificada na Home, seção escura de inspirações.

O card **Formatura Preto & Dourado** estava exibindo texto alternativo em vez da imagem porque o SVG continha caracteres `&` não escapados, tornando o XML inválido.

A varredura encontrou o mesmo defeito oculto em mais dois SVGs:
- Nuvens & Estrelinhas
- Preto & Dourado Masculino
- Formatura Preto & Dourado

## Correções

- todos os `&` inválidos desses SVGs foram convertidos para `&amp;`;
- a imagem Formatura Preto & Dourado volta a ser interpretada como SVG válido pelo navegador;
- a Home deixa de destacar o **Floral Rosé** simplificado e passa a usar **Ursinho Aviador**, mantendo uma vitrine com padrão fotográfico mais consistente;
- o Floral Rosé continua disponível normalmente na galeria completa.

## Prevenção de regressão

Novo contrato:

`scripts/public-v7182-asset-integrity-check.mjs`

Ele verifica:
- todos os SVGs em `public/topper-inspirations`;
- ampersands XML inválidos;
- presença das tags `<svg>` e `</svg>`;
- composição premium da lista de destaques da Home.

O contrato foi integrado ao gate comercial principal.

## Escopo preservado

Sem alterações em:
- banco;
- schema;
- Admin;
- autenticação;
- lógica comercial;
- preços;
- textos de briefing;
- Cloudflare bindings.
