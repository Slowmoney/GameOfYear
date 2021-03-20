import EventEmmiter from "./utils/eventEmmiter.js";
export default class Entity extends EventEmmiter {
    constructor(engine) {
        super();
        this.x = 0;
        this.y = 0;
        this.engine = engine;
    }
    setPos(x, y) {
        //console.log('setPos');
        this.x = x;
        this.y = y;
    }
    getPos() {
        return { x: this.x, y: this.y };
    }
    getWidth() {
        return this.width;
    }
    setWidth(width) {
        this.width = width;
    }
    getHeight() {
        return this.height;
    }
    setHeight(height) {
        this.height = height;
    }
}
