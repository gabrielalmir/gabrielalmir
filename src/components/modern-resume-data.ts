import { Bot, Cloud, Code, Database, Globe, Server } from 'lucide-react';

export const resumeData = {
        summary: 'Analista de Sistemas Pleno com foco em Node.js, TypeScript e NestJS, construindo APIs e integrações entre sistemas ERP em ambiente regulado. Aplico arquitetura hexagonal e SOLID quando o cenário justifica a complexidade — e sei reconhecer quando não justifica. Venho aplicando Machine Learning e LLMs em projetos reais de detecção e tratamento de dados.',
        experience: [
            {
                title: 'Analista de Sistemas Pleno',
                company: 'Laboratório Cristália',
                period: 'Abril de 2026 – Presente | Itapira, SP | No local',
                description: 'Integrações de sistemas ERP com impacto direto em BPF (Boas Práticas de Fabricação) — onde inconsistência de dados é não-conformidade regulatória, não só bug. Aplico LLMs no dia a dia para triagem, priorização e detecção de problemas, incluindo automação de desbloqueio de senha via Copilot Studio. Colaboro com GQ, RH, Compras, Jurídico e TI para alinhar entregas técnicas às exigências de conformidade. Mantenho e evoluo aplicações Node.js e PHP legadas nesse ambiente auditado. Mentoria de novos integrantes, do onboarding à evolução técnica.'
            },
            {
                title: 'Desenvolvedor Backend Node.js',
                company: 'CTC',
                period: 'Agosto de 2023 – Abril de 2026 | Itapira, SP | Presencial',
                description: 'Arquitetei e otimizei a plataforma interna de SAC para consulta de bulas farmacêuticas, reduzindo 90% no tempo de carregamento. Líder técnico na migração de sistemas legados para TOTVS Cloud. Desenvolvi middlewares com APIs ODATA (Node.js/NestJS) integrando ERPs (SAP, TOTVS) com plataformas de BI. Implementei pipelines de CI/CD e sistemas de controle de documentos para ambientes regulados e auditados.'
            },
            {
                title: 'Desenvolvedor Full-Stack',
                company: 'Diolinux',
                period: 'Maio de 2013 – Agosto de 2016 | Marau, RS',
                description: 'Modernização e manutenção de aplicações do ecossistema Diolinux com Clean Code. Otimização de performance no back-end resultando em maior velocidade de resposta. Atuação multidisciplinar conectando necessidades da comunidade com soluções escaláveis. Projeto de destaque: manutenção e otimização do PhotoGIMP, impactando designers e usuários Linux ao redor do mundo.'
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
            { icon: Code, category: 'Linguagens', items: ['Node.js', 'TypeScript', 'Python', 'JavaScript', 'SQL'] },
            { icon: Server, category: 'Frameworks', items: ['NestJS'] },
            { icon: Cloud, category: 'Cloud', items: ['AWS Lambda', 'AWS SQS'] },
            { icon: Database, category: 'Mensageria', items: ['RabbitMQ'] },
            { icon: Globe, category: 'DevOps', items: ['Docker', 'CI/CD (GitLab)'] },
            { icon: Bot, category: 'IA aplicada', items: ['LLMs', 'Copilot Studio'] },
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
                name: 'eventostec-ts',
                period: 'Julho de 2024 – Agosto de 2024',
                description: 'API REST para consolidar conceitos de backend em TypeScript: plataforma centralizadora de eventos e meetups da comunidade tech, com infraestrutura local emulando AWS via LocalStack.',
                technologies: ['TypeScript', 'Fastify', 'Drizzle ORM', 'Docker', 'LocalStack'],
                url: 'https://github.com/gabrielalmir/eventostec-ts'
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
