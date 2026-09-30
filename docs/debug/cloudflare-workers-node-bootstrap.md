# Cloudflare Workers Builds — regressão de bootstrap Node

## Evidência

- O Workers Builds já falhou anteriormente na etapa de instalação de ferramentas/dependências ao tentar instalar Node 22.23.2.
- A correção V7.14 (`27368b11dc495cdf7cc7260083db13c1a60e80ef`) mudou `.nvmrc` de uma versão exata para `22`, preservando `22.23.2` como versão reproduzível no contrato de plataforma, CI e Docker.
- A V8.21 (`db2135656a309b7d28643d457a2e25d19ebcbd3b`) reintroduziu acidentalmente `22.23.2` em `.nvmrc`, fora do escopo visual daquela release.
- O build interno de compatibilidade continua verde porque o GitHub Actions consegue instalar a versão exata; isso não reproduz o bootstrap específico do Workers Builds.

## Invariante

`.nvmrc` deve selecionar somente a linha major do Node usada pelo Workers Builds (`22`). A versão exata continua centralizada em `platform-contract.json` e validada pelos demais ambientes reproduzíveis.
