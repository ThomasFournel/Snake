import { Direction } from "../utils/direction.js";

export class SnakeSegment {
    /** The X coordinate @type {number} */ x;
    /** The Y coordinate @type {number} */ y;
    /** The direction of the Segment @type {Direction} */ direction = Direction.right;
    /** The index of the Segment inside the list of segments @type {number} */ index = 0;

    constructor(x, y, direction, index) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.index = index;
    }

    /**
     * Moves the Segment and all its Segments
     * @param {Direction} previous_dir - The direction of the previous Segment
     */
    move(previous_dir) {
        this.x += this.direction.x;
        this.y += this.direction.y;

        this.direction = previous_dir;
    }
}
