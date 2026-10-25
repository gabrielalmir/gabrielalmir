---
title: Pimbas
kind: dossier
status: implemented
category: Evolução arquitetural
summary: Construí uma plataforma para organizar partidas e torneios de pimbolim e migrei a aplicação de Fastify para Next.js.
repo: https://github.com/gabrielalmir/pimbas
commit: main
license: Verificar no repositório antes de reutilizar
order: 1
atlas: pimbas
constraints:
  - Preservar contratos durante a migração.
  - Isolar dados e permissões por grupo.
  - Manter as regras de partidas e torneios independentes do framework.
decisions:
  - title: Consolidar o runtime
    body: Migrei a camada HTTP para Next.js para reduzir a configuração e os serviços de deploy.
  - title: Proteger o domínio
    body: Separei as regras de partidas, ranking e torneios da camada web.
  - title: Tratar acesso como fronteira
    body: Separei autenticação, autorização e pertencimento ao grupo.
qualities:
  - attribute: Modificabilidade
    approach: Domínio separado da entrega web.
    evidence: Estrutura e testes versionados no repositório.
  - attribute: Operabilidade
    approach: Menos runtimes para configurar e observar.
    evidence: Migração Fastify → Next.js documentada como decisão.
  - attribute: Segurança
    approach: Autorização e isolamento por grupo nas bordas.
    evidence: Contratos e verificações no código.
evidence:
  - title: Código-fonte
    body: Implementação pública e histórico de migração.
    href: https://github.com/gabrielalmir/pimbas
limits:
  - O projeto não teve adoção porque faltou tempo para continuar sua manutenção.
  - A licença ainda precisa ser confirmada no repositório de origem.
  - Ainda preciso confirmar lint, tipos, testes, build e divergências de contrato no repositório.
  - A referência main é móvel. Falta concluir a auditoria e fixar o commit-fonte.
map:
  - label: Necessidade real
    kind: boundary
    note: Pessoas organizam partidas amistosas e torneios de pimbolim.
  - label: Preservar contratos
    kind: decision
    note: A migração mantém a fronteira observável.
  - label: Next.js consolidado
    kind: boundary
    note: Uma superfície operacional, domínio independente.
  - label: Testes e histórico
    kind: evidence
    note: Evidência versionada da transição.
---

Construí o Pimbas para pessoas conhecidas que jogam pimbolim e precisavam organizar partidas
amistosas e torneios. Migrei a aplicação de Fastify para Next.js, mantendo as regras de partidas,
ranking e torneios separadas da camada web.
