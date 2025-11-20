'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AmazonwebservicesOriginal, DockerOriginal, MongodbOriginal, NestjsOriginal, NextjsOriginal, NodejsOriginal, PostgresqlOriginal, PythonOriginal, RabbitmqOriginal, ReactOriginal, RedisOriginal, TypescriptOriginal } from "devicons-react";
import { Award, Brain, Cloud, Code, Database, ExternalLink, GitFork, Star, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

async function fetchGitHubProjects(username: string) {
  const response = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=20&direction=desc`, {
    next: { revalidate: 3600 },
  })
  if (!response.ok) {
    throw new Error("Failed to fetch projects")
  }
  return response.json()
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
  "typescript": TypescriptOriginal,
  "nodejs": NodejsOriginal,
  "nestjs": NestjsOriginal,
  "python": PythonOriginal,
  "aws": AmazonwebservicesOriginal,
  "docker": DockerOriginal,
  "react": ReactOriginal,
  "nextjs": NextjsOriginal,
  "postgresql": PostgresqlOriginal,
  "mongodb": MongodbOriginal,
  "redis": RedisOriginal,
  "rabbitmq": RabbitmqOriginal,
}

const featuredProjects = {
  'manuvi': {
    priority: 1,
    category: 'backend',
    impact: 'Plataforma SaaS industrial completa com Clean Architecture, DDD e FastAPI para gestão de manutenções',
    highlights: ['Clean Architecture', 'DDD', 'FastAPI', 'PostgreSQL', 'JWT'],
    icon: Award,
    techStack: ['python', 'postgresql', 'docker', 'fastapi']
  },
  'techfinance-lastdance-api': {
    priority: 2,
    category: 'cloud',
    impact: 'API serverless moderna com AWS Lambda, DynamoDB e S3 para escalabilidade automática e alta disponibilidade',
    highlights: ['AWS Lambda', 'DynamoDB', 'S3', 'Serverless', 'TypeScript'],
    icon: Cloud,
    techStack: ['aws', 'typescript', 'nodejs']
  },
  'codebeats': {
    priority: 3,
    category: 'backend',
    impact: 'Plataforma de streaming de música com API REST robusta, arquitetura escalável e sistema de autenticação',
    highlights: ['NestJS', 'TypeScript', 'REST API', 'PostgreSQL', 'Docker'],
    icon: Database,
    techStack: ['nestjs', 'typescript', 'postgresql', 'docker']
  },
  'bitqueue': {
    priority: 4,
    category: 'backend',
    impact: 'Sistema de mensageria confiável e escalável para desacoplar microsserviços e aplicações serverless',
    highlights: ['Message Queue', 'TypeScript', 'NestJS', 'Microsserviços', 'Redis'],
    icon: Zap,
    techStack: ['typescript', 'nestjs', 'redis', 'rabbitmq']
  },
  'techfinance-previsao': {
    priority: 5,
    category: 'ai',
    impact: 'Modelo de Machine Learning para previsão de séries temporais financeiras usando Python/Prophet',
    highlights: ['Machine Learning', 'Prophet', 'Python', 'Previsões', 'Pandas'],
    icon: Brain,
    techStack: ['python']
  },
  'd4sign-node-sdk': {
    priority: 6,
    category: 'opensource',
    impact: 'SDK open-source completo para integração com API de assinatura digital D4Sign',
    highlights: ['Open Source', 'SDK', 'TypeScript', 'NPM', 'API Client'],
    icon: Code,
    techStack: ['typescript', 'nodejs']
  }
};

const categoryFilters = [
  { id: 'all', label: 'Todos', icon: Code },
  { id: 'backend', label: 'Backend/APIs', icon: Database },
  { id: 'cloud', label: 'Cloud/AWS', icon: Cloud },
  { id: 'ai', label: 'IA/ML', icon: Brain },
  { id: 'opensource', label: 'Open Source', icon: Zap },
];

function ProjectCard({ project, isFeatured = false }: { project: GitHubProject, isFeatured?: boolean }) {
  const featuredInfo = featuredProjects[project.name as keyof typeof featuredProjects];
  const IconComponent = featuredInfo?.icon || Code;

  return (
    <Card
      className={`group relative overflow-hidden transition-all duration-500 h-full flex flex-col ${
        isFeatured
          ? 'border border-vesper-orange/40 bg-gradient-to-br from-vesper-orange/10 via-vesper-orange/5 to-background hover:border-vesper-orange hover:shadow-[0_0_30px_-10px_rgba(255,199,153,0.3)]'
          : 'border border-vesper-orange/10 bg-background/50 hover:border-vesper-orange/30 hover:bg-vesper-orange/5'
      }`}
    >

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
          <div className={`p-2.5 rounded-xl transition-all duration-300 ${
            isFeatured
              ? 'bg-vesper-orange/20 text-vesper-orange group-hover:scale-110 group-hover:rotate-3'
              : 'bg-vesper-orange/10 text-vesper-orange/70 group-hover:text-vesper-orange group-hover:bg-vesper-orange/20'
          }`}>
            <IconComponent className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0 pt-1">
            <CardTitle className={`text-lg font-bold leading-tight transition-colors group-hover:text-vesper-orange ${
              isFeatured ? 'text-vesper-orange' : 'text-foreground'
            }`}>
              {project.name}
            </CardTitle>
            {project.language && (
              <p className="text-xs text-vesper-orange/50 mt-1 font-mono">
                {project.language}
              </p>
            )}
          </div>
        </div>


        <CardDescription className={`text-sm leading-relaxed min-h-[3rem] ${
          isFeatured ? 'text-foreground/90' : 'text-foreground/60'
        }`}>
          {featuredInfo?.impact || project.description || "Projeto sem descrição"}
        </CardDescription>


        {isFeatured && featuredInfo?.techStack && (
             <div className="flex gap-2 pt-1">
                {featuredInfo.techStack.map(tech => {
                    // @ts-ignore
                    const TechIcon = techIcons[tech];
                    if(!TechIcon) return null;
                    return (
                        <div key={tech} className="p-1.5 rounded bg-background/50 border border-vesper-orange/10" title={tech}>
                            <TechIcon size={14} className="opacity-80 group-hover:opacity-100 transition-opacity" />
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

      <CardFooter className={`flex justify-between items-center text-sm border-t pt-4 z-10 ${
        isFeatured ? 'border-vesper-orange/20' : 'border-vesper-orange/10'
      }`}>

        <div className="flex items-center gap-4">
          {[
            { Icon: Star, count: project.stargazers_count, label: "stars" },
            { Icon: GitFork, count: project.forks_count, label: "forks" },
          ].map(({ Icon, count, label }) => (
            <div key={label} className="flex items-center gap-1.5 group/stat">
              <Icon className={`h-3.5 w-3.5 transition-colors ${
                isFeatured
                  ? 'text-vesper-orange/70 group-hover/stat:text-vesper-orange'
                  : 'text-vesper-orange/40 group-hover/stat:text-vesper-orange/80'
              }`} />
              <span className={`text-xs font-mono transition-colors ${
                isFeatured
                  ? 'text-vesper-orange/80 group-hover/stat:text-vesper-orange'
                  : 'text-vesper-orange/50 group-hover/stat:text-vesper-orange/80'
              }`}>
                {count}
              </span>
            </div>
          ))}
        </div>


        <Link
          href={project.html_url}
          target="_blank"
          className={`flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider transition-all group/link ${
            isFeatured
              ? 'text-vesper-orange hover:text-vesper-orange/80'
              : 'text-vesper-orange/60 hover:text-vesper-orange'
          }`}
        >
          <span>Code</span>
          <ExternalLink className="h-3 w-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
        </Link>
      </CardFooter>
    </Card>
  );
}

export default function GitHubProjects({ username }: { username: string }) {
  const [projects, setProjects] = useState<GitHubProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchGitHubProjects(username)
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [username]);

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
        {[...Array(6)].map((_, i) => (
          <div key={i} className="terminal-window border border-vesper-orange/20 p-4 sm:p-6 animate-pulse">
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
    <div className="space-y-6 sm:space-y-8 w-full">

      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
        {categoryFilters.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={activeFilter === id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(id)}
            className={`group transition-all duration-200 text-xs sm:text-sm ${
              activeFilter === id
                ? 'bg-vesper-orange text-black border-vesper-orange shadow-lg shadow-vesper-orange/20 hover:shadow-xl hover:shadow-vesper-orange/30'
                : 'border-vesper-orange/30 text-vesper-orange/70 hover:border-vesper-orange hover:text-vesper-orange hover:bg-vesper-orange/10'
            }`}
          >
            <Icon className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 group-hover:scale-110 transition-transform flex-shrink-0" />
            <span className="font-medium whitespace-nowrap">{label}</span>
          </Button>
        ))}
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {displayedProjects.map((project: GitHubProject) => {
          const isFeatured = project.name in featuredProjects;
          return (
            <ProjectCard
              key={project.id}
              project={project}
              isFeatured={isFeatured}
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
              {showAll ? 'Mostrar menos' : `Ver mais ${filteredProjects.length - 6} projetos`}
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
