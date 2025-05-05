import { Code2Icon, CoffeeIcon, Github, GithubIcon, Instagram, Linkedin, LinkedinIcon, MailIcon, Twitter, User2Icon } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

import { Ascii } from '@/components/ascii'
import GitHubProjects from "@/components/github-projects"
import { TypingEffect } from '@/components/typing-effect'
import { Button } from "@/components/ui/button"
import { AmazonwebservicesPlainWordmark, DockerOriginal, JavascriptOriginal, MongodbOriginal, NestjsOriginal, NextjsOriginal, NodejsOriginal, PostgresqlOriginal, ReactOriginal, TypescriptOriginal } from "devicons-react"

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
            <Link href="/" className="text-xl font-bold flex items-center gap-2 text-terminal-green hover:text-terminal-green/80 transition-colors">
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
        <section className="py-20 md:py-10 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block px-4 py-2 border border-terminal-green/20 terminal-window">
              <TypingEffect text="Olá, meu nome é" className="text-terminal-green" />
            </div>

            <div className="space-y-4">
              <Ascii className="text-terminal-green leading-none" />
              <div className="h-px bg-terminal-green/20" />
            </div>

            <div className="terminal-window border border-terminal-green/20 p-4 space-y-4">
              <TypingEffect
                text="Desenvolvedor Backend especializado em Node.js"
                className="text-lg"
              />
              <p className="text-terminal-green/80 leading-relaxed">
                Sou engenheiro de software backend com mais de 6 anos de experiência em sistemas distribuídos, apaixonado por performance, arquitetura limpa e tecnologias que resolvem problemas reais. Atuo principalmente com <strong className="text-terminal-green">Node.js</strong> e <strong className="text-terminal-green">AWS</strong>, e mantenho projetos open-source voltados para escalabilidade, design e automação.
              </p>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-6 gap-4 my-6">
              {[
                { Icon: NodejsOriginal, label: "Node.js" },
                { Icon: TypescriptOriginal, label: "TypeScript" },
                { Icon: JavascriptOriginal, label: "JavaScript" },
                { Icon: NestjsOriginal, label: "NestJS" },
                { Icon: NextjsOriginal, label: "Next.js" },
                { Icon: ReactOriginal, label: "React" },
                { Icon: PostgresqlOriginal, label: "PostgreSQL" },
                { Icon: MongodbOriginal, label: "MongoDB" },
                { Icon: DockerOriginal, label: "Docker" },
                { Icon: AmazonwebservicesPlainWordmark, label: "AWS" },
              ].map(({ Icon, label }) => (
                <div
                  key={label}
                  className="terminal-window border border-terminal-green/20 p-2 hover:border-terminal-green transition-colors group relative hover:scale-105 duration-300"
                >
                  <Icon size={40} className="text-terminal-green" />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 border border-terminal-green/20 text-sm opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-950 whitespace-nowrap">
                    <span className="terminal-prompt">&gt; {label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="mailto:gabr.almir@gmail.com">
                <Button size="lg" className="terminal-button">
                  <MailIcon className="h-4 w-4 mr-2" />
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
                      className="terminal-button-outline"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="sr-only">{label}</span>
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="relative animate-fade-in">
            <div className="absolute inset-0 bg-terminal-green/20 rounded-lg transform -rotate-6 transition-transform hover:rotate-0 blur-2xl" />
            <div className="absolute inset-0 bg-terminal-green/10 rounded-lg transform -rotate-6 transition-transform hover:rotate-0" />
            <div className="terminal-window border border-terminal-green/20 p-2 relative z-10">
              <Image
                src="/me.jpg"
                alt="Gabriel Almir"
                height={400}
                width={400}
                className="rounded-lg grayscale hover:grayscale-0 transition-all duration-300"
                priority
              />
            </div>
          </div>
        </section>

        <section id="projetos" className="py-20">
          <div className="terminal-window border border-terminal-green/20 p-4 mb-12">
            <h2 className="text-2xl font-bold">
              <span className="terminal-prompt">&gt; PROJETOS EM DESTAQUE_</span>
            </h2>
          </div>
          <GitHubProjects username="gabrielalmir" />

          {/* See more (green retro button) */}
          <div className="text-center mt-10">
            <Link href="https://github.com/gabrielalmir?tab=repositories" target="_blank">
              <Button size="lg" className="terminal-button">
                <span className="terminal-prompt">&gt; VER MAIS PROJETOS</span>
              </Button>
            </Link>
          </div>
        </section>

        <section id="sobre" className="py-10 my-10">
          <div className="terminal-window border border-terminal-green/20 p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-8">
              <span className="terminal-prompt">&gt; SOBRE_</span>
            </h2>
            <div className="max-w-3xl mx-auto space-y-6 text-terminal-green/80">
              <p>
                Engenheiro de Software com mais de 6 anos de experiência em desenvolvimento backend com foco em escalabilidade, arquitetura limpa e sistemas distribuídos. Especialista em <strong className="text-terminal-green">Node.js</strong>, <strong className="text-terminal-green">TypeScript</strong>, <strong className="text-terminal-green">NestJS</strong>, atuo com projetos baseados em <strong className="text-terminal-green">AWS</strong> (<strong className="text-terminal-green">Lambda</strong>, <strong className="text-terminal-green">S3</strong>, <strong className="text-terminal-green">SQS</strong>, <strong className="text-terminal-green">RDS</strong>, <strong className="text-terminal-green">DynamoDB</strong>) utilizando práticas modernas como <strong className="text-terminal-green">TDD</strong>, <strong className="text-terminal-green">DDD</strong>, <strong className="text-terminal-green">Clean Architecture</strong>, <strong className="text-terminal-green">CI/CD</strong> com <strong className="text-terminal-green">GitHub Actions</strong> e análise estática com <strong className="text-terminal-green">SonarQube</strong>.
              </p>
              <div className="h-px bg-terminal-green/20" />
              <p>
                Tenho experiência com mensageria (<strong className="text-terminal-green">RabbitMQ</strong>, <strong className="text-terminal-green">SQS</strong>), caching com <strong className="text-terminal-green">Redis</strong>, bancos <strong className="text-terminal-green">SQL</strong> e <strong className="text-terminal-green">NoSQL</strong>, além de integração com APIs internas e externas. Já desenvolvi middlewares, sistemas de gestão documental e aplicações voltadas a dados com foco em rastreabilidade, performance e automação.
              </p>
              <div className="h-px bg-terminal-green/20" />
              <p>
                Atualmente, meu foco está em construir soluções resilientes, com arquitetura orientada a eventos, segurança e observabilidade. Estou em constante evolução técnica, sempre buscando entregar valor ao negócio com soluções bem pensadas e sustentáveis.
              </p>
              <div className="h-px bg-terminal-green/20" />
              <p>
                <strong className="text-terminal-green">Stack Atual:</strong> Node.js, TypeScript, NestJS, React, PostgreSQL, Redis, Docker <br />
                <strong className="text-terminal-green">Cloud:</strong> AWS (Lambda, S3, SQS, DynamoDB, RDS, API Gateway) <br />
                <strong className="text-terminal-green">Mensageria:</strong> RabbitMQ, SQS, (estudando Kafka) <br />
                <strong className="text-terminal-green">Infra:</strong> Docker, GitHub Actions, SonarQube, CI/CD <br />
                <strong className="text-terminal-green">Boas Práticas:</strong> Clean Architecture, SOLID, TDD, DDD, Lint, ESLint/Prettier <br />
                <strong className="text-terminal-green">Ferramentas:</strong> GitHub, Jira, Figma, Postman, Swagger
              </p>
              <div className="text-center mt-8">
                <Link href="https://linkedin.com/in/gabrielalmir" target="_blank">
                  <Button size="lg" className="terminal-button">
                    <span className="terminal-prompt">&gt; MAIS SOBRE MIM</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
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
                      <Icon className="h-5 w-5" />
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
