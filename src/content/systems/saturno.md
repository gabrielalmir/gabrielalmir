---
title: Saturno
kind: dossier
status: implemented
category: Arquitetura de produto
summary: Estudo gestão de trabalho em um monólito Laravel e Inertia, com organizações, autorização e o módulo WorkManagement.
repo: https://github.com/gabrielalmir/saturno
commit: main
license: Verificar no repositório antes de reutilizar
order: 2
atlas: saturno
constraints:
  - Multi-organização e autorização coerentes.
  - Evoluir um produto sem complexidade distribuída prematura.
decisions:
  - title: Monólito moderno
    body: Escolhi Laravel e Inertia para manter a aplicação em uma unidade de deploy.
  - title: DDD seletivo
    body: Separei a gestão de trabalho no módulo WorkManagement.
  - title: Isolamento organizacional
    body: Organizei o acesso por organização e a autorização em cada caso de uso.
qualities:
  - attribute: Segurança
    approach: Escopo organizacional e autorização por caso de uso.
    evidence: Organização e autorização representadas no código; verificação pendente.
  - attribute: Modificabilidade
    approach: WorkManagement como módulo explícito.
    evidence: Estrutura versionada no repositório.
  - attribute: Operabilidade
    approach: Uma unidade de deploy.
    evidence: Arquitetura monolítica atual.
evidence:
  - title: Repositório
    body: Código Laravel/Inertia e organização modular.
    href: https://github.com/gabrielalmir/saturno
limits:
  - Não tenho adoção, escala ou uso em produção documentados.
  - Filas, auditoria, portabilidade e isolamento por organização ainda precisam de verificação.
  - Ainda preciso verificar a licença e concluir a auditoria. A referência main é móvel; falta fixar o commit-fonte.
map:
  - label: Usuários e equipes
    kind: boundary
    note: Atores dentro de organizações.
  - label: Autorização
    kind: decision
    note: Decisão aplicada a cada caso de uso.
  - label: WorkManagement
    kind: boundary
    note: Fronteira modular no monólito.
  - label: Código versionado
    kind: evidence
    note: Capacidades verificáveis no repositório.
---

Uso o Saturno para estudar gestão de trabalho com usuários e equipes organizados por empresa.
Escolhi Laravel e Inertia e separei o módulo WorkManagement dentro do monólito.

O projeto reúne organização, autorização e gestão do trabalho em uma unidade de deploy.
