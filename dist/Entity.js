import { Anim } from "./Animation/Animation.js";
import EventEmmiter from "./utils/eventEmmiter.js";
export default class Entity extends EventEmmiter {
    constructor(engine) {
        super();
        this.x = 0;
        this.y = 0;
        this.health = 30;
        this.attack = 20;
        this.armor = 15;
        this.time = 10;
        this.duration = 100;
        this.animation = new Anim(100);
        this.engine = engine;
    }
    setPos(x, y) {
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
