#!/bin/bash

# Script para criar novo post de blog
# Uso: ./scripts/new-post.sh "Título do Post" technical

if [ -z "$1" ]; then
  echo "Erro: Título do post é obrigatório"
  echo "Uso: ./scripts/new-post.sh \"Título do Post\" [categoria]"
  echo "Categorias: technical, career, insights"
  exit 1
fi

TITLE="$1"
CATEGORY="${2:-technical}"
DATE=$(date +%Y-%m-%d)
SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd '[:alnum:]-')
FILENAME="content/blog/${SLUG}.md"

if [ -f "$FILENAME" ]; then
  echo "Erro: Post já existe em $FILENAME"
  exit 1
fi

cat > "$FILENAME" << EOF
---
id: ${SLUG}
title: ${TITLE}
excerpt: Uma breve descrição do post (edite este texto)
date: ${DATE}
readTime: 5 min
category: ${CATEGORY}
tags:
  - tag1
  - tag2
  - tag3
author: Gabriel Almir
videoUrl: # URL do vídeo no YouTube (opcional)
---

# ${TITLE}

## Introdução

Escreva a introdução do seu post aqui...

## Desenvolvimento

### Subtítulo 1

Conteúdo...

### Subtítulo 2

Conteúdo...

## Conclusão

Conclusão do post...

---

**Gostou deste conteúdo?** Compartilhe com outros desenvolvedores!
EOF

echo "✅ Post criado com sucesso: $FILENAME"
echo ""
echo "Próximos passos:"
echo "1. Edite o arquivo: code $FILENAME"
echo "2. Adicione o conteúdo do post"
echo "3. Atualize as tags e categoria"
echo "4. Teste localmente: npm run dev"
echo "5. Faça o build: npm run build"
