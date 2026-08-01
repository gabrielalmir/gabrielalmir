export type Locale = 'pt-BR' | 'en';

export type CareerMoment = {
  period: string;
  track: 'career' | 'learning' | 'public';
  organization: string;
  role: string;
  summary: string;
  image?: { src: string; alt: string; caption: string; aspect?: 'portrait' | 'landscape' | 'square' };
  credit?: string;
  href?: string;
};

type TrajectoryContent = {
  eyebrow: string; title: string; intro: string; competitionNote: string;
  tracks: { career: string; learning: string; public: string };
  moments: CareerMoment[];
};

export const trajectoryContent: Record<Locale, TrajectoryContent> = {
  'pt-BR': {
    eyebrow: '01 / trajetória', title: 'O caminho também explica o trabalho.',
    intro: 'Carreira, formação e comunidade não aconteceram em linhas separadas. Cada etapa acrescentou uma forma nova de observar, decidir e construir.',
    competitionNote: 'Nas maratonas de programação, equipes resolvem problemas algorítmicos sob limite de tempo. É uma prática de raciocínio colaborativo, estratégia e clareza sob pressão — não uma corrida física.',
    tracks: { career: 'Carreira', learning: 'Formação & comunidade', public: 'Em público' },
    moments: [
      { period:'2013—2016', track:'career', organization:'Diolinux', role:'Colaboração e tecnologia', summary:'O primeiro capítulo profissional nasceu perto de Linux, comunicação e comunidade.' },
      { period:'2014—2016', track:'learning', organization:'Senac', role:'Técnico em Tecnologia da Informação', summary:'Formação técnica que transformou curiosidade por computadores em método e prática.' },
      { period:'2016—2023', track:'career', organization:'Atuação independente', role:'Desenvolvimento e suporte', summary:'Projetos e demandas diversas ampliaram autonomia, escuta e responsabilidade de ponta a ponta.' },
      { period:'2022—2025 · concluído', track:'learning', organization:'FATEC Itapira', role:'Desenvolvimento de Software Multiplataforma', summary:'Graduação pública tecnológica do estado de São Paulo, concluída em 2025.' },
      { period:'15 mar 2025', track:'learning', organization:'Minimaratona · FATEC Itapira', role:'Competidor', summary:'Etapa local de programação competitiva: problemas algorítmicos, estratégia em equipe e tempo contado.', image:{src:'minimarathon',alt:'Ilustração editorial de um caderno com problemas algorítmicos',caption:'Minimaratona da FATEC Itapira · 15 mar 2025',aspect:'landscape'}, credit:'ilustração gerada por IA' },
      { period:'2023—presente', track:'career', organization:'Laboratório Cristália', role:'Analista de Sistemas Pleno e desenvolvedor backend', summary:'Atuação em aplicações e integrações de um ambiente regulado. Em um fluxo crítico, reduzi o carregamento em 90% — resultado medido e autorizado; tecnologias e sistemas permanecem confidenciais.' },
      { period:'16 ago 2025', track:'learning', organization:'InterFatecs', role:'Competidor', summary:'Competição entre FATECs: equipes conectam fundamentos de algoritmos, divisão de trabalho e decisões sob pressão.', image:{src:'interfatecs',alt:'Ilustração editorial de um competidor em uma maratona de programação',caption:'InterFatecs · participação e local do evento · 16 ago 2025',aspect:'landscape'}, credit:'ilustração gerada por IA' },
      { period:'16 ago 2025', track:'learning', organization:'InterFatecs · sede', role:'Documento do evento', summary:'O espaço que reuniu equipes de diferentes Faculdades de Tecnologia do estado de São Paulo.', image:{src:'interfatecs-venue',alt:'Ilustração editorial de uma faculdade pública recebendo equipes',caption:'Local da InterFatecs · 16 ago 2025',aspect:'landscape'}, credit:'ilustração gerada por IA' },
      { period:'13 set 2025', track:'learning', organization:'Maratona de Programação da SBC', role:'Competidor', summary:'Etapa brasileira ligada ao circuito universitário de programação competitiva, organizada pela Sociedade Brasileira de Computação.', image:{src:'sbc-marathon',alt:'Ilustração editorial de uma mesa de maratona de programação',caption:'Maratona SBC · 13 set 2025',aspect:'landscape'}, credit:'ilustração gerada por IA' },
      { period:'contínuo', track:'public', organization:'PhotoGIMP', role:'Open source', summary:'Contribuição, organização de issues e revisão no projeto comunitário.', href:'https://github.com/Diolinux/PhotoGIMP' },
      { period:'em público', track:'public', organization:'@momentoalmir', role:'Instagram', summary:'Fotografia, processo e fragmentos do cotidiano.', image:{src:'instagram',alt:'Ilustração editorial de uma mesa de fotografia e diário visual',caption:'@momentoalmir · presença pública',aspect:'landscape'}, href:'https://instagram.com/momentoalmir' },
      { period:'em público', track:'public', organization:'@avlye', role:'YouTube', summary:'Vídeos sobre tecnologia, ideias e aprendizado.', image:{src:'youtube',alt:'Ilustração editorial de um pequeno estúdio de criação em vídeo',caption:'@avlye · criação em vídeo',aspect:'landscape'}, href:'https://youtube.com/@avlye' },
    ]
  },
  en: {
    eyebrow: '01 / trajectory', title: 'The path explains the work too.',
    intro: 'Career, education, and community did not happen on separate lines. Each stage added a new way to observe, decide, and build.',
    competitionNote: 'In programming contests, teams solve algorithmic problems against the clock. It is collaborative reasoning, strategy, and clarity under pressure — not a physical race.',
    tracks: { career: 'Career', learning: 'Education & community', public: 'In public' },
    moments: [
      { period:'2013—2016', track:'career', organization:'Diolinux', role:'Technology and collaboration', summary:'The first professional chapter grew around Linux, communication, and community.' },
      { period:'2014—2016', track:'learning', organization:'Senac', role:'Information Technology technical program', summary:'Technical education that turned curiosity about computers into method and practice.' },
      { period:'2016—2023', track:'career', organization:'Independent work', role:'Development and support', summary:'Varied projects expanded autonomy, listening, and end-to-end responsibility.' },
      { period:'2022—2025 · completed', track:'learning', organization:'FATEC Itapira', role:'Multiplatform Software Development', summary:'A technology degree from São Paulo’s public state college system, completed in 2025.' },
      { period:'Mar 15, 2025', track:'learning', organization:'FATEC Itapira Minimaratona', role:'Competitor', summary:'A local competitive-programming round: algorithmic problems, team strategy, and a ticking clock.', image:{src:'minimarathon',alt:'Editorial illustration of a notebook with algorithmic problems',caption:'FATEC Itapira Minimaratona · Mar 15, 2025',aspect:'landscape'}, credit:'AI-generated illustration' },
      { period:'2023—present', track:'career', organization:'Laboratório Cristália', role:'Mid-level Systems Analyst and backend developer', summary:'Applications and integrations in a regulated environment. I reduced one critical flow’s loading time by 90% — measured and approved for disclosure; technologies and systems remain confidential.' },
      { period:'Aug 16, 2025', track:'learning', organization:'InterFatecs', role:'Competitor', summary:'A contest among FATEC colleges, where teams combine algorithms, task division, and decisions under pressure.', image:{src:'interfatecs',alt:'Editorial illustration of a competitor at a programming contest',caption:'InterFatecs · participation and venue · Aug 16, 2025',aspect:'landscape'}, credit:'AI-generated illustration' },
      { period:'Aug 16, 2025', track:'learning', organization:'InterFatecs · venue', role:'Event document', summary:'The place that brought together teams from São Paulo state’s public technology colleges.', image:{src:'interfatecs-venue',alt:'Editorial illustration of a public college welcoming teams',caption:'InterFatecs venue · Aug 16, 2025',aspect:'landscape'}, credit:'AI-generated illustration' },
      { period:'Sep 13, 2025', track:'learning', organization:'SBC Programming Marathon', role:'Competitor', summary:'The Brazilian university competitive-programming event organized by the Brazilian Computer Society (SBC).', image:{src:'sbc-marathon',alt:'Editorial illustration of a university programming marathon desk',caption:'SBC Programming Marathon · Sep 13, 2025',aspect:'landscape'}, credit:'AI-generated illustration' },
      { period:'ongoing', track:'public', organization:'PhotoGIMP', role:'Open source', summary:'Contribution, issue organization, and review in the community project.', href:'https://github.com/Diolinux/PhotoGIMP' },
      { period:'in public', track:'public', organization:'@momentoalmir', role:'Instagram', summary:'Photography, process, and fragments of everyday life.', image:{src:'instagram',alt:'Editorial illustration of a photography and visual diary workspace',caption:'@momentoalmir · public presence',aspect:'landscape'}, href:'https://instagram.com/momentoalmir' },
      { period:'in public', track:'public', organization:'@avlye', role:'YouTube', summary:'Videos about technology, ideas, and learning.', image:{src:'youtube',alt:'Editorial illustration of a small video creation studio',caption:'@avlye · video creation',aspect:'landscape'}, href:'https://youtube.com/@avlye' },
    ]
  }
};

