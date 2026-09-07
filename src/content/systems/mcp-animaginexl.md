---
title: MCP AnimagineXL
kind: lab
status: experimental
category: Laboratório de modelos
summary: Como expor geração de imagem por MCP e REST sem esconder a fronteira de GPU?
repo: https://github.com/gabrielalmir/mcp-animaginexl
commit: main
license: Consultar repositório
order: 3
atlas: mcp-animaginexl
constraints:
  - Modelos grandes e GPU são dependências operacionais.
  - MCP e REST precisam descrever a mesma capacidade.
decisions:
  - title: Duas fronteiras
    body: MCP atende agentes; REST mantém uma integração convencional.
evidence:
  - title: Implementação
    body: Servidor, endpoints e Docker no repositório.
    href: https://github.com/gabrielalmir/mcp-animaginexl
limits:
  - Laboratório, não produto ou serviço de produção.
  - Capacidade e latência dependem de modelo e hardware.
map:
  - label: MCP / REST
    kind: boundary
    note: Contratos de entrada.
  - label: Modelo + GPU
    kind: risk
    note: Dependência operacional explícita.
  - label: Imagem
    kind: evidence
    note: Saída implementada.
---

Uma exploração de contratos de ferramenta sobre modelos locais, empacotamento e recursos de GPU. A
pergunta prática é onde a dependência de hardware aparece: no contrato, ou só quando o serviço falha.
