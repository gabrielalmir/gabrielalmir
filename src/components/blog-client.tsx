import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { BlogPost } from '@/lib/blog';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { ArrowRight, BookOpen, Calendar, Clock, Code2, Filter, Search, Tag, Terminal } from 'lucide-react';
import { useState } from 'react';

const categories = {
    technical: { label: 'Técnico', icon: Code2, color: 'text-vesper-cyan' },
    career: { label: 'Carreira', icon: BookOpen, color: 'text-vesper-orange' },
    insights: { label: 'Insights', icon: Terminal, color: 'text-vesper-red' }
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
        <LazyMotion features={domAnimation}>
            <div className="min-h-screen bg-background text-foreground selection:bg-vesper-orange selection:text-black overflow-x-hidden">

            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-scanline animate-scanline opacity-[0.02]"></div>
                <div className="absolute inset-0 bg-glow opacity-50"></div>
            </div>

            <Header />

            <main className="w-full overflow-x-hidden">
                <m.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="py-16 md:py-24 px-4 sm:px-6 lg:px-8"
                >
                    <div className="container mx-auto max-w-7xl">
                        <div className="mb-8">
                            <span className="section-eyebrow">Blog</span>
                            <h1 className="section-heading mt-4">
                                <span className="text-vesper-orange/70">&lt;</span> DevLog <span className="text-vesper-orange/70">/&gt;</span>
                            </h1>
                            <p className="section-subheading mt-4">
                                Compartilhando conhecimento sobre desenvolvimento backend, arquitetura de software e experiências na construção de sistemas escaláveis.
                            </p>
                        </div>
                    </div>
                </m.section>

                <m.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-background/60 backdrop-blur-sm border-y border-vesper-orange/10"
                >
                    <div className="container mx-auto max-w-6xl">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] uppercase tracking-[0.2em] font-mono text-vesper-orange/70 font-semibold mb-3">
                                    <Search className="inline h-3.5 w-3.5 mr-1.5" />
                                    Buscar
                                </label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-vesper-orange/50" />
                                    <Input
                                        type="text"
                                        placeholder="Buscar por título ou conteúdo..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 bg-background border-vesper-orange/15 text-foreground placeholder:text-foreground/40 focus:border-vesper-orange/40 focus:bg-background/80 text-sm sm:text-base transition-all rounded-lg"
                                    />
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] uppercase tracking-[0.2em] font-mono text-vesper-orange/70 font-semibold mb-3">
                                        <Filter className="inline h-3.5 w-3.5 mr-1.5" />
                                        Categoria
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        <Button
                                            variant={selectedCategory === 'all' ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setSelectedCategory('all')}
                                            className={`text-xs rounded-md ${selectedCategory === 'all' ? 'bg-vesper-orange text-black hover:bg-vesper-orange/90 border-0 shadow-md shadow-vesper-orange/20' : 'border-foreground/15 text-foreground/70 hover:border-vesper-orange/40 hover:text-vesper-orange/90 hover:bg-vesper-orange/[0.08]'} transition-all`}
                                        >
                                            Todas
                                        </Button>
                                        {Object.entries(categories).map(([key, { label, icon: Icon, color }]) => (
                                            <Button
                                                key={key}
                                                variant={selectedCategory === key ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => setSelectedCategory(key)}
                                                className={`text-xs rounded-md ${selectedCategory === key ? 'bg-vesper-orange text-black hover:bg-vesper-orange/90 border-0 shadow-md shadow-vesper-orange/20' : `border-foreground/15 text-foreground/70 hover:border-${color === 'text-vesper-cyan' ? 'vesper-cyan' : 'vesper-orange'}/40 hover:text-${color === 'text-vesper-cyan' ? 'vesper-cyan' : 'vesper-orange'}/90 hover:bg-${color === 'text-vesper-cyan' ? 'vesper-cyan' : 'vesper-orange'}/[0.08]`} transition-all`}
                                            >
                                                <Icon className={`h-3.5 w-3.5 mr-1.5 flex-shrink-0 ${color}`} />
                                                <span className="whitespace-nowrap">{label}</span>
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] uppercase tracking-[0.2em] font-mono text-vesper-cyan/70 font-semibold mb-3">
                                        <Tag className="inline h-3.5 w-3.5 mr-1.5" />
                                        Tags
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        <Button
                                            variant={selectedTag === 'all' ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setSelectedTag('all')}
                                            className={`text-xs rounded-md ${selectedTag === 'all' ? 'bg-vesper-orange text-black hover:bg-vesper-orange/90 border-0 shadow-md shadow-vesper-orange/20' : 'border-foreground/15 text-foreground/70 hover:border-vesper-orange/40 hover:text-vesper-orange/90 hover:bg-vesper-orange/[0.08]'} transition-all`}
                                        >
                                            Todas
                                        </Button>
                                        {allTags.slice(0, 8).map(tag => (
                                            <Button
                                                key={tag}
                                                variant={selectedTag === tag ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => setSelectedTag(tag)}
                                                className={`text-xs rounded-md ${selectedTag === tag ? 'bg-vesper-orange text-black hover:bg-vesper-orange/90 border-0 shadow-md shadow-vesper-orange/20' : 'border-foreground/15 text-foreground/70 hover:border-vesper-orange/40 hover:text-vesper-orange/90 hover:bg-vesper-orange/[0.08]'} transition-all`}
                                            >
                                                #{tag}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </m.section>

                <m.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="py-16 md:py-24 px-4 sm:px-6 lg:px-8"
                >
                    <div className="container mx-auto max-w-6xl">
                        {filteredPosts.length > 0 ? (
                            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {filteredPosts.map((post, index) => {
                                    const CategoryIcon = categories[post.category as keyof typeof categories]?.icon || Code2;
                                    const categoryInfo = categories[post.category as keyof typeof categories] || categories.technical;
                                    return (
                                        <m.article
                                            key={post.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.08 }}
                                            className="group relative rounded-2xl border border-vesper-orange/15 bg-gradient-to-br from-background/60 via-background to-background/40 backdrop-blur-sm p-6 sm:p-7 hover:border-vesper-orange/35 hover:-translate-y-1.5 hover:shadow-[0_25px_60px_-20px_rgba(255,199,153,0.3)] transition-all duration-300 flex flex-col h-full overflow-hidden"
                                        >
                                            <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-${categoryInfo.color === 'text-vesper-cyan' ? 'vesper-cyan' : 'vesper-orange'}/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none">
                                                <div className="absolute -right-20 -top-20 w-40 h-40 bg-vesper-orange/15 blur-[50px] rounded-full"></div>
                                            </div>

                                            <div className="flex items-start justify-between mb-4 relative z-10 gap-3">
                                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                                    <CategoryIcon className={`h-4 w-4 flex-shrink-0 ${categoryInfo.color}`} />
                                                    <span className={`text-[10px] uppercase tracking-[0.18em] font-semibold ${categoryInfo.color}`}>
                                                        {categoryInfo.label}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-[10px] text-foreground/50 whitespace-nowrap flex-shrink-0 font-mono">
                                                    <Clock className="h-3 w-3 flex-shrink-0" />
                                                    <span>{post.readTime}</span>
                                                </div>
                                            </div>

                                            <h2 className="text-lg sm:text-xl font-bold text-foreground mb-3 group-hover:text-vesper-orange transition-colors break-words relative z-10 leading-snug">
                                                {post.title}
                                            </h2>

                                            <p className="text-sm sm:text-base text-foreground/65 mb-4 leading-relaxed break-words relative z-10 flex-grow">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex items-center gap-2 mb-4 relative z-10 text-[10px] text-foreground/50 font-mono">
                                                <Calendar className="h-3 w-3 flex-shrink-0" />
                                                <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                                            </div>

                                            <div className="flex flex-wrap gap-1.5 mb-5 relative z-10">
                                                {post.tags.slice(0, 3).map(tag => (
                                                    <span
                                                        key={tag}
                                                        className="px-2 py-1 text-[10px] bg-vesper-orange/[0.08] text-vesper-orange/75 border border-vesper-orange/15 rounded-sm font-mono whitespace-nowrap hover:border-vesper-orange/40 hover:text-vesper-orange/90 transition-colors"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                                {post.tags.length > 3 && (
                                                    <span className="px-2 py-1 text-[10px] text-foreground/40 font-mono">
                                                        +{post.tags.length - 3}
                                                    </span>
                                                )}
                                            </div>

                                            <a href={`/blog/${post.id}`} className="w-full block relative z-10 mt-auto">
                                                <Button className="terminal-button w-full group text-sm sm:text-base font-semibold">
                                                    <span className="terminal-prompt">&gt; ler artigo</span>
                                                    <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-2 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                                                </Button>
                                            </a>
                                        </m.article>
                                    );
                                })}
                            </div>
                        ) : (
                            <m.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="rounded-2xl border border-vesper-orange/15 bg-gradient-to-br from-background/60 via-background to-background/40 backdrop-blur-sm p-12 sm:p-16 text-center"
                            >
                                <Terminal className="h-12 w-12 sm:h-14 sm:w-14 text-vesper-orange/40 mx-auto mb-4 sm:mb-6" />
                                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 break-words">
                                    Nenhum post encontrado
                                </h3>
                                <p className="text-sm sm:text-base text-foreground/60 break-words mb-6">
                                    Tente ajustar os filtros ou termo de busca.
                                </p>
                                <div className="text-foreground/40 text-xs sm:text-sm font-mono overflow-x-auto inline-block">
                                    <span className="text-vesper-orange/60">$</span> find ./posts -name "*{searchTerm}*" | wc -l
                                    <br />
                                    <span className="text-foreground/30">0</span>
                                </div>
                            </m.div>
                        )}
                    </div>
                </m.section>
            </main>
            </div>
        </LazyMotion>
    );
}
