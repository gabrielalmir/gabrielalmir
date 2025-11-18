'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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

// Featured projects with enhanced descriptions and impact metrics
const featuredProjects = {
  'manuvi': {
    priority: 1,
    category: 'backend',
    impact: 'Plataforma SaaS industrial com Clean Architecture e DDD',
    highlights: ['Clean Architecture', 'DDD', 'FastAPI', 'Escalabilidade'],
    icon: Award
  },
  'techfinance-lastdance-api': {
    priority: 2,
    category: 'cloud',
    impact: 'API serverless com AWS Lambda, DynamoDB e S3 para escalabilidade automática',
    highlights: ['AWS Lambda', 'DynamoDB', 'Serverless', 'TypeScript'],
    icon: Cloud
  },
  'techfinance-previsao': {
    priority: 3,
    category: 'ai',
    impact: 'Modelo de ML para previsão de séries temporais usando Python/Prophet',
    highlights: ['Machine Learning', 'Prophet', 'Python', 'Previsões'],
    icon: Brain
  },
  'd4sign-node-sdk': {
    priority: 4,
    category: 'opensource',
    impact: 'SDK open-source para integração com API de assinatura digital',
    highlights: ['Open Source', 'SDK', 'TypeScript', 'Integração'],
    icon: Code
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
      className={`group relative overflow-hidden transition-all duration-300 h-full flex flex-col ${
        isFeatured
          ? 'border-2 border-vesper-orange/50 bg-gradient-to-br from-vesper-orange/10 via-vesper-orange/5 to-background shadow-lg shadow-vesper-orange/10 hover:shadow-xl hover:shadow-vesper-orange/20 hover:border-vesper-orange'
          : 'border border-vesper-orange/20 bg-background hover:border-vesper-orange/40 hover:bg-vesper-orange/5'
      }`}
    >
      {/* Featured badge and glow effect */}
      {isFeatured && (
        <>
          <div className="absolute top-0 right-0 w-24 h-24 bg-vesper-orange/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-vesper-orange text-black border-0 text-xs font-bold shadow-lg">
              <Award className="h-3 w-3 mr-1" />
              Destaque
            </Badge>
          </div>
        </>
      )}

      <CardHeader className="pb-4 space-y-3">
        {/* Icon and Title - Enhanced */}
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg transition-all ${
            isFeatured
              ? 'bg-vesper-orange/20 group-hover:bg-vesper-orange/30'
              : 'bg-vesper-orange/10 group-hover:bg-vesper-orange/20'
          }`}>
            <IconComponent className={`h-5 w-5 transition-transform group-hover:scale-110 ${
              isFeatured ? 'text-vesper-orange' : 'text-vesper-orange/80'
            }`} />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className={`text-base font-bold leading-tight transition-colors group-hover:text-vesper-orange ${
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

        {/* Description - More prominent */}
        <CardDescription className={`text-sm leading-relaxed min-h-[3rem] ${
          isFeatured ? 'text-foreground/90' : 'text-foreground/70'
        }`}>
          {featuredInfo?.impact || project.description || "Projeto sem descrição"}
        </CardDescription>

        {/* Highlights badges - Only for featured */}
        {isFeatured && featuredInfo?.highlights && (
          <div className="flex flex-wrap gap-1.5">
            {featuredInfo.highlights.map((highlight) => (
              <Badge
                key={highlight}
                variant="outline"
                className="text-xs border-vesper-orange/40 text-vesper-orange bg-vesper-orange/10 font-medium"
              >
                {highlight}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent className="flex-grow pb-4">
        {/* Topics - Cleaner display */}
        {project.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.topics.slice(0, isFeatured ? 5 : 4).map((topic: string) => (
              <Badge
                key={topic}
                variant="outline"
                className="text-xs border-vesper-orange/20 text-vesper-orange/60 hover:text-vesper-orange hover:border-vesper-orange/40 transition-colors font-mono"
              >
                {topic}
              </Badge>
            ))}
            {project.topics.length > (isFeatured ? 5 : 4) && (
              <Badge variant="outline" className="text-xs border-vesper-orange/20 text-vesper-orange/40">
                +{project.topics.length - (isFeatured ? 5 : 4)}
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className={`flex justify-between items-center text-sm border-t pt-4 ${
        isFeatured ? 'border-vesper-orange/30' : 'border-vesper-orange/20'
      }`}>
        {/* Stats - Better spacing and hierarchy */}
        <div className="flex items-center gap-3">
          {[
            { Icon: Star, count: project.stargazers_count, label: "stars" },
            { Icon: GitFork, count: project.forks_count, label: "forks" },
          ].map(({ Icon, count, label }) => (
            <div key={label} className="flex items-center gap-1 group/stat">
              <Icon className={`h-3.5 w-3.5 transition-colors ${
                isFeatured
                  ? 'text-vesper-orange/70 group-hover/stat:text-vesper-orange'
                  : 'text-vesper-orange/50 group-hover/stat:text-vesper-orange/80'
              }`} />
              <span className={`text-xs font-medium transition-colors ${
                isFeatured
                  ? 'text-vesper-orange/80 group-hover/stat:text-vesper-orange'
                  : 'text-vesper-orange/60 group-hover/stat:text-vesper-orange/80'
              }`}>
                {count}
              </span>
            </div>
          ))}
        </div>

        {/* View link - More prominent */}
        <Link
          href={project.html_url}
          target="_blank"
          className={`flex items-center gap-1.5 font-medium transition-all group/link ${
            isFeatured
              ? 'text-vesper-orange hover:text-vesper-orange/80'
              : 'text-vesper-orange/70 hover:text-vesper-orange'
          }`}
        >
          <span className="text-xs">Ver projeto</span>
          <ExternalLink className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
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

  // Fetch projects on component mount
  useEffect(() => {
    fetchGitHubProjects(username)
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [username]);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Apply category filter
    if (activeFilter !== 'all') {
      filtered = projects.filter(project => {
        const featuredInfo = featuredProjects[project.name as keyof typeof featuredProjects];

        // Check if project is in featured list with matching category
        if (featuredInfo?.category === activeFilter) {
          return true;
        }

        // For opensource filter, also check topics and other indicators
        if (activeFilter === 'opensource') {
          const opensourceIndicators = [
            'open-source', 'opensource', 'sdk', 'library', 'framework',
            'tool', 'cli', 'api', 'package', 'npm', 'typescript', 'javascript'
          ];

          // Check if project has opensource-related topics
          const hasOpensourceTopics = project.topics.some(topic =>
            opensourceIndicators.some(indicator =>
              topic.toLowerCase().includes(indicator.toLowerCase())
            )
          );

          // Check if project name or description suggests it's a library/tool
          const nameIndicatesOpensource = /-sdk$|-api$|-lib$|-cli$|-tool$/.test(project.name.toLowerCase());
          const descriptionIndicatesOpensource = project.description &&
            opensourceIndicators.some(indicator =>
              project.description.toLowerCase().includes(indicator.toLowerCase())
            );

          return hasOpensourceTopics || nameIndicatesOpensource || descriptionIndicatesOpensource;
        }

        // For other categories, check topics for relevant keywords
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

    // Sort by priority (featured first), then by stars
    return filtered.sort((a, b) => {
      const aFeatured = featuredProjects[a.name as keyof typeof featuredProjects];
      const bFeatured = featuredProjects[b.name as keyof typeof featuredProjects];

      if (aFeatured && !bFeatured) return -1;
      if (!aFeatured && bFeatured) return 1;
      if (aFeatured && bFeatured) return aFeatured.priority - bFeatured.priority;

      return b.stargazers_count - a.stargazers_count;
    });
  }, [projects, activeFilter]);

  // Limit displayed projects
  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="terminal-window border border-vesper-orange/20 p-6 animate-pulse">
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
    <div className="space-y-8">
      {/* Filter Buttons - Enhanced visual hierarchy */}
      <div className="flex flex-wrap gap-3 justify-center">
        {categoryFilters.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={activeFilter === id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(id)}
            className={`group transition-all duration-200 ${
              activeFilter === id
                ? 'bg-vesper-orange text-black border-vesper-orange shadow-lg shadow-vesper-orange/20 hover:shadow-xl hover:shadow-vesper-orange/30'
                : 'border-vesper-orange/30 text-vesper-orange/70 hover:border-vesper-orange hover:text-vesper-orange hover:bg-vesper-orange/10'
            }`}
          >
            <Icon className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
            <span className="font-medium">{label}</span>
          </Button>
        ))}
      </div>

      {/* Projects Grid - Improved spacing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Show More/Less Button - Better prominence */}
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

      {/* Results Summary - Subtle but informative */}
      <div className="text-center text-vesper-orange/50 text-sm font-mono">
        {displayedProjects.length} de {filteredProjects.length} projetos
        {activeFilter !== 'all' && ` · ${categoryFilters.find(f => f.id === activeFilter)?.label}`}
      </div>
    </div>
  );
}
