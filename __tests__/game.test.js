const Game = require('../game');

describe('Game Class', () => {
    let game;

    beforeEach(() => {
        const mockCanvas = {
            width: 400,
            height: 400,
            getContext: jest.fn(() => ({
                fillStyle: '',
                strokeStyle: '',
                fillRect: jest.fn(),
                strokeRect: jest.fn()
            }))
        };
        
        document.getElementById = jest.fn(() => mockCanvas);
        
        game = new Game('gameCanvas');
        
    });

    test('should initialize with default values', () => {
        expect(game.gridSize).toBe(20);
        expect(game.cellSize).toBe(20);
        expect(game.score).toBe(0);
        expect(game.gameRunning).toBe(false);
        expect(game.snake).toBeDefined();
        expect(game.food).toBeDefined();
        expect(game.inputHandler).toBeDefined();
    });

    test('should update score when snake eats food', () => {
        game.food.position = {x: 11, y: 10}; 
        
        const initialScore = game.score;
        
        game.frameCount++;
        game.snake.move();
        
        if (game.snake.eatFood(game.food.position)) {
            game.score++;
        }
        
        expect(game.score).toBe(initialScore + 1);
    });

    test('should end game when collided', () => {
        game.snake.body = [{x: -1, y: -1}];
        
        const originalGameOver = game.gameOver;
        game.gameOver = jest.fn();
        
        game.frameCount = 0;
        
        game.frameCount++;
        game.snake.move();
        
        if (game.snake.checkCollision(game.gridSize, game.gridSize)) {
            game.gameOver();
        }
        
        expect(game.gameOver).toHaveBeenCalled();
        
        game.gameOver = originalGameOver;
    });

    test('should start the game', () => {
        game.start();
        expect(game.gameRunning).toBe(true);
    });

    test('should not stop the game if started', () => {
        game.gameRunning = true;
        game.start();
        expect(game.gameRunning).toBe(true);
    });

    test('should stop the game', () => {
        game.gameRunning = true;
        game.stop();
        expect(game.gameRunning).toBe(false);
    });

    test('should reset the game', () => {
        game.score = 10;
        game.gameRunning = true;
        game.snake.body = [{x: 100, y: 100}];
        
        const originalReset = game.snake.reset;
        game.snake.reset = jest.fn();
        
        game.reset();
        
        expect(game.snake.reset).toHaveBeenCalled();
        expect(game.score).toBe(0);
        expect(game.gameRunning).toBe(false);
        
        game.snake.reset = originalReset;
    });
});