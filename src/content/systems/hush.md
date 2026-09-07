---
title: Hush
kind: lab
status: implemented
category: Laboratório de armazenamento
summary: O que um servidor compatível com RESP precisa tornar explícito sobre memória e concorrência?
repo: https://github.com/gabrielalmir/hush
commit: main
license: Consultar repositório
order: 1
atlas: hush
constraints:
  - Concorrência não pode corromper estado.
  - TTL e remoção precisam ter semântica previsível.
decisions:
  - title: Estado limitado
    body: LRU e TTL tornam descarte e expiração parte do comportamento.
  - title: Protocolo antes de produto
    body: RESP define a fronteira; persistência e cluster não são insinuados.
evidence:
  - title: Código público
    body: RESP, LRU, TTL, filas e concorrência implementados.
    href: https://github.com/gabrielalmir/hush
limits:
  - Sem persistência, autenticação ou clustering.
  - Laboratório, não substituto de Redis em produção.
map:
  - label: RESP
    kind: boundary
    note: Fronteira de protocolo.
  - label: Fila concorrente
    kind: decision
    note: Ordena acesso ao estado.
  - label: LRU + TTL
    kind: evidence
    note: Comportamento implementado.
  - label: Sem persistência
    kind: risk
    note: Limite conhecido.
---

Uma implementação compacta para investigar protocolo, expiração, filas e políticas de memória — o
suficiente para que descarte e concorrência deixem de ser detalhe interno e passem a ser
comportamento declarado.
