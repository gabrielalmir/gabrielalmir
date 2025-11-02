'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { BlogPost } from '@/lib/blog';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Calendar, Clock, Code2, Coffee, Filter, Search, Tag, Terminal } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const categories = {
  technical: { label: 'Técnico', icon: Code2, color: 'text-blue-400' },
  career: { label: 'Carreira', icon: BookOpen, color: 'text-green-400' },
  insights: { label: 'Insights', icon: Terminal, color: 'text-purple-400' }
};

interface BlogClientPageProps {
  readonly posts: BlogPost[];
}

export default function BlogClientPage({ posts }: Readonly<BlogClientPageProps>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);

    return matchesSearch && matchesCategory && matchesTag;
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-terminal-green font-mono selection:bg-terminal-green selection:text-zinc-950">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-scanline animate-scanline opacity-5"></div>
        <div className="absolute inset-0 bg-glow"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-screen border-b border-terminal-green/20 bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold flex items-center gap-2 text-terminal-green hover:text-terminal-green/80 transition-colors">
              <Coffee className="h-6 w-6" />
              <span className="terminal-prompt hidden sm:block">&gt; gabrielalmir</span>
            </Link>
            <div className="space-x-6">
              <Link href="/" className="hover:text-terminal-green/80 transition-colors terminal-link">
                <span className="terminal-prompt">&gt; home</span>
              </Link>
              <Link href="/case-studies" className="hover:text-terminal-green/80 transition-colors terminal-link">
                <span className="terminal-prompt">&gt; case studies</span>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="terminal-window border border-terminal-green/20 p-8">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="h-6 w-6 text-terminal-green" />
              <span className="terminal-prompt text-lg">&gt; blog.init()</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-terminal-green mb-4">
              <span className="text-terminal-green">&lt;</span>{' '}
              DevLog
              {' '}<span className="text-terminal-green">/&gt;</span>
            </h1>
            <p className="text-xl text-terminal-green/80 leading-relaxed">
              Compartilhando conhecimento sobre desenvolvimento backend, arquitetura de software,
              e experiências na construção de sistemas escaláveis.
            </p>
            <div className="flex items-center gap-2 mt-6 text-terminal-green/60">
              <span className="terminal-prompt">$</span>
              <span>cat posts.log | grep -E "(TypeScript|Node.js|AWS|Architecture|Python)"</span>
            </div>
          </div>
        </motion.section>

        {/* Filters */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="terminal-window border border-terminal-green/20 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="h-5 w-5 text-terminal-green" />
              <span className="terminal-prompt">&gt; filters.apply()</span>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-terminal-green/60" />
                <Input
                  type="text"
                  placeholder="Buscar posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-zinc-900 border-terminal-green/20 text-terminal-green placeholder:text-terminal-green/40 focus:border-terminal-green"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-4">
              <div className="block text-sm text-terminal-green/80 mb-2">
                <span className="terminal-prompt">&gt; categoria:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('all')}
                  className={selectedCategory === 'all' ? 'terminal-button' : 'terminal-button-outline'}
                >
                  Todas
                </Button>
                {Object.entries(categories).map(([key, { label, icon: Icon, color }]) => (
                  <Button
                    key={key}
                    variant={selectedCategory === key ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(key)}
                    className={selectedCategory === key ? 'terminal-button' : 'terminal-button-outline'}
                  >
                    <Icon className={`h-4 w-4 mr-1 ${color}`} />
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Tag Filter */}
            <div>
              <div className="block text-sm text-terminal-green/80 mb-2">
                <span className="terminal-prompt">&gt; tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedTag === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTag('all')}
                  className={selectedTag === 'all' ? 'terminal-button' : 'terminal-button-outline'}
                >
                  Todas
                </Button>
                {allTags.map(tag => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTag(tag)}
                    className={selectedTag === tag ? 'terminal-button' : 'terminal-button-outline'}
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Blog Posts Grid */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => {
              const CategoryIcon = categories[post.category].icon;
              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="terminal-window border border-terminal-green/20 p-6 hover:border-terminal-green/40 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <CategoryIcon className={`h-4 w-4 ${categories[post.category].color}`} />
                      <span className="text-xs text-terminal-green/60 uppercase tracking-wider">
                        {categories[post.category].label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-terminal-green/60">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-terminal-green mb-3 group-hover:text-terminal-green/80 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-terminal-green/80 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-xs text-terminal-green/60">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-terminal-green/10 text-terminal-green/80 border border-terminal-green/20 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="px-2 py-1 text-xs text-terminal-green/60">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <Link href={`/blog/${post.id}`}>
                    <Button className="terminal-button w-full group">
                      <span className="terminal-prompt">&gt; ler post</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </motion.article>
              );
            })}
          </div>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="terminal-window border border-terminal-green/20 p-8 text-center"
            >
              <Terminal className="h-12 w-12 text-terminal-green/40 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-terminal-green/80 mb-2">
                Nenhum post encontrado
              </h3>
              <p className="text-terminal-green/60">
                Tente ajustar os filtros ou termo de busca.
              </p>
              <div className="mt-4 text-terminal-green/40 text-sm">
                <span className="terminal-prompt">$</span> find ./posts -name "*{searchTerm}*" | wc -l
                <br />
                <span className="text-terminal-green/60">0</span>
              </div>
            </motion.div>
          )}
        </motion.section>
      </main>
    </div>
  );
}
