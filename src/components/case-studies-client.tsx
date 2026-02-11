import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Cloud, Code2, Database, Shield, Tag, Terminal, TrendingUp, Users, Zap } from 'lucide-react';
import { useState } from 'react';

interface CaseStudy {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    challenge: string;
    solution: string;
    results: string[];
    technologies: string[];
    metrics: {
        label: string;
        value: string;
        improvement: string;
    }[];
    duration: string;
    teamSize: string;
    category: 'backend' | 'fullstack' | 'architecture' | 'optimization';
    featured: boolean;
    githubUrl?: string;
    liveUrl?: string;
    image?: string;
}

const caseStudies: CaseStudy[] = [
    {
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
            { label: 'Tempo de Sincronização', value: '<2min', improvement: '90% redução' },
            { label: 'Disponibilidade', value: '99.9%', improvement: '40% aumento' },
            { label: 'Débito Técnico', value: '100%', improvement: '100%' }
        ],
        duration: '1 semana',
        teamSize: '1 desenvolvedor',
        category: 'backend',
        featured: true
    },
];

const categories = {
    backend: { label: 'Backend', icon: Database, color: 'text-blue-400' },
    fullstack: { label: 'Full Stack', icon: Code2, color: 'text-green-400' },
    architecture: { label: 'Arquitetura', icon: Cloud, color: 'text-purple-400' },
    optimization: { label: 'Otimização', icon: Zap, color: 'text-yellow-400' }
};

