import { Fruit } from "./fruit.js";
import { Random } from "./utils/random.js";
import { SnakeHead } from "./snake/head.js";
import { Direction } from "./utils/direction.js";
import { Settings } from "./settings.js";

export class Game {
    /** @type {HTMLCanvasElement} */ canvas = document.getElementById("game");
    /** @type {HTMLParagraphElement} */ gameScore = document.getElementById("game_score");
    /** @type {Fruit[]} */ fruitList;
    snake = new SnakeHead();
    changedDir = false;

    inGame = true;
    isPaused = false;
    score = 0;
    /** @type {Direction} */ next_dir;

    rng = new Random();
    /** @type {Settings} */ settings;

    /**
     * @param {Settings} settings The settings of the game, WIP
     */
    constructor(settings = Settings.defaultSettings) {
        this.settings = settings;
        this.fruitList = [];
        this.canvas.height = 400 - (400 % settings.tileSize);
        this.canvas.width = this.canvas.height;

        document.addEventListener("keydown", (e) => {
            if (!this.inGame) return;

            const keysIndex = Object.keys(Direction.keysToDir).indexOf(e.key);
            if (keysIndex != -1) {
                if (this.changedDir) return;
                const dir = Direction.keysToDir[e.key];
                if ((dir.x != 0) != (this.snake.direction.x != 0)) {
                    this.snake.direction = dir;
                    this.changedDir = true;
                }
            } else if (e.key == " ") {
                this.isPaused = !this.isPaused;
            }
        });
    }

    /**
     * The looping interval maintaining the game, call once to start. The game runs at 10FPS (100ms per loops).
     * @param {Game} game The game, it needs to get passed because we cannot use this with a setTimeout
     */
    // We use setTimeout and not setInterval because an interval can be delayed because of lag, setTimeout ensures there is a set time between loops
    gameInteval(game) {
        if (!game.inGame) {
            game.restart()
        } else {
            if (!game.isPaused) game.loop();
            setTimeout(game.gameInteval, 100, game);
        }
    }

    /** Sets up and starts the game */
    start() {
        this.spawnFruit();
        this.gameScore.style.display = "";
        this.gameScore.innerText = "0";
        this.gameInteval(this);
    }

    /** Resets and restarts the game */
    restart() {
        this.inGame = true;
        this.snake = new SnakeHead();
        this.fruitList = [];
        this.changedDir = false;
        this.isPaused = false;
        this.score = 0;
        this.start();
    }

    /** The main loop of the game */
    loop() {
        this.snake.move();
        this.changedDir = false;
        // if out of bounds
        if (
            this.snake.x < 0 ||
            this.snake.y < 0 ||
            this.snake.x * this.settings.tileSize >= this.canvas.width ||
            this.snake.y * this.settings.tileSize >= this.canvas.height
        ) {
            this.inGame = false;
            return;
        }

        if (this.fruitList.length == 0) {
            this.spawnFruit();
        }

        const canvasContext = this.canvas.getContext("2d");

        // clears the canvas
        canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

        let eatenFruits = [];
        // draw fruits
        for (const index in this.fruitList) {
            const fruit = this.fruitList[index];
            if (fruit.x == this.snake.x && fruit.y == this.snake.y) {
                eatenFruits.push(index);
                continue;
            }
            canvasContext.fillStyle = fruit.color;
            canvasContext.fillRect(
                fruit.x * this.settings.tileSize,
                fruit.y * this.settings.tileSize,
                this.settings.tileSize,
                this.settings.tileSize,
            );
        }

        for (const index in eatenFruits) {
            const fruitIndex = eatenFruits[index];
            const fruit = this.fruitList[fruitIndex - index];
            this.fruitList.splice(fruitIndex - index, 1);
            this.score += fruit.points;
            this.gameScore.innerText = this.score;
            this.snake.grow();
        }

        // draw segments
        for (const segment of this.snake.segments) {
            if (this.snake.x == segment.x && this.snake.y == segment.y) {
                this.inGame = false;
            }

            canvasContext.fillStyle = this.settings.bodyColors[segment.index % this.settings.bodyColors.length];
            canvasContext.fillRect(
                segment.x * this.settings.tileSize,
                segment.y * this.settings.tileSize,
                this.settings.tileSize,
                this.settings.tileSize,
            );
        }

        // draw snake
        canvasContext.fillStyle = this.settings.headColor;
        canvasContext.fillRect(
            this.snake.x * this.settings.tileSize,
            this.snake.y * this.settings.tileSize,
            this.settings.tileSize,
            this.settings.tileSize,
        );
    }

    spawnFruit(fruitIndex = -1) {
        if (fruitIndex == -1) {
            fruitIndex = this.rng.random_number(Object.keys(Fruit.fruitTypes).length);
        }

        const fruit = Object.values(Fruit.fruitTypes)[fruitIndex];
        let x = this.rng.random_number(this.settings.tileAmount);
        let y = this.rng.random_number(this.settings.tileAmount);

        for (const element of [this.snake, [...this.snake.segments]]) {
            if (element.x == x && element.y == y) {
                x -= element.direction.x;
                y -= element.direction.y;
            }
        }

        fruit.x = x;
        fruit.y = y;
        this.fruitList.push(fruit);
    }
}
