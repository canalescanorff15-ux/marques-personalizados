## Merlin — Encantos em Papel V6.60.1

### Summary
Hotfix de CI sobre a V6.60, corrigindo os dois erros encontrados nos logs do GitHub Actions sem remover nenhuma funcionalidade do catálogo, fichas de inspiração, Orçamento Express ou comparador.

### Principais correções
- Corrigido o guard de acessibilidade para suportar variações do módulo TypeScript sem depender rigidamente de `ScriptTarget.Latest` e `ScriptKind.TSX`.
- Corrigido o contrato do Monte seu Kit para validar caminhos realmente renderizados pela Home, incluindo Header, dock móvel e showcase, eliminando falso negativo por busca textual rígida.
- CI agora executa explicitamente todos os contratos Merlin adicionados após a V6.54.
- Dependabot foi endurecido para não abrir automaticamente upgrades **major** de `typescript`, `zod` e `@types/node`; essas migrações passam a exigir atualização dedicada e validação completa.

### Validação
- 54/54 contratos/checks estruturais aprovados no pacote completo.
- A11y reproduzido com módulo TypeScript sem `ScriptTarget`/`ScriptKind`: aprovado.
- Kit Builder Contract: aprovado.
- Branding, jornada comercial, filtros, fichas, Orçamento Express e comparador: aprovados.
- Schema preservado: 27.
- `package-lock.json` não é substituído por este patch.

### Compatibilidade
- Base funcional: V6.60 cumulativa.
- Contém as melhorias Merlin V6.51 → V6.60 + hotfix V6.60.1.
- Sem migração de banco nesta rodada.

### Status
Hotfix pronto para substituir a V6.60 no próximo commit. PRs antigos do Dependabot podem continuar vermelhos porque foram calculados sobre snapshots anteriores; não use esses PRs como validação da nova versão sem recriá-los/rebaseá-los após o hotfix.
