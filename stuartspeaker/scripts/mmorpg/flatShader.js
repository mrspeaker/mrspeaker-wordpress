import glut from "./glut.js";
const { createProgram } = glut;

const flatShader = (gl) =>
  createProgram(
    gl,
    `
attribute vec3 pos;
attribute vec2 uv;
varying vec2 vuv;

void main() {
  vuv = uv;
  gl_Position = vec4(pos, 1.0);
}
`,
    `
precision mediump float;

uniform sampler2D tex;
varying vec2 vuv;
void main() {
  vec4 tx = texture2D(tex, vuv);
  if (tx.a < 0.1) discard;
  gl_FragColor = vec4(tx.xyz, 1);
}
`
  );

export default flatShader;
