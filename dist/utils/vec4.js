import vec3 from './vec3';
export default class vec4 extends vec3 {
    constructor(x, y, z, w) {
        super(x, y, z);
        this.w = w;
    }
}
