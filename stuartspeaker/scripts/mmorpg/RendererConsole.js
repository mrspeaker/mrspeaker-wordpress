class Renderer {
  constructor() {
    this.lastBoard = [];
  }
  render(game) {
    const { lastBoard } = this;
    let changed = false;
    game.board.forEach((s, i) => {
      if (s !== lastBoard[i]) changed = true;
      lastBoard[i] = s;
    });
    if (changed) console.log(game.board.map(s => (s ? "X" : "_")).join(""));
  }
}
export default Renderer;
