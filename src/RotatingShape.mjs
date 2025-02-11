export class RotatingShape {
    constructor(shape = []) {
        this.shape = shape;
    }

    static fromString (shapeString) {
        const shape = new RotatingShape();
        shape.shape = shapeString.split('\n').map(row => row.trim().split(''));
        return shape;
    }

    toString () {
        return this.shape.map(row => row.join('')).join('\n') + "\n";
    }

    rotateRightHelper () {
        const rotated = new RotatingShape();
        rotated.shape = this.shape[0].map((_, i) => this.shape.map(row => row[i]).reverse());
        return rotated;
    }

    rotateLeftHelper () {
        return this.rotateRightHelper().rotateRightHelper().rotateRightHelper();
    }

    rotateRight () {
        if (this.shape.toString() === 
        `.....
        .....
        IIII.
        .....
        .....`) {
            return this.rotateLeftHelper();
        }
        else {
            return this.rotateRightHelper();
        }
        
    }

    rotateLeft () {
        return this.rotateLeftHelper();
    }
}