export const articleKeys = ['performance-90', 'backend-decisions', 'not-eight-or-eighty', 'imperfect-portfolio'] as const;
export type ArticleKey = typeof articleKeys[number];

const ptBodies: Record<ArticleKey, string> = {
  'performance-90': `Alguns trabalhos importantes não podem ser apresentados com telas, diagramas ou uma lista de decisões técnicas. Este é um deles.

## A restrição

Eu trabalhava em um sistema crítico, dentro de um ambiente regulado. O tempo de carregamento prejudicava a operação, e qualquer mudança precisava preservar regras, integrações e dados que não podem ser publicados. Tratei a confidencialidade como parte do trabalho: nomes, arquitetura, volumes, componentes e detalhes de implementação ficam de fora.

## A decisão

Observei o percurso completo que determinava o tempo percebido. Comparei etapas, isolei o custo dominante e priorizei a menor intervenção segura. Validei a mudança com a mesma referência antes e depois — sem essa comparação, velocidade seria apenas impressão.

## O resultado

O tempo de carregamento caiu **90%**. Esse é o único número publicado: foi medido, verificado e aprovado para divulgação.

## O que ficou comigo

Aprendi a medir o fluxo que afeta as pessoas, localizar a restrição antes de escolher a solução e comunicar impacto sem ultrapassar os limites do contexto. Performance confiável começa em observação, não em uma tecnologia escolhida cedo demais.`,
  'backend-decisions': `Por muito tempo procurei a tecnologia “perfeita” para backend. O maior custo não veio de uma escolha errada: veio dos períodos em que eu não escolhi nada.

## O contexto vem primeiro

Hoje começo pelo problema: onde está o risco, quais restrições são reais, quem vai operar o sistema e qual decisão é reversível. Linguagem e framework importam, mas entram depois de fundamentos como HTTP, dados, observabilidade e limites claros.

## Minha regra prática

Escolho uma opção boa o bastante para aprender com uso real. Registro os motivos, defino sinais que justificariam rever a escolha e sigo. Decisão técnica não é casamento; é um compromisso verificável com o contexto atual.

Movimento informado quase sempre me ensina mais do que paralisia perfeita.`,
  'not-eight-or-eighty': `Eu já tratei desenvolvimento como uma sequência de extremos: rápido ou bem feito, especialista ou generalista, autonomia ou colaboração. A prática me ensinou que o trabalho interessante acontece no espaço entre essas pontas.

## Engenharia é negociação

Cada decisão equilibra tempo, risco, clareza e manutenção. Não busco código perfeito nem aceito qualquer atalho. Tento tornar o trade-off explícito para que o time consiga revisar a escolha.

## O lado humano

Código é só parte do trabalho. Ouvir quem usa, traduzir uma restrição e documentar o que mudou são atividades técnicas também. Continuo aprendendo a equilibrar profundidade com curiosidade e velocidade com cuidado.`,
  'imperfect-portfolio': `Eu adiei meu portfólio tentando fazer com que ele provasse tudo. Quanto mais ele precisava parecer perfeito, menos ele parecia comigo.

## Autenticidade antes de inventário

Meu trabalho de backend muitas vezes é invisível. Em vez de compensar isso com uma lista de tecnologias, decidi mostrar como penso: restrição, decisão, evidência e aprendizado.

## Um espaço em movimento

Este site não é um produto acabado. É um caderno público que muda conforme eu mudo. Prefiro publicar uma versão honesta, aprender com ela e voltar para editar as margens. Evolução me representa melhor do que perfeição.`
};

