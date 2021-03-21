export default class vec2 {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    sub (v:vec2)
    {
        this.x -= v.x
        this.y -= v.y
        return this
    }
}
