'use client';

import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import type { BlogPost } from '@/lib/blog';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Calendar, Clock, Code2, ExternalLink, Share2, Terminal, User, Video } from 'lucide-react';
import Image from 'next/image';
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
  <h1 className="text-3xl font-bold text-vesper-orange mt-10 mb-5 border-b border-vesper-orange/20 pb-3 leading-tight" {...props} />
);

const MarkdownH2 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className="text-2xl font-bold text-vesper-orange mt-8 mb-4 leading-snug" {...props} />
);

const MarkdownH3 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className="text-xl font-bold text-vesper-orange mt-6 mb-3 leading-normal" {...props} />
);

const MarkdownH4 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h4 className="text-lg font-bold text-vesper-orange mt-5 mb-2 leading-normal" {...props} />
);

const MarkdownP = (props: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className="text-vesper-orange/90 leading-[1.8] mb-5 text-pretty text-base" {...props} />
);

const MarkdownUl = (props: React.HTMLAttributes<HTMLUListElement>) => (
  <ul className="list-disc pl-6 my-5 text-vesper-orange/90 space-y-3" {...props} />
);

const MarkdownOl = (props: React.HTMLAttributes<HTMLOListElement>) => (
  <ol className="list-decimal list-inside space-y-3 my-5 text-vesper-orange/90" {...props} />
);

const MarkdownLi = ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
  <li className="leading-[1.8]" {...props}>
    {children}
  </li>
);

const MarkdownCode = ({ className, children, ...props }: React.HTMLAttributes<HTMLElement> & { className?: string }) => {
  const isInline = !className;
  if (isInline) {
    return (
      <code className="bg-vesper-orange/10 text-vesper-orange px-2 py-1 rounded text-sm font-mono" {...props}>
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
  <pre className="bg-zinc-900 border border-vesper-orange/20 rounded-lg p-5 my-6 overflow-x-auto" {...props}>
    <code className="text-vesper-orange/90 text-sm font-mono block leading-relaxed">{children}</code>
  </pre>
);

const MarkdownBlockquote = (props: React.HTMLAttributes<HTMLQuoteElement>) => (
  <blockquote className="border-l-4 border-vesper-orange/40 pl-5 py-1 my-6 italic text-vesper-orange/80 bg-vesper-orange/5" {...props} />
);

const MarkdownA = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    className="text-vesper-orange underline hover:text-vesper-orange/80 transition-colors"
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  />
);
/* eslint-enable jsx-a11y/heading-has-content */
/* eslint-enable jsx-a11y/anchor-has-content */

const MarkdownStrong = (props: React.HTMLAttributes<HTMLElement>) => (
  <strong className="text-vesper-orange font-bold" {...props} />
);

const MarkdownEm = (props: React.HTMLAttributes<HTMLElement>) => (
  <em className="text-vesper-orange/90 italic" {...props} />
);

const MarkdownHr = () => <hr className="border-vesper-orange/20 my-10" />;

const MarkdownTable = (props: React.HTMLAttributes<HTMLTableElement>) => (
  <div className="overflow-x-auto my-6">
    <table className="w-full border border-vesper-orange/20" {...props} />
  </div>
);

const MarkdownThead = (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className="bg-vesper-orange/10" {...props} />
);

const MarkdownTbody = (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody {...props} />
);

const MarkdownTr = (props: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className="border-b border-vesper-orange/20" {...props} />
);

const MarkdownTh = (props: React.HTMLAttributes<HTMLTableCellElement>) => (
  <th className="text-left p-3 text-vesper-orange font-bold" {...props} />
);

const MarkdownTd = (props: React.HTMLAttributes<HTMLTableCellElement>) => (
  <td className="p-3 text-vesper-orange/90" {...props} />
);

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
  table: MarkdownTable,
  thead: MarkdownThead,
  tbody: MarkdownTbody,
  tr: MarkdownTr,
  th: MarkdownTh,
  td: MarkdownTd,
};

export default function BlogPostClient({ post }: Readonly<BlogPostClientProps>) {
  const CategoryIcon = categories[post.category].icon;

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string): string | null => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  const youtubeVideoId = post.videoUrl ? getYouTubeVideoId(post.videoUrl) : null;

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
    <div className="min-h-screen bg-background text-vesper-orange font-mono selection:bg-vesper-orange selection:text-black">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-scanline animate-scanline opacity-[0.02]"></div>
        <div className="absolute inset-0 bg-glow opacity-50"></div>
      </div>

      {/* Header */}
      <Header />

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
          <div className="terminal-window border border-vesper-orange/20 p-8">
            <div className="flex items-center gap-2 mb-6">
              <CategoryIcon className={`h-5 w-5 ${categories[post.category].color}`} />
              <span className="text-sm text-vesper-orange/60 uppercase tracking-wider">
                {categories[post.category].label}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-vesper-orange mb-5 leading-tight">
              {post.title}
            </h1>

            <p className="text-lg md:text-xl text-vesper-orange/80 mb-6 leading-[1.6]">
              {post.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 mb-6 text-sm text-vesper-orange/60">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString('pt-BR')} (UTC-3)</span>
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
                  <div className="flex items-center gap-2 hover:text-vesper-orange transition-colors">
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
                  className="px-3 py-1 text-sm bg-vesper-orange/10 text-vesper-orange/80 border border-vesper-orange/20 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-vesper-orange/60">Compartilhar:</span>
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

        {/* YouTube Video Embed */}
        {youtubeVideoId && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="terminal-window border border-vesper-orange/20 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Video className="h-5 w-5 text-vesper-orange" />
                <span className="terminal-prompt">&gt; video.play()</span>
              </div>

              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg border border-vesper-orange/20"
                  src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                  title={post.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.section>
        )}

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: youtubeVideoId ? 0.4 : 0.2 }}
          className="mb-12"
        >
          <div className="terminal-window border border-vesper-orange/20 p-8 md:p-10">
            <div className="flex items-center gap-2 mb-8">
              <Terminal className="h-5 w-5 text-vesper-orange" />
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
          transition={{ duration: 0.6, delay: youtubeVideoId ? 0.6 : 0.4 }}
          className="mb-12"
        >
          <div className="terminal-window border border-vesper-orange/20 p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-vesper-orange" />
              <span className="terminal-prompt">&gt; author.info()</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border border-vesper-orange/20 bg-vesper-orange/10">
              <Image
                src="/me.jpg"
                alt="Gabriel Almir"
                fill
                sizes="64px"
                className="object-cover"
                priority
              />
              </div>
              <div>
                <h3 className="text-lg font-bold text-vesper-orange">{post.author || 'Gabriel Almir'}</h3>
                <p className="text-vesper-orange/80">Backend Software Engineer</p>
                <p className="text-sm text-vesper-orange/60 mt-1">
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
          transition={{ duration: 0.6, delay: youtubeVideoId ? 0.8 : 0.6 }}
        >
          <div className="flex justify-center items-center">
            <Link href="/blog">
              <Button className="terminal-button group">
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                <span>Voltar ao blog</span>
              </Button>
            </Link>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
