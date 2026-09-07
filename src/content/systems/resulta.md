---
title: Resulta
kind: lab
status: implemented
category: Laboratório de contratos
summary: Como manter uma API total e erros explícitos sem perder ergonomia entre ESM e CJS?
repo: https://github.com/gabrielalmir/resulta
commit: main
license: Consultar repositório
order: 2
constraints:
  - Nenhum caminho deve retornar um estado implícito.
  - ESM e CJS precisam oferecer o mesmo contrato.
decisions:
  - title: API total
    body: Cada operação representa sucesso e erro no tipo de retorno.
  - title: Distribuição dupla
    body: Os formatos de módulo compartilham garantias documentadas.
evidence:
  - title: Pacote público
    body: API, builds ESM/CJS e documentação versionada.
    href: https://github.com/gabrielalmir/resulta
limits:
  - A biblioteca explicita erros; não decide políticas de recuperação da aplicação.
  - Adoção e uso em produção não são alegados.
map:
  - label: Entrada
    kind: boundary
    note: Operação total.
  - label: Result
    kind: decision
    note: Sucesso ou erro explícito.
  - label: ESM / CJS
    kind: evidence
    note: Saídas com a mesma garantia.
---

Uma biblioteca pequena para investigar resultados tipados, interoperabilidade de módulos e garantias
documentadas. O interesse não é o tipo `Result` em si, e sim manter a mesma promessa nos dois
formatos de módulo.
