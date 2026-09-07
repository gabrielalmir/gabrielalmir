# Backup de conteúdo — portfólio Gabriel Almir

Este diretório é o que sobrou depois que o código-fonte do site foi removido
(2026-09-07). Contém apenas **textos e assets**: nada aqui é executável, e
nenhuma parte do projeto Astro foi preservada fora do histórico do git.

## O que tem aqui

| Pasta | Conteúdo |
| --- | --- |
| `textos/` | Copy do site em markdown: `home.md` (hero, provas, trabalhos, processo, camada pessoal, contato, rodapé) e `trajetoria.md` (carreira, formação e presença pública) |
| `artigos/` | Os 4 artigos curtos que viviam embutidos em `portfolio-content.ts` |
| `artigos-completos/` | Os 4 posts longos do blog, com frontmatter original |
| `projetos/` | Os 7 sistemas publicados — 3 dossiês e 4 laboratórios — cada um com contexto, restrições, decisões, evidências, limites e mapa arquitetural |
| `assets/` | Tudo que era `public/`: fontes Geist, favicons, marca, e as imagens editoriais, de trajetória, de atlas, de marca e de textura |
| `design/` | Referências visuais, o tema do SO (Aether) com wallpaper e paleta, e os documentos de pesquisa e do controlled-flow |
| `perfil.md` | Perfil consolidado (LinkedIn + site + projetos), reconciliado pelo `Profile.pdf` |
| `curriculo.md` | Currículo em markdown |
| `Profile.pdf` | Exportação do LinkedIn de 07/09/2026 — a fonte considerada correta |

## Origem de cada coisa

- `textos/`, `artigos/` — extraídos programaticamente de `src/lib/portfolio-content.ts`
- `artigos-completos/` — cópia de `src/content/blog/`
- `projetos/` — gerados de `src/content/systems/pt-BR/*.json`
- `assets/` — cópia de `public/`
- `design/` — `design/` mais `docs/research/`, `docs/controlled-flow/` e `docs/cover.jpg`

## Recuperar o código

O site em Astro está no histórico do git, no commit anterior à remoção:

```sh
git log --oneline           # achar o último commit com src/
git checkout <commit> -- .  # ou restaurar caminhos específicos
```

Arquivos que **nunca chegaram a ser commitados** e foram apagados junto — não
existem no histórico: `src/pages/design.astro`, `src/styles/design.css`,
`scripts/lib/tokens.mjs`, `public/images/texture/` (esta preservada em
`assets/images/texture/`).
