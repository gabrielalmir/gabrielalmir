import { Code2Icon, CoffeeIcon, ExternalLink, Filter, Github, GithubIcon, Instagram, Linkedin, LinkedinIcon, MailIcon, Twitter, User2Icon } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

import { Ascii } from '@/components/ascii'
import GitHubProjects from "@/components/github-projects"
import { ModernResumeSection } from '@/components/ModernResumeSection'
import { TypingEffect } from '@/components/typing-effect'
import { Button } from "@/components/ui/button"
import { AmazonwebservicesPlainWordmark, DockerOriginal, MongodbOriginal, NestjsOriginal, NextjsOriginal, NodejsOriginal, PostgresqlOriginal, PythonOriginal, RabbitmqOriginal, ReactOriginal, RedisOriginal, TypescriptOriginal } from "devicons-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-terminal-green font-mono selection:bg-terminal-green selection:text-zinc-950">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-scanline animate-scanline opacity-5"></div>
        <div className="absolute inset-0 bg-glow"></div>
      </div>

      <header className="sticky top-0 z-50 w-screen border-b border-terminal-green/20 bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold flex items-center gap-2 text-terminal-green hover:text-terminal-green/80 transition-colors" aria-label='logo gabrielalmir'>
              <CoffeeIcon className="h-6 w-6" />
              <span className="terminal-prompt hidden sm:block">&gt; gabrielalmir</span>
            </Link>
            <div className="space-x-6">
              {[
                { href: "#projetos", icon: Code2Icon, label: "projetos" },
                { href: "#sobre", icon: User2Icon, label: "sobre" },
                { href: "#contato", icon: MailIcon, label: "contato" },
                { href: 'https://linkedin.com/in/gabrielalmir', icon: LinkedinIcon, label: 'LinkedIn' },
                { href: 'https://github.com/gabrielalmir', icon: GithubIcon, label: 'GitHub' },
              ].map(({ href, icon: Icon, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="hover:text-terminal-green/80 transition-colors inline-flex items-center gap-2 terminal-link"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline terminal-prompt">&gt; {label}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4">
        {/* Enhanced Hero Section */}
        <section className="py-20 md:py-10 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block px-4 py-2 border border-terminal-green/20 terminal-window">
              <TypingEffect text="Olá, meu nome é" className="text-terminal-green" />
            </div>

            <div className="space-y-4">
              <Ascii className="text-terminal-green leading-none" />
              <div className="h-px bg-terminal-green/20" />
            </div>

            {/* Enhanced Headline */}
            <div className="terminal-window border border-terminal-green/20 p-6 space-y-4">
              <TypingEffect
                text="Engenheiro Backend"
                className="text-xl font-bold text-terminal-green leading-tight"
              />
              <TypingEffect
                text="Transformando ideias em soluções robustas e escaláveis"
                className="text-xl text-terminal-green/80"
              />
              <div className="flex items-center gap-2 text-xs text-terminal-green/60">
                <span className="terminal-prompt">$</span>
                <span>cat sobre.txt</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-terminal-green/80">
                <span className="terminal-prompt">&gt;</span>
                <span>6+ anos | Node.js, TypeScript, AWS | Arquitetura Limpa & Microsserviços</span>
              </div>
            </div>

            {/* Enhanced Bio */}
            <div className="terminal-window border border-terminal-green/20 p-4 space-y-4">
              <p className="text-terminal-green/90 leading-relaxed">
                Especialista em <strong className="text-terminal-green">sistemas distribuídos</strong> e <strong className="text-terminal-green">arquitetura de microsserviços</strong>,
                com experiência comprovada em projetar e implementar soluções que atendem milhares de usuários.
                Lidero adoção de práticas modernas que reduzem tempo de resposta e aumentam confiabilidade de aplicações críticas.
              </p>
              <p className="text-terminal-green/80 leading-relaxed">
                Atualmente explorando <strong className="text-terminal-green">IA generativa</strong> e <strong className="text-terminal-green">otimização</strong>
                para integrar inteligência aos produtos, combinando Node.js/AWS com Python/ML.
              </p>
            </div>

            {/* Enhanced Tech Stack */}
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-6 gap-4 my-6">
              {[
                // Backend Technologies
                { Icon: NodejsOriginal, label: "Node.js", category: "backend" },
                { Icon: TypescriptOriginal, label: "TypeScript", category: "backend" },
                { Icon: NestjsOriginal, label: "NestJS", category: "backend" },
                { Icon: PythonOriginal, label: "Python", category: "backend" },

                // Cloud & Infrastructure
                { Icon: AmazonwebservicesPlainWordmark, label: "AWS", category: "cloud" },
                { Icon: DockerOriginal, label: "Docker", category: "devops" },

                // Databases
                { Icon: PostgresqlOriginal, label: "PostgreSQL", category: "database" },
                { Icon: MongodbOriginal, label: "MongoDB", category: "database" },
                { Icon: RedisOriginal, label: "Redis", category: "database" },

                // Message Queue
                { Icon: RabbitmqOriginal, label: "RabbitMQ", category: "messaging" },

                // Frontend Technologies
                { Icon: ReactOriginal, label: "React", category: "frontend" },
                { Icon: NextjsOriginal, label: "Next.js", category: "frontend" },
              ].map(({ Icon, label, category }) => (
                <div
                  key={label}
                  className="terminal-window border border-terminal-green/20 p-3 hover:border-terminal-green transition-all duration-300 group relative hover:scale-105"
                >
                  <Icon size={40} className="text-terminal-green group-hover:scale-110 transition-transform" />
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 border border-terminal-green/20 text-xs opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-950 whitespace-nowrap z-10">
                    <span className="terminal-prompt">&gt; {label}</span>
                    <div className="text-terminal-green/60 text-xs">{category}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href="mailto:gabr.almir@gmail.com">
                <Button size="lg" className="terminal-button min-w-12 min-h-12 flex items-center justify-center group">
                  <MailIcon className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                  <span className="terminal-prompt">&gt; CONTATO</span>
                </Button>
              </Link>
              <div className="flex gap-2">
                {[
                  { Icon: Linkedin, href: "https://linkedin.com/in/gabrielalmir", label: "LinkedIn" },
                  { Icon: Github, href: "https://github.com/gabrielalmir", label: "GitHub" },
                ].map(({ Icon, href, label }) => (
                  <Link key={href} href={href} target="_blank">
                    <Button
                      variant="outline"
                      size="icon"
                      className="terminal-button-outline min-w-12 min-h-12 flex items-center justify-center group"
                    >
                      <Icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      <span className="sr-only">{label}</span>
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Image Section */}
          <div className="relative animate-fade-in">
            <div className="absolute inset-0 bg-terminal-green/20 rounded-lg transform -rotate-6 transition-transform hover:rotate-0 blur-2xl" />
            <div className="absolute inset-0 bg-terminal-green/10 rounded-lg transform -rotate-6 transition-transform hover:rotate-0" />
            <div className="terminal-window border border-terminal-green/20 p-2 relative z-10 group">
              <Image
                src="/me.jpg"
                alt="Gabriel Almir - Backend Engineer"
                height={400}
                width={400}
                className="rounded-lg grayscale hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-terminal-green/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </section>

        {/* Enhanced Projects Section */}
        <section id="projetos" className="py-20">
          <div className="terminal-window border border-terminal-green/20 p-6 mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-bold">
                <span className="terminal-prompt">&gt; PROJETOS EM DESTAQUE_</span>
              </h2>
              <div className="flex items-center gap-2 text-sm text-terminal-green/60">
                <Filter className="h-4 w-4" />
                <span>Ordenados por relevância</span>
              </div>
            </div>
            <p className="text-terminal-green/80 leading-relaxed">
              Seleção dos projetos mais significativos que demonstram expertise em arquitetura backend,
              cloud computing e soluções escaláveis para problemas reais de negócio.
            </p>
          </div>

          <GitHubProjects username="gabrielalmir" />

          {/* Enhanced See More Button */}
          <div className="text-center mt-12">
            <Link href="https://github.com/gabrielalmir?tab=repositories" target="_blank">
              <Button size="lg" className="terminal-button group">
                <span className="terminal-prompt">&gt; VER MAIS PROJETOS</span>
                <ExternalLink className="h-4 w-4 ml-2 group-hover:scale-110 transition-transform" />
              </Button>
            </Link>
            <p className="text-terminal-green/60 text-sm mt-3">
              Explore todos os repositórios no GitHub para ver a evolução técnica completa
            </p>
          </div>
        </section>

        <section id="sobre" className="py-10 my-10">
          <ModernResumeSection />
        </section>

        <section id="contato" className="py-20 text-center">
          <div className="terminal-window border border-terminal-green/20 p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-8">
              <span className="terminal-prompt">&gt; CONTATO_</span>
            </h2>
            <div className="max-w-2xl mx-auto">
              <p className="text-terminal-green/80 mb-8 text-lg">
                Estou sempre aberto a novas oportunidades e colaborações. Sinta-se à vontade para entrar em contato comigo para qualquer consulta ou apenas para dizer oi!
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                {[
                  { Icon: Linkedin, href: "https://linkedin.com/in/gabrielalmir", label: "LinkedIn" },
                  { Icon: Github, href: "https://github.com/gabrielalmir", label: "GitHub" },
                  { Icon: Twitter, href: "https://x.com/momentoalmir", label: "Twitter" },
                  { Icon: Instagram, href: "https://instagram.com/momentoalmir", label: "Instagram" },
                  { Icon: MailIcon, href: "mailto:gabr.almir@gmail.com", label: "Email" },
                ].map(({ Icon, href, label }) => (
                  <Link key={href} href={href} target="_blank">
                    <Button
                      variant="outline"
                      size="lg"
                      className="terminal-button-outline group relative"
                    >
                      <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      <span className="sr-only">{label}</span>
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 border border-terminal-green/20 text-sm opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-950 whitespace-nowrap">
                        <span className="terminal-prompt">&gt; {label}</span>
                      </span>
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-terminal-green/20 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="mb-2 terminal-prompt">&gt; © 2024-{new Date().getFullYear()} Gabriel Almir</p>
            <p className="text-terminal-green/60 terminal-prompt">&gt; Desenvolvido com Next.js e Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
