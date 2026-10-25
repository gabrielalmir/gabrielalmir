# Maybe

_Arquitetura para PHP legado · dossier · implemented_

Erros e ausência viram estados explícitos, adotados gradualmente nas bordas de sistemas PHP 7.4.

- **Repositório:** https://github.com/gabrielalmir/maybe
- **Commit-fonte:** main
- **Licença:** Verificar no repositório antes de reutilizar

## Contexto

Sistemas legados misturam null, false, exceções e validações. Maybe explora uma transição incremental sem exigir reescrita.

## Forças e restrições

- Compatibilidade com PHP 7.4.
- Adoção gradual em código existente.
- Concorrência por processos com fronteiras de segurança claras.

## Decisões

### Erros explícitos

Result e Option tornam falha e ausência parte do contrato.

### Adoção nas bordas

Schema e DTO entram primeiro onde dados externos atravessam o sistema.

### Async como processo

O núcleo continua síncrono; concorrência, timeout e serialização pertencem a uma fronteira própria.

## Atributos de qualidade

| Atributo | Abordagem | Evidência |
| --- | --- | --- |
| Compatibilidade | API compatível com PHP 7.4. | Restrição declarada pelo projeto. |
| Segurança | Validação antes de cruzar processos. | Schema, DTO e contratos explícitos. |
| Evolução | Schema → DTO → Result → Option → Async. | Camadas podem ser adotadas incrementalmente. |

## Evidências

- **API pública** — Tipos e exemplos versionados no repositório. (https://github.com/gabrielalmir/maybe)
- **Fronteira Async** — Serialização, timeout e isolamento são responsabilidades observáveis.

## Limites conhecidos

- Async não substitui filas duráveis nem supervisão operacional.
- A aplicação continua responsável por idempotência, recursos e recuperação.
- Licença e commit-fonte aguardam fixação após auditoria.

## Mapa arquitetural

- **null / false / throw** (risk) — Semânticas concorrentes no legado.
- **Schema + DTO** (boundary) — Dados ganham forma na borda.
- **Result + Option** (decision) — Erro e ausência entram no contrato.
- **Async isolado** (evidence) — Processos com timeout e serialização explícitos.
