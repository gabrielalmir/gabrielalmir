precision mediump float;

varying float vAlpha;
varying float vRed;

/* Os mesmos hex de src/styles/global.css. */
const vec3 BLUE_WASH = vec3(0.6824, 0.7373, 0.7843);
const vec3 RED_BRIGHT = vec3(1.0000, 0.4784, 0.4431);

void main() {
  /* Disco macio: o pigmento não tem borda. */
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float disc = 1.0 - smoothstep(0.35, 1.0, d);
  float alpha = disc * vAlpha;
  vec3 color = mix(BLUE_WASH, RED_BRIGHT, vRed);
  /* Alfa pré-multiplicado: o canvas é composto assim sobre a chapa. */
  gl_FragColor = vec4(color * alpha, alpha);
}
