# MCP AnimagineXL

_Laboratório de modelos · lab · experimental_

Como expor geração de imagem por MCP e REST sem esconder a fronteira de GPU?

- **Repositório:** https://github.com/gabrielalmir/mcp-animaginexl
- **Commit-fonte:** main
- **Licença:** Consultar repositório

## Contexto

Uma exploração de contratos de ferramenta sobre modelos locais, empacotamento e recursos de GPU.

## Forças e restrições

- Modelos grandes e GPU são dependências operacionais.
- MCP e REST precisam descrever a mesma capacidade.

## Decisões

### Duas fronteiras

MCP atende agentes; REST mantém uma integração convencional.

## Evidências

- **Implementação** — Servidor, endpoints e Docker no repositório. (https://github.com/gabrielalmir/mcp-animaginexl)

## Limites conhecidos

- Laboratório, não produto ou serviço de produção.
- Capacidade e latência dependem de modelo e hardware.

## Mapa arquitetural

- **MCP / REST** (boundary) — Contratos de entrada.
- **Modelo + GPU** (risk) — Dependência operacional explícita.
- **Imagem** (evidence) — Saída implementada.
