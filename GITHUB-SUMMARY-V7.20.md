# GitHub Summary — V7.20

## Objetivo

Começar a substituir as inspirações do site por **topos premium inseridos em cenários completos de festa**, mantendo o topo como protagonista e elevando a percepção comercial da marca.

## Cenas premium integradas

- INSP-TOP-13 — Jardim das Abelhinhas / Manuela
- INSP-TOP-14 — Dino Aventura / Theo
- INSP-TOP-16 — Casamento Floral Dourado / Rosana e Augusto
- INSP-TOP-17 — Bailarina 15 Anos / Helena

As quatro imagens foram mantidas em resolução original e hospedadas no asset host já utilizado pelo projeto:

`https://merlin-topper-assets.floot.app`

## Resultado visual esperado

As novas imagens mostram:
- bolo montado;
- topo como elemento central;
- cenário completo e coerente com o tema;
- iluminação de fotografia comercial;
- mesa e decoração de festa;
- acabamento mais premium e realista.

## Onde aparecem

Como os códigos 13, 14, 16 e 17 já fazem parte da seleção editorial da Home, as novas imagens passam a alimentar automaticamente:
- Hero quando a inspiração é reutilizada;
- seção 02 Inspirações;
- galeria pública;
- página individual da inspiração;
- fluxos que reutilizam `topperInspirations`.

## Proteção de regressão

Novo contrato:
`scripts/public-v720-party-scenes-contract-check.mjs`

Ele protege:
- os quatro códigos e seus novos assets;
- o host oficial de imagens;
- a ordem dos destaques premium da Home;
- INSP-TOP-15, que permanece inalterado até receber uma cena aprovada.

## Escopo preservado

Sem alterações em banco, schema, Admin, preços ou lógica comercial.
