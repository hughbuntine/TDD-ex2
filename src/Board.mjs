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

  drop(block) {
    if (this.canDrop()) {
      this.board[0][Math.floor(this.width / 2)] = block;
    } 
    else {
      throw new Error("DEAD I THINK");
    }
  }

  canDrop() {
    return this.board[1][Math.floor(this.width / 2)] === ".";
  }
}
