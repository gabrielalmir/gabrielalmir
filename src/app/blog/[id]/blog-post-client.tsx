'use client';

import { Button } from '@/components/ui/button';
import type { BlogPost } from '@/lib/blog';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Calendar, Clock, Code2, Coffee, ExternalLink, Share2, Terminal, User, Video } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

interface BlogPostClientProps {
  readonly post: BlogPost;
}

const categories = {
  technical: { label: 'Técnico', icon: Code2, color: 'text-blue-400' },
  career: { label: 'Carreira', icon: BookOpen, color: 'text-green-400' },
  insights: { label: 'Insights', icon: Terminal, color: 'text-purple-400' }
};

/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/anchor-has-content */
// Markdown component definitions (moved outside main component for performance)
// Content is provided dynamically by ReactMarkdown library
const MarkdownH1 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1 className="text-3xl font-bold text-terminal-green mt-8 mb-4 border-b border-terminal-green/20 pb-2" {...props} />
);

const MarkdownH2 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className="text-2xl font-bold text-terminal-green mt-6 mb-3" {...props} />
);

const MarkdownH3 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className="text-xl font-bold text-terminal-green mt-4 mb-2" {...props} />
);

const MarkdownH4 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h4 className="text-lg font-bold text-terminal-green mt-3 mb-2" {...props} />
);

const MarkdownP = (props: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className="text-terminal-green/90 leading-relaxed mb-4" {...props} />
);

const MarkdownUl = (props: React.HTMLAttributes<HTMLUListElement>) => (
  <ul className="list-disc pl-6 my-4 text-terminal-green/90 space-y-2" {...props} />
);

const MarkdownOl = (props: React.HTMLAttributes<HTMLOListElement>) => (
  <ol className="list-decimal list-inside space-y-2 my-4 text-terminal-green/90" {...props} />
);

const MarkdownLi = ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
  <li className="leading-relaxed" {...props}>
    {children}
  </li>
);

const MarkdownCode = ({ className, children, ...props }: React.HTMLAttributes<HTMLElement> & { className?: string }) => {
  const isInline = !className;
  if (isInline) {
    return (
      <code className="bg-terminal-green/10 text-terminal-green px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
        {children}
      </code>
    );
  }
  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

const MarkdownPre = ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
  <pre className="bg-zinc-900 border border-terminal-green/20 rounded-lg p-4 my-4 overflow-x-auto" {...props}>
    <code className="text-terminal-green/90 text-sm font-mono block">{children}</code>
  </pre>
);

const MarkdownBlockquote = (props: React.HTMLAttributes<HTMLQuoteElement>) => (
  <blockquote className="border-l-4 border-terminal-green/40 pl-4 my-4 italic text-terminal-green/80" {...props} />
);

const MarkdownA = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    className="text-terminal-green underline hover:text-terminal-green/80 transition-colors"
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  />
);
/* eslint-enable jsx-a11y/heading-has-content */
/* eslint-enable jsx-a11y/anchor-has-content */

const MarkdownStrong = (props: React.HTMLAttributes<HTMLElement>) => (
  <strong className="text-terminal-green font-bold" {...props} />
);

const MarkdownEm = (props: React.HTMLAttributes<HTMLElement>) => (
  <em className="text-terminal-green/80 italic" {...props} />
);

const MarkdownHr = () => <hr className="border-terminal-green/20 my-8" />;

// Markdown components configuration
const markdownComponents = {
  h1: MarkdownH1,
  h2: MarkdownH2,
  h3: MarkdownH3,
  h4: MarkdownH4,
  p: MarkdownP,
  ul: MarkdownUl,
  ol: MarkdownOl,
  li: MarkdownLi,
  code: MarkdownCode,
  pre: MarkdownPre,
  blockquote: MarkdownBlockquote,
  a: MarkdownA,
  strong: MarkdownStrong,
  em: MarkdownEm,
  hr: MarkdownHr,
};

export default function BlogPostClient({ post }: Readonly<BlogPostClientProps>) {
  const CategoryIcon = categories[post.category].icon;

  const handleShare = () => {
    if (globalThis.navigator?.share) {
      globalThis.navigator.share({
        title: post.title,
        text: post.excerpt,
        url: globalThis.location.href,
      }).catch(() => {
        // Silently fail if user cancels
      });
    }
  };

  const handleTwitterShare = () => {
    const url = globalThis.window === undefined ? '' : globalThis.location.href;
    globalThis.window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}`,
      '_blank'
    );
  };

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
              <Link href="/blog" className="hover:text-terminal-green/80 transition-colors terminal-link">
                <span className="terminal-prompt">&gt; blog</span>
              </Link>
              <Link href="/case-studies" className="hover:text-terminal-green/80 transition-colors terminal-link">
                <span className="terminal-prompt">&gt; case studies</span>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/blog">
            <Button variant="outline" className="terminal-button-outline group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="terminal-prompt">&gt; voltar ao blog</span>
            </Button>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="terminal-window border border-terminal-green/20 p-8">
            <div className="flex items-center gap-2 mb-6">
              <CategoryIcon className={`h-5 w-5 ${categories[post.category].color}`} />
              <span className="text-sm text-terminal-green/60 uppercase tracking-wider">
                {categories[post.category].label}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-terminal-green mb-4 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-terminal-green/80 mb-6 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 mb-6 text-sm text-terminal-green/60">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} de leitura</span>
              </div>
              {post.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
              )}
              {post.videoUrl && (
                <Link href={post.videoUrl} target="_blank" rel="noopener noreferrer">
                  <div className="flex items-center gap-2 hover:text-terminal-green transition-colors">
                    <Video className="h-4 w-4" />
                    <span>Vídeo no YouTube</span>
                  </div>
                </Link>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-terminal-green/10 text-terminal-green/80 border border-terminal-green/20 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-terminal-green/60">Compartilhar:</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="terminal-button-outline"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="terminal-button-outline"
                  onClick={handleTwitterShare}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="terminal-window border border-terminal-green/20 p-8">
            <div className="flex items-center gap-2 mb-6">
              <Terminal className="h-5 w-5 text-terminal-green" />
              <span className="terminal-prompt">&gt; cat article.md</span>
            </div>

            <div className="prose prose-invert prose-terminal max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
                components={markdownComponents}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </motion.article>

        {/* Author Bio */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="terminal-window border border-terminal-green/20 p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-terminal-green" />
              <span className="terminal-prompt">&gt; author.info()</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-terminal-green/10 border border-terminal-green/20 flex items-center justify-center overflow-hidden">
                <User className="h-8 w-8 text-terminal-green" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-terminal-green">{post.author || 'Gabriel Almir'}</h3>
                <p className="text-terminal-green/80">Backend Software Engineer</p>
                <p className="text-sm text-terminal-green/60 mt-1">
                  6+ anos desenvolvendo sistemas backend escaláveis com Node.js, TypeScript e AWS.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Navigation */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex justify-between items-center flex-wrap gap-4">
            <Link href="/blog">
              <Button className="terminal-button group">
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                <span className="terminal-prompt">&gt; mais posts</span>
              </Button>
            </Link>

            <Link href="/case-studies">
              <Button variant="outline" className="terminal-button-outline group">
                <span className="terminal-prompt">&gt; ver case studies</span>
                <ExternalLink className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
