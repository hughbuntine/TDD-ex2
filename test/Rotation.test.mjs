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

    test("a falling tetromino can be rotated left twice", () => {
        board.drop(Tetromino.T_SHAPE);
        board.rotateLeft();
        board.rotateLeft();

        expect(board.toString()).to.equalShape(
            `..........
             ...TTT....
             ....T.....
             ..........
             ..........
             ..........`
        );
    });

    test("a falling tetromino can be rotated right and left", () => {
        board.drop(Tetromino.T_SHAPE);
        board.rotateRight();
        board.rotateLeft();

        expect(board.toString()).to.equalShape(
            `....T.....
             ...TTT....
             ..........
             ..........
             ..........
             ..........`
        );
    });

    test("a falling tetrinome cannot be rotated beyond the board R", () => {
        board.drop(Tetromino.T_SHAPE);
        board.moveRight();
        board.moveRight();
        board.moveRight();
        board.moveRight();
        board.rotateLeft();
        board.moveRight();
        board.rotateRight();

        expect(board.toString()).to.equalShape(
            `.........T
             ........TT
             .........T
             ..........
             ..........
             ..........`
        );
    });

    test("a falling tetrinome cannot be rotated beyond the board L", () => {
        board.drop(Tetromino.T_SHAPE);
        board.moveLeft();
        board.moveLeft();
        board.moveLeft();
        board.moveLeft();
        board.rotateRight();
        board.moveLeft();
        board.rotateLeft();

        expect(board.toString()).to.equalShape(
            `T.........
             TT........
             T.........
             ..........
             ..........
             ..........`
        );
    });


});