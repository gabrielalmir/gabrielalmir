---
title: MCP AnimagineXL
kind: lab
status: experimental
category: IA aplicada e ferramentas MCP
summary: Integro agentes à geração local de imagens com Animagine XL 4.0, checkpoints e LoRAs por ferramentas MCP.
repo: https://github.com/gabrielalmir/anime-diffusion-mcp
commit: 7ffbf7f1834a3b7d8288b4c74752c311fdbd7e39
license: MIT (código); consultar licenças dos modelos
order: 3
constraints:
  - Os prompts seguem as convenções de tags do Animagine XL.
  - Checkpoints e LoRAs são carregados de arquivos locais.
decisions:
  - title: Preparação do prompt
    body: optimize_prompt organiza as tags e validate_prompt verifica regras, consistência e riscos de resolução antes da geração.
  - title: Ferramentas MCP
    body: FastMCP expõe optimize_prompt, validate_prompt, list_models e generate_image. A integração documentada usa um processo MCP com entrada padrão, inclusive no Docker.
  - title: Imagem e parâmetros
    body: O pipeline Diffusers grava a imagem e um JSON com parâmetros como prompt, seed, dimensões, checkpoint e LoRAs usados.
evidence:
  - title: README e contrato das ferramentas
    body: Documentação consultada em 24 out 2026. Descreve geração de texto para imagem e de imagem para imagem, checkpoints SDXL e múltiplas LoRAs com escalas independentes.
    href: https://github.com/gabrielalmir/anime-diffusion-mcp/blob/7ffbf7f1834a3b7d8288b4c74752c311fdbd7e39/README.md
  - title: Organização da implementação
    body: O repositório documenta servidor FastMCP, preparação de prompts, ImagePipeline com Diffusers e contratos Pydantic.
    href: https://github.com/gabrielalmir/anime-diffusion-mcp/blob/7ffbf7f1834a3b7d8288b4c74752c311fdbd7e39/src/anime_diffusion_mcp/server.py
  - title: Empacotamento com GPU
    body: O README explica os volumes de modelos, cache e saídas; o smoke test documentado valida imports e CUDA, sem carregar o modelo.
limits:
  - É um laboratório experimental, sem validação de inferência ou operação em produção neste estudo.
  - A geração depende de memória e hardware. O Docker exige GPU, sem fallback para CPU; fora dele, a execução em CPU é possível, mas lenta.
  - Não publiquei benchmarks de capacidade ou latência.
  - O JSON de parâmetros ajuda a repetir a configuração; não garante imagens idênticas entre ambientes.
  - Ainda estudo avaliação de qualidade, guardrails e observabilidade operacional; essas funções não estão implementadas neste caso.
  - A licença MIT cobre o código. Modelos, checkpoints e LoRAs têm licenças próprias.
  - A ferramenta deste portfólio verifica estrutura e um checklist local; não equivale ao validador Python nem executa inferência.
map:
  - label: Agente MCP
    kind: boundary
    note: Chama ferramentas expostas por FastMCP.
  - label: Prompt e contratos
    kind: decision
    note: Preparação e validação antes da geração.
  - label: Diffusers e modelo
    kind: risk
    note: Execução condicionada a hardware e recursos locais.
  - label: Imagem e parâmetros
    kind: evidence
    note: Arquivos de saída documentados no README.
---

Neste laboratório, integro agentes à geração local de imagens por ferramentas MCP. Uso Animagine XL
4.0 como modelo base, com preparação e validação de tags antes da geração via Diffusers.

O fluxo aceita texto ou imagem como entrada, checkpoints e LoRAs locais. A saída inclui a imagem e
um JSON com os parâmetros da geração.
