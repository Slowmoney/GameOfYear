import vec2 from "./vec2";

export default class vec3 extends vec2 {
    z: number;
    constructor(x: number, y: number, z: number) {
        super(x, y);
        this.z = z
    }
}
