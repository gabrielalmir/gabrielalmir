# Hush

_Laboratório de armazenamento · lab · implemented_

O que um servidor compatível com RESP precisa tornar explícito sobre memória e concorrência?

- **Repositório:** https://github.com/gabrielalmir/hush
- **Commit-fonte:** main
- **Licença:** Consultar repositório

## Contexto

Uma implementação compacta para investigar protocolo, expiração, filas e políticas de memória.

## Forças e restrições

- Concorrência não pode corromper estado.
- TTL e remoção precisam ter semântica previsível.

## Decisões

### Estado limitado

LRU e TTL tornam descarte e expiração parte do comportamento.

### Protocolo antes de produto

RESP define a fronteira; persistência e cluster não são insinuados.

## Evidências

- **Código público** — RESP, LRU, TTL, filas e concorrência implementados. (https://github.com/gabrielalmir/hush)

## Limites conhecidos

- Sem persistência, autenticação ou clustering.
- Laboratório, não substituto de Redis em produção.

## Mapa arquitetural

- **RESP** (boundary) — Fronteira de protocolo.
- **Fila concorrente** (decision) — Ordena acesso ao estado.
- **LRU + TTL** (evidence) — Comportamento implementado.
- **Sem persistência** (risk) — Limite conhecido.
