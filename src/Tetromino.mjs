import { RotatingShape } from './RotatingShape.mjs';

export class Tetromino {
    static T_SHAPE = RotatingShape.fromString(
        `.T.
         TTT
         ...`
    );

    static I_SHAPE = RotatingShape.fromString(
        `.....
         .....
         IIII.
         .....
         .....`
    );

    static O_SHAPE = RotatingShape.fromString(
        `.OO
         .OO
         ...`
    );  

    rotateRight () {
        return this;
    }

    rotateLeft () {
        return this.rotateLeftHelper();
    }
}
