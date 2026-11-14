
export class Direction {
    static right = { x: 1, y: 0 };
    static left = { x: -1, y: 0 };
    static down = { x: 0, y: 1 };
    static up = { x: 0, y: -1 };

    static keysToDir = {
        ArrowUp: this.up,
        ArrowDown: this.down,
        ArrowLeft: this.left,
        ArrowRight: this.right
    };
}