const enBodies: Record<ArticleKey, string> = {
  'performance-90': `Some important work cannot be shown through screens, diagrams, or a list of technical decisions. This is one of those cases.

## The constraint

I was working on a critical system in a regulated environment. Loading time was getting in the way of operations, while any change had to protect rules, integrations, and data that cannot be published. I treated confidentiality as part of the work: names, architecture, volumes, components, and implementation details stay out.

## The decision

I observed the complete path behind perceived time, compared its stages, isolated the dominant cost, and prioritized the smallest safe intervention. I validated the change against the same reference before and after.

## The result

Loading time fell by **90%**. It is the only number published because it was measured, verified, and approved for disclosure.

## What stayed with me

I learned to measure the flow that affects people, find the constraint before choosing a solution, and communicate impact without crossing contextual boundaries. Reliable performance starts with observation.`,
  'backend-decisions': `For a long time I searched for the “perfect” backend technology. The greatest cost did not come from a wrong choice; it came from the times I chose nothing.

## Context first

Today I start with the problem: where risk lives, which constraints are real, who will operate the system, and which decisions are reversible. Languages and frameworks matter, but they follow foundations such as HTTP, data, observability, and clear boundaries.

## My practical rule

I pick an option good enough to learn from real use. I record why, define signals that would justify revisiting it, and move. A technical decision is not a marriage; it is a verifiable commitment to the current context.`,
  'not-eight-or-eighty': `I used to treat software work as a sequence of extremes: fast or well made, specialist or generalist, autonomy or collaboration. Practice taught me that the interesting work happens between those poles.

## Engineering is negotiation

Every decision balances time, risk, clarity, and maintenance. I do not chase perfect code or accept every shortcut. I try to make the trade-off explicit so the team can review the choice.

## The human layer

Code is only part of the job. Listening to users, translating a constraint, and documenting change are technical activities too. I keep learning how to balance depth with curiosity and speed with care.`,
  'imperfect-portfolio': `I postponed my portfolio while trying to make it prove everything. The more perfect it had to look, the less it looked like me.

## Authenticity before inventory

Backend work is often invisible. Instead of compensating with a technology list, I decided to show how I think: constraint, decision, evidence, and learning.

## A space in motion

This site is not a finished product. It is a public notebook that changes as I change. I would rather publish an honest version, learn from it, and return to edit the margins. Evolution represents me better than perfection.`
};

