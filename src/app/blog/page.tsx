import { getAllPosts } from '@/lib/blog';
import BlogClientPage from './blog-client';

export const metadata = {
  title: 'Blog - Gabriel Almir',
  description: 'Compartilhando conhecimento sobre desenvolvimento backend, arquitetura de software, e experiências na construção de sistemas escaláveis.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return <BlogClientPage posts={posts} />;
}
