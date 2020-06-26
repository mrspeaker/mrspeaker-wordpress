import gridShader from "./gridShader.js";

const rows = 50;
const cols = 9;

class Renderer {
  constructor(parent, imgDir) {
    const can = document.createElement("canvas");
    const w = 700;
    can.width = w;
    can.height = 190;
    parent.appendChild(can);
    [
      ["position", "absolute"],
      ["top", "80px"],
      ["left", "50%"],
      ["margin-left", -w / 2 + "px"],
    ].forEach(([k, v]) => {
      can.style[k] = v;
    });

    // TODO: check gl exists.
    const gl = can.getContext("webgl");
    this.gl = gl;
    this.initGL(gl, imgDir);
    this.lastBoard = [];
    this.canvas = can;
  }

  initGL(gl) {
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const ext = gl.getExtension("OES_vertex_array_object");
    gl.createVertexArray = ext.createVertexArrayOES.bind(ext);
    gl.bindVertexArray = ext.bindVertexArrayOES.bind(ext);

    this.objs = {
      blimps: { shader: gridShader(gl), buf: { blimps: gl.createBuffer() } },
    };

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  }
  render(game) {
    const { lastBoard, gl, objs } = this;
    const { blimps } = objs;

    let first = !game;
    game &&
      game.board.forEach((s, i) => {
        if (s !== lastBoard[i]) {
          lastBoard[i] = s;
        }
      });
    if (first) game = { board: lastBoard };

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw blimps
    gl.useProgram(blimps.shader.program);
    gl.bindBuffer(gl.ARRAY_BUFFER, blimps.buf.blimps);
    gl.enableVertexAttribArray(blimps.shader.attribs.pos);
    gl.vertexAttribPointer(blimps.shader.attribs.pos, 3, gl.FLOAT, false, 0, 0);
    gl.uniform4f(blimps.shader.uniforms.col, 0.95, 0.0, 0.72, 1);

    const verts = game.board.reduce((verts, s, i) => {
      const x = i % rows | 0;
      const y = (i / rows) | 0; // + Math.sin(Date.now() / 1000 + x * 0.1) * 0.2;
      const z = !s ? 0.75 : -Math.abs(Math.sin(Date.now() / 3000 + x * 100));
      verts.push((x / rows) * 2 - 1, (y / rows) * 4, z);
      return verts;
    }, []);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
    gl.drawArrays(gl.POINTS, 0, verts.length / 3);
  }
}
export default Renderer;
