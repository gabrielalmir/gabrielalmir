import { getAllPosts } from '@/lib/blog';
import { HomeClient } from './home-client';

export default function Home() {
  const posts = getAllPosts();
  const latestPosts = posts.slice(0, 3);

  return <HomeClient latestPosts={latestPosts} />;
}
