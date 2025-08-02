'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Globe, Server, Cloud, Bot, BarChart, Wrench, GraduationCap, MapPin, Calendar } from 'lucide-react';

interface TerminalWindowProps {
  children: React.ReactNode;
  title: string;
}

interface ExperienceCardProps {
  title: string;
  company: string;
  period: string;
  description: string;
}

const TerminalWindow: React.FC<TerminalWindowProps> = ({ children, title }) => (
  <div className="terminal-window border border-terminal-green/20 p-4 font-mono text-terminal-green shadow-lg shadow-terminal-green/10">
    <div className="flex justify-between items-center mb-3 pb-2 border-b border-terminal-green/20">
      <span className="text-sm terminal-prompt">&gt; {title}</span>
      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-red-500/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <div className="w-3 h-3 rounded-full bg-terminal-green" />
      </div>
    </div>
    <div className="text-terminal-green/90">
      {children}
    </div>
  </div>
);

const ExperienceCard: React.FC<ExperienceCardProps> = ({ title, company, period, description }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mb-6 last:mb-0"
  >
    <div className="flex items-start gap-3 mb-2">
      <div className="w-2 h-2 rounded-full bg-terminal-green mt-2 flex-shrink-0" />
      <div className="flex-1">
        <h3 className="text-lg font-bold text-terminal-green">{title}</h3>
        <p className="text-terminal-green/80 font-medium">{company}</p>
        <p className="text-sm text-terminal-green/60 flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {period}
        </p>
      </div>
    </div>
    <p className="text-terminal-green/80 leading-relaxed ml-5">{description}</p>
  </motion.div>
);

export const ModernResumeSection: React.FC = () => {
  const resumeData = {
    summary: 'Software Engineer com mais de 6 anos de experiência em desenvolvimento backend escalável, APIs robustas e sistemas distribuídos. Especialista em Node.js (NestJS) e React, trabalhando com AWS (Lambda, S3, SQS, RDS, DynamoDB), mensageria (RabbitMQ, SQS), CI/CD com GitHub Actions e arquitetura orientada a eventos. Atualmente estudando IA aplicada com Python, focando em LLMs, RAG e automação inteligente.',
    experience: [
      {
        title: 'Backend Node.js Engineer',
        company: 'CTC',
        period: 'Agosto 2023 - Presente',
        description: 'Desenvolvimento de middleware e APIs REST/ODATA usando Node.js, NestJS e TypeScript, integrando sistemas ERP e ferramentas analíticas. Implementação de sistema de relacionamento com clientes usando Node.js e SQL Server, reduzindo tempo de carregamento em 90%. Criação de sistema de controle de documentos para indústria farmacêutica regulamentada.'
      },
      {
        title: 'Full Stack Node.js Developer',
        company: 'Laboratório Cristália',
        period: 'Abril 2023 - Agosto 2023',
        description: 'Aprimoramento de sistemas internos com foco em melhores práticas de arquitetura, testes e documentação, acelerando fluxos de negócio através de melhor gestão de documentos.'
      },
      {
        title: 'Full Stack Node.js Developer',
        company: 'Freelancer',
        period: 'Outubro 2016 - Março 2023',
        description: 'Desenvolvimento de APIs REST, autenticação JWT, mensageria com RabbitMQ. Foco em integração com banco de dados MySQL e cache Redis.'
      },
      {
        title: 'Full Stack Developer',
        company: 'Diolinux',
        period: 'Maio 2013 - Agosto 2016',
        description: 'Modernização de sistemas legados com foco em performance e automação.'
      }
    ],
    education: [
      {
        degree: 'Tecnólogo em Desenvolvimento de Software',
        institution: 'FATEC-SP',
        period: '2022 - 2025 (previsto)',
        location: 'Itapira, SP'
      },
      {
        degree: 'Técnico em Informática',
        institution: 'Senac Brasil',
        period: '2014 - 2016',
        location: ''
      }
    ],
    skills: [
      { icon: Code, category: 'Linguagens', items: 'Node.js, TypeScript, Python, JavaScript, SQL' },
      { icon: Server, category: 'Frameworks', items: 'NestJS, React, FastAPI, TypeORM' },
      { icon: Cloud, category: 'Cloud', items: 'AWS (Lambda, S3, SQS, DynamoDB, RDS)' },
      { icon: Database, category: 'Mensageria', items: 'RabbitMQ, Amazon SQS' },
      { icon: Globe, category: 'DevOps', items: 'Docker, GitHub Actions, CI/CD, SonarQube' },
      { icon: Bot, category: 'Práticas', items: 'Clean Architecture, SOLID, TDD, DDD' },
      { icon: BarChart, category: 'IA/ML', items: 'Pandas, LangChain, LLMs, RAG, Scikit-learn' },
      { icon: Wrench, category: 'Observabilidade', items: 'Prometheus, Grafana (aprendendo)' },
      { icon: Wrench, category: 'Ferramentas', items: 'GitHub, Jira, Figma, Postman, Swagger, ERP (SAP)' }
    ],
    languages: [
      { language: 'Português', level: 'Nativo' },
      { language: 'Inglês', level: 'Avançado (aprendizado contínuo)' }
    ]
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="terminal-window border border-terminal-green/20 p-4 mb-12"
        >
          <h2 className="text-2xl font-bold">
            <span className="terminal-prompt">&gt; RESUMO PROFISSIONAL_</span>
          </h2>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <TerminalWindow title="~/summary.txt">
            <p className="leading-relaxed">{resumeData.summary}</p>
          </TerminalWindow>
          
          <TerminalWindow title="~/education.md">
            <div className="space-y-4">
              {resumeData.education.map((edu, i) => (
                <div key={i} className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 mt-1 text-terminal-green flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-terminal-green">{edu.degree}</h4>
                    <p className="text-terminal-green/80">{edu.institution}</p>
                    <div className="flex items-center gap-4 text-sm text-terminal-green/60">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {edu.period}
                      </span>
                      {edu.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {edu.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TerminalWindow>
        </div>

        <div className="mb-8">
          <TerminalWindow title="~/experience.log">
            <div className="space-y-6">
              {resumeData.experience.map((exp, i) => (
                <ExperienceCard key={i} {...exp} />
              ))}
            </div>
          </TerminalWindow>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <TerminalWindow title="~/skills.json">
            <div className="space-y-4">
              {resumeData.skills.map((skill, i) => (
                <div key={i} className="flex items-start gap-3">
                  <skill.icon className="w-5 h-5 mt-0.5 text-terminal-green flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-terminal-green mb-1">{skill.category}</h4>
                    <p className="text-terminal-green/80 text-sm leading-relaxed">{skill.items}</p>
                  </div>
                </div>
              ))}
            </div>
          </TerminalWindow>
          
          <TerminalWindow title="~/languages.ini">
            <div className="space-y-3">
              {resumeData.languages.map((lang, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-terminal-green font-medium">{lang.language}</span>
                  <span className="text-terminal-green/70 text-sm">{lang.level}</span>
                </div>
              ))}
            </div>
          </TerminalWindow>
        </div>
      </div>
    </section>
  );
};