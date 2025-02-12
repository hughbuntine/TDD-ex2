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
      this.fallingBlock = {xLeft: Math.floor((this.width - blockSize) / 2), yBot: blockSize - 1, value: block, size: blockSize, type: this.hasChar(block.shape)};
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
        console.log("reached the bottom");
        this.fallingBlock = null;
      }
      
      else if (this.board[this.fallingBlock.yBot + 1][this.fallingBlock.xLeft] !== ".") { // reached another block
        console.log("reached another block");
        this.fallingBlock = null;
      }
      else { // move down
        console.log("trying to move down");
    
       
    }
    
    }
  }

  hasFalling() {
    return this.fallingBlock !== null;
  }

  hasChar(shape){
    for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape.length; j++) {
            if (shape[i][j] !== ".") {
                return shape[i][j];
            }
        }
    }
    return false;
  }
}
