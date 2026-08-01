import { LazyMotion, domAnimation, m, useScroll, useSpring } from "framer-motion";
import { CoffeeIcon, ExternalLink, Github, Heart, Instagram, Linkedin, MailIcon, Twitter } from 'lucide-react';
import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";

import { CoffeeSplashWrapper } from '@/components/coffee-splash';
import { Header } from '@/components/header';
import { ModernResumeSection } from '@/components/modern-resume-section';
import { SectionHeader } from '@/components/section-header';
import { TypingEffect } from "@/components/typing-effect";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlitchText } from "@/components/ui/glitch-text";
import type { BlogPostPreview } from '@/lib/blog';
import { LatestPosts } from './latest-posts';

const GitHubProjects = lazy(() => import("@/components/github-projects"));
const CoreStack = lazy(() => import("@/components/core-stack"));

function DeferredRender({
    children,
    fallback,
    rootMargin = "200px",
}: {
    children: ReactNode;
    fallback: ReactNode;
    rootMargin?: string;
}) {
    const anchorRef = useRef<HTMLDivElement>(null);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (!anchorRef.current) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    setShouldRender(true);
                    observer.disconnect();
                }
            },
            { rootMargin }
        );

        observer.observe(anchorRef.current);
        return () => observer.disconnect();
    }, [rootMargin]);

    return <div ref={anchorRef}>{shouldRender ? children : fallback}</div>;
}

const heroBadges = [
    'Node.js • NestJS • TypeScript',
    'APIs & Microservices',
    'ERP & Sistemas Regulados',
    'AWS • CI/CD'
];

const heroSocialLinks = [
    { Icon: Linkedin, href: "https://linkedin.com/in/gabrielalmir", label: "LinkedIn" },
    { Icon: Github, href: "https://github.com/gabrielalmir", label: "GitHub" },
    { Icon: Twitter, href: "https://x.com/momentoalmir", label: "Twitter" },
];

const contactSocialLinks = [
    { Icon: Linkedin, href: "https://linkedin.com/in/gabrielalmir", label: "LinkedIn" },
    { Icon: Github, href: "https://github.com/gabrielalmir", label: "GitHub" },
    { Icon: Twitter, href: "https://x.com/momentoalmir", label: "Twitter" },
    { Icon: Instagram, href: "https://instagram.com/momentoalmir", label: "Instagram" },
];

const footerNavLinks = [
    { href: '/#sobre', label: 'Sobre Mim' },
    { href: '/#habilidades', label: 'Stack Tecnológico' },
    { href: '/#projetos', label: 'Projetos' },
    { href: '/blog', label: 'Artigos & Blog' },
];

const footerSocialLinks = [
    { Icon: Linkedin, href: "https://linkedin.com/in/gabrielalmir", label: "LinkedIn" },
    { Icon: Github, href: "https://github.com/gabrielalmir", label: "GitHub" },
    { Icon: Twitter, href: "https://x.com/momentoalmir", label: "Twitter" },
];

const dataMessagingTech = ['PostgreSQL', 'MongoDB', 'RabbitMQ'];
const cloudDevOpsTech = ['AWS Lambda', 'AWS SQS', 'Docker', 'CI/CD (GitLab)'];
const integrationsTech = ['SAP', 'TOTVS', 'APIs ODATA', 'Ambientes regulados (BPF)'];
const aiTech = ['LLMs', 'Copilot Studio'];

interface HomeClientProps {
    latestPosts: BlogPostPreview[];
    githubProjects?: any[];
}

