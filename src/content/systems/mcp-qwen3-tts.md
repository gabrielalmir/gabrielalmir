---
title: MCP Qwen3-TTS
kind: lab
status: experimental
category: Laboratório de síntese
summary: Onde ficam os limites entre síntese, batching e clonagem de voz?
repo: https://github.com/gabrielalmir/mcp-qwen3-tts
commit: main
license: Consultar repositório
order: 4
atlas: mcp-qwen3-tts
constraints:
  - Clonagem de voz exige uso responsável.
  - Batching altera latência e consumo.
decisions:
  - title: Contrato explícito
    body: Síntese e clonagem são capacidades distintas no limite da ferramenta.
evidence:
  - title: Implementação
    body: Síntese, batching e voice cloning no código público.
    href: https://github.com/gabrielalmir/mcp-qwen3-tts
limits:
  - Caching e operação permanecem planejados.
  - Não é apresentado como serviço de produção.
map:
  - label: Texto / voz
    kind: boundary
    note: Entradas distintas.
  - label: Batching
    kind: decision
    note: Trade-off de execução.
  - label: Caching
    kind: risk
    note: Ainda planejado.
---

Um laboratório de voz que torna explícitas as entradas, o processamento em lote e o custo do modelo.
Clonagem e síntese são capacidades separadas de propósito: tratá-las como a mesma coisa é o começo
de um uso irresponsável.
