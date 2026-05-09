import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import type { Project } from '@/lib/projects';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import {
    ArrowLeft,
    ArrowRight,
    Calendar,
    Code2,
    ExternalLink,
    GitFork,
    Globe,
    Star,
    Tag,
    Terminal,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import type React from 'react';

interface ProjectDetailClientProps {
    readonly project: Project;
}

type MarkdownHeadingProps = React.HTMLAttributes<HTMLHeadingElement> & { node?: unknown };

const MarkdownH2 = ({ children, node: _node, ...props }: MarkdownHeadingProps) => (
    <h2 className="text-2xl sm:text-3xl font-bold text-vesper-orange mt-10 mb-4 border-b border-vesper-orange/20 pb-3 leading-snug tracking-tight" {...props}>
        {children}
    </h2>
);
const MarkdownH3 = ({ children, node: _node, ...props }: MarkdownHeadingProps) => (
    <h3 className="text-xl sm:text-2xl font-bold text-vesper-orange mt-8 mb-3 leading-snug tracking-tight" {...props}>
        {children}
    </h3>
);
const MarkdownH4 = ({ children, node: _node, ...props }: MarkdownHeadingProps) => (
    <h4 className="text-lg sm:text-xl font-bold text-vesper-orange mt-6 mb-2 leading-snug" {...props}>
        {children}
    </h4>
);
const MarkdownP = (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-foreground/85 leading-relaxed mb-5 text-base sm:text-lg break-words font-light" {...props} />
);
const MarkdownUl = (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-6 my-5 text-foreground/85 space-y-2" {...props} />
);
const MarkdownOl = (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-6 my-5 text-foreground/85 space-y-2" {...props} />
);
const MarkdownLi = (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed text-base sm:text-lg break-words" {...props} />
);
const MarkdownCode = ({ className, children, ...props }: React.HTMLAttributes<HTMLElement> & { className?: string }) => {
    const isInline = !className;
    if (isInline) {
        return (
            <code className="bg-vesper-orange/15 text-vesper-orange px-2 py-0.5 rounded text-sm font-mono border border-vesper-orange/20" {...props}>
                {children}
            </code>
        );
    }
    return <code className={className} {...props}>{children}</code>;
};
const MarkdownPre = ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-zinc-900/80 border border-vesper-orange/30 rounded-lg p-5 my-6 overflow-x-auto" {...props}>
        <code className="text-vesper-cyan/90 text-sm font-mono block leading-relaxed">{children}</code>
    </pre>
);
const MarkdownBlockquote = (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-vesper-orange/50 pl-5 py-2 my-6 italic text-foreground/80 bg-vesper-orange/5 rounded-r-lg text-base sm:text-lg break-words" {...props} />
);
const MarkdownA = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-vesper-orange underline underline-offset-2 hover:text-vesper-orange/80 transition-colors break-words" target="_blank" rel="noopener noreferrer" {...props} />
);
const MarkdownStrong = (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="text-vesper-orange font-bold" {...props} />
);
const MarkdownHr = () => <hr className="border-vesper-orange/20 my-10" />;

const markdownComponents = {
    h2: MarkdownH2, h3: MarkdownH3, h4: MarkdownH4,
    p: MarkdownP, ul: MarkdownUl, ol: MarkdownOl, li: MarkdownLi,
    code: MarkdownCode, pre: MarkdownPre, blockquote: MarkdownBlockquote,
    a: MarkdownA, strong: MarkdownStrong, hr: MarkdownHr,
};

