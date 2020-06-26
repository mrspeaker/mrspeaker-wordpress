import Game from "./mmorpg/Game.js";
import Renderer from "./mmorpg/RendererWebGL.js";

window.addEventListener("load", init, false);

async function init() {
  const state = {};
  const dom = document.querySelector("header");
  const renderer = new Renderer(dom, "/stuartspeaker/scripts/mmorpg/");
  dom.style.border = "1px solid red";
  console.log(renderer);
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

      if (x >= 0 && y >= 0 && x <= cols - 1 && y <= cols - 1) {
        window.send({ type: "flip", value: y * cols + x });
      }
    },
    false
  );

  window.dump = () => console.log(state.game.board);

  const game = new Game();
  state.renderer = renderer;
  state.game = game;
  requestAnimationFrame((t) => tick(t, state));
}

function tick(t, state) {
  state.renderer.render(state.game);
  requestAnimationFrame((t) => tick(t, state));
}
