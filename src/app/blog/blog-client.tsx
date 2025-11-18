'use client';

import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { BlogPost } from '@/lib/blog';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Calendar, Clock, Code2, Filter, Search, Tag, Terminal } from 'lucide-react';
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
    <div className="min-h-screen bg-background text-vesper-orange font-mono selection:bg-vesper-orange selection:text-black overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-scanline animate-scanline opacity-[0.02]"></div>
        <div className="absolute inset-0 bg-glow opacity-50"></div>
      </div>

      {/* Header */}
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <div className="terminal-window border border-vesper-orange/20 p-4 sm:p-6 md:p-8">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Terminal className="h-5 w-5 sm:h-6 sm:w-6 text-vesper-orange flex-shrink-0" />
              <span className="terminal-prompt text-base sm:text-lg">&gt; blog.init()</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-vesper-orange mb-3 sm:mb-4 break-words">
              <span className="text-vesper-orange">&lt;</span>{' '}
              DevLog
              {' '}<span className="text-vesper-orange">/&gt;</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-vesper-orange/80 leading-relaxed break-words">
              Compartilhando conhecimento sobre desenvolvimento backend, arquitetura de software,
              e experiências na construção de sistemas escaláveis.
            </p>
            <div className="flex items-center gap-2 mt-4 sm:mt-6 text-vesper-orange/60 overflow-x-auto">
              <span className="terminal-prompt flex-shrink-0">$</span>
              <span className="text-xs sm:text-sm break-words">cat posts.log | grep -E "(TypeScript|Node.js|AWS|Architecture|Python)"</span>
            </div>
          </div>
        </motion.section>

        {/* Filters */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 sm:mb-12"
        >
          <div className="terminal-window border border-vesper-orange/20 p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-vesper-orange flex-shrink-0" />
              <span className="terminal-prompt text-sm sm:text-base">&gt; filters.apply()</span>
            </div>

            {/* Search */}
            <div className="mb-4 sm:mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-vesper-orange/60" />
                <Input
                  type="text"
                  placeholder="Buscar posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-zinc-900 border-vesper-orange/20 text-vesper-orange placeholder:text-vesper-orange/40 focus:border-vesper-orange text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-3 sm:mb-4">
              <div className="block text-xs sm:text-sm text-vesper-orange/80 mb-2">
                <span className="terminal-prompt">&gt; categoria:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('all')}
                  className={selectedCategory === 'all' ? 'terminal-button text-xs sm:text-sm' : 'terminal-button-outline text-xs sm:text-sm'}
                >
                  Todas
                </Button>
                {Object.entries(categories).map(([key, { label, icon: Icon, color }]) => (
                  <Button
                    key={key}
                    variant={selectedCategory === key ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(key)}
                    className={selectedCategory === key ? 'terminal-button text-xs sm:text-sm' : 'terminal-button-outline text-xs sm:text-sm'}
                  >
                    <Icon className={`h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0 ${color}`} />
                    <span className="whitespace-nowrap">{label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Tag Filter */}
            <div>
              <div className="block text-xs sm:text-sm text-vesper-orange/80 mb-2">
                <span className="terminal-prompt">&gt; tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedTag === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTag('all')}
                  className={selectedTag === 'all' ? 'terminal-button text-xs sm:text-sm' : 'terminal-button-outline text-xs sm:text-sm'}
                >
                  Todas
                </Button>
                {allTags.map(tag => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTag(tag)}
                    className={selectedTag === tag ? 'terminal-button text-xs sm:text-sm' : 'terminal-button-outline text-xs sm:text-sm'}
                  >
                    <Tag className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span className="whitespace-nowrap">{tag}</span>
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
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => {
              const CategoryIcon = categories[post.category].icon;
              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="terminal-window border border-vesper-orange/20 p-4 sm:p-6 hover:border-vesper-orange/40 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center gap-2">
                      <CategoryIcon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0 ${categories[post.category].color}`} />
                      <span className="text-xs text-vesper-orange/60 uppercase tracking-wider">
                        {categories[post.category].label}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-vesper-orange/60">
                      <Clock className="h-3 w-3 flex-shrink-0" />
                      <span className="whitespace-nowrap">{post.readTime}</span>
                    </div>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-vesper-orange mb-2 sm:mb-3 group-hover:text-vesper-orange/80 transition-colors break-words">
                    {post.title}
                  </h2>

                  <p className="text-sm sm:text-base text-vesper-orange/80 mb-3 sm:mb-4 leading-relaxed break-words">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-vesper-orange/60">
                      <Calendar className="h-3 w-3 flex-shrink-0" />
                      <span className="whitespace-nowrap">{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
                    {post.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-vesper-orange/10 text-vesper-orange/80 border border-vesper-orange/20 rounded whitespace-nowrap"
                      >
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="px-2 py-1 text-xs text-vesper-orange/60">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <Link href={`/blog/${post.id}`} className="w-full block">
                    <Button className="terminal-button w-full group text-sm sm:text-base">
                      <span className="terminal-prompt">&gt; ler post</span>
                      <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-2 group-hover:translate-x-1 transition-transform flex-shrink-0" />
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
              className="terminal-window border border-vesper-orange/20 p-6 sm:p-8 text-center"
            >
              <Terminal className="h-10 w-10 sm:h-12 sm:w-12 text-vesper-orange/40 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-vesper-orange/80 mb-2 break-words">
                Nenhum post encontrado
              </h3>
              <p className="text-sm sm:text-base text-vesper-orange/60 break-words">
                Tente ajustar os filtros ou termo de busca.
              </p>
              <div className="mt-3 sm:mt-4 text-vesper-orange/40 text-xs sm:text-sm overflow-x-auto">
                <span className="terminal-prompt">$</span> find ./posts -name "*{searchTerm}*" | wc -l
                <br />
                <span className="text-vesper-orange/60">0</span>
              </div>
            </motion.div>
          )}
        </motion.section>
      </main>
    </div>
  );
}
