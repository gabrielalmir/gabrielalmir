/**
 * WebGL cru, o mínimo que o palco precisa.
 *
 * O palco é um quad em tela cheia e uma nuvem de pontos: dois programas,
 * dois buffers, meia dúzia de uniforms. O three.js fazia isso com 131 KB de
 * bundle; estas ~100 linhas fazem o mesmo, e como o palco agora fica na tela
 * a visita inteira, o custo de subir o módulo importa.
 */

export type Program = {
  program: WebGLProgram;
  uniform(name: string): WebGLUniformLocation | null;
  attribute(name: string): number;
};

function compile(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('[gl] sem shader');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader) ?? '';
    gl.deleteShader(shader);
    throw new Error(`[gl] shader não compilou: ${log}`);
  }
  return shader;
}

export function createProgram(
  gl: WebGLRenderingContext,
  vertexSource: string,
  fragmentSource: string,
): Program {
  const vertex = compile(gl, gl.VERTEX_SHADER, vertexSource);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  if (!program) throw new Error('[gl] sem programa');

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  // Os shaders já estão no programa; soltar os objetos libera o handle.
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program) ?? '';
    gl.deleteProgram(program);
    throw new Error(`[gl] programa não linkou: ${log}`);
  }

  const uniforms = new Map<string, WebGLUniformLocation | null>();
  const attributes = new Map<string, number>();

  return {
    program,
    uniform(name) {
      if (!uniforms.has(name)) uniforms.set(name, gl.getUniformLocation(program, name));
      return uniforms.get(name) ?? null;
    },
    attribute(name) {
      if (!attributes.has(name)) attributes.set(name, gl.getAttribLocation(program, name));
      return attributes.get(name) ?? -1;
    },
  };
}

/** Um buffer estático de floats, já preenchido. */
export function createBuffer(gl: WebGLRenderingContext, data: Float32Array): WebGLBuffer {
  const buffer = gl.createBuffer();
  if (!buffer) throw new Error('[gl] sem buffer');
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  return buffer;
}

/** Dois triângulos cobrindo o clip space inteiro. */
export const QUAD = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);

export function getContext(canvas: HTMLCanvasElement): WebGLRenderingContext | null {
  const options: WebGLContextAttributes = {
    alpha: true,
    // É um quad e pontos macios: não há aresta para o MSAA suavizar.
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: 'low-power',
    premultipliedAlpha: true,
  };
  return (
    (canvas.getContext('webgl2', options) as WebGLRenderingContext | null) ??
    (canvas.getContext('webgl', options) as WebGLRenderingContext | null)
  );
}
