export class Board {
  width;
  height;
  window;
  hasFallingBlock;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.window = new Array(this.height).fill(null).map(() => new Array(this.width).fill("."));
    this.hasFallingBlock = false;
  }

  toString() {
    let result = "";
    for (let row of this.window) {
      result += row.join("") + "\n";
    }

    return result;
  }

  drop(block) {
    if (!this.hasFalling()){this.window[0][Math.floor(this.width / 2)] = block; this.hasFallingBlock = true;} // If there is nothing falling, drop the block
    else {throw new Error("already falling");} // If there is something falling, throw an error
  }

  tick() {
    for (let row = this.height - 1; row >= 0; row--) {
      for (let col = 0; col < this.width; col++) {
        if (row === 0) {this.window[row][col] = "."; continue;} // top row, fresh ......
        this.window[row][col] = this.window[row - 1][col]; // move down
      }
    }
  }

  hasFalling() {
    return this.hasFallingBlock;
  }
}
