import vec3 from './vec3';

export default class vec4 extends vec3 {
    w: number;
    constructor(x: number, y: number, z: number, w:number) {
        super(x, y, z);
        this.w = w;
    }
}