const languageColors: Record<string, string> = {
    TypeScript: '#3178c6', JavaScript: '#f7df1e', Python: '#3776ab',
    Go: '#00add8', Rust: '#dea584', Java: '#b07219', HTML: '#e34c26',
    CSS: '#563d7c', Shell: '#89e051',
};

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
    const stats = project.githubStats;
    const liveUrl = project.liveUrl || stats?.homepage || undefined;
    const langColor = stats?.language ? (languageColors[stats.language] || '#888') : null;

    return (
        <LazyMotion features={domAnimation}>
            <div className="min-h-screen bg-background text-foreground selection:bg-vesper-orange selection:text-black overflow-x-hidden">

                <div className="fixed inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-scanline animate-scanline opacity-[0.02]" />
                    <div className="absolute inset-0 bg-glow opacity-50" />
                </div>

                <Header />

                <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-5xl w-full">

                    {/* Back */}
                    <m.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mb-8"
                    >
                        <a href="/#projetos">
                            <Button variant="outline" className="terminal-button-outline group">
                                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                                <span className="terminal-prompt">&gt; voltar aos projetos</span>
                            </Button>
                        </a>
                    </m.div>

                    {/* Hero */}
                    <m.header
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-8"
                    >
                        <div className="relative rounded-2xl border border-vesper-orange/20 bg-gradient-to-br from-vesper-orange/[0.06] via-background to-vesper-cyan/[0.03] p-6 sm:p-8 md:p-10 overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vesper-orange/40 to-transparent" />

                            <div className="flex items-center gap-2 mb-4">
                                <Code2 className="h-4 w-4 text-vesper-orange/60" />
                                <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-vesper-orange/60 font-semibold">Projeto</span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 leading-tight tracking-tight">
                                {project.title}
                            </h1>

                            {project.subtitle && (
                                <p className="text-lg sm:text-xl text-foreground/70 mb-5 leading-relaxed">
                                    {project.subtitle}
                                </p>
                            )}

                            <p className="text-base text-foreground/60 mb-6 leading-relaxed max-w-2xl">
                                {stats?.description || project.excerpt}
                            </p>

                            {/* Meta row */}
                            <div className="flex flex-wrap items-center gap-4 mb-6 text-xs text-foreground/50 font-mono">
                                {stats?.language && (
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: langColor ?? '#888' }} />
                                        <span>{stats.language}</span>
                                    </div>
                                )}
                                {stats?.updatedAt && (
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="h-3 w-3" />
                                        <span>Atualizado em {new Date(stats.updatedAt).toLocaleDateString('pt-BR')}</span>
                                    </div>
                                )}
                                {stats !== undefined && (
                                    <>
                                        <div className="flex items-center gap-1.5">
                                            <Star className="h-3 w-3 text-vesper-orange/60" />
                                            <span>{stats.stars}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <GitFork className="h-3 w-3 text-vesper-orange/60" />
                                            <span>{stats.forks}</span>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 mb-6">
                                {(stats?.topics?.length ? stats.topics : project.tags).map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2.5 py-1 text-[11px] font-mono bg-vesper-orange/[0.08] text-vesper-orange/75 border border-vesper-orange/15 rounded-md whitespace-nowrap"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            {/* Action buttons */}
                            <div className="flex flex-wrap gap-3">
                                {liveUrl && (
                                    <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                                        <Button className="terminal-button group">
                                            <Globe className="h-4 w-4 mr-2 flex-shrink-0" />
                                            <span>Ver site ao vivo</span>
                                            <ArrowRight className="h-3.5 w-3.5 ml-2 group-hover:translate-x-0.5 transition-transform" />
                                        </Button>
                                    </a>
                                )}
                                <a href={`https://github.com/${project.repo}`} target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" className="terminal-button-outline group">
                                        <Terminal className="h-4 w-4 mr-2 flex-shrink-0" />
                                        <span>Ver no GitHub</span>
                                        <ExternalLink className="h-3.5 w-3.5 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </m.header>

                    {/* Screenshot / Preview */}
                    {liveUrl && (
                        <m.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            className="mb-8"
                        >
                            <div className="rounded-2xl border border-vesper-orange/15 overflow-hidden bg-background/60">
                                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-vesper-orange/10 bg-background/40">
                                    <span className="w-3 h-3 rounded-full bg-red-500/60" />
                                    <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                                    <span className="w-3 h-3 rounded-full bg-green-500/60" />
                                    <span className="ml-3 text-[11px] font-mono text-foreground/40 truncate">
                                        {liveUrl}
                                    </span>
                                </div>
                                <img
                                    src={`https://api.microlink.io/?url=${encodeURIComponent(liveUrl)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=720&waitUntil=networkidle0`}
                                    alt={`Preview do ${project.title}`}
                                    className="w-full object-cover object-top bg-background"
                                    style={{ maxHeight: '520px' }}
                                    loading="lazy"
                                    onError={(e) => {
                                        const img = e.currentTarget;
                                        img.style.display = 'none';
                                        const parent = img.parentElement;
                                        if (parent && !parent.querySelector('[data-preview-fallback]')) {
                                            const fallback = document.createElement('div');
                                            fallback.setAttribute('data-preview-fallback', 'true');
                                            fallback.className = 'flex items-center justify-center py-20 text-foreground/30 font-mono text-sm';
                                            fallback.innerHTML = `<div style="display: flex; align-items: center; gap: 0.5rem;"><svg style="width: 1.25rem; height: 1.25rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 0H3m9 9h-9" /></svg><span>Preview disponível em <a href="${liveUrl}" target="_blank" rel="noopener noreferrer" style="color: rgba(255, 199, 153, 0.6); text-decoration: underline;">${liveUrl}</a></span></div>`;
                                            parent.appendChild(fallback);
                                        }
                                    }}
                                />
                            </div>
                        </m.section>
                    )}

                    {/* GitHub Stats card */}
                    {stats && (
                        <m.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.25 }}
                            className="mb-8"
                        >
                            <div className="grid sm:grid-cols-3 gap-4">
                                {[
                                    { icon: Star, label: 'Stars', value: stats.stars },
                                    { icon: GitFork, label: 'Forks', value: stats.forks },
                                    { icon: Tag, label: 'Issues abertas', value: stats.openIssues },
                                ].map(({ icon: Icon, label, value }) => (
                                    <div
                                        key={label}
                                        className="rounded-xl border border-vesper-orange/15 bg-background/60 backdrop-blur-sm p-4 flex items-center gap-3"
                                    >
                                        <div className="p-2 rounded-lg bg-vesper-orange/10">
                                            <Icon className="h-4 w-4 text-vesper-orange/70" />
                                        </div>
                                        <div>
                                            <p className="text-xl font-bold text-foreground font-mono">{value}</p>
                                            <p className="text-[11px] text-foreground/50 uppercase tracking-wider">{label}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </m.section>
                    )}

                    {/* Markdown content */}
                    <m.article
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="mb-10"
                    >
                        <div className="rounded-2xl border border-vesper-orange/15 bg-background/60 backdrop-blur-sm p-6 sm:p-8 md:p-10">
                            <div className="flex items-center gap-2 mb-8">
                                <Terminal className="h-4 w-4 text-vesper-orange/60" />
                                <span className="terminal-prompt text-sm">&gt; cat README.md</span>
                            </div>
                            <div className="prose prose-invert max-w-none">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                                    components={markdownComponents}
                                >
                                    {project.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </m.article>

                    {/* Footer nav */}
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.45 }}
                        className="flex flex-col sm:flex-row justify-between gap-4"
                    >
                        <a href="/#projetos">
                            <Button variant="outline" className="terminal-button-outline group w-full sm:w-auto">
                                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                                <span>Todos os projetos</span>
                            </Button>
                        </a>
                        {liveUrl && (
                            <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                                <Button className="terminal-button group w-full sm:w-auto">
                                    <Globe className="h-4 w-4 mr-2" />
                                    <span>Ver projeto ao vivo</span>
                                    <ExternalLink className="h-3.5 w-3.5 ml-2 group-hover:translate-x-0.5 transition-transform" />
                                </Button>
                            </a>
                        )}
                    </m.div>
                </main>
            </div>
        </LazyMotion>
    );
}
