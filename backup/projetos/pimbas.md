# Pimbas

_Evolução arquitetural · dossier · implemented_

Partidas amistosas e torneios de pimbolim viram um domínio claro enquanto a arquitetura reduz runtimes e preserva contratos.

- **Repositório:** https://github.com/gabrielalmir/pimbas
- **Commit-fonte:** main
- **Licença:** Verificar no repositório antes de reutilizar

## Contexto

Construí o Pimbas a partir das necessidades reais de pessoas conhecidas que jogam pimbolim e precisavam organizar partidas amistosas e torneios. O projeto não chegou a ser adotado porque eu deixei de ter tempo para mantê-lo. A plataforma registra uma evolução arquitetural de Fastify para Next.js, sem transformar intenção em resultado de uso.

## Forças e restrições

- Preservar contratos durante a migração.
- Isolar dados e permissões por grupo.
- Reduzir drift sem acoplar o domínio ao framework.

## Decisões

### Consolidar o runtime

Mover a fronteira HTTP para Next.js reduz superfícies de deploy e configuração.

### Proteger o domínio

Partidas, ranking e torneios permanecem organizados como regras independentes da entrega.

### Tratar acesso como fronteira

Autenticação, autorização e pertencimento ao grupo são decisões separadas.

## Atributos de qualidade

| Atributo | Abordagem | Evidência |
| --- | --- | --- |
| Modificabilidade | Domínio separado da entrega web. | Estrutura e testes versionados no repositório. |
| Operabilidade | Menos runtimes para configurar e observar. | Migração Fastify → Next.js documentada como decisão. |
| Segurança | Autorização e isolamento por grupo nas bordas. | Contratos e verificações no código. |

## Evidências

- **Código-fonte** — Implementação pública e histórico de migração. (https://github.com/gabrielalmir/pimbas)
- **Estado de verificação** — Lint, tipos, testes, build, licença e divergências de contrato devem ser confirmados no repositório antes de promover este caso a verificado.

## Limites conhecidos

- O projeto não teve adoção porque faltou tempo para continuar sua manutenção.
- A licença ainda precisa ser confirmada no repositório de origem.
- O commit-fonte será fixado após a auditoria pré-publicação.
- Dívidas e decisões reversíveis permanecem explícitas, não resolvidas por narrativa.

## Mapa arquitetural

- **Necessidade real** (boundary) — Pessoas organizam partidas amistosas e torneios de pimbolim.
- **Preservar contratos** (decision) — A migração mantém a fronteira observável.
- **Next.js consolidado** (boundary) — Uma superfície operacional, domínio independente.
- **Testes e histórico** (evidence) — Evidência versionada da transição.

## Cartão no atlas

- Uma ferramenta para organizar partidas amistosas e torneios de pimbolim.
- Contexto: Nasceu de uma necessidade real de pessoas próximas que jogam pimbolim.
- Decisão: Consolidar Fastify e Next.js em uma única aplicação.
- Evidência: Domínio de partidas, ranking e torneios implementado publicamente.
- Limite: Não teve adoção porque faltou tempo para manutenção.
