import { Button } from '@/components/ui/button';
import type { BlogPostPreview } from '@/lib/blog';
import { ArrowRight, Calendar, Clock, Code2, Hash, Terminal } from 'lucide-react';

function sanitizeRouteSegment(id: string): string {
    return id.replace(/[^a-zA-Z0-9_-]/g, '');
}

const categories = {
    technical: { label: 'Técnico', icon: Code2, color: 'text-vesper-cyan' },
    career: { label: 'Carreira', icon: Terminal, color: 'text-vesper-orange' },
    insights: { label: 'Insights', icon: Hash, color: 'text-vesper-red' }
};

interface LatestPostsProps {
    latestPosts: BlogPostPreview[];
}

export function LatestPosts({ latestPosts }: LatestPostsProps) {
    if (!latestPosts || latestPosts.length === 0) return null;

    return (
        <section id="blog" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden">
            <div className="container mx-auto max-w-6xl w-full">

                <div className="mb-14 md:mb-20 w-full max-w-3xl">
                    <span className="section-eyebrow text-vesper-cyan/80">02 / Escrita</span>
                    <h2 className="section-heading mt-4">
                        Últimos <span className="text-vesper-cyan">Posts</span>
                    </h2>
                    <p className="section-subheading mt-4">
                        Artigos sobre desenvolvimento, arquitetura de software e experiências na indústria tech.
                    </p>
                </div>

                <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 w-full">
                    {latestPosts.map((post) => {
                        const category = categories[post.category as keyof typeof categories] || categories.technical;
                        const CategoryIcon = category.icon;
                        const safeId = sanitizeRouteSegment(post.id);

                        return (
                            <article
                                key={post.id}
                                className="group relative rounded-2xl border border-vesper-orange/15 bg-gradient-to-br from-background/60 via-background to-background/40 backdrop-blur-sm p-6 sm:p-7 hover:border-vesper-orange/35 hover:-translate-y-1.5 hover:shadow-[0_25px_60px_-20px_rgba(255,199,153,0.3)] transition-all duration-300 flex flex-col h-full overflow-hidden"
                            >
                                <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${category.color === 'text-vesper-cyan' ? 'via-vesper-cyan/50' : category.color === 'text-vesper-red' ? 'via-vesper-red/50' : 'via-vesper-orange/50'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                                <div className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none">
                                    <div className="absolute -right-20 -top-20 w-40 h-40 bg-vesper-orange/15 blur-[50px] rounded-full"></div>
                                </div>

                                <div className="flex items-start justify-between mb-4 relative z-10 gap-3">
                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                        <CategoryIcon className={`h-4 w-4 sm:h-4 sm:w-4 flex-shrink-0 ${category.color}`} />
                                        <span className={`text-[10px] sm:text-xs uppercase tracking-[0.18em] font-semibold ${category.color}`}>
                                            {category.label}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-foreground/50 whitespace-nowrap flex-shrink-0">
                                        <Clock className="h-3 w-3 flex-shrink-0" />
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>

                                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 group-hover:text-vesper-orange transition-colors break-words relative z-10 leading-snug">
                                    {post.title}
                                </h3>

                                <p className="text-sm sm:text-base text-foreground/65 mb-4 leading-relaxed break-words relative z-10 flex-grow">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center gap-2 mb-4 relative z-10 text-[10px] sm:text-xs text-foreground/50 font-mono">
                                    <Calendar className="h-3 w-3 flex-shrink-0" />
                                    <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                                </div>

                                <div className="flex flex-wrap gap-1.5 mb-5 relative z-10">
                                    {post.tags.slice(0, 3).map((tag: any) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 text-[10px] sm:text-xs bg-vesper-orange/[0.08] text-vesper-orange/75 border border-vesper-orange/15 rounded-sm font-mono whitespace-nowrap hover:border-vesper-orange/40 hover:text-vesper-orange/90 transition-colors"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                    {post.tags.length > 3 && (
                                        <span className="px-2 py-1 text-[10px] sm:text-xs text-foreground/40 font-mono">
                                            +{post.tags.length - 3}
                                        </span>
                                    )}
                                </div>

                                <a href={`/blog/${safeId}`} className="w-full block relative z-10 mt-auto">
                                    <Button className="terminal-button w-full group text-sm sm:text-base font-semibold">
                                        <span>Ler artigo</span>
                                        <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-2 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                                    </Button>
                                </a>
                            </article>
                        );
                    })}
                </div>

                <div className="text-center mt-12">
                    <a href="/blog">
                        <Button size="lg" variant="outline" className="terminal-button-outline group px-8">
                            <span>Ver todos os artigos</span>
                            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </a>
                </div>
            </div>
        </section>
    );
}
