import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Rotation of blocks", () => {
    let board;
    beforeEach(() => {
        board = new Board(10, 6);
    });

    test("a falling tetromino can be rotated right", () => {
        board.drop(Tetromino.T_SHAPE);
        board.rotateRight();

        expect(board.toString()).to.equalShape(
            `....T.....
             ....TT....
             ....T.....
             ..........
             ..........
             ..........`
        );
    });

    test("a falling tetromino can be rotated right twice", () => {
        board.drop(Tetromino.T_SHAPE);
        board.rotateRight();
        board.rotateRight();

        expect(board.toString()).to.equalShape(
            `..........
             ...TTT....
             ....T.....
             ..........
             ..........
             ..........`
        );
    });

    test("a falling tetromino can be rotated left", () => {
        board.drop(Tetromino.T_SHAPE);
        board.rotateLeft();

        expect(board.toString()).to.equalShape(
            `....T.....
             ...TT.....
             ....T.....
             ..........
             ..........
             ..........`
        );
    });


});