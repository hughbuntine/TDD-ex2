import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { ShuffleBag } from "../src/ShuffleBag.mjs";



describe("Rotation of blocks", () => {
    let bag;
    let possibilities = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
    beforeEach(() => {
        bag = new ShuffleBag();
    });

    test("get a string when i draw" , () => {
        let draw = bag.getNext();
        expect(draw).to.be.a('string');
    });

    test("get a string when i draw" , () => {
        let draw = bag.getNext();
        expect(possibilities).to.include(draw);
    });

});