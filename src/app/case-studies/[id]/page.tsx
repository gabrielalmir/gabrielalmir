'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowLeft, BarChart, Calendar, CheckCircle, Cloud, Code2, Coffee, Database, ExternalLink, Github, Lightbulb, Target, TrendingUp, Users, Zap } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { use } from 'react';

interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  challenge: string;
  solution: string;
  implementation?: string;
  results: string[];
  technologies: string[];
  metrics: {
    label: string;
    value: string;
    improvement: string;
    description: string;
  }[];
  duration: string;
  teamSize: string;
  category: 'backend' | 'fullstack' | 'architecture' | 'optimization';
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  challenges: string[];
  learnings: string[];
}

const caseStudies: Record<string, CaseStudy> = {
  '1': {
    id: '1',
    title: 'Otimização do Sistema de Busca de Bulas Médicas',
    subtitle: 'Redução de 90% no tempo de carregamento de dados de bulas',
    description: 'Implementação de solução automatizada em Python para integrar dados entre sistemas ERP, otimizando o carregamento e fluxo de atendimento através de cron jobs.',
    challenge: 'Sistema existente apresentava lentidão significativa na sincronização de dados entre ERPs, causando atrasos no atendimento e acesso a informações críticas de bulas.',
    solution: 'Desenvolvimento de scripts Python para automação via cron jobs, implementando lógica de sincronização eficiente e sistema de cache para dados frequentemente acessados.',
    results: [
      'Redução significativa no tempo de sincronização entre sistemas',
      'Automação completa do processo de integração',
      'Eliminação de inconsistências de dados entre sistemas',
      'Melhoria na velocidade de acesso às informações de bulas'
    ],
    technologies: ['Python', 'Cron Jobs', 'SQL', 'Multi-threading', 'Heuristic Search', 'REST APIs'],
    metrics: [
      {
        label: 'Tempo de Sincronização',
        value: '<2min',
        improvement: '90% redução',
        description: 'Tempo médio para sincronização completa'
      },
      {
        label: 'Disponibilidade',
        value: '99.9%',
        improvement: '40% aumento',
        description: 'Uptime do sistema de bulas'
      },
      {
        label: 'Débito Técnico',
        value: '100%',
        improvement: '100%',
        description: 'Remoção de alto acomplamento com sistema ERP legado, permitindo escalabilidade de novos serviços sem impactar o sistema existente, além de melhoria na performance.'
      }
    ],
    duration: '1 semana',
    teamSize: '1 desenvolvedor',
    category: 'backend',
    featured: true,
    challenges: [
      'Integração com múltiplos sistemas ERP legados',
      'Performance na sincronização de grandes volumes de dados',
      'Garantia de consistência entre sistemas',
      'Manutenção de alta disponibilidade'
    ],
    learnings: [
      'Paralelização eficiente reduz tempo de processamento',
      'Cron jobs são cruciais para automação confiável',
      'Cache estratégico melhora tempo de resposta',
      'Monitoramento contínuo garante estabilidade'
    ]
  }
};

