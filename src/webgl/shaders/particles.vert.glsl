/* Motas de pigmento.

   Uma nuvem de pontos numa caixa 2×2×6 que a "câmera" atravessa devagar:
   um pouco a cada quadro, uma tela inteira a cada capítulo. A profundidade
   dá o tamanho e o alfa do ponto; o mouse desloca os planos próximos mais
   que os distantes — é o único parallax do site. */

precision highp float;

attribute vec3 aPosition;
/* x: seed 0..1 para tamanho e fase; y: 1.0 quando o ponto é terracota. */
attribute vec2 aSeed;

uniform float uTime;
uniform float uAct;
uniform vec2 uMouse;
uniform float uAspect;
uniform float uPixelRatio;

varying float vAlpha;
varying float vRed;

const float DEPTH = 6.0;

void main() {
  /* A câmera avança: capítulo e tempo somados. O `mod` recicla o ponto que
     ficou para trás lá na frente, sem nunca redistribuir. */
  float camera = uAct * 0.8 + uTime * 0.02;
  float depth = mod(aPosition.z - camera, DEPTH);

  /* Deriva lateral lenta por ponto, para a nuvem não parecer congelada. */
  vec2 drift = vec2(
    sin(uTime * 0.11 + aSeed.x * 6.283) * 0.05,
    cos(uTime * 0.09 + aSeed.x * 4.1) * 0.04
  );

  /* Parallax: o mouse empurra o plano próximo mais que o longe. */
  vec2 parallax = (uMouse - 0.5) * 0.12 * (1.0 - depth / DEPTH);

  float scale = 1.0 / (0.45 + depth * 0.55);
  vec2 position = (aPosition.xy + drift - parallax) * scale;
  position.x /= uAspect;

  gl_Position = vec4(position, 0.0, 1.0);

  float near = 1.0 - depth / DEPTH;
  gl_PointSize = (1.5 + 5.0 * near * (0.5 + aSeed.x)) * uPixelRatio;

  /* Entra e sai suave nas duas pontas da caixa: sem isto o ponto reciclado
     estala na frente da câmera. */
  float fade = smoothstep(0.0, 0.6, depth) * (1.0 - smoothstep(DEPTH - 1.5, DEPTH, depth));
  vAlpha = fade * (0.10 + 0.22 * near);
  vRed = aSeed.y;
}