const articleMeta = {
  'pt-BR': [
    ['performance-90','Como reduzi em 90% o carregamento de um sistema crítico','Performance · 4 min','Um relato anonimizado sobre medir antes de decidir.'],
    ['backend-decisions','Como escolho tecnologia backend sem paralisia','Decisões · 4 min','Contexto, reversibilidade e movimento informado.'],
    ['not-eight-or-eighty','Desenvolvimento não é 8 ou 80','Trabalho · 3 min','Os trade-offs técnicos e humanos entre os extremos.'],
    ['imperfect-portfolio','Parei de buscar o portfólio perfeito','Processo · 3 min','Por que evolução e autenticidade me representam melhor.'],
  ],
  en: [
    ['performance-90','How I cut a critical system’s loading time by 90%','Performance · 4 min','An anonymized account of measuring before deciding.'],
    ['backend-decisions','How I choose backend technology without paralysis','Decisions · 4 min','Context, reversibility, and informed movement.'],
    ['not-eight-or-eighty','Software work is not all or nothing','Work · 3 min','The technical and human trade-offs between extremes.'],
    ['imperfect-portfolio','I stopped chasing the perfect portfolio','Process · 3 min','Why evolution and authenticity represent me better.'],
  ]
} as const;

export function getArticles(locale: Locale) {
  const bodies = locale === 'en' ? enBodies : ptBodies;
  return articleMeta[locale].map(([translationKey,title,meta,excerpt], i) => ({ translationKey: translationKey as ArticleKey, title, meta, excerpt, body: bodies[translationKey as ArticleKey], cover: i + 1 }));
}

export function articlePath(locale: Locale, key: ArticleKey) { return `${locale === 'en' ? '/en' : ''}/blog/${key}`; }

