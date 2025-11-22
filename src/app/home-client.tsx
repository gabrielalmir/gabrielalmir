"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { CoffeeIcon, ExternalLink, Github, Heart, Instagram, Linkedin, MailIcon, Twitter } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";

import { CoffeeSplashWrapper } from '@/components/coffee-splash';
import GitHubProjects from "@/components/github-projects";
import { Header } from '@/components/header';
import { ModernResumeSection } from '@/components/modern-resume-section';
import { TechMarquee } from "@/components/tech-marquee";
import { TypingEffect } from "@/components/typing-effect";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlitchText } from "@/components/ui/glitch-text";
import { VesperDecorations } from '@/components/vesper-decorations';
import type { BlogPost } from '@/lib/blog';
import { AmazonwebservicesPlainWordmark, NestjsOriginal, NodejsOriginal, PythonOriginal, TypescriptOriginal } from "devicons-react";
import { Suspense } from "react";
import { LatestPosts } from '../components/latest-posts';

interface HomeClientProps {
  latestPosts: BlogPost[];
}

export function HomeClient({ latestPosts }: HomeClientProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background text-foreground font-mono selection:bg-primary selection:text-black overflow-x-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-vesper-orange origin-left z-[100]"
        style={{ scaleX }}
      />

      <Suspense fallback={null}>
        <CoffeeSplashWrapper />
      </Suspense>

      <VesperDecorations />


      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-scanline animate-scanline opacity-[0.02]"></div>
        <div className="absolute inset-0 bg-glow opacity-50"></div>
      </div>


      <Header />

      <main className="w-full overflow-x-hidden max-w-full">

        <section className="py-24 md:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 w-full max-w-full relative">
          <div className="container mx-auto max-w-7xl w-full">
            <div className="grid lg:grid-cols-[1.5fr,1fr] gap-12 lg:gap-16 items-center w-full max-w-full">


              <div className="space-y-6 md:space-y-8 w-full max-w-full overflow-hidden z-10">

                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-vesper-orange/20 bg-vesper-orange/5 max-w-full">
                  <span className="w-2 h-2 rounded-full bg-vesper-cyan animate-pulse flex-shrink-0"></span>
                  <span className="text-xs sm:text-sm text-vesper-cyan truncate">
                    Vou fazer você apaixonar por tecnologia
                  </span>
                </div>


                <div className="space-y-3 md:space-y-4 w-full max-w-full">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight break-words w-full tracking-tight">
                    <span className="text-foreground">Olá, sou</span>
                    <br />
                    <GlitchText text="Gabriel Almir" className="text-vesper-orange" />
                  </h1>

                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-vesper-cyan/90 break-words w-full h-[1.5em] flex items-center">
                    <TypingEffect
                      words={[
                        "Engenheiro de Software Backend",
                        "Especialista em Node.js & Python",
                        "Arquiteto de Sistemas Cloud",
                        "Entusiasta de IA & ML"
                      ]}
                      typingSpeed={80}
                      deletingSpeed={40}
                      pauseDuration={2000}
                    />
                  </div>

                  <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-2xl leading-relaxed break-words w-full mt-4">
                    Transformo problemas complexos em <span className="text-vesper-orange">código limpo</span> e <span className="text-vesper-orange">arquiteturas escaláveis</span>.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-3 w-full max-w-full">
                  {[
                    '6+ anos de experiência',
                    'Node.js • NestJS • TypeScript',
                    'Python • Machine Learning',
                    'AWS • Microsserviços'
                  ].map((item) => (
                    <Badge
                      key={item}
                      variant="outline"
                      className="border-vesper-orange/30 text-vesper-orange/90 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm whitespace-nowrap"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>


                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 w-full max-w-full">
                  <Link href="#contato" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="group w-full sm:w-auto bg-vesper-orange hover:bg-vesper-orange/90 text-black font-bold shadow-lg shadow-vesper-orange/20 hover:shadow-xl hover:shadow-vesper-orange/40 transition-all duration-300"
                    >
                      <span>Entrar em contato</span>
                      <ExternalLink className="h-4 w-4 ml-2 group-hover:scale-110 transition-transform" />
                    </Button>
                  </Link>
                  <div className="text-xs text-foreground/40 flex items-center gap-2 px-2">
                     <span className="hidden sm:inline">ou pressione</span>
                     <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-vesper-orange/20 bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        <span className="text-xs">⌘</span>K
                      </kbd>
                  </div>
                </div>


                <div className="flex items-center gap-4 sm:gap-6 pt-4 justify-center sm:justify-start w-full max-w-full flex-wrap">
                  {[
                    { Icon: Linkedin, href: "https://linkedin.com/in/gabrielalmir", label: "LinkedIn" },
                    { Icon: Github, href: "https://github.com/gabrielalmir", label: "GitHub" },
                    { Icon: Twitter, href: "https://x.com/momentoalmir", label: "Twitter" },
                  ].map(({ Icon, href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      target="_blank"
                      className="text-foreground/60 hover:text-vesper-orange transition-colors group p-2"
                    >
                      <Icon className="h-6 w-6 group-hover:scale-110 transition-transform" />
                      <span className="sr-only">{label}</span>
                    </Link>
                  ))}
                </div>
              </div>


              <div className="relative lg:justify-self-end group perspective-1000">

                <div className="absolute inset-0 bg-vesper-orange/20 rounded-2xl blur-[60px] opacity-40 group-hover:opacity-60 transition-opacity duration-500" />


                <div className="relative w-full max-w-sm lg:max-w-md mx-auto transform transition-transform duration-500 group-hover:scale-[1.02] group-hover:rotate-y-2">
                  <div className="aspect-square rounded-2xl overflow-hidden border border-vesper-orange/20 bg-black/40 backdrop-blur-sm relative">
                    <div className="absolute inset-0 bg-scanline opacity-10 z-10 pointer-events-none"></div>
                    <Image
                      src="/me.webp"
                      alt="Gabriel Almir - Engenheiro de Software Backend"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover image-balanced transition-all duration-700 group-hover:brightness-110"
                      priority
                    />

                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-vesper-orange font-mono text-sm">&gt; system.user_profile.load()</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-vesper-orange/10 bg-vesper-orange/5 backdrop-blur-sm">
          <TechMarquee
            speed="slow"
            items={[
              "Clean Architecture", "DDD", "SOLID", "Event-Driven", "Microservices", "Serverless",
              "DevOps", "CI/CD", "TDD", "System Design", "Scalability", "Performance"
            ]}
          />
        </section>


        <section id="habilidades" className="py-24 px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden relative">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,199,153,0.03)_0%,transparent_70%)] pointer-events-none"></div>
          <div className="container mx-auto max-w-7xl w-full relative z-10">

            <div className="text-center mb-16 w-full max-w-full px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 break-words">
                Arsenal Técnico
              </h2>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto break-words">
                Ferramentas e tecnologias que utilizo para construir o futuro
              </p>
            </div>


            <div className="space-y-16 w-full max-w-full">


              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <div className="w-1 h-8 bg-vesper-orange rounded-full flex-shrink-0"></div>
                  <h3 className="text-2xl font-bold text-vesper-orange">Core Stack</h3>
                  <Badge variant="outline" className="border-vesper-orange/30 text-vesper-orange/80">
                    Especialidade Principal
                  </Badge>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                  {[
                    { Icon: NodejsOriginal, label: "Node.js", level: "Expert" },
                    { Icon: TypescriptOriginal, label: "TypeScript", level: "Expert" },
                    { Icon: NestjsOriginal, label: "NestJS", level: "Expert" },
                    { Icon: PythonOriginal, label: "Python", level: "Advanced" },
                    { Icon: AmazonwebservicesPlainWordmark, label: "AWS", level: "Advanced" },
                  ].map(({ Icon, label, level }) => (
                    <div
                      key={label}
                      className="group relative p-6 rounded-xl border border-vesper-orange/10 bg-background/50 hover:bg-vesper-orange/5 hover:border-vesper-orange/30 transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex flex-col items-center gap-4">
                        <Icon size={48} className="text-vesper-cyan group-hover:scale-110 transition-transform duration-300" />
                        <div className="text-center">
                          <div className="font-bold text-foreground">{label}</div>
                          <div className="text-xs text-vesper-orange/70 mt-1 font-mono">{level}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                 <div className="space-y-6">
                    <h3 className="text-xl font-bold text-vesper-cyan flex items-center gap-2">
                      <span className="w-2 h-2 bg-vesper-cyan rounded-full"></span>
                      Cloud & Infra
                    </h3>
                    <div className="flex flex-wrap gap-2">
                       {['Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Lambda', 'ECS', 'S3', 'DynamoDB', 'CloudWatch'].map((tech) => (
                          <span key={tech} className="px-3 py-1.5 rounded-md border border-vesper-cyan/20 bg-vesper-cyan/5 text-vesper-cyan/90 text-sm hover:bg-vesper-cyan/10 transition-colors cursor-default">
                            {tech}
                          </span>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-6">
                    <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                      <span className="w-2 h-2 bg-foreground/50 rounded-full"></span>
                      Data & Events
                    </h3>
                    <div className="flex flex-wrap gap-2">
                       {['PostgreSQL', 'MongoDB', 'Redis', 'RabbitMQ', 'Kafka', 'SQS', 'ElasticSearch'].map((tech) => (
                          <span key={tech} className="px-3 py-1.5 rounded-md border border-foreground/10 bg-foreground/5 text-foreground/80 text-sm hover:bg-foreground/10 transition-colors cursor-default">
                            {tech}
                          </span>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="pt-8">
                  <h3 className="text-sm font-mono text-vesper-orange/50 mb-4 uppercase tracking-wider">Tecnologias Complementares</h3>
                  <TechMarquee
                    items={['React', 'Next.js', 'TailwindCSS', 'GraphQL', 'gRPC', 'WebSockets', 'Jest', 'PyTest', 'FastAPI', 'Flask', 'Go', 'Rust']}
                    direction="right"
                  />
              </div>

            </div>
          </div>
        </section>


        <LatestPosts latestPosts={latestPosts} />


        <section id="projetos" className="py-24 bg-gradient-to-b from-background to-vesper-orange/5 px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden">
          <div className="container mx-auto max-w-6xl w-full">

            <div className="text-center mb-16 w-full max-w-full px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 break-words">
                Projetos em Destaque
              </h2>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto break-words">
                Code is poetry. Aqui estão alguns dos meus melhores versos.
              </p>
            </div>


            <GitHubProjects username="gabrielalmir" />


            <div className="text-center mt-16">
              <Link href="https://github.com/gabrielalmir?tab=repositories" target="_blank">
                <Button size="lg" variant="outline" className="terminal-button-outline group px-8">
                  <span>Explorar repositório completo</span>
                  <ExternalLink className="h-4 w-4 ml-2 group-hover:scale-110 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>


        <section id="sobre" className="py-24 px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden">
          <div className="container mx-auto max-w-7xl w-full">
          <ModernResumeSection />
          </div>
        </section>


        <section id="contato" className="py-24 px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden relative">
          <div className="absolute inset-0 bg-vesper-orange/5 skew-y-3 transform origin-bottom-right -z-10"></div>
          <div className="container mx-auto max-w-4xl text-center w-full relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 break-words px-4">
              Vamos construir algo incrível?
            </h2>
            <p className="text-lg text-foreground/70 mb-12 max-w-2xl mx-auto break-words px-4 leading-relaxed">
              Estou disponível para freelance e consultoria. Se você tem um desafio técnico interessante, adoraria ouvir sobre ele.
            </p>


            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Link href="mailto:gabr.almir@gmail.com" className="w-full sm:w-auto">
                <Button size="lg" className="terminal-button group w-full sm:w-auto px-8 py-6 text-lg">
                  <MailIcon className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className="truncate">gabr.almir@gmail.com</span>
                </Button>
              </Link>
            </div>


            <div className="flex gap-6 justify-center items-center flex-wrap">
              {[
                { Icon: Linkedin, href: "https://linkedin.com/in/gabrielalmir", label: "LinkedIn" },
                { Icon: Github, href: "https://github.com/gabrielalmir", label: "GitHub" },
                { Icon: Twitter, href: "https://x.com/momentoalmir", label: "Twitter" },
                { Icon: Instagram, href: "https://instagram.com/momentoalmir", label: "Instagram" },
              ].map(({ Icon, href, label }) => (
                <Link
                  key={href}
                  href={href}
                  target="_blank"
                  className="group flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-vesper-orange/5 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full border border-vesper-orange/20 flex items-center justify-center group-hover:border-vesper-orange group-hover:bg-vesper-orange/10 transition-all shadow-lg shadow-transparent group-hover:shadow-vesper-orange/20">
                    <Icon className="h-5 w-5 text-foreground/60 group-hover:text-vesper-orange group-hover:scale-110 transition-all" />
                  </div>
                  <span className="text-xs font-medium text-foreground/50 group-hover:text-vesper-orange transition-colors">
                    {label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>


      <footer className="border-t border-vesper-orange/10 py-16 bg-black/40 backdrop-blur-lg relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-vesper-orange flex items-center gap-2">
                 <CoffeeIcon size={24} className="text-vesper-orange" /> Gabriel Almir
              </h3>
              <p className="text-sm text-foreground/70 leading-relaxed max-w-xs">
                Engenheiro de Software Backend focado em performance, escalabilidade e código limpo.
              </p>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold text-foreground uppercase tracking-widest border-b border-vesper-orange/10 pb-2 w-fit">Navegação</h4>
              <ul className="space-y-3">
                {[
                  { href: '/#sobre', label: 'Sobre Mim' },
                  { href: '/#habilidades', label: 'Stack Tecnológico' },
                  { href: '/#projetos', label: 'Projetos' },
                  { href: '/blog', label: 'Artigos & Blog' },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-foreground/60 hover:text-vesper-orange hover:translate-x-1 transition-all inline-block"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold text-foreground uppercase tracking-widest border-b border-vesper-orange/10 pb-2 w-fit">Conecte-se</h4>
              <div className="flex gap-4">
                {[
                  { Icon: Linkedin, href: "https://linkedin.com/in/gabrielalmir", label: "LinkedIn" },
                  { Icon: Github, href: "https://github.com/gabrielalmir", label: "GitHub" },
                  { Icon: Twitter, href: "https://x.com/momentoalmir", label: "Twitter" },
                ].map(({ Icon, href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    target="_blank"
                    className="group w-10 h-10 rounded-lg border border-vesper-orange/20 flex items-center justify-center hover:border-vesper-orange hover:bg-vesper-orange/10 transition-all"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4 text-foreground/60 group-hover:text-vesper-orange transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold text-foreground uppercase tracking-widest border-b border-vesper-orange/10 pb-2 w-fit">Contato</h4>
              <Link
                href="mailto:gabr.almir@gmail.com"
                className="text-sm text-foreground/60 hover:text-vesper-orange transition-colors flex items-center gap-2"
              >
                <MailIcon className="w-4 h-4" />
                gabr.almir@gmail.com
              </Link>
            </div>
          </div>

          <div className="border-t border-vesper-orange/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-foreground/40 text-xs font-mono">
                <span>© {new Date().getFullYear()} Gabriel Almir. v2.0.0</span>
              </div>

              <div className="flex items-center gap-2 text-foreground/40 text-xs">
                <span>Desenvolvido com</span>
                <Heart className="w-3 h-3 text-vesper-red fill-vesper-red animate-pulse" />
                <span>em Next.js & Vesper Theme</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
