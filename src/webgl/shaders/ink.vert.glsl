/* Quad em tela cheia.

   As posições já chegam em clip space (-1..1): nem projeção nem câmera
   entram na conta. O uv sai da própria posição. */

attribute vec2 aPosition;

/* highp: em fp16 o passo de vUv entre dois pixels vizinhos some numa tela
   grande, e o campo inteiro ganharia degrau de dois pixels. */
varying highp vec2 vUv;

void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
