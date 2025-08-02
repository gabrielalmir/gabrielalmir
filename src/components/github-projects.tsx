'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Brain, Cloud, Code, Database, ExternalLink, Eye, GitFork, Star, Zap } from "lucide-react";
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
      className={`terminal-window border group hover:border-terminal-green transition-all duration-300 relative overflow-hidden ${
        isFeatured
          ? 'border-terminal-green/40 bg-terminal-green/5 ring-1 ring-terminal-green/20'
          : 'border-terminal-green/20 bg-zinc-950'
      }`}
    >
      {isFeatured && (
        <div className="absolute top-2 right-2 z-10">
          <Badge className="bg-terminal-green/20 text-terminal-green border-terminal-green/40 text-xs">
            <Award className="h-3 w-3 mr-1" />
            Destaque
          </Badge>
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <IconComponent className="h-5 w-5 text-terminal-green" />
            <CardTitle className="text-lg font-bold group-hover:text-terminal-green transition-colors">
              <span className="terminal-prompt">&gt; {project.name}</span>
            </CardTitle>
          </div>
        </div>

        <CardDescription className="text-sm text-terminal-green/80 leading-relaxed">
          {featuredInfo?.impact || project.description || "No description provided"}
        </CardDescription>

        {featuredInfo?.highlights && (
          <div className="flex flex-wrap gap-1 mt-2">
            {featuredInfo.highlights.map((highlight) => (
              <Badge
                key={highlight}
                variant="outline"
                className="text-xs border-terminal-green/30 text-terminal-green/90 bg-terminal-green/10"
              >
                {highlight}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {project.topics.slice(0, 4).map((topic: string) => (
            <Badge
              key={topic}
              variant="outline"
              className="text-xs border-terminal-green/20 text-terminal-green/70 hover:text-terminal-green hover:border-terminal-green transition-colors"
            >
              <span className="terminal-prompt">&gt; {topic}</span>
            </Badge>
          ))}
          {project.topics.length > 4 && (
            <Badge variant="outline" className="text-xs border-terminal-green/20 text-terminal-green/50">
              +{project.topics.length - 4}
            </Badge>
          )}
        </div>

        {project.language && (
          <div className="mt-3 text-xs text-terminal-green/60">
            <span className="terminal-prompt">&gt; {project.language}</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between items-center text-sm text-terminal-green/60 border-t border-terminal-green/20 pt-4">
        <div className="flex items-center gap-4">
          {[
            { Icon: Star, count: project.stargazers_count, label: "stars" },
            { Icon: GitFork, count: project.forks_count, label: "forks" },
            { Icon: Eye, count: project.watchers_count, label: "watchers" },
          ].map(({ Icon, count, label }) => (
            <span key={label} className="flex items-center gap-1 group/stat">
              <Icon className="h-4 w-4 group-hover/stat:text-terminal-green transition-colors" />
              <span className="group-hover/stat:text-terminal-green transition-colors">{count}</span>
              <span className="sr-only">{label}</span>
            </span>
          ))}
        </div>

        <Link
          href={project.html_url}
          target="_blank"
          className="flex items-center gap-1 text-terminal-green/80 hover:text-terminal-green font-medium transition-colors group/link"
        >
          <span className="terminal-prompt">&gt; Ver</span>
          <ExternalLink className="h-3 w-3 group-hover/link:scale-110 transition-transform" />
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
          <div key={i} className="terminal-window border border-terminal-green/20 p-6 animate-pulse">
            <div className="h-4 bg-terminal-green/20 rounded mb-2"></div>
            <div className="h-3 bg-terminal-green/10 rounded mb-4"></div>
            <div className="flex gap-2 mb-4">
              <div className="h-5 bg-terminal-green/10 rounded w-16"></div>
              <div className="h-5 bg-terminal-green/10 rounded w-20"></div>
            </div>
            <div className="h-8 bg-terminal-green/10 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        {categoryFilters.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={activeFilter === id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(id)}
            className={`terminal-button-outline group ${
              activeFilter === id
                ? 'bg-terminal-green/20 border-terminal-green text-terminal-green'
                : 'hover:border-terminal-green hover:text-terminal-green'
            }`}
          >
            <Icon className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
            <span className="terminal-prompt">&gt; {label}</span>
          </Button>
        ))}
      </div>

      {/* Projects Grid */}
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

      {/* Show More/Less Button */}
      {filteredProjects.length > 6 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="terminal-button-outline group"
          >
            <span className="terminal-prompt">
              &gt; {showAll ? 'MOSTRAR MENOS' : `VER MAIS (${filteredProjects.length - 6} projetos)`}
            </span>
            <Code className="h-4 w-4 ml-2 group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      )}

      {/* Results Summary */}
      <div className="text-center text-terminal-green/60 text-sm">
        <span className="terminal-prompt">
          &gt; Exibindo {displayedProjects.length} de {filteredProjects.length} projetos
          {activeFilter !== 'all' && ` na categoria "${categoryFilters.find(f => f.id === activeFilter)?.label}"`}
        </span>
      </div>
    </div>
  );
}
