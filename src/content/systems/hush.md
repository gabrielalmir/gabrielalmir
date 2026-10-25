---
title: Hush
kind: lab
status: implemented
category: Laboratório de armazenamento
summary: Implementei um servidor em memória com protocolo RESP, filas concorrentes, descarte LRU e expiração por TTL.
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
  - title: Protocolo RESP
    body: Usei RESP para receber comandos e uma fila concorrente para acessar o estado em memória.
evidence:
  - title: Código público
    body: RESP, LRU, TTL, filas e concorrência implementados.
    href: https://github.com/gabrielalmir/hush
limits:
  - Sem persistência, autenticação ou clustering.
  - Não validei o laboratório como substituto de Redis em produção.
  - Ainda preciso confirmar a licença. A referência main é móvel e não fixa uma versão do código.
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

Implementei o Hush para estudar protocolo RESP e armazenamento em memória. O servidor usa uma fila
concorrente para acessar o estado e combina LRU e TTL para descarte e expiração de dados.
