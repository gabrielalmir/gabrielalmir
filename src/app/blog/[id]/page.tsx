import { getAllPostIds, getPostById } from '@/lib/blog';
import { notFound } from 'next/navigation';
import BlogPostClient from './blog-post-client';

interface BlogPostPageProps {
  readonly params: Promise<{
    readonly id: string;
  }>;
}

export async function generateStaticParams() {
  const ids = getAllPostIds();
  return ids.map((id) => ({
    id,
  }));
}

export async function generateMetadata({ params }: Readonly<BlogPostPageProps>) {
  const { id } = await params;
  const post = getPostById(id);

  if (!post) {
    return {
      title: 'Post não encontrado',
    };
  }

  return {
    title: `${post.title} - Gabriel Almir`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Readonly<BlogPostPageProps>) {
  const { id } = await params;
  const post = getPostById(id);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
