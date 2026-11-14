export class Fruit {
    /** List of possible Fruit */
    static fruitTypes = {
        apple: new Fruit(1, "#FF0000"),
        orange: new Fruit(1, "#FF7F00"),
    };

    /** Number of point the Fruit gives @type {number} */ points;
    /** The color of the fruit @type {String} */ color;
    /** The X coordinate @type {number} */ x;
    /** The Y coordinate @type {number} */ y;

    /**
     * @param {number} points The number of points the fruit gives
     * @param {String} color The color of the fruit
     */
    constructor(points, color) {
        this.points = points;
        this.color = color;
        this.x = 0;
        this.y = 0;
    }
}
