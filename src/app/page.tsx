import { Code2Icon, CoffeeIcon, Github, Instagram, Linkedin, MailIcon, Twitter, User2Icon } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

import { Ascii } from '@/components/ascii'
import GitHubProjects from "@/components/github-projects"
import ApacheKafkaIcon from '@/components/icons/apache-kafka'
import { TypingEffect } from '@/components/typing-effect'
import { Button } from "@/components/ui/button"
import { AmazonwebservicesPlainWordmark, DockerPlain, JavaOriginal, JavascriptOriginal, MongodbPlain, NestjsOriginal, NodejsPlain, PostgresqlOriginal, ReactOriginal, SpringOriginal, TypescriptPlain } from "devicons-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-terminal-green font-mono selection:bg-terminal-green selection:text-zinc-950">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-scanline animate-scanline opacity-5"></div>
        <div className="absolute inset-0 bg-glow"></div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-terminal-green/20 bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold flex items-center gap-2 text-terminal-green hover:text-terminal-green/80 transition-colors">
              <CoffeeIcon className="h-6 w-6" />
              <span className="terminal-prompt">&gt; gabrielalmir</span>
            </Link>
            <div className="space-x-6">
              {[
                { href: "#projetos", icon: Code2Icon, label: "projetos" },
                { href: "#sobre", icon: User2Icon, label: "sobre" },
                { href: "#contato", icon: MailIcon, label: "contato" },
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
        <section className="py-20 md:py-32 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block px-4 py-2 border border-terminal-green/20 terminal-window">
              <TypingEffect text="Olá, meu nome é" className="text-terminal-green" />
            </div>

            <div className="space-y-4">
              <Ascii text="GABRIEL ALMIR" className="text-terminal-green leading-none" />
              <div className="h-px bg-terminal-green/20" />
            </div>

            <div className="terminal-window border border-terminal-green/20 p-4 space-y-4">
              <TypingEffect
                text="Desenvolvedor Backend especializado em Node.js e Java"
                className="text-lg"
              />
              <p className="text-terminal-green/80 leading-relaxed">
                Construo soluções escaláveis e de alto desempenho utilizando <strong className="text-terminal-green">Node.js</strong> e <strong className="text-terminal-green">Java</strong>.
                Especializado em criar sistemas limpos e eficientes com <strong className="text-terminal-green">Clean Architecture</strong>,
                <strong className="text-terminal-green">SOLID</strong> e <strong className="text-terminal-green">Design Patterns</strong>.
              </p>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-6 gap-4 my-6">
              {[
                { Icon: JavaOriginal, label: "Java" },
                { Icon: SpringOriginal, label: "Spring" },
                { Icon: NodejsPlain, label: "Node.js" },
                { Icon: TypescriptPlain, label: "TypeScript" },
                { Icon: JavascriptOriginal, label: "JavaScript" },
                { Icon: NestjsOriginal, label: "NestJS" },
                { Icon: ReactOriginal, label: "React" },
                { Icon: ApacheKafkaIcon, label: "Apache Kafka" },
                { Icon: PostgresqlOriginal, label: "PostgreSQL" },
                { Icon: MongodbPlain, label: "MongoDB" },
                { Icon: DockerPlain, label: "Docker" },
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
        </section>

        <section id="sobre" className="py-20 my-20">
          <div className="terminal-window border border-terminal-green/20 p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-8">
              <span className="terminal-prompt">&gt; SOBRE_</span>
            </h2>
            <div className="max-w-3xl mx-auto space-y-6 text-terminal-green/80">
              <p>
                Sou Desenvolvedor Backend com uma base sólida na construção de soluções escaláveis e de alto desempenho utilizando <strong className="text-terminal-green">Node.js</strong> e <strong className="text-terminal-green">Java</strong>. Minha especialidade é criar sistemas limpos, manuteníveis e eficientes, aproveitando práticas modernas de desenvolvimento como <strong className="text-terminal-green">Clean Architecture</strong>, <strong className="text-terminal-green">princípios SOLID</strong> e <strong className="text-terminal-green">Design Patterns</strong>.
              </p>
              <div className="h-px bg-terminal-green/20" />
              <p>
                Com ampla experiência em microsserviços, APIs RESTful e integração com bancos de dados (<strong className="text-terminal-green">SQL</strong> e <strong className="text-terminal-green">NoSQL</strong>), foco em entregar soluções que atendam aos objetivos de negócios garantindo excelência técnica. Além disso, tenho experiência prática com containerização usando <strong className="text-terminal-green">Docker</strong> e serviços em nuvem como <strong className="text-terminal-green">AWS</strong>, possibilitando implantações eficientes e escalabilidade.
              </p>
              <div className="h-px bg-terminal-green/20" />
              <p>
                Atualmente, trabalho no <strong className="text-terminal-green">CTC</strong> como <strong className="text-terminal-green">Desenvolvedor Backend Node.js</strong>, desenvolvendo soluções backend utilizando <strong className="text-terminal-green">Node.js</strong> e <strong className="text-terminal-green">TypeScript</strong>. Minha função inclui a criação de middlewares integrados com <strong className="text-terminal-green">ODATA</strong> e APIs do <strong className="text-terminal-green">Power BI</strong>.
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
            <p className="mb-2 terminal-prompt">&gt; © 2024 Gabriel Almir</p>
            <p className="text-terminal-green/60 terminal-prompt">&gt; Desenvolvido com Next.js e Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
