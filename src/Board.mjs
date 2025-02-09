export class Board {
  width;
  height;
  board;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = new Array(height).fill().map(() => new Array(width).fill("."));
  }

  toString() {
    let result = this.board.map(row => row.join("")).join("\n")
    return result + "\n";
  }
}
