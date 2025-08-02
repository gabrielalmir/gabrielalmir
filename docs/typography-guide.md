# 🔤 Typography Guide - Terminal Fonts

Este guia documenta as fontes implementadas no projeto para manter o estilo terminal enquanto oferece excelente legibilidade.

## 📚 Fontes Implementadas

### 1. JetBrains Mono (Principal)
**Uso**: Fonte principal do corpo, elementos de interface, prompts de terminal

**Características**:
- Altura aumentada das letras minúsculas para melhor legibilidade
- Distinção clara entre caracteres similares (1, l, I, 0, O)
- 139 ligaduras específicas para código
- Suporte a 145 idiomas
- Pesos: 400, 500, 600, 700

**Quando usar**:
```css
.font-jetbrains { font-family: var(--font-jetbrains); }
```

### 2. Space Mono (Legibilidade)
**Uso**: Textos longos, artigos de blog, conteúdo de case studies

**Características**:
- Inspirada em interfaces de ficção científica
- Excelente para leitura prolongada
- Design limpo e futurista
- Pesos: 400, 700

**Quando usar**:
```css
.font-space { font-family: var(--font-space); }
.prose-terminal { font-family: var(--font-space); }
```

### 3. Fira Code (Código)
**Uso**: Blocos de código, snippets, exemplos técnicos

**Características**:
- Ligaduras específicas para programação (=>, !=, <=, etc.)
- Otimizada para código
- Reduz ruído visual em operadores
- Pesos: 300, 400, 500, 600, 700

**Quando usar**:
```css
.font-fira { font-family: var(--font-fira); }
pre code { font-family: var(--font-fira); }
```

## 🎯 Estratégia de Uso

### Hierarquia Tipográfica

1. **Interface Principal**: JetBrains Mono
   - Navegação
   - Botões
   - Prompts de terminal
   - Títulos de seções

2. **Conteúdo de Leitura**: Space Mono
   - Artigos de blog
   - Descrições de case studies
   - Textos explicativos longos

3. **Código e Exemplos**: Fira Code
   - Blocos de código
   - Snippets inline
   - Comandos de terminal

### Classes Utilitárias Tailwind

```css
/* Fontes específicas */
font-jetbrains  /* JetBrains Mono */
font-space      /* Space Mono */
font-fira       /* Fira Code */
font-mono       /* Fallback monospace */
```

## 🔧 Configurações Técnicas

### Font Features
```css
font-feature-settings: "liga" 1, "calt" 1;
```
- **liga**: Ativa ligaduras
- **calt**: Ativa alternativas contextuais

### Suavização
```css
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
```

### Espaçamento Otimizado
```css
line-height: 1.7;        /* Para textos longos */
letter-spacing: 0.025em; /* Espaçamento sutil */
```

## 📱 Responsividade

### Mobile
- Tamanhos de fonte reduzidos automaticamente
- Espaçamento ajustado para telas menores
- Mantém legibilidade em dispositivos pequenos

### Desktop
- Aproveita ligaduras completas
- Espaçamento otimizado para leitura
- Efeitos visuais aprimorados

## 🎨 Exemplos de Uso

### Terminal Prompt
```jsx
<span className="terminal-prompt font-jetbrains">
  &gt; comando_exemplo
</span>
```

### Artigo de Blog
```jsx
<article className="prose-terminal font-space">
  <h1>Título do Artigo</h1>
  <p>Conteúdo do artigo com excelente legibilidade...</p>
</article>
```

### Bloco de Código
```jsx
<pre className="font-fira">
  <code>
    const exemplo = () => {
      return "Código com ligaduras";
    };
  </code>
</pre>
```

## 🔍 Comparação com Fontes Anteriores

### Melhorias Implementadas

1. **Legibilidade**: Space Mono oferece melhor experiência de leitura
2. **Código**: Fira Code com ligaduras reduz fadiga visual
3. **Interface**: JetBrains Mono mantém identidade terminal
4. **Performance**: Fontes otimizadas do Google Fonts
5. **Acessibilidade**: Melhor distinção entre caracteres

### Fallbacks
```css
font-family: 
  var(--font-jetbrains),
  'JetBrains Mono',
  'Consolas',
  'Monaco',
  'Courier New',
  monospace;
```

## 📊 Métricas de Performance

- **Carregamento**: Otimizado com `display: swap`
- **Tamanho**: Pesos selecionados estrategicamente
- **Cache**: Aproveitamento do CDN do Google Fonts
- **Fallback**: Fontes do sistema como backup

## 🛠️ Manutenção

### Adicionando Novos Pesos
```typescript
// layout.tsx
const jetBrainsMono = JetBrains_Mono({
  weight: ["400", "500", "600", "700", "800"], // Adicionar novo peso
});
```

### Testando Fontes
1. Verificar carregamento no DevTools
2. Testar em diferentes dispositivos
3. Validar ligaduras em blocos de código
4. Confirmar fallbacks funcionando

## 🎯 Próximos Passos

- [ ] Implementar font-display: optional para performance
- [ ] Adicionar suporte a mais ligaduras
- [ ] Otimizar subset de caracteres
- [ ] Implementar preload para fontes críticas

---

**Resultado**: Tipografia moderna, legível e performática que mantém a identidade terminal do projeto.