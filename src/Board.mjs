export class Board {
  width;
  height;
  window;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.window = new Array(this.height).fill(null).map(() => new Array(this.width).fill("."));
  }

  toString() {
    let result = "";
    for (let row of this.window) {
      result += row.join("") + "\n";
    }

    return result;
  }

  drop(block) {
    this.window[0][Math.floor(this.width / 2)] = block;
  }
}