export const copy = {
 'pt-BR': {
  lang:'pt-BR', switchHref:'/en/', switchLabel:'EN', home:'/', nav:[['Trajetória','/#trajetoria'],['Trabalhos','/#trabalhos'],['Processo','/#processo'],['Contato','/#contato']],
  title:'Gabriel Almir — sistemas, histórias e caminhos confiáveis', description:'Sou Gabriel Almir. Investigo sistemas complexos, escrevo sobre decisões e colaboro com projetos abertos.',
  heroKicker:'Olá, eu sou Gabriel Almir.', heroTitle:'Eu transformo restrições em caminhos confiáveis.', heroBody:'Sou analista de sistemas e desenvolvedor backend. Gosto de entender por que as coisas quebram, ligar pessoas e sistemas e deixar decisões que outras pessoas conseguem continuar.', heroPrimary:'Conheça meu trabalho', heroSecondary:'Leia minhas notas',
  proofTitle:'O que você precisa saber em 30 segundos', proofs:[['−90%','Eu reduzi o carregamento de um sistema crítico','Resultado medido e aprovado para divulgação.'],['RIGOR','Eu trabalho com limites reais','Tenho experiência em integrações e aplicações que exigem rastreabilidade e conformidade.'],['COMUNIDADE','Eu colaboro com o PhotoGIMP','Contribuí na evolução e hoje participo da organização e revisão do projeto.']],
  workTitle:'Trabalhos que me ensinaram alguma coisa.', workIntro:'Eu conto cada trabalho pela restrição, pela decisão e pelo que consigo provar — sem reconstruir contextos confidenciais.',
  stories:[
   {n:'01',tag:'Impacto verificado',title:'Reduzi uma espera em 90%',constraint:'Eu precisava melhorar um fluxo crítico sem expor regras, dados ou arquitetura interna.',decision:'Medi o percurso completo, localizei o custo dominante e validei a menor mudança segura.',result:'O carregamento caiu 90%. É o único dado público deste trabalho.',href:'/blog/performance-90',label:'Ler o relato anonimizado'},
   {n:'02',tag:'Open source',title:'Ajudo o PhotoGIMP a continuar',constraint:'Um projeto comunitário precisa evoluir sem apagar autoria nem romper a experiência entre plataformas.',decision:'Contribuí diretamente em seu período principal e hoje ajudo a organizar issues, revisar e aprovar mudanças.',result:'Meu papel e as decisões permanecem verificáveis no repositório oficial.',href:'https://github.com/Diolinux/PhotoGIMP',label:'Abrir repositório oficial'},
   {n:'03',tag:'Projeto público',title:'Construí Saturno para aprender em público',constraint:'Eu queria explorar organização de trabalho sem apresentar hipótese como produto comprovado.',decision:'Modelei um projeto local verificável e registrei escolhas, limites e próximos passos no próprio repositório.',result:'Saturno é um laboratório público — sem atribuições de mensageria ou escala que o código não demonstre.',href:'/projects/saturno',label:'Conhecer Saturno'}],
  processTitle:'Meu processo deixa marcas.', processBody:'Começo perguntando e medindo. Desenho estados, anoto riscos e procuro a menor decisão que faça o sistema avançar. Depois volto: testo, documento e compartilho o que aprendi.', processSteps:[['01','Observar','Eu sigo o fluxo inteiro antes de escolher uma ferramenta.'],['02','Decidir','Eu torno restrições e trade-offs visíveis.'],['03','Verificar','Eu comparo evidências e desenho recuperação.'],['04','Compartilhar','Eu escrevo para que o trabalho não dependa só de mim.']],
  architectureChapters:[['00','Origem'],['01','Observar'],['02','Conectar'],['03','Construir'],['04','Humanizar'],['05','Compartilhar'],['06','Continuar']],
  personalSignals:[
   {id:'coffee',label:'Café',microcopy:'Uma ideia quase sempre começa com café.'},
   {id:'code',label:'Programação',microcopy:'Código é meio; clareza é parte da entrega.'},
   {id:'anime',label:'Anime',microcopy:'Gosto de histórias construídas quadro a quadro.'},
   {id:'games',label:'Jogos',microcopy:'Aprendo, salvo, tento de novo.'},
   {id:'linux',label:'Linux',microcopy:'Prefiro entender as camadas antes de abstraí-las.'}],
  personalTitle:'Curiosidade também é método.', personalBody:'Open source, escrita, design e aprendizado fazem parte do meu jeito de trabalhar. Eu gosto de desmontar ideias, entender as bordas e montar algo mais claro no lugar.', writingTitle:'Escrevo para pensar com mais precisão.', contactTitle:'Vamos entender um problema juntos?', contactBody:'Se você tem um sistema difícil, uma integração delicada ou só quer trocar ideias sobre trabalho e aprendizado, pode me escrever.', email:'Enviar e-mail', back:'Voltar', blogTitle:'Notas de campo', blogIntro:'Escrevo em primeira pessoa sobre decisões, falhas, escolhas e o que continuo aprendendo.', casesTitle:'Trabalhos selecionados', notFoundTitle:'Este caminho não chegou a lugar nenhum.', notFoundBody:'Às vezes uma rota termina no papel rasgado. A home e minhas notas continuam por aqui.', footer:'Feito por Gabriel, entre sistemas e margens.'
 },
 en: {
  lang:'en', switchHref:'/', switchLabel:'PT', home:'/en/', nav:[['Trajectory','/en/#trajectory'],['Work','/en/#work'],['Process','/en/#process'],['Contact','/en/#contact']],
  title:'Gabriel Almir — systems, stories, and reliable paths', description:'I’m Gabriel Almir. I investigate complex systems, write about decisions, and collaborate on open projects.',
  heroKicker:'Hello, I’m Gabriel Almir.', heroTitle:'I turn constraints into reliable paths.', heroBody:'I’m a systems analyst and backend developer. I enjoy understanding why things break, connecting people and systems, and leaving decisions that others can carry forward.', heroPrimary:'See my work', heroSecondary:'Read my notes',
  proofTitle:'What you should know in 30 seconds', proofs:[['−90%','I cut a critical system’s loading time','A measured result approved for disclosure.'],['REGULATED','I work within real boundaries','I have experience with integrations and applications in regulated environments.'],['OPEN','I collaborate on PhotoGIMP','I contributed to its evolution and now take part in organization and review.']],
  workTitle:'Work that taught me something.', workIntro:'I tell each story through its constraint, decision, and evidence — without reconstructing confidential contexts.',
  stories:[
   {n:'01',tag:'Verified impact',title:'I cut a wait by 90%',constraint:'I needed to improve a critical flow without exposing internal rules, data, or architecture.',decision:'I measured the whole path, found the dominant cost, and validated the smallest safe change.',result:'Loading time fell by 90%. It is the only public figure for this work.',href:'/en/blog/performance-90',label:'Read the anonymized account'},
   {n:'02',tag:'Open source',title:'I help PhotoGIMP continue',constraint:'A community project must evolve without erasing authorship or breaking cross-platform experience.',decision:'I contributed directly during its main period and now help organize issues, review, and approve changes.',result:'My role and the decisions remain verifiable in the official repository.',href:'https://github.com/Diolinux/PhotoGIMP',label:'Open the official repository'},
   {n:'03',tag:'Public project',title:'I built Saturno to learn in public',constraint:'I wanted to explore work organization without presenting a hypothesis as a proven product.',decision:'I modeled a locally verifiable project and recorded choices, limits, and next steps in its repository.',result:'Saturno is a public lab — with no messaging or scale claims the code cannot demonstrate.',href:'/en/projects/saturno',label:'Meet Saturno'}],
  processTitle:'My process leaves marks.', processBody:'I begin by asking and measuring. I draw states, note risks, and look for the smallest decision that moves the system forward. Then I return: test, document, and share what I learned.', processSteps:[['01','Observe','I follow the whole flow before choosing a tool.'],['02','Decide','I make constraints and trade-offs visible.'],['03','Verify','I compare evidence and design recovery.'],['04','Share','I write so the work does not depend only on me.']],
  architectureChapters:[['00','Origin'],['01','Observe'],['02','Connect'],['03','Build'],['04','Humanize'],['05','Share'],['06','Continue']],
  personalSignals:[
   {id:'coffee',label:'Coffee',microcopy:'An idea almost always begins with coffee.'},
   {id:'code',label:'Programming',microcopy:'Code is a means; clarity is part of delivery.'},
   {id:'anime',label:'Anime',microcopy:'I enjoy stories built one frame at a time.'},
   {id:'games',label:'Games',microcopy:'I learn, save, and try again.'},
   {id:'linux',label:'Linux',microcopy:'I prefer understanding the layers before abstracting them.'}],
  personalTitle:'Curiosity is a method too.', personalBody:'Open source, writing, design, and learning shape how I work. I like taking ideas apart, understanding their edges, and assembling something clearer in their place.', writingTitle:'I write to think more precisely.', contactTitle:'Shall we understand a problem together?', contactBody:'If you have a difficult system, a delicate integration, or simply want to exchange ideas about work and learning, write to me.', email:'Send an email', back:'Back', blogTitle:'Field notes', blogIntro:'I write in the first person about decisions, failures, choices, and what I am still learning.', casesTitle:'Selected work', notFoundTitle:'This path did not lead anywhere.', notFoundBody:'Sometimes a route ends at a torn edge. The home and my notes are still here.', footer:'Made by Gabriel, between systems and margins.'
 }
} as const;
