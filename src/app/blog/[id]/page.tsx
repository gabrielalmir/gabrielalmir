'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Calendar, Clock, Code2, Coffee, ExternalLink, Github, Share2, Terminal, User } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { use } from 'react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  category: 'technical' | 'career' | 'insights';
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

// Mock data - em um projeto real, isso viria de uma API ou CMS
const blogPosts: Record<string, BlogPost> = {
  '1': {
    id: '1',
    title: 'Arquitetura de Microsserviços com Node.js e AWS',
    excerpt: 'Como projetar e implementar uma arquitetura de microsserviços robusta usando Node.js, NestJS e serviços AWS para aplicações de alta escala.',
    content: `
# Introdução

A arquitetura de microsserviços tem se tornado cada vez mais popular para aplicações que precisam escalar rapidamente e manter alta disponibilidade. Neste post, vou compartilhar minha experiência implementando uma arquitetura de microsserviços usando Node.js e AWS.

## O Desafio

Quando começamos o projeto, enfrentávamos um monolito que não conseguia mais atender à demanda crescente de usuários. Os principais problemas eram:

- **Escalabilidade limitada**: Todo o sistema precisava ser escalado junto
- **Deploys arriscados**: Uma falha em qualquer parte afetava todo o sistema
- **Tecnologias acopladas**: Difícil adotar novas tecnologias
- **Equipes bloqueadas**: Desenvolvedores esperando uns pelos outros

## A Solução: Microsserviços com AWS

### 1. Decomposição do Monolito

Primeiro, identificamos os bounded contexts do nosso domínio:

\`\`\`typescript
// Exemplo de estrutura de serviços
const services = {
  userService: {
    responsibilities: ['autenticação', 'perfis', 'permissões'],
    database: 'PostgreSQL',
    deployment: 'AWS Lambda'
  },
  orderService: {
    responsibilities: ['pedidos', 'pagamentos', 'status'],
    database: 'DynamoDB',
    deployment: 'ECS Fargate'
  },
  notificationService: {
    responsibilities: ['emails', 'push', 'sms'],
    database: 'Redis',
    deployment: 'AWS Lambda'
  }
};
\`\`\`

### 2. Comunicação Entre Serviços

Implementamos dois padrões principais:

**Comunicação Síncrona (REST APIs)**:
\`\`\`typescript
// Cliente HTTP com retry e circuit breaker
import axios from 'axios';
import { CircuitBreaker } from 'opossum';

class ServiceClient {
  private breaker: CircuitBreaker;

  constructor(private baseURL: string) {
    this.breaker = new CircuitBreaker(this.makeRequest.bind(this), {
      timeout: 3000,
      errorThresholdPercentage: 50,
      resetTimeout: 30000
    });
  }

  async makeRequest(path: string, data?: any) {
    return axios.post(\`\${this.baseURL}\${path}\`, data, {
      timeout: 3000,
      retry: 3
    });
  }
}
\`\`\`

**Comunicação Assíncrona (SQS + EventBridge)**:
\`\`\`typescript
// Publisher de eventos
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

class EventPublisher {
  constructor(private sqsClient: SQSClient) {}

  async publishEvent(eventType: string, payload: any) {
    const message = {
      eventType,
      payload,
      timestamp: new Date().toISOString(),
      correlationId: generateCorrelationId()
    };

    await this.sqsClient.send(new SendMessageCommand({
      QueueUrl: process.env.EVENT_QUEUE_URL,
      MessageBody: JSON.stringify(message)
    }));
  }
}
\`\`\`

### 3. Observabilidade e Monitoramento

Implementamos observabilidade completa:

\`\`\`typescript
// Middleware de tracing
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export function tracingMiddleware(req: Request, res: Response, next: NextFunction) {
  const traceId = req.headers['x-trace-id'] || uuidv4();
  const spanId = uuidv4();

  req.traceContext = { traceId, spanId };
  res.setHeader('x-trace-id', traceId);

  // Log estruturado
  console.log(JSON.stringify({
    level: 'info',
    message: 'Request started',
    traceId,
    spanId,
    method: req.method,
    path: req.path,
    timestamp: new Date().toISOString()
  }));

  next();
}
\`\`\`

## Resultados Obtidos

Após 8 meses de implementação, conseguimos:

- **10x mais usuários simultâneos** (de 1k para 10k+)
- **80% redução no tempo de deploy** (de 25min para 5min)
- **99.9% de disponibilidade** (vs 95% do monolito)
- **Escalabilidade automática** baseada em métricas

## Lições Aprendidas

### ✅ O que funcionou bem:

1. **Start Small**: Começamos com 3 serviços e fomos crescendo
2. **Database per Service**: Cada serviço com seu próprio banco
3. **API Gateway**: Ponto único de entrada simplificou autenticação
4. **Monitoring First**: Observabilidade desde o dia 1

### ⚠️ Desafios enfrentados:

1. **Complexidade de rede**: Latência entre serviços
2. **Debugging distribuído**: Rastrear bugs entre serviços
3. **Consistência eventual**: Aceitar que nem tudo é imediato
4. **Overhead operacional**: Mais serviços = mais complexidade

## Próximos Passos

Estamos explorando:

- **Service Mesh** com Istio para melhor observabilidade
- **Event Sourcing** para auditoria completa
- **CQRS** para otimizar leitura e escrita
- **Kubernetes** para melhor orquestração

## Conclusão

A migração para microsserviços foi desafiadora mas transformadora. O segredo é começar pequeno, medir tudo e evoluir gradualmente. Não é uma bala de prata, mas para nosso contexto foi a escolha certa.

**Dica final**: Microsserviços resolvem problemas organizacionais, não apenas técnicos. Se sua equipe não está pronta para a complexidade distribuída, talvez um monolito bem estruturado seja melhor.

---

*Tem dúvidas sobre microsserviços? Quer discutir arquitetura? Me chama no [LinkedIn](https://linkedin.com/in/gabrielalmir) ou [GitHub](https://github.com/gabrielalmir)!*
    `,
    date: '2024-01-15',
    readTime: '8 min',
    tags: ['Node.js', 'AWS', 'Microsserviços', 'NestJS'],
    category: 'technical',
    author: {
      name: 'Gabriel Almir',
      role: 'Backend Software Engineer',
      avatar: '/me.jpg'
    }
  }
};

