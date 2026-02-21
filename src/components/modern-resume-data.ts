import { Bot, Cloud, Code, Database, Globe, Server } from 'lucide-react';

export const resumeData = {
        summary: 'Desenvolvedor Backend (Pleno) com experiência em Node.js e TypeScript, atuando no desenvolvimento de APIs, integrações entre sistemas e arquitetura de microsserviços. Interesse por arquitetura limpa, boas práticas (SOLID, Design Patterns), observabilidade e automação com CI/CD em ambientes AWS. Aprendizado contínuo em IA/ML aplicada.',
        experience: [
            {
                title: 'Desenvolvedor Backend Node.js',
                company: 'CTC',
                period: 'Agosto de 2023 – Presente | Itapira, SP | Presencial',
                description: 'Atuo no desenvolvimento e manutenção de sistemas com foco em integração e automação para operações industriais. Entregas: middlewares e APIs ODATA em Node.js/NestJS/TypeScript para integrar ERPs a ferramentas de análise; participação na construção de um CRM interno integrado a SQL Server com ganhos de performance em pontos críticos; sistema de controle de documentos para ambiente regulado; apoio na criação de pipelines de CI/CD; serviço em Python para mapeamento de bulas que melhorou substancialmente o tempo de busca.'
            },
            {
                title: 'Desenvolvedor Full-Stack | SEO e Otimização Técnica',
                company: 'Diolinux',
                period: 'Maio de 2013 – Agosto de 2016 | Marau, RS',
                description: 'Atuei no ecossistema Diolinux modernizando aplicações web e infraestrutura, com foco em desempenho e SEO técnico. Modernização de sistemas legados com JavaScript e boas práticas de desenvolvimento web. Implementação de melhorias de SEO técnico, otimização de performance e ajustes estruturais para melhor ranqueamento em motores de busca. Atuação em arquitetura e otimização de back-end, fortalecendo práticas de escalabilidade, organização de código e integração entre sistemas.'
            }
        ],
        education: [
            {
                degree: 'Tecnólogo em Desenvolvimento de Software Multiplataforma',
                institution: 'Faculdade de Tecnologia de São Paulo (FATEC-SP)',
                period: 'Agosto de 2022 – Dezembro de 2025 (cursando)',
                location: 'Itapira, SP',
                projects: [
                    {
                        name: 'TechFinance',
                        description: 'Aplicação para gestão de produtos, vendas, clientes e relatórios financeiros, com insights e assistente virtual (Dinho Bot). Backend em Node.js/TypeScript (Bun.js), API de previsão em Python, app mobile em React Native e versão web em Next.js 15.'
                    },
                    {
                        name: 'Tethys',
                        description: 'Proposta técnica para identificação, tratamento e alerta de alagamentos na cidade de Itapira. Arquitetura baseada em microserviços, com banco SQL (Postgres) e NoSQL (MongoDB), além de simulações de captura de dados com Node-RED.'
                    },
                    {
                        name: 'Portal de Editais',
                        description: 'Portal para centralizar o fluxo de contratação de docentes via edital interno, do lançamento à revisão de formulários. Ênfase em transparência, acompanhamento público e organização do fluxo de trabalho.'
                    }
                ]
            },
            {
                degree: 'Técnico em Informática',
                institution: 'Senac Brasil',
                period: 'Agosto de 2014 – Junho de 2016',
                location: '',
                projects: []
            }
        ],
        skills: [
            { icon: Code, category: 'Linguagens', items: ['Node.js', 'TypeScript', 'Python', 'JavaScript', 'SQL', 'Go'] },
            { icon: Server, category: 'Frameworks', items: ['NestJS', 'React', 'FastAPI', 'TypeORM', 'Express.js', 'Fastify'] },
            { icon: Cloud, category: 'Cloud', items: ['AWS Lambda', 'S3', 'SQS', 'DynamoDB', 'RDS', 'ECS', 'CloudWatch', 'API Gateway'] },
            { icon: Database, category: 'Mensageria', items: ['RabbitMQ', 'Amazon SQS'] },
            { icon: Globe, category: 'DevOps', items: ['Docker', 'GitHub Actions', 'CI/CD', 'OpenTelemetry'] },
            { icon: Bot, category: 'IA/ML', items: ['Pandas', 'LangChain', 'LLMs', 'RAG', 'Prophet', 'NLP'] },
        ],
        certifications: [
            {
                category: 'Machine Learning, Python e IA',
                items: [
                    { name: 'Intermediate Machine Learning | Kaggle', year: '2025' },
                    { name: 'Intro to Machine Learning | Kaggle', year: '2024' },
                    { name: 'AWS Academy Graduate – Machine Learning for Natural Language Processing | AWS', year: '2025' },
                ]
            },
            {
                category: 'Backend, Arquitetura e Cloud',
                items: [
                    { name: 'AWS Academy Graduate – Cloud Developing | AWS', year: '2025' },
                    { name: 'Qualificação Profissional Desenvolvedor Back-end | Centro Paula Souza (Fatec)', year: '2025' },
                    { name: 'Fundamentos da Arquitetura de Software | Full Cycle', year: '2024' },
                    { name: 'Arquitetura Hexagonal (Ports and Adapters) | Full Cycle', year: '2025' },
                    { name: 'Curso de SOLID Express | Full Cycle', year: '2025' },
                    { name: 'Docker na Prática / Curso de Docker | Full Cycle', year: '2024–2025' },
                    { name: 'Masterclass Aplicações Serverless na AWS | EW Academy', year: '2025' },
                ]
            },
            {
                category: 'Boas Práticas, Testes e Metodologias',
                items: [
                    { name: 'Design Patterns | Centro Paula Souza', year: '2024' },
                    { name: 'Metodologias Ágeis | Javanauta', year: '2024' },
                    { name: 'Testes Unitários (JUnit 5 e Mockito) | Javanauta', year: '2024' },
                    { name: 'Career Essentials in Software Development | Microsoft & LinkedIn', year: '2024' },
                ]
            }
        ],
        projects: [
            {
                name: 'BitQueue',
                period: 'Março de 2025 – Presente',
                description: 'Plataforma de message queue para desacoplar e escalar microsserviços, sistemas distribuídos e aplicações serverless. Desenvolvimento de API em Node.js e TypeScript com Arquitetura Hexagonal. Foco em confiabilidade, escalabilidade e boas práticas de design de sistemas.',
                technologies: ['Node.js', 'TypeScript', 'REST', 'SQL', 'React.js', 'Docker', 'CI/CD', 'Swagger', 'GitHub'],
                url: 'https://github.com/gabrielalmir/bitqueue'
            },
            {
                name: 'Resulta – Biblioteca TypeScript',
                period: 'Fevereiro de 2025 – Presente',
                description: 'Biblioteca TypeScript que fornece um tipo Result para lidar com sucesso e erro de forma funcional, inspirada no Result de Rust. Publicada no npm.',
                technologies: ['TypeScript', 'Node.js', 'npm'],
                url: 'https://github.com/gabrielalmir/resulta'
            },
            {
                name: 'eventostec-rs',
                period: 'Julho de 2024 – Agosto de 2024',
                description: 'Backend de plataforma centralizadora de eventos e meetups da comunidade tech.',
                technologies: ['Rust', 'Axum', 'SQLx', 'AWS', 'LocalStack', 'Docker', 'Postgres'],
                url: 'https://github.com/gabrielalmir/eventostec-rs'
            },
            {
                name: 'PhotoGIMP – Projeto Open Source',
                period: 'Janeiro de 2021 – Presente',
                description: 'Mantenedor de patch para otimizar o GIMP 2.10+ para usuários do Adobe Photoshop. Organização de ferramentas para espelhar o layout do Photoshop, inclusão de novos filtros Python, nova tela inicial e configurações otimizadas.',
                technologies: ['Python', 'Git', 'GitHub'],
                url: 'https://github.com/gabrielalmir/photogimp'
            }
        ],
};
