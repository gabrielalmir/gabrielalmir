'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BlogPost } from '@/lib/blog';
import { ArrowRight, Calendar, Clock, Code2, Hash, Terminal } from 'lucide-react';
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
    <section className="py-24 px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-vesper-orange/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="container mx-auto max-w-7xl w-full relative z-10">
        <div className="text-center mb-16 w-full max-w-full px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 break-words">
            Últimos Artigos
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto break-words">
            Insights sobre desenvolvimento, arquitetura e carreira
          </p>
        </div>

        {latestPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post, index) => {
              const CategoryIcon = categories[post.category].icon;
              return (
                <article
                  key={post.id}
                  className="group relative flex flex-col h-full bg-background/40 backdrop-blur-sm border border-vesper-orange/10 rounded-2xl overflow-hidden hover:border-vesper-orange/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:shadow-vesper-orange/5"
                >
                  {/* Card Header / Gradient Decoration */}
                  <div className="h-2 w-full bg-gradient-to-r from-vesper-orange/20 via-vesper-orange/60 to-vesper-cyan/20 group-hover:from-vesper-orange/40 group-hover:via-vesper-orange group-hover:to-vesper-cyan/40 transition-all duration-500" />

                  <div className="p-6 flex flex-col flex-grow relative">
                     {/* Subtle Grid Background */}
                     <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <div className="flex items-center gap-2">
                        <span className={`flex items-center justify-center w-8 h-8 rounded-lg bg-vesper-orange/5 border border-vesper-orange/10 group-hover:border-vesper-orange/20 transition-colors`}>
                            <CategoryIcon className={`h-4 w-4 ${categories[post.category].color}`} />
                        </span>
                        <span className="text-xs font-bold text-vesper-orange/80 uppercase tracking-wider">
                          {categories[post.category].label}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-vesper-orange/5 border border-vesper-orange/10 text-[10px] font-mono text-vesper-orange/70">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-vesper-orange transition-colors break-words leading-tight relative z-10">
                      <Link href={`/blog/${post.id}`} className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-sm text-foreground/60 mb-6 leading-relaxed line-clamp-3 relative z-10 flex-grow">
                      {post.excerpt}
                    </p>

                    <div className="space-y-4 relative z-10 mt-auto">
                        {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, 3).map(tag => (
                                <span
                                key={tag}
                                className="text-[10px] px-2 py-1 rounded-md bg-background border border-foreground/10 text-foreground/50 font-mono flex items-center gap-1"
                                >
                                <Hash className="w-2 h-2 opacity-50" />
                                {tag}
                                </span>
                            ))}
                            </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-vesper-orange/10">
                            <div className="flex items-center gap-2 text-xs text-foreground/40">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{new Date(post.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </div>

                            <span className="text-xs font-bold text-vesper-orange opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 flex items-center gap-1">
                                Ler artigo <ArrowRight className="w-3 h-3" />
                            </span>
                        </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24 border border-dashed border-vesper-orange/20 rounded-3xl bg-vesper-orange/5">
            <div className="mx-auto w-16 h-16 rounded-full bg-vesper-orange/10 flex items-center justify-center mb-4">
                <Terminal className="w-8 h-8 text-vesper-orange/50" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Nenhum artigo encontrado</h3>
            <p className="text-foreground/60 max-w-sm mx-auto">
                Estou escrevendo novos conteúdos incríveis. Volte em breve!
            </p>
          </div>
        )}

        <div className="text-center mt-16">
          <Link href="/blog">
            <Button variant="outline" className="terminal-button-outline group px-8">
              <span>Explorar biblioteca completa</span>
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
