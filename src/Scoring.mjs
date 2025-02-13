export class Scoring {
    currentScore;

    constructor() {
        this.currentScore = 0;
    }

    getScore() {
        return this.currentScore;
    }

    updateScore(linesCleared) {
        this.currentScore += this.calculateScore(linesCleared);
    }

    calculateScore(linesCleared) {
        switch (linesCleared) {
            case 1:
                return 40;
            case 2:
                return 100;
            case 3:
                return 300;
            case 4:
                return 1200;
            default:
                return 0;
        }
    }
}