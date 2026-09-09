/* Campo de tinta.

   Nanquim diluído em água escura: cerca de 70% da tela fica quase preta e o
   pigmento se concentra em poucas regiões. Os limiares são agressivos de
   propósito — um fbm cru cobriria tudo de cinza uniforme e viraria fundo de
   dashboard.

   O grão fica por conta do overlay de ruído que Base.astro já joga sobre a
   página inteira; um dither aqui seria a mesma textura duas vezes. */

precision mediump float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
/* Capítulo atual, contínuo: 2.4 é "entre o terceiro e o quarto". Suavizado
   em JS, para a tinta mudar de humor sem pular. */
uniform float uAct;
uniform float uReveal;

/* O humor de cada ato: (limiar da aguada, escala do warp, deslocamento do
   drift, força do azul). Limiar mais alto = menos tinta. Interpolado entre
   atos vizinhos por `fract(uAct)`. GLSL ES 1.0 não indexa const array com
   índice dinâmico de forma confiável, daí a cadeia de ifs. */
vec4 actParams(float act) {
  if (act < 0.5) return vec4(0.66, 2.1, 0.0, 1.00);
  if (act < 1.5) return vec4(0.64, 2.4, 1.0, 0.90);
  if (act < 2.5) return vec4(0.62, 1.6, 2.0, 1.00);
  if (act < 3.5) return vec4(0.66, 2.8, 3.0, 0.80);
  if (act < 4.5) return vec4(0.70, 3.2, 4.0, 1.10);
  if (act < 5.5) return vec4(0.72, 2.0, 5.0, 0.70);
  return vec4(0.76, 1.8, 6.0, 0.60);
}

vec4 mood() {
  float base = floor(uAct);
  return mix(actParams(base), actParams(base + 1.0), fract(uAct));
}

/* highp: com o default em mediump (fp16 no mobile), vUv não distingue dois
   pixels vizinhos numa tela grande e o campo ganha degrau. */
varying highp vec2 vUv;

/* Paleta — os mesmos hex de src/styles/global.css, já em sRGB. ShaderMaterial
   não injeta o chunk de colorspace do three, então o que sai daqui vai direto
   para a tela, sem conversão dupla. */
const vec3 INK_950 = vec3(0.0235, 0.0275, 0.0314);
const vec3 INK_900 = vec3(0.0471, 0.0510, 0.0588);
const vec3 BLUE_WASH = vec3(0.6824, 0.7373, 0.7843);
const vec3 RED_BRIGHT = vec3(1.0000, 0.4784, 0.4431);

/* Rotação entre as oitavas: sem ela o fbm alinha o detalhe aos eixos e a
   lavagem ganha cara de xadrez. */
const highp mat2 OCTAVE = mat2(0.8776, 0.4794, -0.4794, 0.8776);

/* Respingos. xy é a posição em uv, z é o limiar de uReveal em que cada um
   pousa, w é o raio em unidades de altura. Constantes porque um respingo
   sorteado por quadro piscaria: estes caem uma vez e ficam. Somados dão menos
   de 0,05% da área — aqui o vermelho é acento, nunca superfície. */
const vec4 SPLAT_A = vec4(0.720, 0.660, 0.08, 0.0130);
const vec4 SPLAT_B = vec4(0.768, 0.598, 0.19, 0.0048);
const vec4 SPLAT_C = vec4(0.681, 0.726, 0.27, 0.0044);
const vec4 SPLAT_D = vec4(0.822, 0.700, 0.38, 0.0064);
const vec4 SPLAT_E = vec4(0.247, 0.253, 0.51, 0.0110);
const vec4 SPLAT_F = vec4(0.203, 0.191, 0.64, 0.0042);
const vec4 SPLAT_G = vec4(0.302, 0.308, 0.78, 0.0056);

/* Cada respingo pertence a um ato e só aparece nele: a chapa daquele
   capítulo já traz o seu terracota, e a regra é um vermelho por tela. Os
   três primeiros ficam com o hero (onde a chapa deixa o respingo à esquerda,
   longe do retrato); os outros se espalham pelos atos mais vazios. */
float actMask(float act) {
  return 1.0 - smoothstep(0.35, 0.65, abs(uAct - act));
}

