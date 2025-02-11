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
        if (this.shape[0].join('') === '..I..') { // I CASE
            return this.rotateLeftHelper();
        }
        else { // DEFAULT CASE
            return this.rotateRightHelper();
        }
    }

    rotateLeft () {
        if (this.shape[2].join('') === 'IIII.') { // I CASE
            return this.rotateRightHelper();
        }
        else { // DEFAULT CASE
            return this.rotateLeftHelper();
        }
    }
}