'use client';

import { motion } from 'framer-motion';
import { Award, Bot, Calendar, Cloud, Code, Database, Globe, GraduationCap, MapPin, Server, Wrench } from 'lucide-react';
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
      <h3 className="text-lg font-bold text-vesper-orange">{title}</h3>
      <p className="text-foreground/90 font-medium">{company}</p>
      <p className="text-sm text-foreground/50 flex items-center gap-1.5">
        <Calendar className="w-3.5 h-3.5" />
        {period}
      </p>
      <p className="text-foreground/70 leading-relaxed text-sm mt-3">{description}</p>
    </div>
  </motion.div>
);

export const ModernResumeSection: React.FC = () => {
  const resumeData = {
    summary: 'Software Engineer com mais de 6 anos de experiência em desenvolvimento backend escalável, APIs robustas e sistemas distribuídos. Especialista em Node.js (NestJS) e React, trabalhando com AWS (Lambda, S3, SQS, RDS, DynamoDB), mensageria (RabbitMQ, SQS), CI/CD com GitHub Actions e arquitetura orientada a eventos.',
    experience: [
      {
        title: 'Backend Node.js Engineer',
        company: 'CTC',
        period: 'Agosto 2023 - Presente',
        description: 'Desenvolvimento de middleware e APIs REST/ODATA usando Node.js, NestJS e TypeScript. Implementação de sistema de relacionamento com clientes, reduzindo tempo de carregamento em 90%. Criação de sistema de controle de documentos para indústria farmacêutica regulamentada.'
      },
      {
        title: 'Full Stack Node.js Developer',
        company: 'Laboratório Cristália',
        period: 'Abril 2023 - Agosto 2023',
        description: 'Aprimoramento de sistemas com foco em arquitetura, testes e documentação, acelerando fluxos de negócio.'
      },
      {
        title: 'Full Stack Node.js Developer',
        company: 'Freelancer',
        period: 'Outubro 2016 - Março 2023',
        description: 'Desenvolvimento de APIs REST, autenticação JWT, mensageria com RabbitMQ, MySQL e Redis.'
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
      { icon: Code, category: 'Linguagens', items: ['Node.js', 'TypeScript', 'Python', 'JavaScript', 'SQL'] },
      { icon: Server, category: 'Frameworks', items: ['NestJS', 'React', 'FastAPI', 'TypeORM'] },
      { icon: Cloud, category: 'Cloud', items: ['AWS Lambda', 'S3', 'SQS', 'DynamoDB', 'RDS'] },
      { icon: Database, category: 'Mensageria', items: ['RabbitMQ', 'Amazon SQS'] },
      { icon: Globe, category: 'DevOps', items: ['Docker', 'GitHub Actions', 'CI/CD'] },
      { icon: Bot, category: 'IA/ML', items: ['Pandas', 'LangChain', 'LLMs', 'RAG'] },
    ],
  };

  return (
    <section className="max-w-6xl mx-auto">
      {/* Section header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Resumo Profissional
        </h2>
        <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
          Trajetória, experiências e formação acadêmica
        </p>
      </div>

      <div className="space-y-12">

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-vesper-orange/5 border border-vesper-orange/20 rounded-xl p-6 md:p-8"
        >
          <h3 className="text-xl font-bold text-vesper-orange mb-4">Sobre</h3>
          <p className="text-foreground/80 leading-relaxed">{resumeData.summary}</p>
        </motion.div>

        {/* Two column layout for desktop */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-background border border-foreground/10 rounded-xl p-6 md:p-8"
          >
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-vesper-orange" />
              Experiência
            </h3>
            <div className="space-y-6">
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
            className="bg-background border border-foreground/10 rounded-xl p-6 md:p-8"
          >
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-vesper-cyan" />
              Formação
            </h3>
            <div className="space-y-6">
              {resumeData.education.map((edu, i) => (
                <div key={i} className="pb-6 last:pb-0 border-b border-foreground/10 last:border-0">
                  <h4 className="font-bold text-vesper-orange mb-1">{edu.degree}</h4>
                  <p className="text-foreground/80">{edu.institution}</p>
                  <div className="flex items-center gap-4 text-sm text-foreground/50 mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {edu.period}
                    </span>
                    {edu.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {edu.location}
                      </span>
                    )}
                  </div>
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
          className="bg-background border border-foreground/10 rounded-xl p-6 md:p-8"
        >
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-vesper-orange" />
            Competências Técnicas
          </h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {resumeData.skills.map((skill, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center gap-2 text-vesper-orange font-semibold">
                  <skill.icon className="w-4 h-4" />
                  <h4>{skill.category}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 text-sm bg-foreground/5 border border-foreground/10 rounded-full text-foreground/80"
                    >
                      {item}
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
