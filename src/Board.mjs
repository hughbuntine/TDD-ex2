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
      this.fallingBlock = {x: Math.floor(this.width / 2), y: 0, value: block};
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
      if (this.fallingBlock.y === this.height - 1) { // reached the bottom
        this.fallingBlock = null;
      }
      else { // move down
        this.board[this.fallingBlock.y][this.fallingBlock.x] = ".";
        this.fallingBlock.y += 1;
        this.board[this.fallingBlock.y][this.fallingBlock.x] = this.fallingBlock.value;
      }
    }
  }

  hasFalling() {
    return this.fallingBlock !== null;
  }
}
