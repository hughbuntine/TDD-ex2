export class ShuffleBag {
    bag;

    constructor(){
        this.bag = ['I', 'J', 'L', 'O', 'S', 'T', 'Z', 'I', 'J', 'L', 'O', 'S', 'T', 'Z', 'I', 'J', 'L', 'O', 'S', 'T', 'Z', 'I', 'J', 'L', 'O', 'S', 'T', 'Z'];
    }

    getNext(){
        if (this.bag.length === 0) {
            this.bag = ['I', 'J', 'L', 'O', 'S', 'T', 'Z', 'I', 'J', 'L', 'O', 'S', 'T', 'Z', 'I', 'J', 'L', 'O', 'S', 'T', 'Z', 'I', 'J', 'L', 'O', 'S', 'T', 'Z'];
        }
        this.shuffle();
        return this.bag.pop();
        
    }   

    shuffle(){
        for (let i = this.bag.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.bag[i], this.bag[j]] = [this.bag[j], this.bag[i]];
        }
    }
}