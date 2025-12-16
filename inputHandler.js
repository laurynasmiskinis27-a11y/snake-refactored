class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = {};
        this.setupEventListeners();
    }

    setupEventListeners() {
        if (typeof window === 'undefined') return;

        this.keyDownHandler = (e) => {
            const key = e.key;
            this.keys[key] = true;
            this.handleKeyPress(key);
        };

        this.keyUpHandler = (e) => {
            this.keys[e.key] = false;
        };

        window.addEventListener('keydown', this.keyDownHandler);
        window.addEventListener('keyup', this.keyUpHandler);
    }

    handleKeyPress(key) {
        switch (key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                this.game.snake.changeDirection('up');
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                this.game.snake.changeDirection('down');
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                this.game.snake.changeDirection('left');
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                this.game.snake.changeDirection('right');
                break;
            case ' ':
                if (this.game.gameRunning) {
                    this.game.stop();
                } else {
                    this.game.start();
                }
                break;
            case 'r':
            case 'R':
                this.game.reset();
                break;
        }
    }

    isKeyPressed(key) {
        return this.keys[key] === true;
    }

    destroy() {
        if (typeof window !== 'undefined') {
            window.removeEventListener('keydown', this.keyDownHandler);
            window.removeEventListener('keyup', this.keyUpHandler);
        }
        this.keys = {};
    }
}

// Export for Node.js and browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InputHandler;
} else {
    window.InputHandler = InputHandler;
}