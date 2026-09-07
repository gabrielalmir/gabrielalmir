/**
 * Copy da home, tipada.
 *
 * Fonte: backup/textos/home.md, backup/textos/trajetoria.md e backup/perfil.md
 * (reconciliado pelo backup/Profile.pdf em 2026-09-07). O Profile.pdf é o gate
 * de claims: nada aqui pode afirmar mais do que ele sustenta.
 *
 * Duas formulações são deliberadamente conservadoras e não devem ser
 * "melhoradas":
 *  - PhotoGIMP: "contribuí na evolução e hoje participo da organização e
 *    revisão" — nunca "criador", "dono" ou "mantenedor principal".
 *  - O −90% é o único dado público daquele trabalho. Sem números absolutos de
 *    volume, tempo, disponibilidade ou headcount em lugar nenhum do site.
 */

export const site = {
  url: 'https://gabrielalmir.com.br',
  title: 'Gabriel Almir — backend, integrações e sistemas de IA',
  description:
    'Investigo limites, dependências e falhas para transformar decisões técnicas em sistemas que outras pessoas conseguem operar e evoluir.',
  locale: 'pt-BR',
  author: 'Gabriel Almir',
} as const;

export const contact = {
  email: 'gabr.almir@gmail.com',
  linkedin: 'https://linkedin.com/in/gabrielalmir',
  github: 'https://github.com/gabrielalmir',
} as const;

export const nav = [
  { label: 'Sistemas', href: '/#sistemas' },
  { label: 'Trajetória', href: '/#trajetoria' },
  { label: 'IA', href: '/#ia' },
  { label: 'Contato', href: '/#contato' },
] as const;

export const hero = {
  kicker: 'Backend · AI Systems · Itapira/SP',
  /** Dividido em linhas para o SplitText. Junto, é uma frase só. */
  headlineLines: ['Eu transformo', 'restrições em', 'caminhos confiáveis.'],
  headline: 'Eu transformo restrições em caminhos confiáveis.',
  lead: 'Investigo limites, dependências e falhas para transformar decisões técnicas em sistemas que outras pessoas conseguem operar e evoluir — integrações corporativas, migrações para cloud e as plataformas que deixam a IA ser usada com controle.',
  status: 'Analista de Sistemas Pleno · aberto a conversas',
  actions: [
    { label: 'Explorar sistemas e decisões', href: '#sistemas', primary: true },
    { label: 'Ver trajetória', href: '#trajetoria', primary: false },
  ],
} as const;

export const proofs = {
  kicker: '00 / provas',
  title: 'O que você precisa saber em 30 segundos',
  items: [
    {
      mark: '−90%',
      /** `count` alimenta o contador; `null` mantém a marca estática. */
      count: { from: 0, to: 90, prefix: '−', suffix: '%' },
      claim: 'Eu reduzi o carregamento de um sistema crítico',
      backing: 'Resultado medido e aprovado para divulgação, na CTC.',
    },
    {
      mark: 'RIGOR',
      count: null,
      claim: 'Eu trabalho com limites reais',
      backing:
        'Tenho experiência em integrações e aplicações que exigem rastreabilidade e conformidade.',
    },
    {
      mark: 'COMUNIDADE',
      count: null,
      claim: 'Eu colaboro com o PhotoGIMP',
      backing: 'Contribuí na evolução e hoje participo da organização e revisão do projeto.',
    },
  ],
} as const;

export const systemsSection = {
  kicker: '01 / sistemas',
  title: 'Trabalhos que me ensinaram alguma coisa.',
  lead: 'Eu conto cada trabalho pela restrição, pela decisão e pelo que consigo provar — sem reconstruir contextos confidenciais.',
  labsTitle: 'Laboratórios',
  labsLead:
    'Perguntas menores, investigadas até virarem código público. São laboratórios, não produtos: capacidade e latência dependem de modelo e hardware.',
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
  kicker: '02 / trajetória',
  title: 'O caminho também explica o trabalho.',
  lead: 'Carreira, formação e comunidade não aconteceram em linhas separadas. Cada etapa acrescentou uma forma nova de observar, decidir e construir.',
  note: 'Nas maratonas de programação, equipes resolvem problemas algorítmicos sob limite de tempo. É uma prática de raciocínio colaborativo, estratégia e clareza sob pressão — não uma corrida física.',
  career: [
    {
      year: '2013',
      period: 'mai 2013 — ago 2016',
      org: 'Diolinux',
      role: 'Desenvolvedor full-stack',
      summary:
        'O primeiro capítulo profissional nasceu perto de Linux, comunicação e comunidade. O projeto principal foi o PhotoGIMP: manutenção, compatibilidade entre versões e contato direto com quem usa.',
      image: 'photogimp',
      imageAlt: 'Ícone do PhotoGIMP',
    },
    {
      year: '2016',
      period: '2016 — 2023',
      org: 'Atuação independente',
      role: 'Desenvolvimento e suporte',
      summary:
        'Projetos e demandas diversas ampliaram autonomia, escuta e responsabilidade de ponta a ponta.',
    },
    {
      year: '2023',
      period: 'ago 2023 — abr 2026',
      org: 'CTC',
      role: 'Desenvolvedor backend Node.js',
      summary:
        'APIs, integrações e evolução de aplicações corporativas. Em um fluxo crítico, reduzi o carregamento em 90% — resultado medido e autorizado. Fui responsável técnico pela migração de um sistema legado e auditado para o TOTVS Cloud, e pelas integrações entre SAP e TOTVS via OData.',
    },
    {
      year: '2026',
      period: 'abr 2026 — presente',
      org: 'Laboratório Cristália',
      role: 'Analista de Sistemas Pleno',
      summary:
        'Análise e evolução de sistemas corporativos em um ambiente regulado, junto a Qualidade, RH, Compras, Jurídico e TI. Integrações com o ERP sob requisitos de rastreabilidade e conformidade; tecnologias e sistemas internos permanecem confidenciais.',
      now: true,
    },
  ] satisfies readonly TrajectoryEntry[],
  formation: [
    {
      year: '2014',
      period: '2014 — 2016',
      org: 'Senac',
      role: 'Técnico em Tecnologia da Informação',
      summary: 'Formação técnica que transformou curiosidade por computadores em método e prática.',
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
      imageAlt: 'InterFatecs · participação e local do evento · 16 ago 2025 (ilustração gerada por IA)',
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
      summary: 'Contribuição, organização de issues e revisão no projeto comunitário da Diolinux.',
      href: 'https://github.com/Diolinux/PhotoGIMP',
    },
    {
      year: '∞',
      period: 'em público',
      org: '@momentoalmir',
      role: 'Instagram',
      summary: 'Fotografia e diário visual, com processo e fragmentos do cotidiano.',
      href: 'https://instagram.com/momentoalmir',
      image: 'instagram',
      imageAlt: '@momentoalmir · presença pública',
    },
    {
      year: '∞',
      period: 'em público',
      org: '@avlye',
      role: 'YouTube · Instagram',
      summary: 'Vídeos sobre tecnologia, ideias e aprendizado.',
      href: 'https://youtube.com/@avlye',
      image: 'youtube',
      imageAlt: '@avlye · criação em vídeo',
    },
  ] satisfies readonly TrajectoryEntry[],
} as const;

