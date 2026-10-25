/** Conteúdo público. Preservar atribuições, datas e limites dos casos. */
export const site = {
  url: 'https://gabrielalmir.com.br',
  title: 'Gabriel Almir — analista de sistemas e IA aplicada',
  description:
    'Gabriel Almir: backend e integrações para sistemas de IA. Analista de Sistemas Pleno, com experiência corporativa e projetos experimentais com agentes e modelos locais.',
  locale: 'pt-BR',
  author: 'Gabriel Almir',
} as const;
export const contact = {
  email: 'gabr.almir@gmail.com',
  linkedin: 'https://linkedin.com/in/gabrielalmir',
  github: 'https://github.com/gabrielalmir',
} as const;
export const nav = [
  { label: 'Experiência', href: '/#trajetoria' },
  { label: 'Projetos', href: '/#sistemas' },
  { label: 'Sobre', href: '/#sobre' },
  { label: 'Contato', href: '/#contato' },
] as const;
export const hero = {
  kicker: 'Analista de sistemas · Itapira, SP',
  title: 'Gabriel Almir',
  headline: 'Backend e integrações',
  focus: 'para sistemas de IA.',
  lead: 'Sou Analista de Sistemas Pleno. Trago experiência em APIs, sistemas legados e integrações corporativas para projetos experimentais com agentes e modelos locais.',
  status: 'Aberto a oportunidades em AI Engineering',
  actions: [
    { label: 'Explorar o projeto de IA', href: '#sistemas', primary: true },
    { label: 'Conversar', href: '#contato', primary: false },
  ],
} as const;
export const systemsSection = {
  kicker: 'Projetos pessoais',
  title: 'Projetos',
  lead: 'Reuni seis projetos pessoais. Em cada caso, descrevo o que construí, as decisões e o que ainda precisa ser verificado.',
  featured: ['mcp-animaginexl', 'pimbas', 'maybe'],
  complementary: ['saturno', 'hush', 'resulta'],
  labels: {
    'mcp-animaginexl': 'Geração local de imagens via MCP',
    pimbas: 'Partidas e torneios de pimbolim',
    maybe: 'Result e Option para PHP 7.4',
  },
} as const;
/** Sínteses editoriais dos casos Markdown, sem novas medições. */
export const projectReadings = {
  'mcp-animaginexl': {
    question: 'Entre o agente e a imagem, um contrato.',
    problem:
      'Conectar agentes à geração local, respeitando as convenções de prompt e os recursos do hardware.',
    outcome: 'Imagem e parâmetros salvos juntos, em PNG e JSON.',
    limit:
      'Laboratório experimental. Sem benchmarks publicados ou validação de operação em produção.',
  },
  pimbas: {
    question: 'Mudar a aplicação. Preservar as regras do jogo.',
    problem:
      'Organizar partidas entre conhecidos, com rankings, torneios e acesso delimitado por grupo.',
    outcome: 'Camada web consolidada em Next.js; regras de domínio separadas do framework.',
    limit: 'O projeto não teve adoção; faltou tempo para continuar sua manutenção.',
  },
  maybe: {
    question: 'Erro e ausência merecem nomes diferentes.',
    problem: 'Tratar dados externos em PHP 7.4, sem exigir a reescrita da aplicação.',
    outcome: 'Schema e DTO na entrada; Result e Option para representar estados explícitos.',
    limit: 'A adoção é gradual. A auditoria e a licença ainda precisam de verificação.',
  },
} as const;
export type TrajectoryEntry = {
  readonly year: string;
  readonly period: string;
  readonly org: string;
  readonly role: string;
  readonly summary: string;
  readonly now?: boolean;
  readonly image?: string;
  readonly imageAlt?: string;
  readonly href?: string;
};

