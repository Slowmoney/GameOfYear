import EventEmmiter from "./utils/eventEmmiter.js";
export default class Entity extends EventEmmiter {
    constructor(engine) {
        super();
        this.x = 0;
        this.y = 0;
        this.health = 30;
        this.attack = 20;
        this.armor = 15;
        this.engine = engine;
    }
    setPos(x, y) {
        let prevX = this.x;
        let prevY = this.y;
        console.log(prevX, prevY);
        console.log(x, y);
        let steps = 100;
        let i = 0;
        clearInterval(this.animInterval);
        this.animInterval = setInterval(() => {
            let t = i / steps;
            this.x = prevX + t * (x - prevX);
            this.y = prevY + t * (y - prevY);
            if (++i > steps) {
                clearInterval(this.animInterval);
            }
        }, 1);
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
    action(to) {
        to;
        return true;
    }
    destroy() {
    }
}
