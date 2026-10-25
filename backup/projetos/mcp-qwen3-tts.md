# MCP Qwen3-TTS

_Laboratório de síntese · lab · experimental_

Onde ficam os limites entre síntese, batching e clonagem de voz?

- **Repositório:** https://github.com/gabrielalmir/mcp-qwen3-tts
- **Commit-fonte:** main
- **Licença:** Consultar repositório

## Contexto

Um laboratório de voz que torna explícitas as entradas, o processamento em lote e o custo do modelo.

## Forças e restrições

- Clonagem de voz exige uso responsável.
- Batching altera latência e consumo.

## Decisões

### Contrato explícito

Síntese e clonagem são capacidades distintas no limite da ferramenta.

## Evidências

- **Implementação** — Síntese, batching e voice cloning no código público. (https://github.com/gabrielalmir/mcp-qwen3-tts)

## Limites conhecidos

- Caching e operação permanecem planejados.
- Não é apresentado como serviço de produção.

## Mapa arquitetural

- **Texto / voz** (boundary) — Entradas distintas.
- **Batching** (decision) — Trade-off de execução.
- **Caching** (risk) — Ainda planejado.
