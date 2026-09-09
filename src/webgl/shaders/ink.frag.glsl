/* Campo de luz.

   Antes isto era nanquim: um fbm cortado alto (limiar 0.66) que juntava
   pigmento em poucas poças, mais sete respingos vermelhos constantes. O corte
   agressivo dava borda de papel molhado, e a borda mais o respingo davam
   mancha orgânica com sangue no meio. Não era o efeito pretendido.

   O ruído ficou — é ele que dá o volume e a deriva. O que mudou é o modelo:
   em vez de cortar alto e MISTURAR pigmento escuro sobre preto, o corte é
   baixo, a curva é larga e a cor é SOMADA. Nuvem de luz atravessada por uma
   câmera lenta, não tinta assentando no papel.

   O grão fica por conta do overlay de ruído que Base.astro já joga sobre a
   página inteira; um dither aqui seria a mesma textura duas vezes. */

precision mediump float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
/* Capítulo atual, contínuo: 2.4 é "entre o terceiro e o quarto". Suavizado
   em JS, para a luz mudar de temperatura sem pular. */
uniform float uAct;
uniform float uReveal;

/* highp: com o default em mediump (fp16 no mobile), vUv não distingue dois
   pixels vizinhos numa tela grande e o campo ganha degrau. */
varying highp vec2 vUv;

/* O arco de temperaturas — os mesmos seis humores de src/lib/plates.ts, que
   desenha a chapa parada por baixo deste canvas. As duas TÊM que concordar:
   sem WebGL só a chapa aparece, e com WebGL a luz é a mesma se movendo. O ato
   6 volta para perto do azul do ato 1, para o arco fechar sem corte.

   Já em sRGB e rebaixadas: isto é atmosfera atrás de um <h1>. GLSL ES 1.0 não
   indexa const array com índice dinâmico de forma confiável, daí a cadeia. */
vec3 actColor(float act) {
  if (act < 0.5) return vec3(0.373, 0.525, 0.741); /* azul-aço */
  if (act < 1.5) return vec3(0.302, 0.561, 0.627); /* ciano-petróleo */
  if (act < 2.5) return vec3(0.341, 0.565, 0.498); /* sálvia fria */
  if (act < 3.5) return vec3(0.659, 0.514, 0.306); /* âmbar baixo */
  if (act < 4.5) return vec3(0.561, 0.384, 0.584); /* violeta-magenta */
  if (act < 5.5) return vec3(0.424, 0.451, 0.678); /* violeta-azul */
  return vec3(0.373, 0.525, 0.741);                /* fecha no ato 1 */
}

/* A forma de cada ato: (escala do warp, deslocamento do drift, intensidade).
   Só a geometria da luz muda aqui — a cor vem de actColor. */
vec3 actShape(float act) {
  if (act < 0.5) return vec3(2.1, 0.0, 1.00);
  if (act < 1.5) return vec3(2.4, 1.0, 0.92);
  if (act < 2.5) return vec3(1.6, 2.0, 1.05);
  if (act < 3.5) return vec3(2.8, 3.0, 0.88);
  if (act < 4.5) return vec3(3.2, 4.0, 0.96);
  if (act < 5.5) return vec3(2.0, 5.0, 0.84);
  return vec3(1.8, 6.0, 0.90);
}

/* Rotação entre as oitavas: sem ela o fbm alinha o detalhe aos eixos e o
   campo ganha cara de xadrez. */
const highp mat2 OCTAVE = mat2(0.8776, 0.4794, -0.4794, 0.8776);

/* O branco quente da paleta (--color-paper), para o núcleo mais aceso. A luz
   satura para o branco, não para mais cor — é assim que ela lê como luz. */
const vec3 PAPER = vec3(0.9608, 0.9608, 0.9529);

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

