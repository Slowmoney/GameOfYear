export default class vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
}
