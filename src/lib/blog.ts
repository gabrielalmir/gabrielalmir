import matter from 'gray-matter';
import fs from 'node:fs';
import path from 'node:path';

const postsDirectory = path.join(process.cwd(), 'src', 'content', 'blog');

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    readTime: string;
    tags: string[];
    category: 'technical' | 'career' | 'insights';
    author?: string;
    videoUrl?: string;
}

export type BlogPostPreview = Omit<BlogPost, 'content'>;

export function getAllPosts(): BlogPost[] {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map((fileName) => {
            const id = fileName.replace(/\.md$/, '');

            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');

            const { data, content } = matter(fileContents);

            return {
                id,
                content,
                title: data.title,
                excerpt: data.excerpt,
                date: data.date,
                readTime: data.readTime,
                tags: data.tags || [],
                category: data.category,
                author: data.author,
                videoUrl: data.videoUrl,
            } as BlogPost;
        });

    return allPostsData.sort((a, b) => new Date(a.date) < new Date(b.date) ? 1 : -1);
}

export function getLatestPostPreviews(limit: number): BlogPostPreview[] {
    return getAllPosts()
        .slice(0, limit)
        .map(({ content: _content, ...preview }) => preview);
}

export function getPostById(id: string): BlogPost | null {
    try {
        const fullPath = path.join(postsDirectory, `${id}.md`);

        if (!fs.existsSync(fullPath)) {
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            id,
            content,
            title: data.title,
            excerpt: data.excerpt,
            date: data.date,
            readTime: data.readTime,
            tags: data.tags || [],
            category: data.category,
            author: data.author,
            videoUrl: data.videoUrl,
        } as BlogPost;
    } catch (error) {
        console.error(`Error reading post ${id}:`, error);
        return null;
    }
}

export function getAllPostIds(): string[] {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map((fileName) => fileName.replace(/\.md$/, ''));
}
