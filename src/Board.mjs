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
      this.fallingBlock = {xLeft: Math.floor((this.width - blockSize) / 2), yTop: 0, value: block, size: blockSize, type: this.hasChar(block.shape)};
      console.log("drop " + this.fallingBlock.type);
      console.log(this.toString());
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
      if (this.atBottom()) { // reached the bottom
        console.log(this.fallingBlock.type + " reached the bottom");
        this.fallingBlock = null;
        console.log(this.toString());
      }
      else if (this.onAnotherBlock()) { // reached another block
        console.log(this.fallingBlock.type + " reached another block");
        this.fallingBlock = null;
        console.log(this.toString());
      }
      else { // move down
        this.moveDown();
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

  atBottom() {
    const blockSize = this.fallingBlock.size;
    const shape = this.fallingBlock.value.shape;
    
    // Loop through each row of the shape starting from the bottom row
    for (let i = blockSize - 1; i >= 0; i--) {
      for (let j = 0; j < blockSize; j++) {
        if (shape[i][j] !== '.') { // Check if this cell is part of the block
          // Check if this cell is in the last row or if the row below it is out of bounds
          const boardRow = this.fallingBlock.yTop + i + 1;
          if (boardRow >= this.height) {
            return true; // The block is at the bottom
          }
        }
      }
    }
    return false; // The block can still move down
  }
  
  onAnotherBlock() {
    const blockSize = this.fallingBlock.size;
    const shape = this.fallingBlock.value.shape;
    
    // Loop through each row of the shape starting from the bottom row
    for (let i = blockSize - 1; i >= 0; i--) {
      for (let j = 0; j < blockSize; j++) {
        if (shape[i][j] !== '.') { // Check if this cell is part of the block
          if (i >= blockSize - 1 || shape[i + 1][j] === '.') { // bottom of block or a . under it
            let cellBelow = this.board[this.fallingBlock.yTop + i + 1][this.fallingBlock.xLeft + j];
            if (cellBelow !== '.') {
              return true; // The block is on another block
            }
          }
        }
      }
    }
    return false; // The block can still move down
  }

  moveDown() {
    const blockSize = this.fallingBlock.size;
    const shape = this.fallingBlock.value.shape;
    
    // Loop through each row of the shape starting from the bottom row
    for (let i = blockSize - 1; i >= 0; i--) {
      for (let j = 0; j < blockSize; j++) {
        if (shape[i][j] !== '.') { // Check if this cell is part of the block
          
          // Clear the cell
          this.board[this.fallingBlock.yTop + i][this.fallingBlock.xLeft + j] = ".";
          
          // Move the cell down
          this.board[this.fallingBlock.yTop + i + 1][this.fallingBlock.xLeft + j] = shape[i][j];
        }
      }
    }
    // Update the falling block's position
    this.fallingBlock.yTop++;

    console.log(this.fallingBlock.type + " moved down");
    console.log(this.toString());
  }
  
  moveLeft() {
    const blockSize = this.fallingBlock.size;
    const shape = this.fallingBlock.value.shape;
    
    // Loop through each row of the shape starting from the bottom row
    for (let i = blockSize - 1; i >= 0; i--) {
      for (let j = 0; j < blockSize; j++) {
        if (shape[i][j] !== '.') { // Check if this cell is part of the block
          
          // Clear the cell
          this.board[this.fallingBlock.yTop + i][this.fallingBlock.xLeft + j] = ".";
          
          // Move the cell left
          this.board[this.fallingBlock.yTop + i][this.fallingBlock.xLeft + j - 1] = shape[i][j];
        }
      }
    }
    // Update the falling block's position
    this.fallingBlock.xLeft--;

    console.log("move " + this.fallingBlock.type + " left");
    console.log(this.toString());
  }

  moveRight() {
    const blockSize = this.fallingBlock.size;
    const shape = this.fallingBlock.value.shape;
    
    // Loop through each row of the shape starting from the bottom row
    for (let i = blockSize - 1; i >= 0; i--) {
      for (let j = blockSize - 1; j >= 0; j--) {
        if (shape[i][j] !== '.') { // Check if this cell is part of the block
          
          // Clear the cell
          this.board[this.fallingBlock.yTop + i][this.fallingBlock.xLeft + j] = ".";
          
          // Move the cell right
          this.board[this.fallingBlock.yTop + i][this.fallingBlock.xLeft + j + 1] = shape[i][j];
        }
      }
    }
    // Update the falling block's position
    this.fallingBlock.xLeft++;

    console.log("move " + this.fallingBlock.type + " right");
    console.log(this.toString());
  }
}