void main() {
  float aspect = max(uResolution.x, 1.0) / max(uResolution.y, 1.0);

  /* O domínio é normalizado pelo lado menor, não pela altura: numa tela
     estreita, dividir só pela altura deixaria uma nuvem só ocupando o hero
     inteiro, e a cobertura de luz despencava conforme a proporção. */
  highp float span = min(aspect, 1.0);

  float base = floor(uAct);
  float blend = fract(uAct);
  vec3 tint = mix(actColor(base), actColor(base + 1.0), blend);
  vec3 shape = mix(actShape(base), actShape(base + 1.0), blend);

  /* Um movimento de câmera por capítulo: o domínio desliza 0.35 por ato. */
  highp vec2 p = vec2(vUv.x * aspect, vUv.y - uAct * 0.35) / span;

  /* O mouse puxa o domínio inteiro para si com uma gaussiana larga: é um
     empurrão no campo, não um pincel com borda visível. */
  highp vec2 toMouse = p - vec2(uMouse.x * aspect, uMouse.y) / span;
  p -= toMouse * exp(-dot(toMouse, toMouse) * 2.4) * 0.22;

  /* O domínio anda a ~0.03 unidades/s (0.01875 rad/s sobre um raio 1.6), mas
     em círculo em vez de reto: assim ele fica limitado, o ruído nunca sai da
     faixa bem condicionada, e o campo vagueia em vez de escorrer para sempre
     numa direção só. O período fecha exatamente em stage.ts. */
  highp float angle = uTime * 0.01875 + shape.y;
  highp vec2 drift = vec2(cos(angle), sin(angle)) * 1.6;

  /* Domain warping. Aqui ele não faz mais borda de papel molhado — com o
     corte baixo, o que ele dá é a torção interna da nuvem, o sinal de que a
     luz tem volume e não é um gradiente radial. */
  highp float warp = fbm(p * shape.x - drift * 1.4) - 0.44;
  highp vec2 q = p + vec2(warp, warp * -0.7) * 0.7;

  /* Duas escalas separadas: a baixa decide ONDE a luz se acumula, a alta dá a
     granulação interna. Um fbm único nas duas funções daria estática. */
  float body = fbm(q * 3.4 + drift);
  float detail = fbm(q * 7.5 - drift * 0.9);
  float field = body + (detail - 0.44) * 0.30;

  /* O fbm mora em torno de 0.44. O corte era 0.66, alto o bastante para
     deixar só poças isoladas de pigmento — cada poça com borda, e borda é o
     que fazia a mancha. Cortando em 0.34 com uma rampa larga (0.34 → 0.72), a
     luz cobre boa parte da tela em intensidade baixa e não tem contorno em
     lugar nenhum. É a diferença entre névoa e mancha. */
  float glow = smoothstep(0.34, 0.72, field);
  /* O núcleo: onde a névoa é mais densa ela satura para o branco quente. */
  float core = smoothstep(0.60, 0.86, field);

  /* Vinheta. Mais aberta que a antiga (que caía 0.95 e fechava a tela num
     túnel): um campo de luz precisa alcançar a borda, senão vira holofote. */
  float radial = length((vUv - 0.5) * vec2(1.06, 1.0));
  float vignette = 1.0 - smoothstep(0.28, 0.92, radial) * 0.62;

  /* Luz é aditiva. O campo antigo misturava pigmento sobre um preto e o
     resultado era sempre mais escuro que o fundo; aqui a cor SOMA, e é isso
     que faz o fundo acender em vez de sujar. */
  vec3 color = tint * glow * shape.z * vignette * 0.95;
  color += PAPER * core * vignette * 0.14;

  /* uReveal é o acender geral da cena, uma vez só, quando o gate libera. */
  float reveal = smoothstep(0.0, 1.0, uReveal);

  /* O canvas fica sobre a chapa em CSS: onde a luz não chega, o preto é
     transparente e a chapa aparece. Alfa pré-multiplicado — e como a cor já
     nasce multiplicada pela intensidade, o alfa é só a cobertura. */
  float alpha = clamp(glow * vignette * 0.82 + core * 0.30, 0.0, 1.0) * reveal;
  gl_FragColor = vec4(color * reveal, alpha);
}
