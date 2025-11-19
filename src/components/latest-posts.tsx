'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BlogPost } from '@/lib/blog';
import { ArrowRight, Calendar, Clock, Code2, Terminal } from 'lucide-react';
import Link from 'next/link';

const categories = {
  technical: { label: 'Técnico', icon: Code2, color: 'text-vesper-cyan' },
  career: { label: 'Carreira', icon: Terminal, color: 'text-vesper-orange' },
  insights: { label: 'Insights', icon: Code2, color: 'text-vesper-cyan' }
};

interface LatestPostsProps {
  latestPosts: BlogPost[];
}

export function LatestPosts({ latestPosts }: LatestPostsProps) {
  return (
    <>
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden bg-gradient-to-b from-background via-vesper-cyan/5 to-background">
          <div className="container mx-auto max-w-7xl w-full">
            <div className="text-center mb-12 sm:mb-16 w-full max-w-full px-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 break-words">
                Últimos Artigos
              </h2>
              <p className="text-base sm:text-lg text-foreground/60 max-w-2xl mx-auto break-words">
                Confira meus últimos artigos sobre desenvolvimento, carreira e tecnologia
              </p>
            </div>

            {latestPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {latestPosts.map((post) => {
                  const CategoryIcon = categories[post.category].icon;
                  return (
                    <article
                      key={post.id}
                      className="group relative p-6 rounded-xl border border-vesper-orange/20 bg-background hover:border-vesper-orange/40 transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <CategoryIcon className={`h-4 w-4 ${categories[post.category].color}`} />
                          <span className="text-xs text-vesper-orange/60 uppercase tracking-wider">
                            {categories[post.category].label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-vesper-orange/60">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-vesper-orange mb-3 group-hover:text-vesper-orange/80 transition-colors break-words">
                        {post.title}
                      </h3>

                      <p className="text-sm sm:text-base text-foreground/70 mb-4 leading-relaxed break-words line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-xs text-vesper-orange/60">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>

                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {post.tags.slice(0, 3).map(tag => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs border-vesper-orange/20 text-vesper-orange/70 bg-vesper-orange/5"
                            >
                              #{tag}
                            </Badge>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="text-xs text-vesper-orange/50">
                              +{post.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      <Link href={`/blog/${post.id}`}>
                        <Button className="w-full terminal-button-outline group border-vesper-orange/30 text-vesper-orange hover:border-vesper-orange hover:bg-vesper-orange/10">
                          <span>Ler artigo</span>
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-foreground/60">Nenhum artigo disponível ainda.</p>
              </div>
            )}

            <div className="text-center mt-12">
              <Link href="/blog">
                <Button variant="outline" className="terminal-button-outline group">
                  <span>Ver todos os artigos</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
    </>
  );
}
