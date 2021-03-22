import { Utils } from "./utils.js";

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
    add (v:vec2)
    {
        this.x += v.x
        this.y += v.y
        return this
    }
    clamp (min:number,max:number)
    {
        this.x = Utils.clamp(this.x, min, max)
        this.y = Utils.clamp(this.y, min, max)
        return this
    }
}
