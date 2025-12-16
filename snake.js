class Snake {
    constructor() {
        this.reset();
    }

    reset() {
        this.body = [
            { x: 10, y: 10 },
            { x: 9, y: 10 },
            { x: 8, y: 10 }
        ];
        this.direction = 'right';
        this.nextDirection = 'right';
        this.grow = false;
    }

    move() {
        const opposites = { up: 'down', down: 'up', left: 'right', right: 'left' };
        if (this.nextDirection !== opposites[this.direction]) {
            this.direction = this.nextDirection;
        }

        const head = { ...this.body[0] };

        switch (this.direction) {
            case 'up':    head.y -= 1; break;
            case 'down':  head.y += 1; break;
            case 'left':  head.x -= 1; break;
            case 'right': head.x += 1; break;
        }

        this.body.unshift(head);

        if (!this.grow) {
            this.body.pop();
        } else {
            this.grow = false;
        }
    }

    changeDirection(newDirection) {
        if (['up', 'down', 'left', 'right'].includes(newDirection)) {
            this.nextDirection = newDirection;
        }
    }

    checkCollision(width, height) {
        const head = this.body[0];

        if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height) {
            return true;
        }

        for (let i = 1; i < this.body.length; i++) {
            if (head.x === this.body[i].x && head.y === this.body[i].y) {
                return true;
            }
        }

        return false;
    }

    eatFood(food) {
        const head = this.body[0];
        if (head.x === food.x && head.y === food.y) {
            this.grow = true;
            return true;
        }
        return false;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Snake;
} else {
    window.Snake = Snake;
}