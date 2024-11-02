import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, GitFork, Star } from "lucide-react"
import Link from "next/link"

async function fetchGitHubProjects(username: string) {
  const response = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=9`, { next: { revalidate: 3600 } })
  if (!response.ok) {
    throw new Error('Failed to fetch projects')
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
        <Card key={project.id} className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">{project.name}</CardTitle>
            <CardDescription className="text-sm text-zinc-500 line-clamp-2">{project.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex flex-wrap gap-2">
              {project.topics.map((topic: string) => (
                <Badge key={topic} variant="secondary" className="text-xs">
                  {topic}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center text-sm text-zinc-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                {project.stargazers_count}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="h-4 w-4" />
                {project.forks_count}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {project.watchers_count}
              </span>
            </div>
            <Link href={project.html_url} target="_blank" className="text-blue-600 hover:underline">
              View Project
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
