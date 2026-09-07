---
title: Pimbas
kind: dossier
status: implemented
category: Evolução arquitetural
summary: Partidas amistosas e torneios de pimbolim viram um domínio claro enquanto a arquitetura reduz runtimes e preserva contratos.
repo: https://github.com/gabrielalmir/pimbas
commit: main
license: Verificar no repositório antes de reutilizar
order: 1
atlas: pimbas
constraints:
  - Preservar contratos durante a migração.
  - Isolar dados e permissões por grupo.
  - Reduzir drift sem acoplar o domínio ao framework.
decisions:
  - title: Consolidar o runtime
    body: Mover a fronteira HTTP para Next.js reduz superfícies de deploy e configuração.
  - title: Proteger o domínio
    body: Partidas, ranking e torneios permanecem organizados como regras independentes da entrega.
  - title: Tratar acesso como fronteira
    body: Autenticação, autorização e pertencimento ao grupo são decisões separadas.
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
  - title: Estado de verificação
    body: Lint, tipos, testes, build, licença e divergências de contrato devem ser confirmados no repositório antes de promover este caso a verificado.
limits:
  - O projeto não teve adoção porque faltou tempo para continuar sua manutenção.
  - A licença ainda precisa ser confirmada no repositório de origem.
  - O commit-fonte será fixado após a auditoria pré-publicação.
  - Dívidas e decisões reversíveis permanecem explícitas, não resolvidas por narrativa.
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

Construí o Pimbas a partir das necessidades reais de pessoas conhecidas que jogam pimbolim e
precisavam organizar partidas amistosas e torneios. O projeto não chegou a ser adotado porque eu
deixei de ter tempo para mantê-lo. A plataforma registra uma evolução arquitetural de Fastify para
Next.js, sem transformar intenção em resultado de uso.
