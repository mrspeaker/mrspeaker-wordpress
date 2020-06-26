import Game from "./Game.js";
import Renderer from "./Renderer.js";
import RendererConsole from "./RendererConsole.js";
import RendererCanvas from "./RendererCanvas.js";
import RendererWebGL from "./RendererWebGL.js";

window.addEventListener("load", init);

function init(canvasNode) {
  const renderer = new Renderer(canvasNode);
  const rendererConsole = new RendererConsole();
  const rendererCanvas = new RendererCanvas(document.body);
  const rendererWebGL = new RendererWebGL(
    document.querySelector("header"),
    "./"
  );

  function testSend(dom) {
    dom.style.border = "1px solid Salmon";
    dom.addEventListener(
      "mousedown",
      (e) => {
        const rows = 9;
        const cols = 50;

        const { layerX, layerY } = e;
        const xp = layerX / dom.width;
        const yp = layerY / dom.height;
        const x = (xp * (cols + 1)) | 0;
        let y = ((yp * (rows + 10)) | 0) - 3;

        console.log(x, y);
        if (x >= 0 && y >= 0 && x <= cols - 1 && y <= cols - 1) {
          window.send({ type: "flip", value: y * cols + x });
        }
      },
      false
    );
  }
  testSend(rendererWebGL.canvas);

  const game = new Game();
  const state = {
    game,
    renderer: rendererWebGL,
  };
  requestAnimationFrame((t) => tick(t, state));
}

function tick(t, state) {
  const { renderer, game } = state;
  //game.update(state, t);
  renderer.render(game);
  requestAnimationFrame((t) => tick(t, state));
}
