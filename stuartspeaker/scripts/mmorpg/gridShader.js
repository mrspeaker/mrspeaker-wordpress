import glut from "./glut.js";
const { createProgram } = glut;

const shader = (gl) =>
  createProgram(
    gl,
    `
attribute vec3 pos;
varying vec3 vpos;

void main() {
  vpos = pos;
  gl_PointSize = 11.0;//((1.0 - (vpos.z + 1.0) * 0.5) * 5.0) + 13.0;
  gl_Position = vec4(pos, 1.0);
}
`,
    `
precision mediump float;

uniform vec4 col;
varying vec3 vpos;
void main() {
  float perc = (1.0 - (vpos.z + 1.0) * 0.5);
  vec4 cout = vec4(col.rgb * perc, perc * 1.5);

  cout += vec4(0, sin(gl_FragCoord.y*100.0) * 3.0, 0, 0);
  //cout.a -= abs(pow(vpos.x, 0.9)) * 2.0;
  gl_FragColor = cout;
}
`
  );

export default shader;