/**
 * Seção de IA. Nada aqui pode virar alegação de produção: o texto do perfil é
 * explícito que os laboratórios servem para *praticar* integração.
 */
export const aiSection = {
  kicker: '03 / ia',
  title: 'IA é um componente de sistema, não mágica.',
  lead: 'A direção que sigo é AI Platform Engineering: aplicar o que aprendi em backend, integrações e sistemas distribuídos na base que permite outras pessoas usarem recursos de IA com mais confiabilidade e controle.',
  body: 'Nos projetos pessoais isso vira serviço MCP, API compatível com OpenAI, inferência local em GPU e pipelines de voz e imagem. Eles existem para praticar o que a plataforma precisa resolver: integração entre runtimes, roteamento de modelos, streaming, filas, retries, segurança, observabilidade, medição de latência e a decisão entre execução local e cloud.',
  /** Nós do diagrama de pipeline, desenhados em stroke na ordem. */
  pipeline: [
    { id: 'client', label: 'Cliente', note: 'Agente MCP ou chamada REST' },
    { id: 'router', label: 'Roteador', note: 'Contrato, validação, fila' },
    { id: 'local', label: 'Modelo local', note: 'GPU · latência medida' },
    { id: 'cloud', label: 'Modelo cloud', note: 'Custo · limite de taxa' },
    { id: 'stream', label: 'Stream', note: 'Retry, timeout, observabilidade' },
  ],
  practices: [
    {
      title: 'Fronteira explícita',
      body: 'MCP e REST descrevem a mesma capacidade. A dependência de GPU aparece no contrato, não numa nota de rodapé.',
    },
    {
      title: 'Custo visível',
      body: 'Batching muda latência e consumo. O laboratório de voz existe para medir esse trade-off, não para escondê-lo.',
    },
    {
      title: 'Limite declarado',
      body: 'Caching e operação continuam planejados. Nenhum destes serviços é apresentado como produção.',
    },
  ],
} as const;

export const process = {
  kicker: '04 / processo',
  title: 'Meu processo deixa marcas.',
  lead: 'Começo perguntando e medindo. Desenho estados, anoto riscos e procuro a menor decisão que faça o sistema avançar. Depois volto: testo, documento e compartilho o que aprendi.',
  steps: [
    { n: '01', title: 'Observar', body: 'Eu sigo o fluxo inteiro antes de escolher uma ferramenta.' },
    { n: '02', title: 'Decidir', body: 'Eu torno restrições e trade-offs visíveis.' },
    { n: '03', title: 'Verificar', body: 'Eu comparo evidências e desenho recuperação.' },
    { n: '04', title: 'Compartilhar', body: 'Eu escrevo para que o trabalho não dependa só de mim.' },
  ],
} as const;

export const contactSection = {
  kicker: '05 / contato',
  title: 'Vamos entender um problema juntos?',
  lead: 'Se você tem um sistema difícil, uma integração delicada ou só quer trocar ideias sobre trabalho e aprendizado, pode me escrever.',
  cta: 'Enviar e-mail',
} as const;

export const footer = {
  signature: 'Feito por Gabriel, entre sistemas e margens.',
  links: [
    { label: 'GitHub', href: contact.github, icon: 'github' },
    { label: 'LinkedIn', href: contact.linkedin, icon: 'linkedin' },
    { label: 'E-mail', href: `mailto:${contact.email}`, icon: 'mail' },
  ],
} as const;

export const notFound = {
  code: '404',
  title: 'Este caminho não chegou a lugar nenhum.',
  lead: 'Às vezes uma rota termina no papel rasgado. A home e os dossiês continuam por aqui.',
  cta: 'Voltar para a home',
} as const;
