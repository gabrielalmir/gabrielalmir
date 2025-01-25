import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, GitFork, Star } from "lucide-react"
import Link from "next/link"

async function fetchGitHubProjects(username: string) {
  const response = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=9&direction=desc`, {
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
}

export default async function GitHubProjects({ username }: { username: string }) {
  const projects = await fetchGitHubProjects(username)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project: GitHubProject) => (
        <Card
          key={project.id}
          className="terminal-window border border-terminal-green/20 bg-zinc-950 group hover:border-terminal-green transition-all duration-300"
        >
          <CardHeader>
            <CardTitle className="text-lg font-bold group-hover:text-terminal-green transition-colors">
              <span className="terminal-prompt">&gt; {project.name}</span>
            </CardTitle>
            <CardDescription className="text-sm text-terminal-green/60">
              {project.description || "No description provided"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex flex-wrap gap-2">
              {project.topics.map((topic: string) => (
                <Badge
                  key={topic}
                  variant="outline"
                  className="text-xs border-terminal-green/20 text-terminal-green/80 hover:text-terminal-green hover:border-terminal-green transition-colors"
                >
                  <span className="terminal-prompt">&gt; {topic}</span>
                </Badge>
              ))}
            </div>
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
              className="text-terminal-green/80 hover:text-terminal-green font-medium transition-colors"
            >
              <span className="terminal-prompt">&gt; Ver</span>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
