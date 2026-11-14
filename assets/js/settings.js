export class Settings {

    static defaultSettings = new Settings("#00FF00", ["#00A000", "#008000"], 20)

    /** The color of the snake's head @type {String} */ headColor;
    /** A list of possible colors for the snake's body @type {String[]} */ bodyColors;
    /** The amount of tiles in a row/column @type {number} */ tileAmount;
    /** The size of a tile in the canvas @type {number} */ tileSize;

    /**
     * @param {String} headColor The color of the snake's head
     * @param {String[]} bodyColors A list of possible colors for the snake's body
     * @param {number} tileAmount The amount of tiles in a row/column
     */
    constructor(headColor, bodyColors, tileAmount) {
        this.headColor = headColor;
        this.bodyColors = bodyColors;
        this.tileAmount = tileAmount;
        this.tileSize = Math.floor(400/tileAmount);
    }
}