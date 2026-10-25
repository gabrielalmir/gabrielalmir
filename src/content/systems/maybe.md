---
title: Maybe
kind: dossier
status: implemented
category: Arquitetura para PHP legado
summary: Desenvolvo tipos Result e Option, Schema e DTO para tratar erros, ausência e dados externos em sistemas PHP 7.4.
repo: https://github.com/gabrielalmir/maybe
commit: main
license: Verificar no repositório antes de reutilizar
order: 3
atlas: maybe
constraints:
  - Compatibilidade com PHP 7.4.
  - Adoção gradual em código existente.
  - Concorrência por processos com fronteiras de segurança claras.
decisions:
  - title: Erros explícitos
    body: Usei Result para representar sucesso ou erro e Option para representar presença ou ausência.
  - title: Adoção nas bordas
    body: Organizei Schema e DTO para validar dados externos e permitir adoção gradual.
  - title: Async como processo
    body: O núcleo continua síncrono; concorrência, timeout e serialização pertencem a uma fronteira própria.
qualities:
  - attribute: Compatibilidade
    approach: API compatível com PHP 7.4.
    evidence: Restrição declarada pelo projeto.
  - attribute: Segurança
    approach: Validação antes de cruzar processos.
    evidence: Schema, DTO e contratos explícitos.
  - attribute: Evolução
    approach: Schema → DTO → Result → Option → Async.
    evidence: Camadas podem ser adotadas incrementalmente.
evidence:
  - title: API pública
    body: Tipos e exemplos versionados no repositório.
    href: https://github.com/gabrielalmir/maybe
  - title: Fronteira Async
    body: Serialização, timeout e isolamento são responsabilidades observáveis.
limits:
  - Async não substitui filas duráveis nem supervisão operacional.
  - A aplicação continua responsável por idempotência, recursos e recuperação.
  - Ainda preciso verificar a licença e concluir a auditoria. A referência main é móvel; falta fixar o commit-fonte.
map:
  - label: null / false / throw
    kind: risk
    note: Semânticas concorrentes no legado.
  - label: Schema + DTO
    kind: boundary
    note: Dados ganham forma na borda.
  - label: Result + Option
    kind: decision
    note: Erro e ausência entram no contrato.
  - label: Async isolado
    kind: evidence
    note: Processos com timeout e serialização explícitos.
---

Desenvolvo o Maybe para tratar erros, ausência e validação em sistemas PHP 7.4. Usei Result e Option
para representar estados que costumam aparecer como `null`, `false` ou exceções.

Organizei Schema e DTO para a entrada de dados externos. As camadas podem ser adotadas aos poucos,
sem exigir a reescrita da aplicação.