interface CaseStudyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { id } = use(params);
  const study = caseStudies[id];

  if (!study) {
    notFound();
  }

  const categories = {
    backend: { label: 'Backend', icon: Database, color: 'text-blue-400' },
    fullstack: { label: 'Full Stack', icon: Code2, color: 'text-green-400' },
    architecture: { label: 'Arquitetura', icon: Cloud, color: 'text-purple-400' },
    optimization: { label: 'Otimização', icon: Zap, color: 'text-yellow-400' }
  };

  const CategoryIcon = categories[study.category].icon;

  return (
    <div className="min-h-screen bg-zinc-950 text-terminal-green font-mono selection:bg-terminal-green selection:text-zinc-950">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-scanline animate-scanline opacity-5"></div>
        <div className="absolute inset-0 bg-glow"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-screen border-b border-terminal-green/20 bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold flex items-center gap-2 text-terminal-green hover:text-terminal-green/80 transition-colors">
              <Coffee className="h-6 w-6" />
              <span className="terminal-prompt hidden sm:block">&gt; gabrielalmir</span>
            </Link>
            <div className="space-x-6">
              <Link href="/blog" className="hover:text-terminal-green/80 transition-colors terminal-link">
                <span className="terminal-prompt">&gt; blog</span>
              </Link>
              <Link href="/case-studies" className="hover:text-terminal-green/80 transition-colors terminal-link">
                <span className="terminal-prompt">&gt; case studies</span>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/case-studies">
            <Button variant="outline" className="terminal-button-outline group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="terminal-prompt">&gt; voltar aos case studies</span>
            </Button>
          </Link>
        </motion.div>

        {/* Case Study Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="terminal-window border border-terminal-green/20 p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <CategoryIcon className={`h-6 w-6 ${categories[study.category].color}`} />
                <span className="text-sm text-terminal-green/60 uppercase tracking-wider">
                  {categories[study.category].label}
                </span>
              </div>
              {study.featured && (
                <div className="px-3 py-1 bg-terminal-green/10 border border-terminal-green/20 rounded text-sm text-terminal-green/80">
                  Projeto Destacado
                </div>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-terminal-green mb-4 leading-tight">
              {study.title}
            </h1>

            <p className="text-xl text-terminal-green/60 font-medium mb-6">
              {study.subtitle}
            </p>

            <p className="text-lg text-terminal-green/80 mb-8 leading-relaxed">
              {study.description}
            </p>

            {/* Project Meta */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <Calendar className="h-6 w-6 text-terminal-green mx-auto mb-2" />
                <div className="text-sm text-terminal-green/60">Duração</div>
                <div className="font-bold text-terminal-green">{study.duration}</div>
              </div>
              <div className="text-center">
                <Users className="h-6 w-6 text-terminal-green mx-auto mb-2" />
                <div className="text-sm text-terminal-green/60">Equipe</div>
                <div className="font-bold text-terminal-green">{study.teamSize}</div>
              </div>
              <div className="text-center">
                <Code2 className="h-6 w-6 text-terminal-green mx-auto mb-2" />
                <div className="text-sm text-terminal-green/60">Tecnologias</div>
                <div className="font-bold text-terminal-green">{study.technologies.length}+</div>
              </div>
              <div className="text-center">
                <TrendingUp className="h-6 w-6 text-terminal-green mx-auto mb-2" />
                <div className="text-sm text-terminal-green/60">Melhorias</div>
                <div className="font-bold text-terminal-green">{study.results.length}</div>
              </div>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
              {study.technologies.map(tech => (
                <span
                  key={tech}
                  className="px-3 py-1 text-sm bg-terminal-green/10 text-terminal-green/80 border border-terminal-green/20 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.header>

        {/* Metrics Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="terminal-window border border-terminal-green/20 p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart className="h-5 w-5 text-terminal-green" />
              <span className="terminal-prompt">&gt; metrics.display()</span>
            </div>
            <h2 className="text-2xl font-bold text-terminal-green mb-2">Resultados Mensuráveis</h2>
            <p className="text-terminal-green/80">Impacto quantificável do projeto</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {study.metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="terminal-window border border-terminal-green/20 p-6 text-center hover:border-terminal-green/40 transition-all duration-300"
              >
                <div className="text-3xl font-bold text-terminal-green mb-2">
                  {metric.value}
                </div>
                <div className="text-sm text-terminal-green/80 mb-2">
                  {metric.label}
                </div>
                <div className="text-xs text-green-400 font-medium mb-3">
                  {metric.improvement}
                </div>
                <div className="text-xs text-terminal-green/60 leading-relaxed">
                  {metric.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Challenge & Solution */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Challenge */}
            <div className="terminal-window border border-terminal-green/20 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-5 w-5 text-red-400" />
                <span className="terminal-prompt">&gt; challenge.analyze()</span>
              </div>
              <h3 className="text-xl font-bold text-terminal-green mb-4">O Desafio</h3>
              <p className="text-terminal-green/80 leading-relaxed mb-6">
                {study.challenge}
              </p>

              <div className="space-y-3">
                <h4 className="font-bold text-terminal-green/90">Principais Obstáculos:</h4>
                {study.challenges.map((challenge, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">▸</span>
                    <span className="text-terminal-green/80 text-sm">{challenge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Solution */}
            <div className="terminal-window border border-terminal-green/20 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="h-5 w-5 text-yellow-400" />
                <span className="terminal-prompt">&gt; solution.implement()</span>
              </div>
              <h3 className="text-xl font-bold text-terminal-green mb-4">A Solução</h3>
              <p className="text-terminal-green/80 leading-relaxed mb-6">
                {study.solution}
              </p>

              <div className="space-y-3">
                <h4 className="font-bold text-terminal-green/90">Principais Aprendizados:</h4>
                {study.learnings.map((learning, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">▸</span>
                    <span className="text-terminal-green/80 text-sm">{learning}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Results */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12"
        >
          <div className="terminal-window border border-terminal-green/20 p-6">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="terminal-prompt">&gt; results.summary()</span>
            </div>

            <h2 className="text-2xl font-bold text-terminal-green mb-6">Resultados Alcançados</h2>

            <div className="grid gap-4 md:grid-cols-2">
              {study.results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-terminal-green/5 border border-terminal-green/20 rounded"
                >
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-terminal-green/90">{result}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Navigation */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link href="/case-studies">
              <Button className="terminal-button group w-full sm:w-auto">
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                <span className="terminal-prompt">&gt; mais case studies</span>
              </Button>
            </Link>

            <div className="flex gap-4">
              {study.githubUrl && (
                <Link href={study.githubUrl} target="_blank">
                  <Button variant="outline" className="terminal-button-outline group">
                    <Github className="h-4 w-4 mr-2" />
                    <span className="terminal-prompt">&gt; código</span>
                  </Button>
                </Link>
              )}

              <Link href="/blog">
                <Button variant="outline" className="terminal-button-outline group">
                  <span className="terminal-prompt">&gt; blog técnico</span>
                  <ExternalLink className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
