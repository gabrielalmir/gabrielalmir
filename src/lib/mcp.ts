/** Fonte editorial e exemplo conferidos no commit abaixo, em 24/10/2026. */
export const mcpCommit = '7ffbf7f1834a3b7d8288b4c74752c311fdbd7e39';
export const mcpSource = `https://github.com/gabrielalmir/anime-diffusion-mcp/blob/${mcpCommit}`;
export const generationExample = {
  prompt:
    '1girl, solo, hatsune miku, vocaloid, long hair, twintails, smile, upper body, city night, neon lights, masterpiece, best quality, very aesthetic, absurdres',
  width: 832,
  height: 1216,
  steps: 28,
  guidance_scale: 5,
  seed: 42,
};
export const architectureStages = [
  {
    id: 'agent',
    label: 'Agente',
    identifier: 'chamada MCP',
    input: 'Descrição ou prompt em tags e parâmetros de geração.',
    responsibility: 'Escolher e chamar ferramentas pelo contrato MCP.',
    output: 'Chamada de ferramenta com argumentos estruturados.',
    constraint: 'O cliente inicia o processo MCP por entrada padrão; no Docker, sem TTY.',
    source: '/README.md#mcp-client-configuration',
    sourceLabel: 'Configuração do cliente',
  },
  {
    id: 'tools',
    label: 'Ferramentas MCP',
    identifier: 'FastMCP / server.py',
    input: 'Prompt, dimensões e opções da ferramenta selecionada.',
    responsibility: 'Expor optimize_prompt, validate_prompt, list_models e generate_image.',
    output: 'Prompt preparado, parecer de validação, catálogo local ou chamada ao pipeline.',
    constraint:
      'Preparar e validar antes de gerar é o fluxo recomendado; generate_image não faz essa validação de prompt automaticamente.',
    source: '/src/anime_diffusion_mcp/server.py',
    sourceLabel: 'Contratos das ferramentas',
  },
  {
    id: 'pipeline',
    label: 'Pipeline local',
    identifier: 'Diffusers / ImagePipeline',
    input: 'Prompt e parâmetros; checkpoint e LoRAs locais opcionais.',
    responsibility: 'Carregar o modelo e executar inferência no hardware disponível.',
    output: 'Imagem gerada e metadados da execução.',
    constraint:
      'Memória e hardware limitam a geração. O Docker exige GPU; fora dele, CPU é possível, mas lenta.',
    source: '/src/anime_diffusion_mcp/diffusion/pipeline.py',
    sourceLabel: 'Implementação do pipeline',
  },
  {
    id: 'files',
    label: 'Arquivos de saída',
    identifier: 'outputs / PNG + JSON',
    input: 'Imagem e parâmetros efetivamente usados na geração.',
    responsibility: 'Gravar a imagem e o arquivo lateral com prompt, seed, dimensões e modelos.',
    output: 'Arquivos .png e .json em outputs/YYYY-MM-DD/.',
    constraint:
      'Repetir parâmetros não garante imagens idênticas entre ambientes. Não há benchmark publicado.',
    source: '/README.md#outputs',
    sourceLabel: 'Formato das saídas',
  },
] as const;
