import { RotatingShape } from "./RotatingShape.mjs";

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

      // Convert the block to a RotatingShape if it is a string
      if (typeof block === "string"){
          block = RotatingShape.fromString(block);
      }

      const blockSize = block.shape.length;

      // Place the block
      for (let i = 0; i < blockSize; i++) {
          for (let j = 0; j < blockSize; j++){
              let iPlacement = i; // Adjusted row placement
              let jPlacement = Math.floor((this.width - blockSize) / 2) + j; // Adjusted column placement
              this.board[iPlacement][jPlacement] = block.shape[i][j]
          }
      }

      // Set the block attributes
      this.fallingBlock = {xLeft: Math.floor((this.width - blockSize) / 2), yBot: blockSize - 1, value: block, size: blockSize};
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
        this.board[this.fallingBlock.yBot][this.fallingBlock.xLeft] = this.fallingBlock.value.shape[this.fallingBlock.size - 1][0];
      }
    }
  }

  hasFalling() {
    return this.fallingBlock !== null;
  }
}
