import vec2 from "./vec2";
export default class vec3 extends vec2 {
    constructor(x, y, z) {
        super(x, y);
        this.z = z;
    }
}
