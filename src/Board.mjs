export class Board {
  width;
  height;
  board;
  fallingBlock;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = new Array(height).fill().map(() => new Array(width).fill("."));
    this.fallingBlock = null
  }

  toString() {
    let result = this.board.map(row => row.join("")).join("\n")
    return result + "\n";
  }

  drop(block) {
    if (this.canDrop()) {
      this.board[0][Math.floor(this.width / 2)] = block;
      this.fallingBlock = {xLeft: Math.floor(this.width / 2), yBot: 0, value: block};
    } 
    else {
      throw new Error("already falling");
    }
  }

  canDrop() {
    return !this.hasFalling();
  }

  tick() {
    if (this.hasFalling()) {
      if (this.fallingBlock.yBot === this.height - 1) { // reached the bottom
        this.fallingBlock = null;
      }
      else if (this.board[this.fallingBlock.yBot + 1][this.fallingBlock.xLeft] !== ".") { // reached another block
        this.fallingBlock = null;
      }
      else { // move down
        this.board[this.fallingBlock.yBot][this.fallingBlock.xLeft] = ".";
        this.fallingBlock.yBot += 1;
        this.board[this.fallingBlock.yBot][this.fallingBlock.xLeft] = this.fallingBlock.value;
      }
    }
  }

  hasFalling() {
    return this.fallingBlock !== null;
  }
}