export const trajectory = {
  kicker: 'Trajetória',
  title: 'Trajetória',
  lead: 'Sou analista de sistemas em Itapira, SP. Comecei no desenvolvimento com Linux e projetos de comunidade. Hoje trabalho com sistemas corporativos e integrações.',
  note: 'Em 2025, participei de três competições de programação, resolvendo problemas de algoritmos em equipe e com tempo limitado.',
  career: [
    {
      year: '2013',
      period: 'mai 2013 — ago 2016',
      org: 'Diolinux',
      role: 'Desenvolvedor full-stack',
      summary:
        'Trabalhei com desenvolvimento full-stack e contribuí no PhotoGIMP, projeto comunitário da Diolinux, com manutenção e compatibilidade entre versões.',
      image: 'photogimp',
      imageAlt: 'Ícone do PhotoGIMP',
    },
    {
      year: '2016',
      period: '2016 — 2023',
      org: 'Atuação independente',
      role: 'Desenvolvimento e suporte',
      summary: 'Trabalhei de forma independente com desenvolvimento e suporte.',
    },
    {
      year: '2023',
      period: 'ago 2023 — abr 2026',
      org: 'CTC',
      role: 'Desenvolvedor backend Node.js',
      summary:
        'Desenvolvi APIs e integrações corporativas. Reduzi o carregamento de um sistema crítico em 90%. Fui responsável técnico pela migração de um sistema legado e auditado para o TOTVS Cloud e pelas integrações entre SAP e TOTVS via OData.',
    },
    {
      year: '2026',
      period: 'abr 2026 — presente',
      org: 'Laboratório Cristália',
      role: 'Analista de Sistemas Pleno',
      summary:
        'Analiso e desenvolvo sistemas corporativos em um ambiente regulado, junto a Qualidade, RH, Compras, Jurídico e TI. Trabalho com integrações com o ERP e requisitos de rastreabilidade e conformidade.',
      now: true,
    },
  ] satisfies readonly TrajectoryEntry[],
  formation: [
    {
      year: '2014',
      period: '2014 — 2016',
      org: 'Senac',
      role: 'Técnico em Tecnologia da Informação',
      summary: 'Concluí o curso técnico em Tecnologia da Informação.',
    },
    {
      year: '2022',
      period: '2022 — 2025 · concluído',
      org: 'FATEC Itapira',
      role: 'Desenvolvimento de Software Multiplataforma',
      summary: 'Graduação pública tecnológica do estado de São Paulo, concluída em 2025.',
    },
    {
      year: '2025',
      period: '15 mar 2025',
      org: 'Minimaratona · FATEC Itapira',
      role: 'Competidor',
      summary:
        'Etapa local de programação competitiva: problemas algorítmicos, estratégia em equipe e tempo contado.',
      image: 'minimarathon',
      imageAlt: 'Minimaratona da FATEC Itapira · 15 mar 2025 (ilustração gerada por IA)',
    },
    {
      year: '2025',
      period: '16 ago 2025',
      org: 'InterFatecs',
      role: 'Competidor',
      summary:
        'Competição entre FATECs: equipes conectam fundamentos de algoritmos, divisão de trabalho e decisões sob pressão.',
      image: 'interfatecs',
      imageAlt:
        'InterFatecs · participação e local do evento · 16 ago 2025 (ilustração gerada por IA)',
    },
    {
      year: '2025',
      period: '13 set 2025',
      org: 'Maratona de Programação da SBC',
      role: 'Competidor',
      summary:
        'Etapa brasileira ligada ao circuito universitário de programação competitiva, organizada pela Sociedade Brasileira de Computação.',
      image: 'sbc-marathon',
      imageAlt: 'Maratona SBC · 13 set 2025 (ilustração gerada por IA)',
    },
  ] satisfies readonly TrajectoryEntry[],
  publicPresence: [
    {
      year: '∞',
      period: 'contínuo',
      org: 'PhotoGIMP',
      role: 'Open source',
      summary:
        'Contribuo com a organização de issues e a revisão no projeto comunitário da Diolinux.',
      href: 'https://github.com/Diolinux/PhotoGIMP',
    },
    {
      year: '∞',
      period: 'em público',
      org: '@momentoalmir',
      role: 'Instagram',
      summary: 'Compartilho fotografias e registros do cotidiano.',
      href: 'https://instagram.com/momentoalmir',
      image: 'instagram',
      imageAlt: '@momentoalmir · presença pública',
    },
    {
      year: '∞',
      period: 'em público',
      org: '@avlye',
      role: 'YouTube · Instagram',
      summary: 'Produzo vídeos sobre tecnologia e aprendizado.',
      href: 'https://youtube.com/@avlye',
      image: 'youtube',
      imageAlt: '@avlye · criação em vídeo',
    },
  ] satisfies readonly TrajectoryEntry[],
} as const;

