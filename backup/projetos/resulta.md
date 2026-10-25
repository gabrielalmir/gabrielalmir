# Resulta

_Laboratório de contratos · lab · implemented_

Como manter uma API total e erros explícitos sem perder ergonomia entre ESM e CJS?

- **Repositório:** https://github.com/gabrielalmir/resulta
- **Commit-fonte:** main
- **Licença:** Consultar repositório

## Contexto

Uma biblioteca pequena para investigar resultados tipados, interoperabilidade de módulos e garantias documentadas.

## Forças e restrições

- Nenhum caminho deve retornar um estado implícito.
- ESM e CJS precisam oferecer o mesmo contrato.

## Decisões

### API total

Cada operação representa sucesso e erro no tipo de retorno.

### Distribuição dupla

Os formatos de módulo compartilham garantias documentadas.

## Evidências

- **Pacote público** — API, builds ESM/CJS e documentação versionada. (https://github.com/gabrielalmir/resulta)

## Limites conhecidos

- A biblioteca explicita erros; não decide políticas de recuperação da aplicação.
- Adoção e uso em produção não são alegados.

## Mapa arquitetural

- **Entrada** (boundary) — Operação total.
- **Result** (decision) — Sucesso ou erro explícito.
- **ESM / CJS** (evidence) — Saídas com a mesma garantia.
