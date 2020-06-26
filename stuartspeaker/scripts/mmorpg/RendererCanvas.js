class Renderer {
  constructor(parent) {
    this.dom = document.createElement("canvas");
    this.dom.width = 100;
    this.dom.height = 40;
    parent.appendChild(this.dom);
    this.ctx = this.dom.getContext("2d");

    this.lastBoard = [];
  }
  render(game) {
    const { lastBoard } = this;
    let changed = false;
    game.board.forEach((s, i) => {
      if (s !== lastBoard[i]) {
        changed = true;
        lastBoard[i] = s;
      }
    });
    if (changed) {
      const { ctx } = this;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.fillStyle = "#a43376";
      game.board.forEach((s, i) => {
        if (!s) return;
        const y = (i / 10) | 0;
        const x = i % 10 | 0;
        const sz = ((Math.random() * 5) | 0) + 6;
        ctx.fillRect(x * 10, y * 10, sz, sz);
      });
    }
  }
}
export default Renderer;
