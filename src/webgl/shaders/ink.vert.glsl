/* Quad em tela cheia.

   As posições do PlaneGeometry(2, 2) já chegam em clip space (-1..1), então
   nem projectionMatrix nem modelViewMatrix entram na conta: a câmera existe
   só porque renderer.render() exige uma. */

/* highp: em fp16 o passo de vUv entre dois pixels vizinhos some numa tela
   grande, e o campo inteiro ganharia degrau de dois pixels. */
varying highp vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
