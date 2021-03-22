import { Move } from "./Animation/Move.js";
import { PopUp } from "./Animation/PopUp.js";
import EventEmmiter from "./utils/eventEmmiter.js";
import vec2 from "./utils/vec2.js";
export default class Entity extends EventEmmiter {
    constructor(engine) {
        super();
        this.x = 0;
        this.y = 0;
        this.translate = new vec2(0, 0);
        this.scale = new vec2(1, 1);
        this.health = 30;
        this.armor = 15;
        this.time = 10;
        this.duration = 100;
        this.animation = new Map();
        this.engine = engine;
        this.animation.set("move", new Move(100));
        this.animation.set("popup", new PopUp(1000));
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
    anim(name, duration) {
        console.log(name, duration);
    }
}
