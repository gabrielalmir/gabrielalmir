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
        <section id="blog" className="py-24 px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden">
            <div className="container mx-auto max-w-6xl w-full">

                <div className="text-center mb-16 w-full max-w-full px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 break-words">
                        <span className="text-vesper-orange">&lt;</span>{' '}
                        Últimos Posts
                        {' '}<span className="text-vesper-orange">/&gt;</span>
                    </h2>
                    <p className="text-lg text-foreground/60 max-w-2xl mx-auto break-words">
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
                                className="group relative terminal-window border border-vesper-orange/20 p-4 sm:p-6 hover:border-vesper-orange/40 transition-all duration-300 flex flex-col h-full"
                            >

                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                    <div className="absolute -right-16 -top-16 w-32 h-32 bg-vesper-orange/10 blur-[40px] rounded-full"></div>
                                </div>

                                <div className="flex items-center justify-between mb-3 sm:mb-4 relative z-10">
                                    <div className="flex items-center gap-2">
                                        <CategoryIcon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0 ${category.color}`} />
                                        <span className={`text-xs uppercase tracking-wider ${category.color}`}>
                                            {category.label}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-foreground/60">
                                        <Clock className="h-3 w-3 flex-shrink-0" />
                                        <span className="whitespace-nowrap">{post.readTime}</span>
                                    </div>
                                </div>

                                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3 group-hover:text-vesper-orange transition-colors break-words relative z-10">
                                    {post.title}
                                </h3>

                                <p className="text-sm sm:text-base text-foreground/60 mb-3 sm:mb-4 leading-relaxed break-words relative z-10 flex-grow">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between mb-3 sm:mb-4 relative z-10">
                                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-foreground/50">
                                        <Calendar className="h-3 w-3 flex-shrink-0" />
                                        <span className="whitespace-nowrap">{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-1 mb-3 sm:mb-4 relative z-10">
                                    {post.tags.slice(0, 3).map((tag: any) => (
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

                                <a href={`/blog/${safeId}`} className="w-full block relative z-10 mt-auto">
                                    <Button className="terminal-button w-full group text-sm sm:text-base">
                                        <span className="terminal-prompt">&gt; ler artigo</span>
                                        <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-2 group-hover:translate-x-1 transition-transform flex-shrink-0" />
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
