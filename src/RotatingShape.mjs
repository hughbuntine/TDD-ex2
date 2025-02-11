export class RotatingShape {
    shape = [[]];

    static fromString (shapeString) {
        const shape = new RotatingShape();
        shape.shape = shapeString.split('\n').map(row => row.split(''));
        return shape;
    }

    toString () {
        let returnShape = this.shape.map(row => row.join('')).join('\n').replaceAll(' ', '') + "\n";

        return returnShape;
    }
}