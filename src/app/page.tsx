import { Code2Icon, CoffeeIcon, Github, Instagram, Linkedin, MailIcon, Twitter, User2Icon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import GitHubProjects from "@/components/github-projects"
import { Button } from "@/components/ui/button"
import { DockerPlain, JavascriptPlain, MongodbPlain, NestjsOriginal, NextjsPlain, NodejsPlain, PostgresqlPlain, ReactOriginal, TypescriptPlain } from "devicons-react"

export default function Home() {
  return (
    <div className="texture min-h-screen bg-gradient-to-br text-zinc-900">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold flex items-center gap-2 text-blue-600">
            <CoffeeIcon className="h-6 w-6" />
            Gabriel Almir
          </Link>
          <div className="space-x-6">
            <Link href="https://github.com/gabrielalmir" className="hover:text-blue-600 transition-colors" target="_blank">
              <Code2Icon className="inline mr-2" />
              Projects
            </Link>
            <Link href="#about" className="hover:text-blue-600 transition-colors">
              <User2Icon className="inline mr-2" />
              About
            </Link>
            <Link href="#contact" className="hover:text-blue-600 transition-colors">
              <MailIcon className="inline mr-2" />
              Contact
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4">
        <section className="py-20 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-semibold">
              Hello, my name is
            </div>
            <h1 className="text-5xl font-bold mb-4 text-zinc-800">
              GABRIEL ALMIR
            </h1>
            <p className="text-zinc-600 text-lg leading-relaxed">
              I'm a Backend Developer with over 10 years of experience, specializing in Node.js and TypeScript. I have a strong foundation in microservices architecture, RESTful API design, and database integration with both SQL and NoSQL solutions.
            </p>
            <div className="flex flex-wrap gap-4 my-6">
              <NodejsPlain size={40} className="bg-white p-2 rounded-lg shadow-sm" />
              <TypescriptPlain size={40} className="bg-white p-2 rounded-lg shadow-sm" />
              <JavascriptPlain size={40} className="bg-white p-2 rounded-lg shadow-sm" />
              <NestjsOriginal size={40} className="bg-white p-2 rounded-lg shadow-sm" />
              <ReactOriginal size={40} className="bg-white p-2 rounded-lg shadow-sm" />
              <NextjsPlain size={40} className="bg-white p-2 rounded-lg shadow-sm" />
              <PostgresqlPlain size={40} className="bg-white p-2 rounded-lg shadow-sm" />
              <MongodbPlain size={40} className="bg-white p-2 rounded-lg shadow-sm" />
              <DockerPlain size={40} className="bg-white p-2 rounded-lg shadow-sm" />
            </div>
            <div className="flex gap-4">
              <Link href="mailto:gabr.almir@gmail.com">
                <Button className="bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors">
                  <MailIcon className="h-4 w-4 mr-2" />
                  CONTACT ME
                </Button>
              </Link>
              <Link href="https://linkedin.com/in/gabrielalmir" target="_blank">
                <Button variant="outline" size="icon" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="https://github.com/gabrielalmir" target="_blank">
                <Button variant="outline" size="icon" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                  <Github className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-blue-200 rounded-full transform -rotate-6"></div>
            <Image
              src="/me.png"
              alt="Gabriel Almir"
              height={400}
              width={400}
              className="relative z-10 rounded-full border-4 border-white shadow-lg bg-blue-400"
              priority
            />
          </div>
        </section>

        <section id="projects" className="py-20">
          <GitHubProjects username="gabrielalmir" />
        </section>

        <section id="about" className="py-20 bg-white rounded-xl shadow-lg p-8 my-20">
          <h2 className="text-3xl font-bold mb-8 text-center text-zinc-800">ABOUT ME</h2>
          <div className="max-w-3xl mx-auto space-y-6 text-zinc-600 leading-relaxed">
            <p>
              As a Backend Developer with over 10 years of experience, I specialize in Node.js and have expanded my expertise to include Java and Spring Boot. My core strengths are in building microservices architectures, designing RESTful APIs, and integrating databases (SQL and NoSQL), including PostgreSQL, MySQL, MongoDB, and Redis.
            </p>
            <p>
              I am committed to creating scalable, high-performance solutions, guided by SOLID principles, Design Patterns, and Clean Architecture. I am proficient in Docker containerization and cloud technologies like AWS, ensuring reliability, maintainability, and efficiency in every project.
            </p>
            <p>
              Throughout my career, I've been dedicated to creating scalable and resilient solutions. I'm a strong advocate for clean architecture and SOLID principles, ensuring that the code I produce is not only modular but also easy to maintain. I thrive on leading complex projects, particularly those involving intricate system and data integrations. My commitment to adopting best practices guarantees high performance and quality in every project I undertake.
            </p>
            <div className="text-center mt-8">
              <Link href="https://linkedin.com/in/gabrielalmir" target="_blank">
                <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">MORE ABOUT ME</Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 text-center">
          <h2 className="text-3xl font-bold mb-8 text-zinc-800">LET'S CONNECT</h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-zinc-600 mb-8">
              I'm always open to new opportunities and collaborations. Feel free to reach out to me for any inquiries or just to say hi!
            </p>
            <div className="flex gap-4 justify-center">
              {[
                { icon: Linkedin, href: "https://linkedin.com/in/gabrielalmir" },
                { icon: Github, href: "https://github.com/gabrielalmir" },
                { icon: Twitter, href: "https://x.com/momentoalmir" },
                { icon: Instagram, href: "https://instagram.com/momentoalmir" },
                { icon: MailIcon, href: "mailto:gabr.almir@gmail.com" },
              ].map((social, index) => (
                <Link key={index} href={social.href} target="_blank">
                  <Button variant="outline" size="icon" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                    <social.icon className="h-5 w-5" />
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 py-6 bg-blue-600 text-white rounded-t-[100%]">
        <div className="text-center text-white">© 2024 Gabriel Almir | Built with Next.js and Tailwind CSS</div>
      </footer>
    </div>
  )
}
