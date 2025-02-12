
import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";



describe("Moving tetrominoes", () => {
    let board;
    beforeEach(() => {
        board = new Board(10, 6);
    });

    test("a falling tetromino can be moved left", () => {
        board.drop(Tetromino.T_SHAPE);
        board.moveLeft();
    
        expect(board.toString()).to.equalShape(
          `...T......
           ..TTT.....
           ..........
           ..........
           ..........
           ..........`
        );
      });

    test("a falling tetromino can be moved right", () => {
        board.drop(Tetromino.T_SHAPE);
        board.moveRight();

        expect(board.toString()).to.equalShape(
           `.....T....
            ....TTT...
            ..........
            ..........
            ..........
            ..........`
        );
    });

    test("a falling tetromino can be moved down", () => {
        board.drop(Tetromino.T_SHAPE);
        board.moveDown();

        expect(board.toString()).to.equalShape(
            `..........
             ....T.....
             ...TTT....
             ..........
             ..........
             ..........`
        );
    });

});

