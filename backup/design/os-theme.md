# Referência: tema do SO (Omarchy · Aether)

Extraído do ambiente real do Gabriel em 2026-09-07. Fonte de verdade:

- Tema ativo: `~/.local/state/omarchy/current/theme.name` → **Aether**
- Cores: `~/.config/aether/theme/colors.toml` (cópia em [`os-colors.toml`](os-colors.toml))
- Wallpaper ativo: `~/.local/state/omarchy/current/background` → `anime-girl-hand-fan.jpg`
  (cópia reduzida para 1600px em [`os-wallpaper.jpg`](os-wallpaper.jpg); original 3840×2160)
- Blueprint que gerou o tema: `~/.config/aether/blueprints/avlye.json` (o wallpaper é a semente da paleta)

Amostra visual da paleta: [`os-palette.png`](os-palette.png)

## Paleta (modo escuro)

| Papel                 | Hex       | Notas                                |
| --------------------- | --------- | ------------------------------------ |
| `background`          | `#0C0D0F` | quase preto, levemente frio          |
| `dark_background`     | `#090A0B` | camada mais profunda                 |
| `darker_background`   | `#060708` | limite inferior                      |
| `lighter_background`  | `#242527` | superfície elevada / `selection`     |
| `foreground`          | `#F5F5F4` | texto principal (branco quente)      |
| `light_foreground`    | `#F7F7F6` |                                      |
| `bright_foreground`   | `#F8F8F7` |                                      |
| `dark_foreground`     | `#B8B8B7` | texto secundário                     |
| `muted`               | `#63666C` | texto terciário / hairline           |
| **`accent` / `blue`** | `#5C85B5` | azul dessaturado — cor de assinatura |
| `bright_blue`         | `#7DA9E6` |                                      |
| `green`               | `#7CB3DA` | não é verde: é azul mais claro       |
| `bright_green`        | `#99D5FF` |                                      |
| `cyan`                | `#90C8F5` |                                      |
| `bright_cyan`         | `#84D5FF` |                                      |
| `red`                 | `#C0756E` | terracota dessaturado                |
| `bright_red`          | `#ED978E` |                                      |
| `yellow`              | `#D75A54` | não é amarelo: é vermelho quente     |
| `bright_yellow`       | `#FF7A71` | ponto mais quente da paleta          |
| `orange`              | `#C98A84` |                                      |
| `magenta`             | `#AF6F6C` |                                      |
| `bright_magenta`      | `#DB918D` |                                      |
| `brown`               | `#79534F` |                                      |

Particularidade do tema: os slots quentes (`yellow`, `orange`, `green`) foram
recolorizados a partir do wallpaper, então os nomes ANSI não descrevem o matiz.
Na prática a paleta é **bicromática**: azul-acinzentado + terracota/vermelho,
sobre preto, com um único branco quente.

## Cores dominantes do wallpaper

Quantização de 12 cores (ImageMagick), em ordem de área:

`#191B1E` · `#E5E1E1` · `#3A3A41` · `#555A62` · `#AEBCC8` · `#9E9AA0` ·
`#394957` · `#6298B6` · `#56768E` · `#346E92` · `#9D807F` · `#A55F5E`

Isso confirma a leitura: ~70% da imagem é tinta preta e cinza-azulado, o azul
aparece concentrado (olhos e leque) e o vermelho entra só como respingo — é um
**acento de área mínima**, não uma cor de superfície.

## Leitura para o portfólio

O que o SO diz sobre a preferência visual do Gabriel, e que vale trazer para o site:

1. **Contraste alto e fundo quase preto**, não cinza médio.
2. **Um azul dessaturado como única cor estrutural** (`#5C85B5`) — sóbrio,
   nunca "azul de dashboard".
3. **Vermelho/terracota como respingo**, em quantidade muito pequena: alerta,
   marcação, ênfase pontual.
4. **Cinzas frios em escada curta** (`#242527` → `#63666C` → `#B8B8B7`) para
   hierarquia, em vez de muitos tons.
5. Textura de nanquim/pincel — bordas sujas, não gradientes limpos.

> Atenção: o site hoje é `paper`/`ink` (fundo claro `#F2ECDE`, tinta `#181915`,
> acento âmbar). Esta paleta é o oposto em luminância. Usá-la significa
> **inverter a base do sistema**, não trocar variáveis. Decisão em aberto.
