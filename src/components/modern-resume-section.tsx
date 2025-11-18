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
        title: 'Desenvolvedor Full-Stack',
        company: 'Diolinux',
        period: 'Maio 2013 - Ago 2016 · 3 anos 4 meses',
        description: 'Modernizei sistemas legados com JavaScript, implementando otimizações de desempenho, automação de processos e melhorias em SEO técnico. Atuei no projeto Diolinux como Desenvolvedor Web, modernizando a infraestrutura back-end e aprimorando o desempenho para motores de busca (SEO). Esta experiência consolidou minhas competências em arquitetura de software, escalabilidade e integração de sistemas.'
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

      </div>
    </section>
  );
};
