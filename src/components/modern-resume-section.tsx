'use client';

import { motion } from 'framer-motion';
import { Award, Bot, Calendar, Cloud, Code, Database, ExternalLink, Globe, GraduationCap, MapPin, Server, Wrench } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface ExperienceCardProps {
  title: string;
  company: string;
  period: string;
  description: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ title, company, period, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="mb-6 last:mb-0 pb-6 last:pb-0 border-b border-vesper-orange/10 last:border-0"
  >
    <div className="space-y-2">
      <h3 className="text-base sm:text-lg font-bold text-vesper-orange break-words">{title}</h3>
      <p className="text-sm sm:text-base text-foreground/90 font-medium break-words">{company}</p>
      <p className="text-xs sm:text-sm text-foreground/50 flex items-center gap-1.5">
        <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
        <span className="break-words">{period}</span>
      </p>
      <p className="text-sm text-foreground/70 leading-relaxed mt-3 break-words">{description}</p>
    </div>
  </motion.div>
);

export const ModernResumeSection: React.FC = () => {
  const resumeData = {
    summary: 'Engenheiro de Software Backend com sólida experiência em Node.js e Python, atuando no desenvolvimento de APIs escaláveis, integrações entre sistemas e soluções de machine learning aplicadas a problemas de negócio. Foco em arquitetura limpa, boas práticas (SOLID, Design Patterns), observabilidade (OpenTelemetry) e automação com CI/CD em ambientes AWS.',
    experience: [
      {
        title: 'Desenvolvedor Backend Node.js',
        company: 'CTC',
        period: 'Agosto de 2023 – Presente | Itapira, SP | Presencial',
        description: 'Desenvolvo e mantenho sistemas com impacto direto em operações industriais e na tomada de decisão baseada em dados. Principais entregas: Middlewares com APIs ODATA em Node.js, NestJS, TypeScript e TypeORM para integrar sistemas ERP a ferramentas de análise de dados; Sistema de relacionamento com clientes (CRM interno) integrado a SQL Server, reduzindo em ~90% o tempo de carregamento de pendências; Sistema de controle de documentos internos para ambiente regulado, garantindo conformidade e rastreabilidade; Pipelines de CI/CD para monólito modular crítico; Serviço de mapeamento de bulas em Python com heurísticas, reduzindo tempo de busca de ~1 minuto para acesso praticamente instantâneo (ganho superior a 98%).'
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

  return (
    <section className="w-full max-w-6xl mx-auto">
      {/* Section header */}
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
          Resumo Profissional
        </h2>
        <p className="text-base sm:text-lg text-foreground/60 max-w-2xl mx-auto px-4">
          Trajetória, experiências e formação acadêmica
        </p>
      </div>

      <div className="space-y-8 sm:space-y-12">

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-vesper-orange/5 border border-vesper-orange/20 rounded-xl p-4 sm:p-6 md:p-8"
        >
          <h3 className="text-lg sm:text-xl font-bold text-vesper-orange mb-3 sm:mb-4">Sobre</h3>
          <p className="text-sm sm:text-base text-foreground/80 leading-relaxed break-words">{resumeData.summary}</p>
        </motion.div>

        {/* Two column layout for desktop */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">

          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-background border border-foreground/10 rounded-xl p-4 sm:p-6 md:p-8"
          >
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-2">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-vesper-orange flex-shrink-0" />
              <span>Experiência</span>
            </h3>
            <div className="space-y-4 sm:space-y-6">
              {resumeData.experience.map((exp, i) => (
                <ExperienceCard key={i} {...exp} />
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-background border border-foreground/10 rounded-xl p-4 sm:p-6 md:p-8"
          >
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-vesper-cyan flex-shrink-0" />
              <span>Formação</span>
            </h3>
            <div className="space-y-4 sm:space-y-6">
              {resumeData.education.map((edu, i) => (
                <div key={i} className="pb-4 sm:pb-6 last:pb-0 border-b border-foreground/10 last:border-0">
                  <h4 className="text-sm sm:text-base font-bold text-vesper-orange mb-1 break-words">{edu.degree}</h4>
                  <p className="text-sm sm:text-base text-foreground/80 break-words">{edu.institution}</p>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-foreground/50 mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                      <span className="break-words">{edu.period}</span>
                    </span>
                    {edu.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                        <span className="break-words">{edu.location}</span>
                      </span>
                    )}
                  </div>
                  {edu.projects && edu.projects.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <p className="text-xs sm:text-sm font-semibold text-foreground/70 mb-2">Projetos de destaque:</p>
                      {edu.projects.map((project, j) => (
                        <div key={j} className="pl-3 border-l-2 border-vesper-orange/30 space-y-1">
                          <p className="text-xs sm:text-sm font-semibold text-vesper-orange/90">{project.name}</p>
                          <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed">{project.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skills - organized by category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-background border border-foreground/10 rounded-xl p-4 sm:p-6 md:p-8"
        >
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-2">
            <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-vesper-orange flex-shrink-0" />
            <span>Competências Técnicas</span>
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {resumeData.skills.map((skill, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center gap-2 text-vesper-orange font-semibold text-sm sm:text-base">
                  <skill.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <h4>{skill.category}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, j) => (
                    <span
                      key={j}
                      className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-foreground/5 border border-foreground/10 rounded-full text-foreground/80 whitespace-nowrap"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-background border border-foreground/10 rounded-xl p-4 sm:p-6 md:p-8"
        >
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-2">
            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-vesper-cyan flex-shrink-0" />
            <span>Certificações Selecionadas</span>
          </h3>
          <div className="space-y-6">
            {resumeData.certifications.map((category, i) => (
              <div key={i} className="space-y-3">
                <h4 className="text-sm sm:text-base font-semibold text-vesper-orange">{category.category}</h4>
                <div className="space-y-2 pl-4 border-l-2 border-vesper-orange/20">
                  {category.items.map((cert, j) => (
                    <div key={j} className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                      <span className="text-foreground/80 break-words">{cert.name}</span>
                      <span className="text-foreground/50">·</span>
                      <span className="text-foreground/50">{cert.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-background border border-foreground/10 rounded-xl p-4 sm:p-6 md:p-8"
        >
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-2">
            <Code className="w-4 h-4 sm:w-5 sm:h-5 text-vesper-orange flex-shrink-0" />
            <span>Projetos Relevantes</span>
          </h3>
          <div className="space-y-6">
            {resumeData.projects.map((project, i) => (
              <div key={i} className="pb-4 sm:pb-6 last:pb-0 border-b border-foreground/10 last:border-0">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <h4 className="text-sm sm:text-base font-bold text-vesper-orange break-words">{project.name}</h4>
                  {project.url && (
                    <Link
                      href={project.url}
                      target="_blank"
                      className="flex items-center gap-1 text-xs sm:text-sm text-vesper-orange/70 hover:text-vesper-orange transition-colors"
                    >
                      <span>Ver projeto</span>
                      <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </Link>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-foreground/50 mb-2">{project.period}</p>
                <p className="text-sm text-foreground/70 leading-relaxed mb-3 break-words">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, j) => (
                    <span
                      key={j}
                      className="px-2 py-1 text-xs bg-foreground/5 border border-foreground/10 rounded-full text-foreground/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
