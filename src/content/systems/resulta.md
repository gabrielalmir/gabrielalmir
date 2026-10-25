---
title: Resulta
kind: lab
status: implemented
category: Laboratório de contratos
summary: Criei uma biblioteca de resultados tipados com sucesso e erro explícitos, distribuída em ESM e CJS.
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
    body: Distribuí o mesmo contrato nos formatos ESM e CJS.
evidence:
  - title: Pacote público
    body: API, builds ESM/CJS e documentação versionada.
    href: https://github.com/gabrielalmir/resulta
limits:
  - A biblioteca explicita erros; não decide políticas de recuperação da aplicação.
  - Não tenho adoção ou uso em produção documentados.
  - Ainda preciso confirmar a licença. A referência main é móvel e não fixa uma versão do código.
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

Criei o Resulta para estudar resultados tipados e a distribuição de uma biblioteca em ESM e CJS.
Cada operação representa sucesso ou erro no retorno. Os dois formatos de módulo expõem o mesmo
contrato.
