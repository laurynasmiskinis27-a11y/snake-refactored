class Food {
    constructor() {
        this.position = { x: 0, y: 0 };
    }

    generateNewPosition(snakeBody, gridSize) {
        let pos;
        do {
            pos = {
                x: Math.floor(Math.random() * gridSize),
                y: Math.floor(Math.random() * gridSize)
            };
        } while (!this.isValidPosition(pos, snakeBody, gridSize));

        this.position = pos;
        return this.position;
    }

    isValidPosition(pos, snakeBody, gridSize) {
        if (pos.x < 0 || pos.x >= gridSize || pos.y < 0 || pos.y >= gridSize) {
            return false;
        }
        for (const segment of snakeBody) {
            if (segment.x === pos.x && segment.y === pos.y) {
                return false;
            }
        }
        return true;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Food;
} else {
    window.Food = Food;
}