export const contactSection = {
  kicker: 'Contato',
  title: 'Vamos conversar?',
  lead: 'Estou aberto a oportunidades em IA aplicada. Você pode me escrever para conversar sobre IA, backend e integrações.',
  cta: 'Escrever um e-mail',
} as const;
export const footer = {
  signature: 'Gabriel Almir',
  links: [
    { label: 'GitHub', href: contact.github },
    { label: 'LinkedIn', href: contact.linkedin },
    { label: 'E-mail', href: `mailto:${contact.email}` },
  ],
} as const;
export const notFound = {
  code: '404',
  title: 'Página não encontrada',
  lead: 'Este endereço não existe. Você pode voltar ao início para ver meus projetos e contatos.',
  cta: 'Voltar ao início',
} as const;

/** Esboços narrativos dos casos, com leitura equivalente sem depender do SVG. */
export const caseDiagrams = {
  'mcp-animaginexl': {
    description:
      'Um agente chama ferramentas MCP para otimizar e validar prompts e gerar imagens. O pipeline Diffusers usa o modelo, checkpoints e LoRAs locais. A imagem e seus parâmetros são gravados em arquivos.',
    nodes: [
      { label: 'Agente MCP', note: 'Contrato de ferramenta' },
      { label: 'Preparar + validar prompt', note: 'optimize / validate' },
      { label: 'Diffusers + modelo local', note: 'generate_image / hardware' },
      { label: 'Imagem + parâmetros', note: 'Arquivo PNG e JSON' },
    ],
  },
  pimbas: {
    description:
      'A migração consolida a fronteira HTTP de Fastify em Next.js. O domínio de partidas, rankings e torneios permanece separado, com acesso delimitado por grupo.',
    nodes: [
      { label: 'Fastify + web', note: 'Preservar contratos' },
      { label: 'Next.js consolidado', note: 'Menos superfícies de operação' },
      { label: 'Domínio independente', note: 'Partidas / ranking / grupos' },
    ],
  },
  maybe: {
    description:
      'Dados externos atravessam Schema e DTO. Result representa sucesso ou erro e Option representa presença ou ausência. A adoção acontece gradualmente.',
    nodes: [
      { label: 'Dados externos', note: 'Começar pelas bordas' },
      { label: 'Schema + DTO', note: 'Dar forma e validar' },
      { label: 'Result + Option', note: 'Erro e ausência explícitos' },
    ],
  },
  saturno: {
    description:
      'Usuários e equipes pertencem a organizações. A autorização delimita casos de uso do módulo WorkManagement, dentro do monólito Laravel e Inertia.',
    nodes: [
      { label: 'Organização + usuários', note: 'Escopo de cada caso de uso' },
      { label: 'Autorização', note: 'Acesso como fronteira' },
      { label: 'WorkManagement', note: 'Módulo em Laravel / Inertia' },
    ],
  },
  hush: {
    description:
      'Comandos RESP chegam a uma fila concorrente e acessam o estado em memória. LRU e TTL controlam descarte e expiração. Não há persistência.',
    nodes: [
      { label: 'Comandos RESP', note: 'Fronteira de protocolo' },
      { label: 'Fila + estado em memória', note: 'Acesso concorrente' },
      { label: 'LRU + TTL', note: 'Descarte / sem persistência' },
    ],
  },
  resulta: {
    description:
      'Uma operação retorna Result com sucesso ou erro explícito. O contrato é distribuído nos formatos ESM e CJS.',
    nodes: [
      { label: 'Operação', note: 'Retorno explícito' },
      { label: 'Result: Ok / Err', note: 'Sucesso ou erro' },
      { label: 'ESM + CJS', note: 'O mesmo contrato' },
    ],
  },
} as const;
export const aboutSection = {
  kicker: 'Sobre mim',
  title: 'Sobre mim',
  body: 'Me formei em Desenvolvimento de Software Multiplataforma na FATEC Itapira em 2025. Fora do trabalho, contribuo com o PhotoGIMP, fotografo e produzo vídeos.',
} as const;

export const themeControl = {
  label: 'Tema escuro',
  lightAction: 'Ativar tema claro',
  darkAction: 'Ativar tema escuro',
} as const;
export const casePage = {
  back: 'Voltar aos projetos',
  contents: 'Nesta página',
  contact: 'Contato',
  diagram: 'Fluxo do projeto',
} as const;
