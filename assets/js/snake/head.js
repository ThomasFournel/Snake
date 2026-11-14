import { Direction } from "../utils/direction.js";
import { SnakeSegment } from "./segments.js";

export class SnakeHead {
    /** The X coordinate @type {number} */ x = 3;
    /** The Y coordinate @type {number} */ y;
    /** The direction of the Snake @type {Direction} */ direction = Direction.right;
    /** The list of Segments @type {SnakeSegment[]} */ segments = []

    constructor() {
        this.segments = [
            new SnakeSegment(2, 0, Direction.right, 1),
            new SnakeSegment(1, 0, Direction.right, 2)
        ];
    }

    /** Moves the Snake's Head and all its Segments */
    move() {
        this.x += this.direction.x;
        this.y += this.direction.y;

        for (let segmentIndex = this.segments.length - 1; segmentIndex >= 0; segmentIndex--) {
            const previous = segmentIndex - 1 < 0 ? this : this.segments[segmentIndex - 1];
            this.segments[segmentIndex].move(previous.direction);
        }
    }

    /** Grows the Snake by adding a new Segment */
    grow() {
        const lastSegment = this.segments[this.segments.length - 1] ?? this;
        this.segments.push(
            new SnakeSegment(
                lastSegment.x - lastSegment.direction.x,
                lastSegment.y - lastSegment.direction.y,
                lastSegment.direction,
                this.segments.length + 1,
            ),
        );
    }
}
