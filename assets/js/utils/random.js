export class Random {
    /** The seed used for the randomization @type {number} */ seed;

    constructor(seed = 0) {
        this.seed = seed > 0 ? seed : Math.random() * 2 ** 32;
    }

    /**
     * Generates a random number based on the current seed.
     * The generated number is an integer value between the given minimum (inclusive) and the given maximum (exclusive).
     * @param {number} max The max value for the random number
     * @param {number} min The min value for the random number (by default 0)
     * @returns {number}
    */
    random_number(max, min = 0) {
        this.seed |= 0;
        this.seed = (this.seed + 0x9e3779b9) | 0;
        let t = this.seed ^ (this.seed >>> 16);
        t = Math.imul(t, 0x21f0aaad);
        t = t ^ (t >>> 15);
        t = Math.imul(t, 0x735a2d97);
        return Math.floor(((t = t ^ (t >>> 15)) >>> 0) / 4294967296 * (max - min) ) + min;
    }
}
