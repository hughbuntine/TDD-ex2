import { RotatingShape } from "./RotatingShape.mjs";
import { Scoring } from "./Scoring.mjs";

export class Board {
  width;
  height;
  board;
  fallingBlock;
  score;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = new Array(height).fill().map(() => new Array(width).fill("."));
    this.fallingBlock = null
    this.score = new Scoring();
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
            if (block.shape[i][j] !== ".") {
              let iPlacement = i; // Adjusted row placement
              let jPlacement = Math.floor((this.width - blockSize) / 2) + j; // Adjusted column placement
              this.board[iPlacement][jPlacement] = block.shape[i][j]
            }
              
          }
      }

      // Set the block attributes
      this.fallingBlock = {xLeft: Math.floor((this.width - blockSize) / 2), yTop: 0, value: JSON.parse(JSON.stringify(block)), size: blockSize, type: this.hasChar(block.shape)};
      console.log("drop " + this.fallingBlock.type);
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
        this.moveDown();
    }
    else {
      this.clearRows();
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
    if (!this.hasFalling()) {
      console.log("no block to move down");
      return;
    }

    if (this.atBottom()){
      console.log("cannot move "+ this.fallingBlock.type + " down, at bottom");
      this.fallingBlock = null;
      return;
    }
    else if (this.onAnotherBlock()){
      console.log("cannot move "+ this.fallingBlock.type + " down, on another block");
      this.fallingBlock = null;
      return;
    }

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
  }
  
  moveLeft() {
    if (!this.hasFalling()) {
      console.log("no block to move left");
      return;
    }

    if (!this.canMoveLeft()) {
      console.log("cannot move "+ this.fallingBlock.type + " left");
      return;
    }
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
  }

  moveRight() {
    if (!this.hasFalling()) {
      console.log("no block to move right");
      return;
    }

    if (!this.canMoveRight()) {
      console.log("cannot move "+ this.fallingBlock.type + " right");
      return;
    }

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
  }

  canMoveLeft(){
    const blockSize = this.fallingBlock.size;
    const shape = this.fallingBlock.value.shape;
    
    // Loop through each row of the shape starting from the bottom row
    for (let i = blockSize - 1; i >= 0; i--) {
      for (let j = 0; j < blockSize; j++) {
        if (shape[i][j] !== '.') { // Check if this cell is part of the block
          if (j === 0 || shape[i][j - 1] === '.') { // left edge of block or a . to the left
            let cellLeft = this.board[this.fallingBlock.yTop + i][this.fallingBlock.xLeft + j - 1];
            if (cellLeft !== '.') {
              return false; // The block cannot move left
            }
          }
        }
      }
    }
    return true; // The block can move left
  }

  canMoveRight(){
    const blockSize = this.fallingBlock.size;
    const shape = this.fallingBlock.value.shape;
    
    // Loop through each row of the shape starting from the bottom row
    for (let i = blockSize - 1; i >= 0; i--) {
      for (let j = blockSize - 1; j >= 0; j--) {
        if (shape[i][j] !== '.') { // Check if this cell is part of the block
          if (j === blockSize - 1 || shape[i][j + 1] === '.') { // right edge of block or a . to the right
            let cellRight = this.board[this.fallingBlock.yTop + i][this.fallingBlock.xLeft + j + 1];
            if (cellRight !== '.') {
              return false; // The block cannot move right
            }
          }
        }
      }
    }
    return true; // The block can move right
  }

  rotateRight() {
    if (!this.hasFalling()) {
      console.log("no block to rotate right");
      return;
    }

    if (!this.canRotateRight()) {
      console.log("cannot rotate "+ this.fallingBlock.type + " right");
      return;
    }

    const blockSize = this.fallingBlock.size;
    const shape = this.fallingBlock.value.shape;
    const rotatedShape = shape[0].map((_, i) => shape.map(row => row[i]).reverse());
    
    // Loop through each row of the shape starting from the bottom row
    for (let i = blockSize - 1; i >= 0; i--) {
      for (let j = 0; j < blockSize; j++) {
        if (shape[i][j] !== '.') { // Check if this cell is part of the block
          
            // Clear the cell
            this.board[this.fallingBlock.yTop + i][this.fallingBlock.xLeft + j] = ".";
            
            // Make it rotate right
            this.board[this.fallingBlock.yTop + i][this.fallingBlock.xLeft + j] = rotatedShape[i][j];
        }
        else if (shape[i][j] === '.' && this.board[this.fallingBlock.yTop + i][this.fallingBlock.xLeft + j] === ".") {
          this.board[this.fallingBlock.yTop + i][this.fallingBlock.xLeft + j] = rotatedShape[i][j];
        }
      }
    }
    // Update the falling block's position
    this.fallingBlock.value.shape = rotatedShape;

    console.log("rotated " + this.fallingBlock.type + " right");
  }

  canRotateRight(){
    const blockSize = this.fallingBlock.size;
    const shape = this.fallingBlock.value.shape;
    const rotatedShape = shape[0].map((_, i) => shape.map(row => row[i]).reverse());

    // Loop through each row of the shape starting from the bottom row
    for (let i = blockSize - 1; i >= 0; i--) {
      for (let j = 0; j < blockSize; j++) {
        if (rotatedShape[i][j] !== '.') { // Check if this cell is part of the block
          if (shape[i][j] === '.') { // Check if this cell is part of the block
            if (this.board[this.fallingBlock.yTop + i][this.fallingBlock.xLeft + j] !== '.') { // Check if this cell is already occupied
              return false; // The block cannot rotate right
            }}
        }
      }
    }
    return true; // The block can rotate right

  }

  rotateLeft() {
    if (!this.hasFalling()) {
      console.log("no block to rotate left");
      return;
    }

    if (!this.canRotateLeft()) {
      console.log("cannot rotate "+ this.fallingBlock.type + " left");
      return;
    }

    const blockSize = this.fallingBlock.size;
    const shape = this.fallingBlock.value.shape;
    const rotatedShape1 = shape[0].map((_, i) => shape.map(row => row[i]).reverse());
    const rotatedShape2 = rotatedShape1[0].map((_, i) => rotatedShape1.map(row => row[i]).reverse());
    const rotatedShape = rotatedShape2[0].map((_, i) => rotatedShape2.map(row => row[i]).reverse()); // rotate right 3 times lol

    // Loop through each row of the shape starting from the bottom row
    for (let i = blockSize - 1; i >= 0; i--) {
      for (let j = 0; j < blockSize; j++) {
        if (shape[i][j] !== '.') { // Check if this cell is part of the block
          
            // Clear the cell
            this.board[this.fallingBlock.yTop + i][this.fallingBlock.xLeft + j] = ".";
            
            // Make it rotate left
            this.board[this.fallingBlock.yTop + i][this.fallingBlock.xLeft + j] = rotatedShape[i][j];
        }
        else if (shape[i][j] === '.' && this.board[this.fallingBlock.yTop + i][this.fallingBlock.xLeft + j] === ".") {
          this.board[this.fallingBlock.yTop + i][this.fallingBlock.xLeft + j] = rotatedShape[i][j];
        }
      }
    }
    // Update the falling block's position
    this.fallingBlock.value.shape = rotatedShape;

    console.log("rotated " + this.fallingBlock.type + " left");
  }

  canRotateLeft() {
    const blockSize = this.fallingBlock.size;
    const shape = this.fallingBlock.value.shape;
    const rotatedShape1 = shape[0].map((_, i) => shape.map(row => row[i]).reverse());
    const rotatedShape2 = rotatedShape1[0].map((_, i) => rotatedShape1.map(row => row[i]).reverse());
    const rotatedShape = rotatedShape2[0].map((_, i) => rotatedShape2.map(row => row[i]).reverse()); // rotate right 3 times lol

    // Loop through each row of the shape starting from the bottom row
    for (let i = blockSize - 1; i >= 0; i--) {
      for (let j = 0; j < blockSize; j++) {
        if (rotatedShape[i][j] !== '.') { // Check if this cell is part of the block
          if (shape[i][j] === '.') { // Check if this cell is part of the block
            if (this.board[this.fallingBlock.yTop + i][this.fallingBlock.xLeft + j] !== '.') { // Check if this cell is already occupied
              return false; // The block cannot rotate left
            }}
        }
      }
    }
    return true; // The block can rotate left
  }

  clearRows(){
    let rowsCleared = 0;
    for (let i = 0; i < this.height; i++) {
      if (this.board[i].every(cell => cell !== ".")) {
        this.board.splice(i, 1);
        this.board.unshift(new Array(this.width).fill("."));
        rowsCleared++;
      }
    }
    if (rowsCleared > 0) {
      console.log("cleared " + rowsCleared + " rows");
    }
    this.score.updateScore(rowsCleared);
    return rowsCleared;
  }
}
