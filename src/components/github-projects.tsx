import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LazyDevIcon } from "@/components/lazy-devicon";
import { Award, ArrowRight, Brain, Cloud, Code, Database, ExternalLink, GitFork, Star, Zap } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

async function fetchGitHubProjects(username: string) {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=20&direction=desc`);
    if (!response.ok) {
        throw new Error("Failed to fetch projects");
    }
    return response.json();
}

interface GitHubProject {
    id: number
    name: string
    description: string
    topics: string[]
    stargazers_count: number
    forks_count: number
    watchers_count: number
    html_url: string
    language: string
    created_at: string
    updated_at: string
}

const techIcons = {
    "typescript": "TypescriptOriginal",
    "nodejs": "NodejsOriginal",
    "nestjs": "NestjsOriginal",
    "python": "PythonOriginal",
    "aws": "AmazonwebservicesPlainWordmark",
    "docker": "DockerOriginal",
    "react": "ReactOriginal",
    "nextjs": "NextjsOriginal",
    "postgresql": "PostgresqlOriginal",
    "mongodb": "MongodbOriginal",
    "redis": "RedisOriginal",
    "rabbitmq": "RabbitmqOriginal",
    "laravel": "LaravelPlain",
}

const featuredProjects = {
    'PhotoGIMP': {
        priority: 1,
        category: 'opensource',
        impact: 'Patch open source que reorganiza o GIMP 2.10+ no layout do Photoshop — novos filtros em Python, tela inicial própria, configurações otimizadas. Mantido desde 2021, com usuários reais.',
        highlights: ['Open Source', 'Python', 'GIMP', 'Manutenção contínua desde 2021'],
        icon: Code,
        techStack: ['python']
    },
    'bitqueue': {
        priority: 2,
        category: 'backend',
        impact: 'Sistema de mensageria confiável e escalável para desacoplar microsserviços e aplicações serverless',
        highlights: ['Message Queue', 'TypeScript', 'NestJS', 'Microsserviços', 'Redis'],
        icon: Zap,
        techStack: ['typescript', 'nestjs', 'redis', 'rabbitmq']
    },
    'codebeats': {
        priority: 3,
        category: 'backend',
        impact: 'Plataforma de streaming de música com API REST robusta, arquitetura escalável e sistema de autenticação',
        highlights: ['NestJS', 'TypeScript', 'REST API', 'PostgreSQL', 'Docker'],
        icon: Database,
        techStack: ['nestjs', 'typescript', 'postgresql', 'docker']
    },
    'techfinance-previsao': {
        priority: 4,
        category: 'ai',
        impact: 'Modelo de Machine Learning para previsão de séries temporais financeiras usando Python/Prophet',
        highlights: ['Machine Learning', 'Prophet', 'Python', 'Previsões'],
        icon: Brain,
        techStack: ['python']
    },
    'd4sign-node': {
        priority: 5,
        category: 'opensource',
        impact: 'SDK open-source para integração com API de assinatura digital D4Sign',
        highlights: ['Open Source', 'SDK', 'TypeScript', 'NPM', 'API Client'],
        icon: Code,
        techStack: ['typescript', 'nodejs']
    },
    'saturno': {
        priority: 6,
        category: 'fullstack',
        impact: 'Plataforma de gestão e automação de tarefas com interface intuitiva e integrações poderosas',
        highlights: ['React.js', 'TypeScript', 'Laravel', 'PostgreSQL', 'PHP'],
        icon: Zap,
        techStack: ['typescript', 'react', 'laravel', 'postgresql']
    }
};

const dedicatedPages: Record<string, string> = {
    'saturno': 'saturno',
};

const categoryFilters = [
    { id: 'all', label: 'Todos', icon: Code },
    { id: 'backend', label: 'Backend/APIs', icon: Database },
    { id: 'cloud', label: 'Cloud/AWS', icon: Cloud },
    { id: 'ai', label: 'IA/ML', icon: Brain },
    { id: 'opensource', label: 'Open Source', icon: Zap },
];

const languageColors: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f7df1e',
    Python: '#3776ab',
    Go: '#00add8',
    Rust: '#dea584',
    Java: '#b07219',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Shell: '#89e051',
    Dockerfile: '#384d54',
};

function ProjectCard({ project, isFeatured = false, loadTechIcons = false, dedicatedPageSlug }: { project: GitHubProject, isFeatured?: boolean; loadTechIcons?: boolean; dedicatedPageSlug?: string }) {
    const featuredInfo = featuredProjects[project.name as keyof typeof featuredProjects];
    const IconComponent = featuredInfo?.icon || Code;
    const langColor = project.language ? languageColors[project.language] || '#888' : null;

    return (
        <Card
            className={`group relative overflow-hidden transition-all duration-500 h-full flex flex-col hover:-translate-y-1 ${isFeatured
                ? 'border border-vesper-orange/40 project-card-grad-featured hover:border-vesper-orange hover:shadow-[0_25px_60px_-20px_rgba(255,199,153,0.4)]'
                : 'border border-vesper-orange/10 project-card-grad hover:border-vesper-orange/35 hover:shadow-[0_20px_45px_-25px_rgba(255,199,153,0.25)]'
                }`}
        >
            <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vesper-orange/50 to-transparent ${isFeatured ? 'opacity-60' : 'opacity-0'} group-hover:opacity-100 transition-opacity`} />

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute -right-24 -top-24 w-48 h-48 bg-vesper-orange/10 blur-[50px] rounded-full"></div>
            </div>

            {isFeatured && (
                <>
                    <div className="absolute top-3 right-3 z-10">
                        <Badge className="bg-vesper-orange text-black border-0 text-[10px] font-bold shadow-lg px-2 py-0.5 tracking-wider uppercase">
                            <Award className="h-3 w-3 mr-1" />
                            Featured
                        </Badge>
                    </div>
                </>
            )}

            <CardHeader className="pb-4 space-y-4 z-10">
                <div className="flex items-start gap-4">
                    <div className={`p-2.5 rounded-xl transition-all duration-300 ${isFeatured
                        ? 'bg-vesper-orange/20 text-vesper-orange group-hover:scale-110 group-hover:rotate-3'
                        : 'bg-vesper-orange/10 text-vesper-orange/70 group-hover:text-vesper-orange group-hover:bg-vesper-orange/20'
                        }`}>
                        <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                        <CardTitle className={`text-lg font-bold leading-tight transition-colors group-hover:text-vesper-orange ${isFeatured ? 'text-vesper-orange' : 'text-foreground'
                            }`}>
                            {project.name}
                        </CardTitle>
                        {project.language && (
                            <div className="flex items-center gap-1.5 mt-1.5">
                                <span
                                    className="inline-block w-2 h-2 rounded-full"
                                    style={{ backgroundColor: langColor ?? '#888' }}
                                />
                                <p className="text-[11px] text-foreground/55 font-mono">
                                    {project.language}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <CardDescription className={`text-sm leading-relaxed min-h-[3rem] ${isFeatured ? 'text-foreground/90' : 'text-foreground/60'
                    }`}>
                    {featuredInfo?.impact || project.description || "Projeto sem descrição"}
                </CardDescription>

                {isFeatured && featuredInfo?.techStack && (
                    <div className="flex gap-2 pt-1">
                        {featuredInfo.techStack.map(tech => {
                            // @ts-expect-error - techIcons might not have all keys from techStack
                            const techIcon = techIcons[tech];
                            if (!techIcon) return null;
                            return (
                                <div key={tech} className="p-1.5 rounded bg-background/50 border border-vesper-orange/10" title={tech}>
                                    {loadTechIcons ? (
                                        <LazyDevIcon icon={techIcon} size={14} className="opacity-80 group-hover:opacity-100 transition-opacity" />
                                    ) : (
                                        <span className="inline-block h-3.5 w-3.5 rounded-sm bg-vesper-orange/20" />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}
            </CardHeader>

            <CardContent className="flex-grow pb-4 z-10">
                {project.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {project.topics.slice(0, isFeatured ? 5 : 3).map((topic: string) => (
                            <Badge
                                key={topic}
                                variant="outline"
                                className="text-[10px] border-vesper-orange/10 text-vesper-orange/50 hover:text-vesper-orange hover:border-vesper-orange/30 transition-colors font-mono bg-transparent"
                            >
                                {topic}
                            </Badge>
                        ))}
                        {project.topics.length > (isFeatured ? 5 : 3) && (
                            <Badge variant="outline" className="text-[10px] border-vesper-orange/10 text-vesper-orange/30 bg-transparent">
                                +{project.topics.length - (isFeatured ? 5 : 3)}
                            </Badge>
                        )}
                    </div>
                )}
            </CardContent>

            <CardFooter className={`flex justify-between items-center text-sm border-t pt-4 z-10 ${isFeatured ? 'border-vesper-orange/20' : 'border-vesper-orange/10'
                }`}>
                <div className="flex items-center gap-4">
                    {(project.stargazers_count > 0 || project.forks_count > 0) && [
                        { Icon: Star, count: project.stargazers_count, label: "stars" },
                        { Icon: GitFork, count: project.forks_count, label: "forks" },
                    ]
                        .filter(({ count }) => count > 0)
                        .map(({ Icon, count, label }) => (
                            <div key={label} className="flex items-center gap-1.5 group/stat">
                                <Icon className={`h-3.5 w-3.5 transition-colors ${isFeatured
                                    ? 'text-vesper-orange/70 group-hover/stat:text-vesper-orange'
                                    : 'text-vesper-orange/40 group-hover/stat:text-vesper-orange/80'
                                    }`} />
                                <span className={`text-xs font-mono tabular-nums transition-colors ${isFeatured
                                    ? 'text-vesper-orange/80 group-hover/stat:text-vesper-orange'
                                    : 'text-vesper-orange/50 group-hover/stat:text-vesper-orange/80'
                                    }`}>
                                    {count}
                                </span>
                            </div>
                        ))}
                </div>

                <div className="flex items-center gap-3">
                    {dedicatedPageSlug && (
                        <a
                            href={`/projects/${dedicatedPageSlug}`}
                            className={`flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider transition-all group/link ${isFeatured
                                ? 'text-vesper-orange hover:text-vesper-orange/80'
                                : 'text-vesper-orange/60 hover:text-vesper-orange'
                                }`}
                        >
                            <span>Saiba mais</span>
                            <ArrowRight className="h-3 w-3 group-hover/link:translate-x-0.5 transition-transform" />
                        </a>
                    )}
                    <a
                        href={project.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider transition-all group/link text-vesper-orange/40 hover:text-vesper-orange/70"
                    >
                        <span>Code</span>
                        <ExternalLink className="h-3 w-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                </div>
            </CardFooter>
        </Card>
    );
}

export default function GitHubProjects({ username, initialProjects }: { username: string; initialProjects?: GitHubProject[] }) {
    const [projects, setProjects] = useState<GitHubProject[]>(initialProjects || []);
    const [loading, setLoading] = useState(!initialProjects);
    const [activeFilter, setActiveFilter] = useState('all');
    const [showAll, setShowAll] = useState(false);
    const [loadTechIcons, setLoadTechIcons] = useState(false);
    const projectsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (initialProjects) return;
        fetchGitHubProjects(username)
            .then(setProjects)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [username, initialProjects]);

    useEffect(() => {
        if (!projectsRef.current) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    setLoadTechIcons(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "160px" }
        );

        observer.observe(projectsRef.current);
        return () => observer.disconnect();
    }, []);

    const filteredProjects = useMemo(() => {
        let filtered = projects;

        if (activeFilter !== 'all') {
            filtered = projects.filter(project => {
                const featuredInfo = featuredProjects[project.name as keyof typeof featuredProjects];

                if (featuredInfo?.category === activeFilter) {
                    return true;
                }

                if (activeFilter === 'opensource') {
                    const opensourceIndicators = [
                        'open-source', 'opensource', 'sdk', 'library', 'framework',
                        'tool', 'cli', 'api', 'package', 'npm', 'typescript', 'javascript'
                    ];

                    const hasOpensourceTopics = project.topics.some(topic =>
                        opensourceIndicators.some(indicator =>
                            topic.toLowerCase().includes(indicator.toLowerCase())
                        )
                    );

                    const nameIndicatesOpensource = /-sdk$|-api$|-lib$|-cli$|-tool$/.test(project.name.toLowerCase());
                    const descriptionIndicatesOpensource = project.description &&
                        opensourceIndicators.some(indicator =>
                            project.description.toLowerCase().includes(indicator.toLowerCase())
                        );

                    return hasOpensourceTopics || nameIndicatesOpensource || descriptionIndicatesOpensource;
                }

                if (activeFilter === 'backend') {
                    const backendKeywords = ['api', 'backend', 'server', 'node', 'express', 'fastapi', 'nest'];
                    return project.topics.some(topic =>
                        backendKeywords.some(keyword => topic.toLowerCase().includes(keyword.toLowerCase()))
                    ) || (project.description && backendKeywords.some(keyword =>
                        project.description.toLowerCase().includes(keyword.toLowerCase())
                    ));
                }

                if (activeFilter === 'cloud') {
                    const cloudKeywords = ['aws', 'cloud', 'lambda', 'serverless', 'docker', 'kubernetes'];
                    return project.topics.some(topic =>
                        cloudKeywords.some(keyword => topic.toLowerCase().includes(keyword.toLowerCase()))
                    ) || (project.description && cloudKeywords.some(keyword =>
                        project.description.toLowerCase().includes(keyword.toLowerCase())
                    ));
                }

                if (activeFilter === 'ai') {
                    const aiKeywords = ['ai', 'ml', 'machine-learning', 'artificial-intelligence', 'neural', 'model'];
                    return project.topics.some(topic =>
                        aiKeywords.some(keyword => topic.toLowerCase().includes(keyword.toLowerCase()))
                    ) || (project.description && aiKeywords.some(keyword =>
                        project.description.toLowerCase().includes(keyword.toLowerCase())
                    ));
                }

                return false;
            });
        }

        return filtered.sort((a, b) => {
            const aFeatured = featuredProjects[a.name as keyof typeof featuredProjects];
            const bFeatured = featuredProjects[b.name as keyof typeof featuredProjects];

            if (aFeatured && !bFeatured) return -1;
            if (!aFeatured && bFeatured) return 1;
            if (aFeatured && bFeatured) return aFeatured.priority - bFeatured.priority;

            return b.stargazers_count - a.stargazers_count;
        });
    }, [projects, activeFilter]);

    const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {Array.from({ length: 6 }, (_, index) => `repo-skeleton-${index}`).map((skeletonId) => (
                    <div key={skeletonId} className="terminal-window border border-vesper-orange/20 p-4 sm:p-6 animate-pulse">
                        <div className="h-4 bg-vesper-orange/20 rounded mb-2"></div>
                        <div className="h-3 bg-vesper-orange/10 rounded mb-4"></div>
                        <div className="flex gap-2 mb-4">
                            <div className="h-5 bg-vesper-orange/10 rounded w-16"></div>
                            <div className="h-5 bg-vesper-orange/10 rounded w-20"></div>
                        </div>
                        <div className="h-8 bg-vesper-orange/10 rounded"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div ref={projectsRef} className="space-y-8 sm:space-y-10 w-full">
            <div className="flex flex-wrap gap-1.5 justify-center p-1.5 rounded-full border border-vesper-orange/15 bg-background/40 backdrop-blur-sm w-fit mx-auto">
                {categoryFilters.map(({ id, label, icon: Icon }) => (
                    <Button
                        key={id}
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveFilter(id)}
                        className={`group transition-all duration-200 text-xs rounded-full px-3 sm:px-4 h-8 ${activeFilter === id
                            ? 'bg-vesper-orange text-black hover:bg-vesper-orange hover:text-black shadow-md shadow-vesper-orange/20'
                            : 'text-foreground/60 hover:text-vesper-orange hover:bg-vesper-orange/[0.08]'
                            }`}
                    >
                        <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1.5 flex-shrink-0" />
                        <span className="font-medium whitespace-nowrap">{label}</span>
                    </Button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {displayedProjects.map((project: GitHubProject) => {
                    const isFeatured = project.name in featuredProjects;
                    const dedicatedPageSlug = dedicatedPages[project.name];
                    return (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            isFeatured={isFeatured}
                            loadTechIcons={loadTechIcons}
                            dedicatedPageSlug={dedicatedPageSlug}
                        />
                    );
                })}
            </div>

            {filteredProjects.length > 6 && (
                <div className="text-center pt-4">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setShowAll(!showAll)}
                        className="group border-vesper-orange/30 text-vesper-orange hover:border-vesper-orange hover:bg-vesper-orange/10 transition-all"
                    >
                        <span className="font-medium">
                            {showAll
                                ? 'Mostrar menos'
                                : `Ver mais ${filteredProjects.length - 6} ${filteredProjects.length - 6 === 1 ? 'projeto' : 'projetos'}`}
                        </span>
                        <Code className="h-4 w-4 ml-2 group-hover:scale-110 transition-transform" />
                    </Button>
                </div>
            )}

            <div className="text-center text-vesper-orange/50 text-sm font-mono">
                {displayedProjects.length} de {filteredProjects.length} projetos
                {activeFilter !== 'all' && ` · ${categoryFilters.find(f => f.id === activeFilter)?.label}`}
            </div>
        </div>
    );
}
