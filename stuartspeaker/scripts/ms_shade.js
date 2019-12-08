export const vss = `
attribute vec2 pos;
attribute vec2 uvs;
uniform float time;
varying vec2 uv;
void main() {
  uv = pos;
  gl_PointSize = 10.0;
  gl_Position = vec4(pos.x + sin(time/2.0) * 0.1, pos.y, 0, 1.0);
}
`;

export const fss = `
precision highp float;
varying vec2 uv;
uniform float time;
uniform sampler2D tex;

void main() {
  float c = sin(gl_FragCoord.x) + 1.5;
  if (c < 1.0) discard;
  gl_FragColor = vec4(c, c, c, 1.0);
}
`;
