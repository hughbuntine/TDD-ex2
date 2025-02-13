import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Rotation of blocks", () => {
    let board;
    beforeEach(() => {
        board = new Board(10, 6);
    });

    test("a falling tetromino can be rotated", () => {
        board.drop(Tetromino.T_SHAPE);
        board.rotateRight();

        expect(board.toString()).to.equalShape(
            `...T......
             ...TT.....
             ...T......
             ..........
             ..........
             ..........`
        );
    });

});