import { Utils } from "./utils.js";
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
    clamp(min, max) {
        this.x = Utils.clamp(this.x, min, max);
        this.y = Utils.clamp(this.y, min, max);
        return this;
    }
}
