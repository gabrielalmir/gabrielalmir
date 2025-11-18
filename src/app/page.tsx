import { ExternalLink, Github, GithubIcon, Heart, Instagram, Linkedin, LinkedinIcon, MailIcon, Twitter } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

import GitHubProjects from "@/components/github-projects"
import { ModernLogo } from '@/components/modern-logo'
import { ModernResumeSection } from '@/components/modern-resume-section'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AmazonwebservicesPlainWordmark, DockerOriginal, MongodbOriginal, NestjsOriginal, NextjsOriginal, NodejsOriginal, PostgresqlOriginal, PythonOriginal, RabbitmqOriginal, ReactOriginal, RedisOriginal, TypescriptOriginal } from "devicons-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-mono selection:bg-primary selection:text-black">
      {/* Subtle background effects - reduced opacity */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-scanline animate-scanline opacity-[0.02]"></div>
        <div className="absolute inset-0 bg-glow opacity-50"></div>
      </div>

      {/* Compact modern header */}
      <header className="sticky top-0 z-50 w-screen border-b border-vesper-orange/10 bg-background/95 backdrop-blur-md">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="hover:opacity-80 transition-opacity" aria-label='logo gabrielalmir'>
              <ModernLogo />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {[
                { href: "#sobre", label: "Sobre" },
                { href: "#habilidades", label: "Skills" },
                { href: "#projetos", label: "Projetos" },
                { href: "/blog", label: "Blog" },
                { href: "#contato", label: "Contato" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-foreground/70 hover:text-vesper-orange transition-colors relative group"
                >
                  {label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-vesper-orange group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { href: 'https://linkedin.com/in/gabrielalmir', icon: LinkedinIcon, label: 'LinkedIn' },
                { href: 'https://github.com/gabrielalmir', icon: GithubIcon, label: 'GitHub' },
              ].map(({ href, icon: Icon, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-foreground/60 hover:text-vesper-orange transition-colors"
                  aria-label={label}
                  target="_blank"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section - Redesigned with better hierarchy */}
        <section className="py-16 md:py-24 lg:py-32">
          <div className="mx-auto">
            <div className="grid lg:grid-cols-[1.5fr,1fr] gap-12 lg:gap-16 items-center">

              {/* Left Column - Content (prioritized) */}
              <div className="space-y-8">
                {/* Greeting tag */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-vesper-orange/20 bg-vesper-orange/5">
                  <span className="w-2 h-2 rounded-full bg-vesper-cyan animate-pulse"></span>
                  <span className="text-sm text-vesper-cyan">Quero fazer você se apaixonar por programação!</span>
                </div>

                {/* Main headline - much larger and prominent */}
                <div className="space-y-4 text-justify">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-pretty">
                    <span className="text-foreground">Olá, sou</span>
                    <br />
                    <span className="text-vesper-orange">Gabriel Almir</span>
                  </h1>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-vesper-cyan/90">
                    Engenheiro Backend
                  </h2>

                  <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl leading-relaxed">
                    Transformando ideias em soluções robustas e escaláveis
                  </p>
                </div>

                {/* Key highlights - clean bullet format */}
                <div className="flex flex-wrap gap-3">
                  {[
                    '6+ anos de experiência',
                    'Node.js & TypeScript',
                    'AWS & Cloud',
                    'Arquitetura Limpa'
                  ].map((item) => (
                    <Badge
                      key={item}
                      variant="outline"
                      className="border-vesper-orange/30 text-vesper-orange/90 px-4 py-2 text-sm"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>

                {/* Short bio - concise and scannable */}
                <div className="space-y-3 text-foreground/80 max-w-2xl">
                  <p className="text-base leading-relaxed text-justify text-pretty sm:text-left">
                    Especialista em <strong className="text-vesper-orange font-semibold">sistemas distribuídos</strong> e <strong className="text-vesper-orange font-semibold">arquitetura de microsserviços</strong>,
                    com experiência comprovada em soluções que atendem milhares de usuários.
                  </p>
                </div>

                {/* CTA Buttons - clear hierarchy */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-4">
                  <Link href="#contato" className="w-full sm:w-auto">
                  <Button size="lg" className="terminal-button group w-full sm:w-auto">
                    <MailIcon className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    <span>Entrar em contato</span>
                  </Button>
                  </Link>
                  <Link href="#projetos" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="terminal-button-outline group w-full sm:w-auto"
                  >
                    <span>Ver projetos</span>
                    <ExternalLink className="h-4 w-4 ml-2 group-hover:scale-110 transition-transform" />
                  </Button>
                  </Link>
                </div>

                {/* Social proof */}
                <div className="flex items-center gap-6 pt-4">
                  {[
                    { Icon: Linkedin, href: "https://linkedin.com/in/gabrielalmir", label: "LinkedIn" },
                    { Icon: Github, href: "https://github.com/gabrielalmir", label: "GitHub" },
                    { Icon: Twitter, href: "https://x.com/momentoalmir", label: "Twitter" },
                  ].map(({ Icon, href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      target="_blank"
                      className="text-foreground/60 hover:text-vesper-orange transition-colors group"
                    >
                      <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      <span className="sr-only">{label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right Column - Image (smaller, balanced) */}
              <div className="relative lg:justify-self-end">
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-vesper-orange/10 rounded-2xl blur-3xl opacity-50" />

                {/* Image container */}
                <div className="relative w-full max-w-sm lg:max-w-md mx-auto">
                  <div className="aspect-square rounded-2xl overflow-hidden border border-vesper-orange/20 bg-gradient-to-br from-vesper-orange/5 to-vesper-cyan/5">
                    <Image
                      src="/me.jpg"
                      alt="Gabriel Almir - Backend Engineer"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section - Reorganized with categories */}
        <section id="habilidades" className="py-16 md:py-24">
          <div className="mx-auto">
            {/* Section header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Habilidades Técnicas
              </h2>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                Tecnologias e ferramentas que domino para criar soluções escaláveis
              </p>
            </div>

            {/* Skills organized by category */}
            <div className="space-y-12">

              {/* Primary Skills - Backend */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-vesper-orange rounded-full"></div>
                  <h3 className="text-xl font-bold text-vesper-orange">Backend & APIs</h3>
                  <Badge variant="outline" className="border-vesper-orange/30 text-vesper-orange/80">
                    Especialidade Principal
                  </Badge>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {[
                    { Icon: NodejsOriginal, label: "Node.js", proficiency: "expert" },
                    { Icon: TypescriptOriginal, label: "TypeScript", proficiency: "expert" },
                    { Icon: NestjsOriginal, label: "NestJS", proficiency: "expert" },
                    { Icon: PythonOriginal, label: "Python", proficiency: "advanced" },
                  ].map(({ Icon, label, proficiency }) => (
                    <div
                      key={label}
                      className={`group relative p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${
                        proficiency === 'expert'
                          ? 'border-vesper-orange/30 bg-vesper-orange/5 hover:border-vesper-orange hover:bg-vesper-orange/10'
                          : 'border-vesper-orange/20 bg-background hover:border-vesper-orange/40'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <Icon size={48} className="text-vesper-cyan group-hover:scale-110 transition-transform" />
                        <div className="text-center">
                          <div className="font-semibold text-foreground">{label}</div>
                          {proficiency === 'expert' && (
                            <div className="text-xs text-vesper-orange mt-1">★ Expert</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cloud & Infrastructure */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-vesper-cyan rounded-full"></div>
                  <h3 className="text-xl font-bold text-vesper-cyan">Cloud & DevOps</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {[
                    { Icon: AmazonwebservicesPlainWordmark, label: "AWS" },
                    { Icon: DockerOriginal, label: "Docker" },
                  ].map(({ Icon, label }) => (
                    <div
                      key={label}
                      className="group p-4 rounded-xl border border-vesper-cyan/20 bg-background hover:border-vesper-cyan/40 hover:bg-vesper-cyan/5 transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <Icon size={48} className="text-vesper-cyan group-hover:scale-110 transition-transform" />
                        <div className="font-semibold text-foreground text-center">{label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Databases & Messaging */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-foreground/40 rounded-full"></div>
                  <h3 className="text-xl font-bold text-foreground">Databases & Messaging</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {[
                    { Icon: PostgresqlOriginal, label: "PostgreSQL" },
                    { Icon: MongodbOriginal, label: "MongoDB" },
                    { Icon: RedisOriginal, label: "Redis" },
                    { Icon: RabbitmqOriginal, label: "RabbitMQ" },
                  ].map(({ Icon, label }) => (
                    <div
                      key={label}
                      className="group p-4 rounded-xl border border-foreground/10 bg-background hover:border-foreground/30 hover:bg-foreground/5 transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <Icon size={40} className="text-vesper-cyan/80 group-hover:scale-110 transition-transform" />
                        <div className="font-medium text-foreground/90 text-center text-sm">{label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Frontend (Secondary) */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-foreground/30 rounded-full"></div>
                  <h3 className="text-xl font-bold text-foreground/80">Frontend</h3>
                  <Badge variant="outline" className="border-foreground/20 text-foreground/60">
                    Conhecimento Complementar
                  </Badge>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {[
                    { Icon: ReactOriginal, label: "React" },
                    { Icon: NextjsOriginal, label: "Next.js" },
                  ].map(({ Icon, label }) => (
                    <div
                      key={label}
                      className="group p-4 rounded-xl border border-foreground/10 bg-background hover:border-foreground/20 transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <Icon size={40} className="text-vesper-cyan/60 group-hover:scale-110 transition-transform" />
                        <div className="font-medium text-foreground/70 text-center text-sm">{label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Projects Section - Simplified and focused */}
        <section id="projetos" className="py-16 md:py-24 bg-gradient-to-b from-background to-vesper-orange/5">
          <div className="max-w-6xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Projetos em Destaque
              </h2>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                Seleção dos projetos mais relevantes que demonstram expertise em backend, cloud e soluções escaláveis
              </p>
            </div>

            {/* Projects grid */}
            <GitHubProjects username="gabrielalmir" />

            {/* CTA */}
            <div className="text-center mt-12">
              <Link href="https://github.com/gabrielalmir?tab=repositories" target="_blank">
                <Button size="lg" variant="outline" className="terminal-button-outline group">
                  <span>Explorar todos os projetos no GitHub</span>
                  <ExternalLink className="h-4 w-4 ml-2 group-hover:scale-110 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* About/Resume Section */}
        <section id="sobre" className="py-16 md:py-24">
          <ModernResumeSection />
        </section>

        {/* Contact Section - Clean and inviting */}
        <section id="contato" className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Vamos conversar?
            </h2>
            <p className="text-lg text-foreground/70 mb-12 max-w-2xl mx-auto">
              Estou sempre aberto a novas oportunidades, colaborações e discussões sobre tecnologia.
              Entre em contato através dos canais abaixo.
            </p>

            {/* Contact methods */}
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Link href="mailto:gabr.almir@gmail.com">
                <Button size="lg" className="terminal-button group">
                  <MailIcon className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                  <span>gabr.almir@gmail.com</span>
                </Button>
              </Link>
            </div>

            {/* Social links */}
            <div className="flex gap-6 justify-center items-center">
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
                  className="group flex flex-col items-center gap-2"
                >
                  <div className="w-12 h-12 rounded-full border border-vesper-orange/20 flex items-center justify-center group-hover:border-vesper-orange group-hover:bg-vesper-orange/10 transition-all">
                    <Icon className="h-5 w-5 text-foreground/60 group-hover:text-vesper-orange group-hover:scale-110 transition-all" />
                  </div>
                  <span className="text-xs text-foreground/50 group-hover:text-vesper-orange transition-colors">
                    {label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Minimal and clean */}
      <footer className="border-t border-vesper-orange/10 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-foreground/60 text-sm">
              <span>© 2024-{new Date().getFullYear()} Gabriel Almir</span>
            </div>

            <div className="flex items-center gap-2 text-foreground/40 text-sm">
              <span>Feito com</span>
              <Heart className="w-4 h-4 text-vesper-red" />
              <span>código e café</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