function HeroSection() {
    return (
        <section className="pt-20 pb-16 md:pt-28 md:pb-24 lg:pt-32 lg:pb-28 px-4 sm:px-6 lg:px-8 w-full max-w-full relative">
            <div className="container mx-auto max-w-7xl w-full">
                <div className="grid lg:grid-cols-[1.6fr,1fr] gap-12 lg:gap-20 items-center w-full max-w-full">
                    <div className="space-y-8 md:space-y-10 w-full max-w-full overflow-hidden z-10">
                        <div className="inline-flex items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-full border border-vesper-cyan/25 bg-vesper-cyan/[0.04] backdrop-blur-sm max-w-full">
                            <span className="availability-dot flex-shrink-0"></span>
                            <span className="text-[11px] sm:text-xs uppercase tracking-[0.18em] font-medium text-vesper-cyan/90 truncate">
                                Aberto a novas oportunidades
                            </span>
                        </div>

                        <div className="space-y-4 md:space-y-6 w-full max-w-full">
                            <h1 className="font-bold leading-[1.02] break-words w-full tracking-[-0.035em] text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
                                <span className="text-foreground/90">Olá, sou</span>
                                <br />
                                <GlitchText text="Gabriel Almir" className="text-vesper-orange" />
                            </h1>

                            <div className="text-lg sm:text-xl md:text-2xl lg:text-[1.625rem] font-semibold text-vesper-cyan/90 break-words w-full h-[1.5em] flex items-center">
                                <TypingEffect
                                    words={[
                                        "Backend Node.js & TypeScript, com NestJS",
                                        "Integrações ERP em ambiente regulado",
                                        "Aplicando IA a triagem e automação"
                                    ]}
                                    typingSpeed={80}
                                    deletingSpeed={40}
                                    pauseDuration={2000}
                                    loop={false}
                                />
                            </div>

                            <p className="text-base sm:text-lg md:text-xl text-foreground/65 max-w-xl leading-[1.65] break-words w-full mt-2">
                                Integro <span className="text-vesper-orange/95 font-medium">sistemas ERP</span> e construo <span className="text-vesper-orange/95 font-medium">APIs em Node.js</span> para ambientes regulados — onde uma falha de sincronização é não-conformidade, não só um bug.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 w-full max-w-full">
                            {heroBadges.map((item) => (
                                <span
                                    key={item}
                                    className="inline-flex items-center gap-1.5 rounded-md border border-vesper-orange/15 bg-vesper-orange/[0.04] text-vesper-orange/85 px-2.5 py-1.5 text-[11px] sm:text-xs font-mono whitespace-nowrap hover:border-vesper-orange/30 hover:bg-vesper-orange/[0.08] transition-colors"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 sm:items-center pt-2 w-full max-w-full">
                            <a href="#contato" className="w-full sm:w-auto">
                                <Button
                                    size="lg"
                                    className="group w-full sm:w-auto bg-vesper-orange hover:bg-vesper-orange/90 text-black font-bold shadow-lg shadow-vesper-orange/20 hover:shadow-xl hover:shadow-vesper-orange/40 transition-all duration-300 px-6 h-12"
                                >
                                    <span>Entrar em contato</span>
                                    <ExternalLink className="h-4 w-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </Button>
                            </a>
                            <div className="text-xs text-foreground/60 flex items-center gap-2">
                                <span>ou navegue com</span>
                                <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border border-vesper-orange/20 bg-vesper-orange/[0.05] px-2 font-mono text-[10px] font-medium text-vesper-orange/80">
                                    <span className="text-xs">⌘</span>K
                                </kbd>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 pt-2 w-full max-w-full flex-wrap">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/60 font-mono mr-3">Conecte</span>
                            {heroSocialLinks.map(({ Icon, href, label }) => (
                                <a
                                    key={href}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-foreground/50 hover:text-vesper-orange transition-colors group p-2"
                                    aria-label={label}
                                >
                                    <Icon className="h-[18px] w-[18px] group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="relative lg:justify-self-end group">
                        <div className="absolute -inset-4 bg-vesper-orange/15 rounded-[2rem] blur-[80px] opacity-50 group-hover:opacity-70 transition-opacity duration-700" />

                        <div className="relative w-full max-w-[380px] lg:max-w-[480px] mx-auto">
                            <div className="absolute -top-3 -left-3 w-12 h-12 border-l-2 border-t-2 border-vesper-orange/40 rounded-tl-2xl pointer-events-none" />
                            <div className="absolute -bottom-3 -right-3 w-12 h-12 border-r-2 border-b-2 border-vesper-cyan/40 rounded-br-2xl pointer-events-none" />

                            <div className="aspect-square rounded-2xl overflow-hidden border border-vesper-orange/20 bg-black/40 backdrop-blur-sm relative transition-transform duration-700 group-hover:scale-[1.015]">
                                <div className="absolute inset-0 bg-scanline opacity-10 z-10 pointer-events-none"></div>
                                <img
                                    src="/me.webp"
                                    alt="Gabriel Almir - Desenvolvedor Backend Node.js"
                                    width={480}
                                    height={480}
                                    className="w-full h-full object-cover image-balanced transition-all duration-700 group-hover:brightness-110"
                                    loading="eager"
                                    fetchPriority="high"
                                    decoding="async"
                                />

                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent z-20">
                                    <div className="flex items-center justify-between text-[11px] font-mono">
                                        <span className="text-vesper-cyan/80">~/gabrielalmir</span>
                                        <span className="text-vesper-orange/70">v2.0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function SkillsSection() {
    return (
        <section id="habilidades" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,199,153,0.03)_0%,transparent_70%)] pointer-events-none"></div>
            <div className="container mx-auto max-w-7xl w-full relative z-10">
                <SectionHeader
                    eyebrow="Stack"
                    title={<><span className="text-foreground">Arsenal </span><span className="text-vesper-orange">Técnico</span></>}
                    subtitle="Ferramentas e tecnologias que uso no dia a dia para construir produtos confiáveis e escaláveis."
                />

                <div className="space-y-16 w-full max-w-full">
                    <DeferredRender fallback={<div className="h-96 w-full animate-pulse bg-vesper-orange/5 rounded-xl"></div>}>
                        <Suspense fallback={<div className="h-96 w-full animate-pulse bg-vesper-orange/5 rounded-xl"></div>}>
                            <CoreStack />
                        </Suspense>
                    </DeferredRender>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-vesper-cyan flex items-center gap-2">
                                <span className="w-2 h-2 bg-vesper-cyan rounded-full"></span>
                                Dados & Mensageria
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {dataMessagingTech.map((tech) => (
                                    <span key={tech} className="px-3 py-1.5 rounded-md border border-vesper-cyan/20 bg-vesper-cyan/5 text-vesper-cyan/90 text-sm hover:bg-vesper-cyan/10 transition-colors cursor-default">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                                <span className="w-2 h-2 bg-foreground/50 rounded-full"></span>
                                Cloud & DevOps
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {cloudDevOpsTech.map((tech) => (
                                    <span key={tech} className="px-3 py-1.5 rounded-md border border-foreground/10 bg-foreground/5 text-foreground/80 text-sm hover:bg-foreground/10 transition-colors cursor-default">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-vesper-orange flex items-center gap-2">
                                <span className="w-2 h-2 bg-vesper-orange rounded-full"></span>
                                Integrações & Compliance
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {integrationsTech.map((tech) => (
                                    <span key={tech} className="px-3 py-1.5 rounded-md border border-vesper-orange/20 bg-vesper-orange/5 text-vesper-orange/90 text-sm hover:bg-vesper-orange/10 transition-colors cursor-default">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                                <span className="w-2 h-2 bg-foreground/50 rounded-full"></span>
                                IA aplicada
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {aiTech.map((tech) => (
                                    <span key={tech} className="px-3 py-1.5 rounded-md border border-foreground/10 bg-foreground/5 text-foreground/80 text-sm hover:bg-foreground/10 transition-colors cursor-default">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ProjectsSection({ githubProjects }: { githubProjects?: any[] }) {
    return (
        <section id="projetos" className="py-20 md:py-28 bg-gradient-to-b from-background via-background to-vesper-orange/[0.03] px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden">
            <div className="container mx-auto max-w-6xl w-full">
                <SectionHeader
                    eyebrow="Trabalho"
                    title={<><span className="text-foreground">Projetos em </span><span className="text-vesper-orange">Destaque</span></>}
                    subtitle="Do PhotoGIMP, mantido desde 2021 com usuários reais, a APIs e sistemas distribuídos em produção."
                />


                <DeferredRender
                    rootMargin="280px"
                    fallback={
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {Array.from({ length: 4 }, (_, index) => `home-skeleton-${index}`).map((skeletonId) => (
                                <div key={skeletonId} className="terminal-window border border-vesper-orange/20 p-4 sm:p-6 animate-pulse">
                                    <div className="h-4 bg-vesper-orange/20 rounded mb-2"></div>
                                    <div className="h-3 bg-vesper-orange/10 rounded mb-4"></div>
                                    <div className="flex gap-2 mb-4">
                                        <div className="h-5 bg-vesper-orange/10 rounded w-16"></div>
                                        <div className="h-5 bg-vesper-orange/10 rounded w-20"></div>
                                    </div>
                                    <div className="h-8 bg-vesper-orange/10 rounded"></div>
                                </div>
                            ))}
                        </div>
                    }
                >
                    <Suspense fallback={
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {Array.from({ length: 4 }, (_, index) => `home-skeleton-suspense-${index}`).map((skeletonId) => (
                                <div key={skeletonId} className="terminal-window border border-vesper-orange/20 p-4 sm:p-6 animate-pulse">
                                    <div className="h-4 bg-vesper-orange/20 rounded mb-2"></div>
                                    <div className="h-3 bg-vesper-orange/10 rounded mb-4"></div>
                                    <div className="flex gap-2 mb-4">
                                        <div className="h-5 bg-vesper-orange/10 rounded w-16"></div>
                                        <div className="h-5 bg-vesper-orange/10 rounded w-20"></div>
                                    </div>
                                    <div className="h-8 bg-vesper-orange/10 rounded"></div>
                                </div>
                            ))}
                        </div>
                    }>
                        <GitHubProjects username="gabrielalmir" initialProjects={githubProjects} />
                    </Suspense>
                </DeferredRender>

                <div className="text-center mt-16">
                    <a href="https://github.com/gabrielalmir?tab=repositories" target="_blank" rel="noopener noreferrer">
                        <Button size="lg" variant="outline" className="terminal-button-outline group px-8">
                            <span>Explorar repositório completo</span>
                            <ExternalLink className="h-4 w-4 ml-2 group-hover:scale-110 transition-transform" />
                        </Button>
                    </a>
                </div>
            </div>
        </section>
    );
}

function ContactSection() {
    return (
        <section id="contato" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden relative">
            <div className="container mx-auto max-w-4xl w-full relative z-10">
                <div className="relative rounded-3xl border border-vesper-orange/20 bg-gradient-to-br from-vesper-orange/[0.08] via-background to-vesper-cyan/[0.04] p-8 md:p-14 lg:p-16 overflow-hidden">
                    <div className="absolute -top-32 -right-32 w-64 h-64 bg-vesper-orange/15 rounded-full blur-[80px] pointer-events-none" />
                    <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-vesper-cyan/10 rounded-full blur-[80px] pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="inline-flex items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-full border border-vesper-cyan/25 bg-vesper-cyan/[0.06] backdrop-blur-sm mb-8">
                            <span className="availability-dot flex-shrink-0"></span>
                            <span className="text-[11px] uppercase tracking-[0.18em] font-medium text-vesper-cyan/90">
                                Aberto a novas oportunidades
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5 break-words tracking-[-0.025em] leading-[1.05]">
                            Vamos conversar sobre
                            <br />
                            <span className="text-vesper-orange">a próxima posição.</span>
                        </h2>
                        <p className="text-base md:text-lg text-foreground/60 mb-10 max-w-xl mx-auto break-words leading-relaxed">
                            Buscando minha próxima posição em backend e arquitetura — vamos conversar.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center mb-12">
                            <a href="mailto:gabr.almir@gmail.com" className="w-full sm:w-auto">
                                <Button size="lg" className="group w-full sm:w-auto bg-vesper-orange hover:bg-vesper-orange/90 text-black font-bold shadow-lg shadow-vesper-orange/20 hover:shadow-xl hover:shadow-vesper-orange/40 transition-all duration-300 px-8 h-14 text-base">
                                    <MailIcon className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform flex-shrink-0" />
                                    <span className="truncate">gabr.almir@gmail.com</span>
                                </Button>
                            </a>
                        </div>

                        <div className="flex items-center gap-3 text-foreground/60 text-[10px] uppercase tracking-[0.2em] font-mono mb-6">
                            <span className="h-px w-8 bg-foreground/20" />
                            <span>ou conecte-se</span>
                            <span className="h-px w-8 bg-foreground/20" />
                        </div>

                        <div className="flex gap-3 justify-center items-center flex-wrap">
                            {contactSocialLinks.map(({ Icon, href, label }) => (
                                <a
                                    key={href}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-2 px-4 py-2.5 rounded-lg border border-vesper-orange/15 bg-vesper-orange/[0.03] hover:border-vesper-orange/40 hover:bg-vesper-orange/[0.08] transition-all"
                                >
                                    <Icon className="h-4 w-4 text-foreground/60 group-hover:text-vesper-orange transition-colors" />
                                    <span className="text-xs font-medium text-foreground/60 group-hover:text-vesper-orange transition-colors">
                                        {label}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function SiteFooter() {
    return (
        <footer className="border-t border-vesper-orange/10 py-16 bg-black/40 backdrop-blur-lg relative z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-vesper-orange flex items-center gap-2">
                            <CoffeeIcon size={24} className="text-vesper-orange" /> Gabriel Almir
                        </h3>
                        <p className="text-sm text-foreground/70 leading-relaxed max-w-xs">
                            Desenvolvedor Backend Node.js/TypeScript, com foco em integrações ERP e sistemas em ambientes regulados.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-sm font-bold text-foreground uppercase tracking-widest border-b border-vesper-orange/10 pb-2 w-fit">Navegação</h4>
                        <ul className="space-y-3">
                            {footerNavLinks.map(({ href, label }) => (
                                <li key={href}>
                                    <a
                                        href={href}
                                        className="text-sm text-foreground/60 hover:text-vesper-orange hover:translate-x-1 transition-all inline-block"
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-sm font-bold text-foreground uppercase tracking-widest border-b border-vesper-orange/10 pb-2 w-fit">Conecte-se</h4>
                        <div className="flex gap-4">
                            {footerSocialLinks.map(({ Icon, href, label }) => (
                                <a
                                    key={href}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group w-10 h-10 rounded-lg border border-vesper-orange/20 flex items-center justify-center hover:border-vesper-orange hover:bg-vesper-orange/10 transition-all"
                                    aria-label={label}
                                >
                                    <Icon className="h-4 w-4 text-foreground/60 group-hover:text-vesper-orange transition-colors" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-sm font-bold text-foreground uppercase tracking-widest border-b border-vesper-orange/10 pb-2 w-fit">Contato</h4>
                        <a
                            href="mailto:gabr.almir@gmail.com"
                            className="text-sm text-foreground/60 hover:text-vesper-orange transition-colors flex items-center gap-2"
                        >
                            <MailIcon className="w-4 h-4" />
                            gabr.almir@gmail.com
                        </a>
                    </div>
                </div>

                <div className="border-t border-vesper-orange/10 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2 text-foreground/60 text-xs font-mono">
                            <span>© {new Date().getFullYear()} Gabriel Almir. v2.0.0</span>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-foreground/60 text-xs font-mono">
                            <a
                                href="/sitemap-index.xml"
                                className="hover:text-vesper-orange transition-colors"
                            >
                                Sitemap
                            </a>
                            <a
                                href="https://github.com/gabrielalmir/gabrielalmir"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-vesper-orange transition-colors"
                            >
                                Código-fonte deste site
                            </a>
                        </div>

                        <div className="flex items-center gap-2 text-foreground/60 text-xs">
                            <span>Desenvolvido com</span>
                            <Heart className="w-3 h-3 text-vesper-red fill-vesper-red animate-pulse" />
                            <span>em Astro & Vesper Theme</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export function HomeClient({ latestPosts, githubProjects }: HomeClientProps) {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <LazyMotion features={domAnimation}>
            <div data-home-loaded className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black overflow-x-hidden">
                <m.div
                    className="fixed top-0 left-0 right-0 h-1 bg-vesper-orange origin-left z-[100]"
                    style={{ scaleX }}
                />

                <Suspense fallback={null}>
                    <CoffeeSplashWrapper />
                </Suspense>

                <div className="fixed inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-scanline animate-scanline opacity-[0.02]"></div>
                    <div className="absolute inset-0 bg-glow opacity-50"></div>
                </div>

                <Header />

                <main id="main" className="w-full overflow-x-hidden max-w-full">
                    <HeroSection />

                    <SkillsSection />

                    <LatestPosts latestPosts={latestPosts} />

                    <ProjectsSection githubProjects={githubProjects} />

                    <section id="sobre" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden">
                        <div className="container mx-auto max-w-7xl w-full">
                            <ModernResumeSection />
                        </div>
                    </section>

                    <ContactSection />
                </main>

                <SiteFooter />
            </div>
        </LazyMotion>
    )
}
