# GitHub Summary — V7.22

## Objetivo

Adicionar ao site o novo arquivo enviado com inspirações de topos de bolo, preservando a galeria premium V7.21 e evitando carregar os PNGs originais pesados no navegador.

## Lote recebido

- 68 PNGs analisados;
- todos em alta resolução, entre 1024 e 1536 px;
- nenhuma duplicata exata por conteúdo;
- aproximadamente 162 MB no material original.

## Curadoria

Foram selecionadas 56 imagens adequadas para a galeria pública.

Foram excluídas 12 peças que funcionam melhor como catálogo, colagem, kit ou arte de produção, evitando transformar a página de inspirações em uma mistura de referências e materiais internos.

## Otimização

As 56 imagens selecionadas foram convertidas para WebP:
- resolução original preservada;
- lote final aproximado de 13,8 MB;
- uma imagem exclusiva para cada nova inspiração;
- hospedagem no host oficial `merlin-topper-assets.floot.app`.

## Catálogo

Novos códigos:
- `INSP-TOP-18` até `INSP-TOP-73`;
- total público passa de 17 para 73 inspirações;
- busca, categorias, favoritos, filtros, paginação e detalhe continuam reutilizando a fonte única `topperInspirations`.

Categorias mantidas enxutas para não poluir os chips da V7.21:
- Infantil menino / unissex;
- Infantil delicado;
- Feminino elegante;
- Masculino adulto;
- Comemorativo;
- Religioso;
- Casamento & bodas;
- Chá de bebê & revelação.

## Proteção

Novo contrato:
`scripts/public-v722-inspiration-batch-contract-check.mjs`

Ele valida:
- exatamente 56 itens no novo lote;
- sequência INSP-TOP-18..73;
- códigos únicos;
- imagens exclusivas;
- host oficial;
- WebP obrigatório;
- integração do lote na fonte principal.

O contrato foi integrado ao gate comercial principal.

## Escopo preservado

Sem mudanças em:
- banco;
- schema;
- Admin;
- autenticação;
- preços;
- lógica de orçamento;
- layout premium V7.21.
