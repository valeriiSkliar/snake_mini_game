import {Snake} from './Snake.js';
import {Food} from './Food.js';

class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    speed: number;
    snake: Snake;
    food: Food;
    isPaused: boolean;
    score: number;
    highScore: number;
    gameOver: boolean;
    private baseSpeed = 200;
    private maxSpeed = 50;
    private speedIncrement = 5;
    private lastFrameTime = 0;
    private readonly frameInterval = 100 / 12;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.gameOver = false;
        // @ts-ignore
        this.ctx = canvas.getContext('2d');
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.isPaused = false;
        this.speed = 0;
        this.score = 0;
        this.highScore = this.loadHighScore();
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.snake = new Snake(15, this.canvas.clientWidth, this.canvas.clientHeight);
        this.food = new Food(this.canvas.clientWidth, this.canvas.clientHeight);
        this.loadGameState();
        this.loop(this.lastFrameTime);
        this.initEventListeners();
    }

    pause() {
        this.isPaused = !this.isPaused;
        if (this.isPaused) {
            this.saveGameState();
        } else {
            this.loadGameState();
        }
    }
    saveHighScore(score: number) {
        localStorage.setItem('highScore', JSON.stringify(score));
    }

    loadHighScore() {
        const highScoreStr = localStorage.getItem('highScore');
        return highScoreStr ? JSON.parse(highScoreStr) : 0;
    }
    saveGameState() {
        const gameState = {
            snake: this.snake.serialize(),
            food: this.food.serialize(),
            score: this.score,
        };
        localStorage.setItem('gameState', JSON.stringify(gameState));
    }
    updateHighScore() {
        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.saveHighScore(this.highScore);
        }
    }
    loadGameState() {
        const gameStateStr = localStorage.getItem('gameState');
        if (gameStateStr) {
            const gameState = JSON.parse(gameStateStr);
            this.snake.deserialize(gameState.snake);
            this.food.deserialize(gameState.food);
            this.score = gameState.score;
        }
    }

    clearGameState() {
        localStorage.removeItem('gameState');
    }
    getSpeed() {
        const speed = this.baseSpeed - (this.snake.sessionScore * this.speedIncrement);
        return Math.max(speed, this.maxSpeed);
    }
    loop(timestamp: number) {
        if (!this.isPaused) {
            const elapsed = timestamp - this.lastFrameTime;
            if (elapsed > this.getSpeed()) {
                this.lastFrameTime = timestamp - (elapsed % this.getSpeed());

                this.update();
                this.render();
            }
        }
        requestAnimationFrame((ts) => this.loop(ts));
    }

    update() {
        if (this.gameOver) return;
        this.score = this.snake.sessionScore;
        this.snake.update();
        if (this.snake.collidesWith(this.food.x, this.food.y, this.food.size)) {
            this.snake.grow();
            this.food.update();
        }
        if (this.snake.collidesWithSelf){
            this.gameOver = true;
            this.pause();
        }
        this.updateHighScore();
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.snake.draw(this.ctx);
        this.food.render(this.ctx);
        this.ctx.fillStyle = "#000";
        this.ctx.font = "24px Arial";
        this.ctx.fillText(`Score: ${this.score}`, 10, 30);
        this.ctx.fillText(`High Score: ${this.highScore}`, 10, 60);
        if (this.gameOver) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = "#000";
            this.ctx.font = "24px Arial";
            this.ctx.fillText(
                `Press 'N' to start a new game or 'Escape' to exit the main game`,
                10,
                this.canvas.height / 2
            );
        }
    }

    initEventListeners() {
        window.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.code === 'Space') {
                this.pause();
            } else if (event.key === 'n' && this.gameOver) {
                this.clearGameState();
                this.snake.reset(15, this.canvas.clientWidth, this.canvas.clientHeight);
                this.food.update();
                this.score = 0;
                this.gameOver = this.snake.collidesWithSelf = false;
                this.pause();
            }else if (event.code === 'Escape'){
                // pluggable exit functionality to the main game
            } else {
                this.snake.update(event);
            }
        });
    }
}

export {Game};
