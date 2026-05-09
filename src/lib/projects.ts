import matter from 'gray-matter';
import fs from 'node:fs';
import path from 'node:path';

const projectsDirectory = path.join(process.cwd(), 'src', 'content', 'projects');

export interface GitHubStats {
    stars: number;
    forks: number;
    watchers: number;
    language: string | null;
    topics: string[];
    updatedAt: string;
    description: string | null;
    homepage: string | null;
    openIssues: number;
}

export interface Project {
    slug: string;
    title: string;
    subtitle: string;
    excerpt: string;
    repo: string;
    liveUrl?: string;
    tags: string[];
    category: string;
    featured: boolean;
    screenshotUrl?: string;
    date: string;
    content: string;
    githubStats?: GitHubStats;
    /** One-line problem statement shown above the README. */
    problem?: string;
    /** One-line key technical decision. */
    decision?: string;
    /** One-line measurable outcome. */
    outcome?: string;
}

export type ProjectPreview = Omit<Project, 'content' | 'githubStats'>;

function parseProjectFile(slug: string): Project | null {
    try {
        const fullPath = path.join(projectsDirectory, `${slug}.md`);
        if (!fs.existsSync(fullPath)) return null;

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            content,
            title: data.title,
            subtitle: data.subtitle || '',
            excerpt: data.excerpt || '',
            repo: data.repo,
            liveUrl: data.liveUrl,
            tags: data.tags || [],
            category: data.category || 'fullstack',
            featured: data.featured || false,
            screenshotUrl: data.screenshotUrl,
            date: data.date,
            problem: data.problem,
            decision: data.decision,
            outcome: data.outcome,
        } as Project;
    } catch {
        return null;
    }
}

export async function fetchGitHubStats(repo: string): Promise<GitHubStats | undefined> {
    try {
        const res = await fetch(`https://api.github.com/repos/${repo}`, {
            headers: { Accept: 'application/vnd.github+json' },
            signal: AbortSignal.timeout(3000),
        });
        if (!res.ok) return undefined;
        const data = await res.json();
        return {
            stars: data.stargazers_count,
            forks: data.forks_count,
            watchers: data.watchers_count,
            language: data.language,
            topics: data.topics || [],
            updatedAt: data.updated_at,
            description: data.description,
            homepage: data.homepage || null,
            openIssues: data.open_issues_count,
        };
    } catch {
        return undefined;
    }
}

export async function fetchGitHubReadme(repo: string): Promise<string | undefined> {
    try {
        const res = await fetch(`https://api.github.com/repos/${repo}/readme`, {
            headers: { Accept: 'application/vnd.github.raw+json' },
            signal: AbortSignal.timeout(3000),
        });
        if (!res.ok) return undefined;
        return res.text();
    } catch {
        return undefined;
    }
}

export function getAllProjectSlugs(): string[] {
    if (!fs.existsSync(projectsDirectory)) return [];
    return fs
        .readdirSync(projectsDirectory)
        .filter((f) => f.endsWith('.md'))
        .map((f) => f.replace(/\.md$/, ''));
}

export function getAllProjects(): Project[] {
    return getAllProjectSlugs()
        .map((slug) => parseProjectFile(slug))
        .filter(Boolean) as Project[];
}

export function getProjectBySlug(slug: string): Project | null {
    return parseProjectFile(slug);
}
