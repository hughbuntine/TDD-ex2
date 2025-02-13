import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function dropToBottom(board) {
    board.tick();
    board.tick();
    board.tick();
    board.tick();
    board.tick();
    board.tick();
    board.tick();

};

describe("Rotation of blocks", () => {
    let board;
    beforeEach(() => {
        board = new Board(9, 6);
    });

    test("when a line is full, it clears" , () => {
        board.drop(Tetromino.T_SHAPE);
        dropToBottom(board);
        board.drop(Tetromino.T_SHAPE);
        board.moveLeft();
        board.moveLeft();
        board.moveLeft();
        dropToBottom(board);
        board.drop(Tetromino.T_SHAPE);
        board.moveRight();
        board.moveRight();
        board.moveRight();
        dropToBottom(board);

        expect(board.toString()).to.equalShape(
            `.........
             .........
             .........
             .........
             .........
             .T..T..T.`
          );
    });

    test("clears 2 lines at once" , () => {
        
        board.drop(Tetromino.T_SHAPE);
        board.moveLeft();
        board.moveLeft();
        dropToBottom(board);
        console.log(board.toString());

        board.drop(Tetromino.T_SHAPE);
        board.moveRight();
        board.moveRight();
        board.moveRight();
        dropToBottom(board);
        console.log(board.toString());

        board.drop(Tetromino.T_SHAPE);
        board.rotateRight();
        board.moveLeft();
        board.moveLeft();
        board.moveLeft();
        board.moveLeft();
        dropToBottom(board);
        console.log(board.toString());

        board.drop(Tetromino.T_SHAPE);
        board.rotateRight();
        board.moveRight();
        dropToBottom(board);
        console.log(board.toString());

        board.drop(Tetromino.T_SHAPE);
        board.rotateLeft();
        board.moveRight();
        board.moveRight();
        board.moveRight();
        board.moveRight();
        dropToBottom(board);
        console.log(board.toString());

        board.drop(Tetromino.T_SHAPE);
        board.rotateLeft();
        dropToBottom(board);
        console.log(board.toString());
       

        expect(board.toString()).to.equalShape(
            `.........
             .........
             .........
             .........
             ........T
             T...TT.TT`
          );
    });

});