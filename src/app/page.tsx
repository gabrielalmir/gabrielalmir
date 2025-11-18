import { ExternalLink, Github, Heart, Instagram, Linkedin, MailIcon, Twitter } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

import { CoffeeSplash } from '@/components/coffee-splash'
import GitHubProjects from "@/components/github-projects"
import { Header } from '@/components/header'
import { ModernResumeSection } from '@/components/modern-resume-section'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { VesperDecorations } from '@/components/vesper-decorations'
import { AmazonwebservicesPlainWordmark, DockerOriginal, MongodbOriginal, NestjsOriginal, NextjsOriginal, NodejsOriginal, PostgresqlOriginal, PythonOriginal, RabbitmqOriginal, ReactOriginal, RedisOriginal, TypescriptOriginal } from "devicons-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-mono selection:bg-primary selection:text-black overflow-x-hidden">
      {/* Coffee Splash Animation */}
      <CoffeeSplash />

      {/* Vesper Theme Decorations */}
      <VesperDecorations />

      {/* Subtle background effects - reduced opacity */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-scanline animate-scanline opacity-[0.02]"></div>
        <div className="absolute inset-0 bg-glow opacity-50"></div>
      </div>

      {/* Compact modern header */}
      <Header />

      <main className="w-full overflow-x-hidden max-w-full">
        {/* Hero Section - Redesigned with better hierarchy */}
        <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 w-full max-w-full">
          <div className="container mx-auto max-w-7xl w-full">
            <div className="grid lg:grid-cols-[1.5fr,1fr] gap-12 lg:gap-16 items-center w-full max-w-full">

              {/* Left Column - Content (prioritized) */}
              <div className="space-y-6 md:space-y-8 w-full max-w-full overflow-hidden">
                {/* Greeting tag */}
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-vesper-orange/20 bg-vesper-orange/5 max-w-full">
                  <span className="w-2 h-2 rounded-full bg-vesper-cyan animate-pulse flex-shrink-0"></span>
                  <span className="text-xs sm:text-sm text-vesper-cyan truncate">Quero fazer você se apaixonar por programação!</span>
                </div>

                {/* Main headline - much larger and prominent */}
                <div className="space-y-3 md:space-y-4 w-full max-w-full">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight break-words w-full">
                    <span className="text-foreground">Olá, sou</span>
                    <br />
                    <span className="text-vesper-orange">Gabriel Almir</span>
                  </h1>

                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-vesper-cyan/90 break-words w-full">
                    Engenheiro de Software Backend
                  </h2>

                  <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-2xl leading-relaxed break-words w-full">
                    Node.js, TypeScript, NestJS, Python & IA, AWS
                  </p>
                </div>

                {/* Key highlights - clean bullet format */}
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

                {/* Short bio - concise and scannable */}
                <div className="space-y-3 text-foreground/80 max-w-2xl w-full">
                    <p className="text-base leading-relaxed break-words w-full">
                    Engenheiro de Software Backend com sólida experiência em <strong className="text-vesper-orange font-semibold">Node.js</strong> e <strong className="text-vesper-orange font-semibold">Python</strong>, atuando no desenvolvimento de APIs escaláveis, integrações entre sistemas e soluções de <strong className="text-vesper-orange font-semibold">machine learning</strong> aplicadas a problemas de negócio. Foco em <strong className="text-vesper-orange font-semibold">arquitetura limpa</strong>, <strong className="text-vesper-orange font-semibold">boas práticas (SOLID, Design Patterns)</strong>, <strong className="text-vesper-orange font-semibold">observabilidade (OpenTelemetry)</strong> e <strong className="text-vesper-orange font-semibold">automação com CI/CD</strong> em ambientes <strong className="text-vesper-orange font-semibold">AWS</strong>.
                    </p>
                </div>

                {/* CTA Buttons - clear hierarchy */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 w-full max-w-full">
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
                      alt="Gabriel Almir - Engenheiro de Software Backend"
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
        <section id="habilidades" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden">
          <div className="container mx-auto max-w-7xl w-full">
            {/* Section header */}
            <div className="text-center mb-12 sm:mb-16 w-full max-w-full px-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 break-words">
                Habilidades Técnicas
              </h2>
              <p className="text-base sm:text-lg text-foreground/60 max-w-2xl mx-auto break-words">
                Tecnologias e ferramentas que domino para criar soluções escaláveis
              </p>
            </div>

            {/* Skills organized by category */}
            <div className="space-y-12 w-full max-w-full">

              {/* Primary Skills - Backend */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="w-1 h-6 sm:h-8 bg-vesper-orange rounded-full flex-shrink-0"></div>
                  <h3 className="text-lg sm:text-xl font-bold text-vesper-orange">Backend & APIs</h3>
                  <Badge variant="outline" className="border-vesper-orange/30 text-vesper-orange/80 text-xs sm:text-sm px-2 sm:px-3 py-1">
                    Especialidade Principal
                  </Badge>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
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
                      <div className="flex flex-col items-center gap-2 sm:gap-3">
                        <Icon size={40} className="sm:w-12 sm:h-12 text-vesper-cyan group-hover:scale-110 transition-transform" />
                        <div className="text-center">
                          <div className="font-semibold text-foreground text-sm sm:text-base">{label}</div>
                          {proficiency === 'expert' && (
                            <div className="text-xs text-vesper-orange mt-1">★ Expert</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cloud & DevOps */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-1 h-6 sm:h-8 bg-vesper-cyan rounded-full flex-shrink-0"></div>
                  <h3 className="text-lg sm:text-xl font-bold text-vesper-cyan">Cloud & DevOps</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                  {[
                    { Icon: AmazonwebservicesPlainWordmark, label: "AWS" },
                    { Icon: DockerOriginal, label: "Docker" },
                  ].map(({ Icon, label }) => (
                    <div
                      key={label}
                      className="group p-3 sm:p-4 rounded-xl border border-vesper-cyan/20 bg-background hover:border-vesper-cyan/40 hover:bg-vesper-cyan/5 transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex flex-col items-center gap-2 sm:gap-3">
                        <Icon size={40} className="sm:w-12 sm:h-12 text-vesper-cyan group-hover:scale-110 transition-transform" />
                        <div className="font-semibold text-foreground text-center text-sm sm:text-base">{label}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['Lambda', 'S3', 'SQS', 'DynamoDB', 'RDS', 'ECS', 'CloudWatch', 'API Gateway', 'CI/CD', 'GitHub Actions', 'OpenTelemetry'].map((tech) => (
                    <Badge key={tech} variant="outline" className="border-vesper-cyan/30 text-vesper-cyan/80 text-xs px-2 py-1">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Databases & Messaging */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-1 h-6 sm:h-8 bg-foreground/40 rounded-full flex-shrink-0"></div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">Databases & Messaging</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                  {[
                    { Icon: PostgresqlOriginal, label: "PostgreSQL" },
                    { Icon: MongodbOriginal, label: "MongoDB" },
                    { Icon: RedisOriginal, label: "Redis" },
                    { Icon: RabbitmqOriginal, label: "RabbitMQ" },
                  ].map(({ Icon, label }) => (
                    <div
                      key={label}
                      className="group p-3 sm:p-4 rounded-xl border border-foreground/10 bg-background hover:border-foreground/30 hover:bg-foreground/5 transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex flex-col items-center gap-2 sm:gap-3">
                        <Icon size={32} className="sm:w-10 sm:h-10 text-vesper-cyan/80 group-hover:scale-110 transition-transform" />
                        <div className="font-medium text-foreground/90 text-center text-xs sm:text-sm">{label}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['SQL Server', 'DynamoDB', 'Amazon SQS'].map((tech) => (
                    <Badge key={tech} variant="outline" className="border-foreground/20 text-foreground/70 text-xs px-2 py-1">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* IA & Machine Learning */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-1 h-6 sm:h-8 bg-vesper-orange/60 rounded-full flex-shrink-0"></div>
                  <h3 className="text-lg sm:text-xl font-bold text-vesper-orange/90">IA & Machine Learning</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Pandas', 'LangChain', 'LLMs', 'RAG', 'Prophet', 'Previsões', 'NLP'].map((tech) => (
                    <Badge key={tech} variant="outline" className="border-vesper-orange/30 text-vesper-orange/80 text-xs px-3 py-1.5">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Frontend (Secondary) */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="w-1 h-6 sm:h-8 bg-foreground/30 rounded-full flex-shrink-0"></div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground/80">Frontend</h3>
                  <Badge variant="outline" className="border-foreground/20 text-foreground/60 text-xs sm:text-sm px-2 sm:px-3 py-1">
                    Conhecimento Complementar
                  </Badge>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                  {[
                    { Icon: ReactOriginal, label: "React" },
                    { Icon: NextjsOriginal, label: "Next.js" },
                  ].map(({ Icon, label }) => (
                    <div
                      key={label}
                      className="group p-3 sm:p-4 rounded-xl border border-foreground/10 bg-background hover:border-foreground/20 transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex flex-col items-center gap-2 sm:gap-3">
                        <Icon size={32} className="sm:w-10 sm:h-10 text-vesper-cyan/60 group-hover:scale-110 transition-transform" />
                        <div className="font-medium text-foreground/70 text-center text-xs sm:text-sm">{label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Projects Section - Simplified and focused */}
        <section id="projetos" className="py-16 md:py-24 bg-gradient-to-b from-background to-vesper-orange/5 px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden">
          <div className="container mx-auto max-w-6xl w-full">
            {/* Section header */}
            <div className="text-center mb-12 sm:mb-16 w-full max-w-full px-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 break-words">
                Projetos em Destaque
              </h2>
              <p className="text-base sm:text-lg text-foreground/60 max-w-2xl mx-auto break-words">
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
        <section id="sobre" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden">
          <div className="container mx-auto max-w-7xl w-full">
          <ModernResumeSection />
          </div>
        </section>

        {/* Contact Section - Clean and inviting */}
        <section id="contato" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden">
          <div className="container mx-auto max-w-4xl text-center w-full">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6 break-words px-4">
              Vamos conversar?
            </h2>
            <p className="text-base sm:text-lg text-foreground/70 mb-8 sm:mb-12 max-w-2xl mx-auto break-words px-4">
              Estou sempre aberto a novas oportunidades, colaborações e discussões sobre tecnologia.
              Entre em contato através dos canais abaixo.
            </p>

            {/* Contact methods */}
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mb-8 sm:mb-12">
              <Link href="mailto:gabr.almir@gmail.com" className="w-full sm:w-auto">
                <Button size="lg" className="terminal-button group w-full sm:w-auto">
                  <MailIcon className="h-4 sm:h-5 w-4 sm:w-5 mr-2 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className="text-sm sm:text-base truncate">gabr.almir@gmail.com</span>
                </Button>
              </Link>
            </div>

            {/* Social links */}
            <div className="flex gap-4 sm:gap-6 justify-center items-center flex-wrap">
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
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-vesper-orange/20 flex items-center justify-center group-hover:border-vesper-orange group-hover:bg-vesper-orange/10 transition-all">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-foreground/60 group-hover:text-vesper-orange group-hover:scale-110 transition-all" />
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
      <footer className="border-t border-vesper-orange/10 py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 text-foreground/60 text-xs sm:text-sm">
              <span>© 2024-{new Date().getFullYear()} Gabriel Almir</span>
            </div>

            <div className="flex items-center gap-2 text-foreground/40 text-xs sm:text-sm">
              <span>Feito com</span>
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-vesper-red" />
              <span>código e café</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