/* O caminho do ruído roda em highp mesmo com o default em mediump: onde
   mediump vira fp16 (mobile, Apple), o fract de um produto grande devolve
   sempre o mesmo valor e o ruído desaba em faixas lisas. Cor e máscara, que
   vivem entre 0 e 1, continuam em mediump. */
highp float hash(highp vec2 p) {
  highp vec3 q = fract(vec3(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}

highp float valueNoise(highp vec2 p) {
  highp vec2 cell = floor(p);
  highp vec2 f = fract(p);
  /* Hermite: derivada zero na borda da célula, senão a grade aparece. */
  highp vec2 t = f * f * (3.0 - 2.0 * f);
  highp float a = hash(cell);
  highp float b = hash(cell + vec2(1.0, 0.0));
  highp float c = hash(cell + vec2(0.0, 1.0));
  highp float d = hash(cell + vec2(1.0, 1.0));
  return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
}

/* Três oitavas. A quarta só apareceria por baixo do grão que o CSS já joga
   sobre a página, e custaria mais quatro hashes por pixel. */
highp float fbm(highp vec2 p) {
  highp float sum = 0.0;
  highp float amp = 0.5;
  for (int i = 0; i < 3; i++) {
    sum += amp * valueNoise(p);
    p = OCTAVE * p * 2.03;
    amp *= 0.5;
  }
  return sum;
}

/* Um respingo. A geometria dele roda em highp: o raio ao quadrado do menor
   respingo é ~4e-5, subnormal em fp16, e um driver que zera subnormais faria
   os menores sumirem de vez. */
float splatter(highp vec2 uv, float aspect, vec4 splat, float act) {
  highp vec2 d = vec2((uv.x - splat.x) * aspect, uv.y - splat.y);
  highp float dist2 = dot(d, d);

  /* Corte barato antes de qualquer trigonometria. São sete respingos por
     pixel para menos de 0,05% da área: sem esta saída quase todo o custo
     deles iria para o vazio. O contorno irregular encolhe o raio no máximo
     15%, então 1.5x o raio é folga de sobra. */
  if (dist2 > splat.w * splat.w * 2.25) return 0.0;

  highp float dist = sqrt(dist2);
  /* Contorno irregular sem atan (indefinido no centro) e sem mais uma oitava
     de ruído: a direção normalizada já tira a cara de círculo perfeito. */
  highp vec2 dir = d / (dist + 0.001);
  float wobble = 1.0
    + 0.10 * sin(dir.x * 2.0 + dir.y * 1.4 + splat.z * 30.0)
    + 0.05 * sin(dir.y * 3.4 - splat.x * 18.0);

  /* Monotônico em uReveal, que só cresce: cada respingo aparece uma vez e
     depois fica. Nada aqui volta atrás. */
  float landed = smoothstep(splat.z, splat.z + 0.12, uReveal) * act;
  float radius = splat.w * (0.55 + 0.45 * landed);
  return landed * (1.0 - smoothstep(radius * 0.42, radius, dist * wobble));
}

void main() {
  float aspect = max(uResolution.x, 1.0) / max(uResolution.y, 1.0);

  /* O domínio é normalizado pelo lado menor, não pela altura: numa tela
     estreita, dividir só pela altura deixaria uma mancha só ocupando o hero
     inteiro, e a cobertura de tinta despencava conforme a proporção. */
  highp float span = min(aspect, 1.0);
  vec4 m = mood();
  /* Um movimento de câmera por capítulo: o domínio desliza 0.35 por ato. */
  highp vec2 p = vec2(vUv.x * aspect, vUv.y - uAct * 0.35) / span;

  /* O mouse puxa o domínio inteiro para si com uma gaussiana larga: é um
     empurrão no campo, não um pincel com borda visível. */
  highp vec2 toMouse = p - vec2(uMouse.x * aspect, uMouse.y) / span;
  p -= toMouse * exp(-dot(toMouse, toMouse) * 2.4) * 0.22;

  /* O domínio anda a ~0.03 unidades/s (0.01875 rad/s sobre um raio 1.6), mas
     em círculo em vez de reto: assim ele fica limitado, o ruído nunca sai da
     faixa bem condicionada, e o campo vagueia em vez de escorrer para sempre
     numa direção só. O período fecha exatamente em ink-field.ts. */
  highp float angle = uTime * 0.01875 + m.z;
  highp vec2 drift = vec2(cos(angle), sin(angle)) * 1.6;

  /* Domain warping. É o que dá a borda de papel molhado; sem ele o fbm
     entrega nuvem, não aguada. O deslocamento é anisotrópico de propósito —
     água corre numa direção. */
  highp float warp = fbm(p * m.y - drift * 1.4) - 0.44;
  highp vec2 q = p + vec2(warp, warp * -0.7) * 0.7;

  /* Duas escalas separadas: a baixa decide ONDE tem tinta, a alta rasga a
     borda em fibra. Um fbm único nas duas funções daria estática. */
  float shape = fbm(q * 3.8 + drift);
  float fiber = fbm(q * 7.5 - drift * 0.9);
  float ink = shape + (fiber - 0.44) * 0.44;

  /* O fbm mora em torno de 0.44. O corte subiu de 0.58 para 0.66: a versão
     anterior espalhava aguada por metade da tela e o hero virava neblina atrás
     do texto. Cortando mais alto, o pigmento fica em poucas poças e o preto
     volta a ser o fundo — que é o que a paleta pede. */
  float thr = m.x;
  float wash = smoothstep(thr, thr + 0.12, ink);
  /* Só a poça mais carregada chega perto do blue-wash cheio. */
  float core = smoothstep(thr + 0.12, thr + 0.22, ink);
  /* Acúmulo de pigmento na borda da aguada: é esse anel que faz a mancha
     parecer molhada em vez de um gradiente. */
  float rim = smoothstep(thr - 0.08, thr - 0.03, ink) - smoothstep(thr - 0.03, thr + 0.08, ink);

  /* Vinheta: o hero escreve por cima, as bordas têm que cair. */
  float radial = length((vUv - 0.5) * vec2(1.06, 1.0));
  float vignette = 1.0 - smoothstep(0.10, 0.62, radial) * 0.95;

  /* A lavagem fina puxa para o cinza; mesmo a mais carregada continua
     diluída — blue-wash aqui é o teto, não a cor. */
  vec3 pigment = mix(BLUE_WASH * 0.50, BLUE_WASH * 0.92, wash) * m.w;

  vec3 color = mix(INK_950, INK_900, smoothstep(0.30, 0.62, ink));
  /* Todas as misturas caíram para cerca de metade da força. O campo é textura
     atrás de um <h1>: ele tem que ser sentido, não lido. */
  color = mix(color, pigment, wash * vignette * 0.26);
  color = mix(color, BLUE_WASH * 0.98, core * vignette * 0.07);
  color = mix(color, BLUE_WASH * 0.42, rim * vignette * 0.11);
  color = mix(color, INK_950, (1.0 - vignette) * 0.80);

  float red = splatter(vUv, aspect, SPLAT_A, actMask(0.0));
  red += splatter(vUv, aspect, SPLAT_B, actMask(0.0));
  red += splatter(vUv, aspect, SPLAT_C, actMask(0.0));
  red += splatter(vUv, aspect, SPLAT_D, actMask(4.0));
  red += splatter(vUv, aspect, SPLAT_E, actMask(2.0));
  red += splatter(vUv, aspect, SPLAT_F, actMask(5.0));
  red += splatter(vUv, aspect, SPLAT_G, actMask(3.0));
  /* A vinheta só abafa os respingos, não os apaga: um respingo na borda ainda
     precisa ser visto. */
  color = mix(color, RED_BRIGHT, clamp(red, 0.0, 1.0) * (0.5 + 0.5 * vignette));

  /* O canvas fica sobre a chapa em CSS: onde a aguada não chega, o preto é
     transparente e a chapa aparece. Alfa pré-multiplicado. */
  float alpha = clamp(wash * vignette * 0.9 + core * 0.4 + rim * 0.5 + clamp(red, 0.0, 1.0), 0.0, 1.0);
  gl_FragColor = vec4(color * alpha, alpha);
}
