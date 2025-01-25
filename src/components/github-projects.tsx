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
          className="flex flex-col group hover:scale-105 transition-all duration-300 bg-zinc-800/50 border-zinc-800/50 backdrop-blur-sm hover:bg-zinc-800/50"
        >
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-zinc-100 group-hover:text-blue-400 transition-colors">
              {project.name}
            </CardTitle>
            <CardDescription className="text-sm text-zinc-400 line-clamp-2">
              {project.description || "No description provided"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex flex-wrap gap-2">
              {project.topics.map((topic: string) => (
                <Badge
                  key={topic}
                  variant="secondary"
                  className="text-xs bg-blue-950/50 text-blue-400 hover:bg-blue-900/50 border border-blue-800/50"
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center text-sm text-zinc-400 border-t border-zinc-800/50 pt-4">
            <div className="flex items-center gap-4">
              {[
                { Icon: Star, count: project.stargazers_count, label: "stars" },
                { Icon: GitFork, count: project.forks_count, label: "forks" },
                { Icon: Eye, count: project.watchers_count, label: "watchers" },
              ].map(({ Icon, count, label }) => (
                <span key={label} className="flex items-center gap-1 group/stat">
                  <Icon className="h-4 w-4 group-hover/stat:text-blue-400 transition-colors" />
                  <span className="group-hover/stat:text-blue-400 transition-colors">{count}</span>
                  <span className="sr-only">{label}</span>
                </span>
              ))}
            </div>
            <Link
              href={project.html_url}
              target="_blank"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              View Project
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

