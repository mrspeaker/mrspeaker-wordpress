const listen = (url, onMessage) => {
  const ws = new WebSocket(`wss://${url}`, "echo-protocol");
  const send = (msg) => ws.send(JSON.stringify(msg));
  ws.onmessage = (e) => onMessage(JSON.parse(e.data));
  ws.onopen = () => {};
  return send;
};

function genBoard() {
  return [...Array(25 * 9)].map(() => false);
}

class Game {
  constructor(onBoardChange) {
    const send = listen("waterskiordie.com/ws/", (msg) => this.handleMsg(msg));
    this.send = send;
    window.send = send;
    this.board = genBoard();
    this.state = "init";
    this.onBoardChange = onBoardChange;
  }
  handleMsg(msg) {
    const { type, value } = msg;
    if (!type) return;
    switch (type) {
      case "init":
        this.updateBoard(value);
        break;
      case "flip":
        this.updateBoard(value);
        break;
      default:
        console.log("rec:", msg);
    }
  }
  updateBoard(newBoard) {
    const { board, onBoardChange } = this;
    let changed = false;
    newBoard.forEach((v, i) => {
      if (board[i] !== v) {
        board[i] = v;
        changed = true;
      }
    });
    changed && onBoardChange && onBoardChange(board);
  }
}

export default Game;
