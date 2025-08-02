# Blog e Case Studies - Documentação

## Visão Geral

Este documento descreve a implementação das páginas de **Blog** e **Case Studies** no portfólio, seguindo o design terminal moderno com refinamentos para legibilidade e elegância.

## Estrutura de Arquivos

```
src/
├── app/
│   ├── blog/
│   │   ├── page.tsx              # Lista de posts do blog
│   │   └── [id]/
│   │       └── page.tsx          # Página individual do post
│   └── case-studies/
│       ├── page.tsx              # Lista de case studies
│       └── [id]/
│           └── page.tsx          # Página individual do case study
├── components/
│   └── breadcrumb.tsx            # Componente de navegação breadcrumb
└── app/globals.css               # Estilos adicionais para blog/case studies
```

## Características do Design

### 🎨 Visual Terminal Moderno

- **Esquema de cores**: Verde terminal (`--terminal-green`) como cor principal
- **Tipografia**: Fonte monospace para manter consistência
- **Animações sutis**: Transições suaves e efeitos hover elegantes
- **Efeitos de fundo**: Scanlines e glow para atmosfera terminal

### 📱 Responsividade

- Layout adaptativo para desktop, tablet e mobile
- Grid flexível que se ajusta ao tamanho da tela
- Navegação otimizada para touch devices

### 🔍 Funcionalidades de Busca e Filtro

#### Blog
- Busca por título e conteúdo
- Filtro por categoria (Técnico, Carreira, Insights)
- Filtro por tags
- Tempo de leitura estimado

#### Case Studies
- Filtro por categoria (Backend, Full Stack, Arquitetura, Otimização)
- Projetos em destaque
- Métricas de impacto
- Informações de equipe e duração

## Componentes Principais

### 1. Terminal Window

```typescript
// Componente base para janelas com estilo terminal
<div className="terminal-window border border-terminal-green/20 p-6">
  <div className="flex items-center gap-2 mb-4">
    <Icon className="h-5 w-5 text-terminal-green" />
    <span className="terminal-prompt">&gt; comando</span>
  </div>
  {/* Conteúdo */}
</div>
```

### 2. Cards de Conteúdo

- **Blog Posts**: Cards com preview, tags, tempo de leitura
- **Case Studies**: Cards com métricas, tecnologias, resultados
- Hover effects com glow sutil
- Botões com animações de terminal

### 3. Páginas de Detalhes

- Layout de artigo otimizado para leitura
- Syntax highlighting para código
- Navegação entre seções
- Informações do autor
- Compartilhamento social

## Estilos CSS Customizados

### Classes Principais

```css
/* Janela terminal */
.terminal-window {
  @apply bg-zinc-950 backdrop-blur-sm;
  box-shadow: 0 0 10px rgba(var(--terminal-green), 0.1);
}

/* Botões terminal */
.terminal-button {
  @apply bg-terminal-green text-zinc-950 hover:bg-terminal-green/90;
  text-shadow: 0 0 5px rgba(var(--terminal-green), 0.5);
}

/* Botões outline */
.terminal-button-outline {
  @apply border border-terminal-green/40 text-terminal-green hover:bg-terminal-green/10;
}

/* Prosa terminal */
.prose-terminal {
  color: rgb(var(--terminal-green) / 0.9);
}
```

### Animações

- **Scanline**: Efeito de linha de varredura
- **Glow**: Brilho sutil de fundo
- **Fade-in**: Entrada suave dos elementos
- **Hover effects**: Transições em botões e links

## Dados e Conteúdo

### Estrutura do Blog Post

```typescript
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;        // Markdown/HTML
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
```

### Estrutura do Case Study

```typescript
interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  challenge: string;
  solution: string;
  implementation: string; // Detalhes técnicos
  results: string[];
  technologies: string[];
  metrics: {
    label: string;
    value: string;
    improvement: string;
    description: string;
  }[];
  duration: string;
  teamSize: string;
  category: 'backend' | 'fullstack' | 'architecture' | 'optimization';
  featured: boolean;
}
```

## Navegação

### Header Principal
- Links para Blog e Case Studies adicionados
- Navegação consistente em todas as páginas
- Logo com link para home

### Breadcrumbs
- Componente reutilizável para navegação hierárquica
- Geração automática baseada na rota
- Estilo terminal consistente

## Performance e SEO

### Otimizações
- **Lazy loading** de imagens
- **Code splitting** automático do Next.js
- **Compressão** de assets
- **Caching** de componentes

### SEO
- Meta tags dinâmicas por página
- Open Graph para compartilhamento
- Schema markup para artigos
- URLs semânticas

## Próximos Passos

### Melhorias Planejadas
1. **CMS Integration**: Conectar com Strapi ou Contentful
2. **Search Engine**: Implementar busca full-text
3. **Comments System**: Sistema de comentários
4. **Newsletter**: Integração com email marketing
5. **Analytics**: Tracking de engajamento
6. **RSS Feed**: Feed para assinantes

### Funcionalidades Avançadas
1. **Dark/Light Mode**: Toggle de tema
2. **Reading Progress**: Barra de progresso de leitura
3. **Related Posts**: Sugestões de conteúdo
4. **Social Sharing**: Botões de compartilhamento
5. **Print Styles**: Otimização para impressão

## Manutenção

### Adicionando Novo Post
1. Criar entrada no array `blogPosts`
2. Adicionar conteúdo em Markdown
3. Definir tags e categoria
4. Testar responsividade

### Adicionando Novo Case Study
1. Criar entrada no array `caseStudies`
2. Incluir métricas e resultados
3. Documentar implementação técnica
4. Adicionar screenshots se necessário

## Tecnologias Utilizadas

- **Next.js 15**: Framework React
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Estilização
- **Framer Motion**: Animações
- **Lucide React**: Ícones
- **React Hooks**: Gerenciamento de estado

---

*Este documento será atualizado conforme novas funcionalidades forem implementadas.*