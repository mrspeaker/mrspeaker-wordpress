import { fss, vss } from "./ms_shade.js";
import main from "./mmorpg/main.js";

const parent = "#placeToBe";
const h = 377;

window.addEventListener("load", init, false);

async function init() {
  const state = { color: [1, 1, 1] };
  const gl = create(document.querySelector(parent));

  const imgs = await loadImgs();
  const glState = await loadShaders(gl, imgs);
  if (!glState.program) {
    return;
  }

  if (window.$) {
    // Removes mr man header
    $("h1:first").addClass("blur_me"); //css("filter", "blur(4px)");
    /*   $("h1:first").fadeOut("slow", () => {
      $("h1:first").css("background-image", "none");
      $("h1:first").fadeIn();
    });*/
  }

  requestAnimationFrame(t => tick(t, glState, state));
}

function tick(t, gl, state) {
  update(state, t);
  render(gl, state);
  requestAnimationFrame(t => tick(t, gl, state));
}

function create(parent) {
  const resize = (el, gl) => {
    el.width = window.innerWidth;
    el.height = h;
    gl.viewport(0, 0, el.width, el.height);
  };

  const can = document.createElement("canvas");
  const c = can.getContext("webgl");

  can.style.position = "absolute";
  can.style.top = "0px";
  can.style.left = "0px";
  can.style.width = "100%";

  (parent || document.body).appendChild(can);
  window.addEventListener("resize", () => resize(can, c), false);
  resize(can, c);
  return c;
}

function update(state, t) {
  if (Math.random() < 0.1) {
    state.color[0] = Math.random() + 0.8;
    state.color[1] = Math.random() + 0.8;
    state.color[2] = Math.random() + 0.8;
  }
  state.time = t;
}

function render(glState, state) {
  const {
    gl,
    uniforms: { time }
  } = glState;
  gl.uniform1f(time, state.time / 1000);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

async function loadShaders(gl) {
  const load = (src, type) =>
    new Promise((res, rej) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (gl.getShaderInfoLog(s)) {
        rej(gl.getShaderInfoLog(s));
      }
      res(s);
    });

  return Promise.all([
    load(vss, gl.VERTEX_SHADER),
    load(fss, gl.FRAGMENT_SHADER)
  ])
    .then(([vs, fs]) => {
      const p = gl.createProgram();
      gl.attachShader(p, vs);
      gl.attachShader(p, fs);
      gl.linkProgram(p);
      gl.useProgram(p);

      return getGLState(gl, p);
    })
    .catch(console.error);
}

function getGLState(gl, p) {
  const time = gl.getUniformLocation(p, "time");
  const pos = gl.getAttribLocation(p, "pos");

  const b = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, b);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([0, 0.1, -0.1, -0.1, 0.1, -0.1]),
    gl.STATIC_DRAW
  );

  gl.enableVertexAttribArray(pos);
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

  return {
    gl,
    program: p,
    uniforms: { time },
    attribs: { pos },
    buffers: { b }
  };
}

async function loadImgs() {
  const imgs = [{ name: "tree", src: "/images/tree2.png" }];
  return Promise.all(
    imgs.map(
      ({ name, src }) =>
        new Promise((res, rej) => {
          const img = new Image();
          img.src = src;
          img.addEventListener("load", () => res({ name, src, img }));
          img.addEventListener("error", rej);
        })
    )
  )
    .then(imgs =>
      imgs.reduce((ac, el) => {
        ac[el.name] = el.img;
        return ac;
      }, {})
    )
    .catch(console.error);
}
