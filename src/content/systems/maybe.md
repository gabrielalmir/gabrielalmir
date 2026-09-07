---
title: Maybe
kind: dossier
status: implemented
category: Arquitetura para PHP legado
summary: Erros e ausência viram estados explícitos, adotados gradualmente nas bordas de sistemas PHP 7.4.
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
    body: Result e Option tornam falha e ausência parte do contrato.
  - title: Adoção nas bordas
    body: Schema e DTO entram primeiro onde dados externos atravessam o sistema.
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
  - Licença e commit-fonte aguardam fixação após auditoria.
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

Sistemas legados misturam `null`, `false`, exceções e validações no mesmo fluxo. Maybe explora uma
transição incremental que não exige reescrita: cada camada pode entrar sozinha, começando pela borda
onde dados externos atravessam o sistema.