interface BlogPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = use(params);
  const post = blogPosts[id];

  if (!post) {
    notFound();
  }

  const categories = {
    technical: { label: 'Técnico', icon: Code2, color: 'text-blue-400' },
    career: { label: 'Carreira', icon: BookOpen, color: 'text-green-400' },
    insights: { label: 'Insights', icon: Terminal, color: 'text-purple-400' }
  };

  const CategoryIcon = categories[post.category].icon;

  return (
    <div className="min-h-screen bg-zinc-950 text-terminal-green font-mono selection:bg-terminal-green selection:text-zinc-950">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-scanline animate-scanline opacity-5"></div>
        <div className="absolute inset-0 bg-glow"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-screen border-b border-terminal-green/20 bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold flex items-center gap-2 text-terminal-green hover:text-terminal-green/80 transition-colors">
              <Coffee className="h-6 w-6" />
              <span className="terminal-prompt hidden sm:block">&gt; gabrielalmir</span>
            </Link>
            <div className="space-x-6">
              <Link href="/blog" className="hover:text-terminal-green/80 transition-colors terminal-link">
                <span className="terminal-prompt">&gt; blog</span>
              </Link>
              <Link href="/case-studies" className="hover:text-terminal-green/80 transition-colors terminal-link">
                <span className="terminal-prompt">&gt; case studies</span>
              </Link>
            </div>
          </div>
        </nav>
      </header>

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
          <div className="terminal-window border border-terminal-green/20 p-8">
            <div className="flex items-center gap-2 mb-6">
              <CategoryIcon className={`h-5 w-5 ${categories[post.category].color}`} />
              <span className="text-sm text-terminal-green/60 uppercase tracking-wider">
                {categories[post.category].label}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-terminal-green mb-4 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-terminal-green/80 mb-6 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 mb-6 text-sm text-terminal-green/60">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} de leitura</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author.name}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-terminal-green/10 text-terminal-green/80 border border-terminal-green/20 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-terminal-green/60">Compartilhar:</span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="terminal-button-outline">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="terminal-button-outline">
                  <Github className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="terminal-window border border-terminal-green/20 p-8">
            <div className="flex items-center gap-2 mb-6">
              <Terminal className="h-5 w-5 text-terminal-green" />
              <span className="terminal-prompt">&gt; cat article.md</span>
            </div>

            <div className="prose prose-invert prose-terminal max-w-none">
              <div className="text-terminal-green/90 leading-relaxed space-y-6">
                {post.content.split('\n').map((paragraph, index) => {
                  if (paragraph.trim() === '') return null;

                  // Handle headers
                  if (paragraph.startsWith('# ')) {
                    return (
                      <h1 key={index} className="text-2xl font-bold text-terminal-green mt-8 mb-4 border-b border-terminal-green/20 pb-2">
                        {paragraph.replace('# ', '')}
                      </h1>
                    );
                  }

                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-xl font-bold text-terminal-green mt-6 mb-3">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }

                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={index} className="text-lg font-bold text-terminal-green mt-4 mb-2">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }

                  // Handle code blocks
                  if (paragraph.startsWith('```')) {
                    return (
                      <div key={index} className="bg-zinc-900 border border-terminal-green/20 rounded p-4 my-4 overflow-x-auto">
                        <pre className="text-terminal-green/90 text-sm">
                          <code>{paragraph.replace(/```\w*\n?|```/g, '')}</code>
                        </pre>
                      </div>
                    );
                  }

                  // Handle lists
                  if (paragraph.startsWith('- ')) {
                    return (
                      <ul key={index} className="list-none space-y-2 my-4">
                        <li className="flex items-start gap-2">
                          <span className="text-terminal-green mt-1">▸</span>
                          <span className="text-terminal-green/90">{paragraph.replace('- ', '')}</span>
                        </li>
                      </ul>
                    );
                  }

                  if (paragraph.match(/^\d+\./)) {
                    return (
                      <ol key={index} className="list-none space-y-2 my-4">
                        <li className="flex items-start gap-2">
                          <span className="text-terminal-green mt-1">▸</span>
                          <span className="text-terminal-green/90">{paragraph.replace(/^\d+\.\s/, '')}</span>
                        </li>
                      </ol>
                    );
                  }

                  // Handle bold text
                  const processedParagraph = paragraph
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-terminal-green font-bold">$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em class="text-terminal-green/80 italic">$1</em>')
                    .replace(/`(.*?)`/g, '<code class="bg-terminal-green/10 text-terminal-green px-1 py-0.5 rounded text-sm">$1</code>');

                  // Regular paragraphs
                  return (
                    <p
                      key={index}
                      className="text-terminal-green/90 leading-relaxed mb-4"
                      dangerouslySetInnerHTML={{ __html: processedParagraph }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </motion.article>

        {/* Author Bio */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="terminal-window border border-terminal-green/20 p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-terminal-green" />
              <span className="terminal-prompt">&gt; author.info()</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-terminal-green/10 border border-terminal-green/20 flex items-center justify-center">
                <User className="h-8 w-8 text-terminal-green" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-terminal-green">{post.author.name}</h3>
                <p className="text-terminal-green/80">{post.author.role}</p>
                <p className="text-sm text-terminal-green/60 mt-1">
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
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex justify-between items-center">
            <Link href="/blog">
              <Button className="terminal-button group">
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                <span className="terminal-prompt">&gt; mais posts</span>
              </Button>
            </Link>

            <Link href="/case-studies">
              <Button variant="outline" className="terminal-button-outline group">
                <span className="terminal-prompt">&gt; ver case studies</span>
                <ExternalLink className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
