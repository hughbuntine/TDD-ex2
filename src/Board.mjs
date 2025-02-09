export class Board {
  width;
  height;
  board;
  fallingBlockPos;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = new Array(height).fill().map(() => new Array(width).fill("."));
    this.fallingBlockPos = null
  }

  toString() {
    let result = this.board.map(row => row.join("")).join("\n")
    return result + "\n";
  }

  drop(block) {
    if (this.canDrop()) {
      this.board[0][Math.floor(this.width / 2)] = block;
      this.fallingBlockPos = {x: Math.floor(this.width / 2), y: 0};
    } 
    else {
      throw new Error("DEAD I THINK");
    }
  }

  canDrop() {
    return this.board[1][Math.floor(this.width / 2)] === ".";
  }
}