export default function CaseStudiesPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

    const filteredStudies = caseStudies.filter(study => {
        const matchesCategory = selectedCategory === 'all' || study.category === selectedCategory;
        const matchesFeatured = !showFeaturedOnly || study.featured;

        return matchesCategory && matchesFeatured;
    });

    const featuredStudies = caseStudies.filter(study => study.featured);

    return (
        <div className="min-h-screen bg-background text-vesper-orange font-mono selection:bg-vesper-orange selection:text-black">
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-scanline animate-scanline opacity-[0.02]"></div>
                <div className="absolute inset-0 bg-glow opacity-50"></div>
            </div>

            <Header />

            <main className="container mx-auto px-4 py-12">
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <div className="terminal-window border border-vesper-orange/20 p-8">
                        <div className="flex items-center gap-2 mb-4">
                            <Shield className="h-6 w-6 text-vesper-orange" />
                            <span className="terminal-prompt text-lg">&gt; case_studies.load()</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-vesper-orange mb-4">
                            Case Studies
                        </h1>
                        <p className="text-xl text-vesper-orange/80 leading-relaxed mb-6">
                            Projetos reais que demonstram expertise técnica, resolução de problemas complexos
                            e impacto mensurável nos negócios.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-green-400" />
                                <span className="text-vesper-orange/80">Resultados Mensuráveis</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Code2 className="h-4 w-4 text-blue-400" />
                                <span className="text-vesper-orange/80">Soluções Técnicas</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-purple-400" />
                                <span className="text-vesper-orange/80">Impacto no Negócio</span>
                            </div>
                        </div>
                    </div>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-16"
                >
                    <div className="terminal-window border border-vesper-orange/20 p-6 mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <Tag className="h-5 w-5 text-vesper-orange" />
                            <span className="terminal-prompt">&gt; featured_projects.highlight()</span>
                        </div>
                        <h2 className="text-2xl font-bold text-vesper-orange mb-2">Projetos em Destaque</h2>
                        <p className="text-vesper-orange/80">Casos de maior impacto e complexidade técnica</p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2">
                        {featuredStudies.map((study, index) => {
                            const CategoryIcon = categories[study.category].icon;
                            return (
                                <motion.div
                                    key={study.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="terminal-window border border-vesper-orange/20 p-6 hover:border-vesper-orange/40 transition-all duration-300 group"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <CategoryIcon className={`h-5 w-5 ${categories[study.category].color}`} />
                                            <span className="text-sm text-vesper-orange/60 uppercase tracking-wider">
                                                {categories[study.category].label}
                                            </span>
                                        </div>
                                        <div className="px-2 py-1 bg-vesper-orange/10 border border-vesper-orange/20 rounded text-xs text-vesper-orange/80">
                                            Featured
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-vesper-orange mb-2 group-hover:text-vesper-orange/80 transition-colors">
                                        {study.title}
                                    </h3>
                                    <p className="text-vesper-orange/60 font-medium mb-4">
                                        {study.subtitle}
                                    </p>
                                    <p className="text-vesper-orange/80 mb-6 leading-relaxed">
                                        {study.description}
                                    </p>

                                    <div className="grid grid-cols-3 gap-4 mb-6">
                                        {study.metrics.map((metric, idx) => (
                                            <div key={idx} className="text-center">
                                                <div className="text-lg font-bold text-vesper-orange">
                                                    {metric.value}
                                                </div>
                                                <div className="text-xs text-vesper-orange/60">
                                                    {metric.label}
                                                </div>
                                                <div className="text-xs text-green-400">
                                                    {metric.improvement}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {study.technologies.slice(0, 4).map(tech => (
                                            <span
                                                key={tech}
                                                className="px-2 py-1 text-xs bg-vesper-orange/10 text-vesper-orange/80 border border-vesper-orange/20 rounded"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {study.technologies.length > 4 && (
                                            <span className="px-2 py-1 text-xs text-vesper-orange/60">
                                                +{study.technologies.length - 4}
                                            </span>
                                        )}
                                    </div>

                                    <a href={`/case-studies/${study.id}`}>
                                        <Button className="terminal-button w-full group">
                                            <span className="terminal-prompt">&gt; ver detalhes</span>
                                            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </a>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-12"
                >
                    <div className="terminal-window border border-vesper-orange/20 p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Terminal className="h-5 w-5 text-vesper-orange" />
                            <span className="terminal-prompt">&gt; filter.apply()</span>
                        </div>

                        <div className="flex flex-wrap gap-4 items-center">
                            <div className="flex flex-wrap gap-2">
                                <Button
                                    variant={selectedCategory === 'all' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setSelectedCategory('all')}
                                    className={selectedCategory === 'all' ? 'terminal-button' : 'terminal-button-outline'}
                                >
                                    Todos
                                </Button>
                                {Object.entries(categories).map(([key, { label, icon: Icon, color }]) => (
                                    <Button
                                        key={key}
                                        variant={selectedCategory === key ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setSelectedCategory(key)}
                                        className={selectedCategory === key ? 'terminal-button' : 'terminal-button-outline'}
                                    >
                                        <Icon className={`h-4 w-4 mr-1 ${color}`} />
                                        {label}
                                    </Button>
                                ))}
                            </div>

                            <div className="border-l border-vesper-orange/20 pl-4">
                                <Button
                                    variant={showFeaturedOnly ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                                    className={showFeaturedOnly ? 'terminal-button' : 'terminal-button-outline'}
                                >
                                    <Tag className="h-4 w-4 mr-1" />
                                    Apenas Destacados
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <div className="grid gap-6 md:grid-cols-2">
                        {filteredStudies.map((study, index) => {
                            const CategoryIcon = categories[study.category].icon;
                            return (
                                <motion.article
                                    key={study.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="terminal-window border border-vesper-orange/20 p-6 hover:border-vesper-orange/40 transition-all duration-300 group"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <CategoryIcon className={`h-4 w-4 ${categories[study.category].color}`} />
                                            <span className="text-xs text-vesper-orange/60 uppercase tracking-wider">
                                                {categories[study.category].label}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-vesper-orange/60">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                <span>{study.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Users className="h-3 w-3" />
                                                <span>{study.teamSize}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold text-vesper-orange mb-2 group-hover:text-vesper-orange/80 transition-colors">
                                        {study.title}
                                    </h3>
                                    <p className="text-vesper-orange/60 text-sm font-medium mb-3">
                                        {study.subtitle}
                                    </p>
                                    <p className="text-vesper-orange/80 mb-4 leading-relaxed text-sm">
                                        {study.description}
                                    </p>

                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {study.technologies.slice(0, 3).map(tech => (
                                            <span
                                                key={tech}
                                                className="px-2 py-1 text-xs bg-vesper-orange/10 text-vesper-orange/80 border border-vesper-orange/20 rounded"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {study.technologies.length > 3 && (
                                            <span className="px-2 py-1 text-xs text-vesper-orange/60">
                                                +{study.technologies.length - 3}
                                            </span>
                                        )}
                                    </div>

                                    <a href={`/case-studies/${study.id}`}>
                                        <Button className="terminal-button w-full group">
                                            <span className="terminal-prompt">&gt; ver case study</span>
                                            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </a>
                                </motion.article>
                            );
                        })}
                    </div>

                    {filteredStudies.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="terminal-window border border-vesper-orange/20 p-8 text-center"
                        >
                            <Terminal className="h-12 w-12 text-vesper-orange/40 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-vesper-orange/80 mb-2">
                                Nenhum case study encontrado
                            </h3>
                            <p className="text-vesper-orange/60">
                                Tente ajustar os filtros selecionados.
                            </p>
                            <div className="mt-4 text-vesper-orange/40 text-sm">
                                <span className="terminal-prompt">$</span> find ./case-studies -type f | grep &quot;{selectedCategory}&quot; | wc -l
                                <br />
                                <span className="text-vesper-orange/60">0</span>
                            </div>
                        </motion.div>
                    )}
                </motion.section>
            </main>
        </div>
    );
}
