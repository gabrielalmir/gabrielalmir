import { Code2Icon, CoffeeIcon, Github, Instagram, Linkedin, MailIcon, Twitter, User2Icon } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

import GitHubProjects from "@/components/github-projects"
import { Button } from "@/components/ui/button"
import { AmazonwebservicesPlainWordmark, DockerOriginal, JavaPlain, JavascriptOriginal, MongodbPlain, NestjsOriginal, NodejsPlain, PostgresqlPlain, ReactOriginal, SpringOriginal, TypescriptPlain } from "devicons-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-xl">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
              <CoffeeIcon className="h-6 w-6" />
              Gabriel Almir
            </Link>
            <div className="space-x-6">
              <Link href="#projetos" className="hover:text-blue-400 transition-colors inline-flex items-center gap-2">
                <Code2Icon className="h-4 w-4" />
                <span className="hidden sm:inline">Projetos</span>
              </Link>
              <Link href="#sobre" className="hover:text-blue-400 transition-colors inline-flex items-center gap-2">
                <User2Icon className="h-4 w-4" />
                <span className="hidden sm:inline">Sobre</span>
              </Link>
              <Link href="#contato" className="hover:text-blue-400 transition-colors inline-flex items-center gap-2">
                <MailIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Contato</span>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4">
        <section className="py-20 md:py-32 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block bg-blue-950/50 text-blue-400 px-4 py-2 rounded-full font-semibold hover:bg-blue-900/50 transition-colors border border-blue-800/50 backdrop-blur-sm">
              Olá, meu nome é
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-zinc-100 tracking-tight bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              GABRIEL ALMIR
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Sou Desenvolvedor Backend com uma base sólida na construção de soluções escaláveis e de alto desempenho utilizando <strong className="text-blue-400">Node.js</strong> e <strong className="text-blue-400">Java</strong>. Minha especialidade é criar sistemas limpos, manuteníveis e eficientes, aproveitando práticas modernas de desenvolvimento como <strong className="text-blue-400">Clean Architecture</strong>, <strong className="text-blue-400">princípios SOLID</strong> e <strong className="text-blue-400">Design Patterns</strong>.
            </p>

            <p className="text-zinc-400 text-lg leading-relaxed">
              Com ampla experiência em microsserviços, APIs RESTful e integração com bancos de dados (<strong className="text-blue-400">SQL</strong> e <strong className="text-blue-400">NoSQL</strong>), foco em entregar soluções que atendam aos objetivos de negócios garantindo excelência técnica. Além disso, tenho experiência prática com containerização usando <strong className="text-blue-400">Docker</strong> e serviços em nuvem como <strong className="text-blue-400">AWS</strong>, possibilitando implantações eficientes e escalabilidade.
            </p>

            <div className="flex flex-wrap gap-4 my-6">
              {[
                { Icon: JavaPlain, label: "Java" },
                { Icon: SpringOriginal, label: "Spring" },
                { Icon: NodejsPlain, label: "Node.js" },
                { Icon: TypescriptPlain, label: "TypeScript" },
                { Icon: JavascriptOriginal, label: "JavaScript" },
                { Icon: NestjsOriginal, label: "NestJS" },
                { Icon: ReactOriginal, label: "React" },
                { Icon: PostgresqlPlain, label: "PostgreSQL" },
                { Icon: MongodbPlain, label: "MongoDB" },
                { Icon: DockerOriginal, label: "Docker" },
                { Icon: AmazonwebservicesPlainWordmark, label: "AWS" },
              ].map(({ Icon, label }) => (
                <div
                  key={label}
                  className="bg-zinc-800/50 p-2 rounded-lg border border-zinc-700/50 backdrop-blur-sm hover:bg-zinc-700/50 transition-all duration-300 group relative hover:scale-110"
                >
                  <Icon size={30} />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-zinc-100 px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="mailto:gabr.almir@gmail.com">
                <Button size="lg" className="bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all hover:scale-105">
                  <MailIcon className="h-4 w-4 mr-2" />
                  ENTRE EM CONTATO
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
                      className="text-blue-400 border-blue-800/50 hover:bg-blue-950/50 transition-all hover:scale-105"
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
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full transform -rotate-6 transition-transform hover:rotate-0 opacity-50 blur-2xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full transform -rotate-6 transition-transform hover:rotate-0" />
            <Image
              src="/me.jpg"
              alt="Gabriel Almir"
              height={400}
              width={400}
              className="relative z-10 rounded-full border-4 border-zinc-800 shadow-lg bg-zinc-900 transition-all duration-300 hover:scale-105"
              priority
            />
          </div>
        </section>

        <section id="projetos" className="py-20">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            PROJETOS EM DESTAQUE
          </h2>
          <GitHubProjects username="gabrielalmir" />
        </section>

        <section id="sobre" className="py-20 my-20">
          <div className="bg-zinc-900/50 rounded-2xl shadow-2xl p-8 md:p-12 relative overflow-hidden border border-zinc-800/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-600/10 to-transparent opacity-50" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                SOBRE MIM
              </h2>
              <div className="max-w-3xl mx-auto space-y-6 text-zinc-400 leading-relaxed">
                <p>
                  Sou Desenvolvedor Backend com uma base sólida na construção de soluções escaláveis e de alto desempenho utilizando <strong className="text-blue-400">Node.js</strong> e <strong className="text-blue-400">Java</strong>. Minha especialidade é criar sistemas limpos, manuteníveis e eficientes, aproveitando práticas modernas de desenvolvimento como <strong className="text-blue-400">Clean Architecture</strong>, <strong className="text-blue-400">princípios SOLID</strong> e <strong className="text-blue-400">Design Patterns</strong>.
                </p>
                <p>
                  Com ampla experiência em microsserviços, APIs RESTful e integração com bancos de dados (<strong className="text-blue-400">SQL</strong> e <strong className="text-blue-400">NoSQL</strong>), foco em entregar soluções que atendam aos objetivos de negócios garantindo excelência técnica. Além disso, tenho experiência prática com containerização usando <strong className="text-blue-400">Docker</strong> e serviços em nuvem como <strong className="text-blue-400">AWS</strong>, possibilitando implantações eficientes e escalabilidade.
                </p>
                <p>
                  Atualmente, trabalho no <strong className="text-blue-400">CTC</strong> como <strong className="text-blue-400">Desenvolvedor Backend Node.js</strong>, desenvolvendo soluções backend utilizando <strong className="text-blue-400">Node.js</strong> e <strong className="text-blue-400">TypeScript</strong>. Minha função inclui a criação de middlewares integrados com <strong className="text-blue-400">ODATA</strong> e APIs do <strong className="text-blue-400">Power BI</strong>.
                </p>
                <div className="text-center mt-8">
                  <Link href="https://linkedin.com/in/gabrielalmir" target="_blank">
                    <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 transition-all hover:scale-105">
                      MAIS SOBRE MIM
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contato" className="py-20 text-center">
          <div className="bg-zinc-900/50 rounded-2xl shadow-2xl p-8 md:p-12 relative overflow-hidden border border-zinc-800/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-600/10 to-transparent opacity-50" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                VAMOS CONVERSAR
              </h2>
              <div className="max-w-2xl mx-auto">
                <p className="text-zinc-400 mb-8 text-lg">
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
                        className="text-blue-400 border-blue-800/50 hover:bg-blue-950/50 transition-all hover:scale-105 group relative"
                      >
                        <Icon className="h-5 w-5" />
                        <span className="sr-only">{label}</span>
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-zinc-100 px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          {label}
                        </span>
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-zinc-900/50 text-zinc-100 mt-20 border-t border-zinc-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="mb-2">© 2024 Gabriel Almir</p>
            <p className="text-zinc-500">Desenvolvido com Next.js e Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
