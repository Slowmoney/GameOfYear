import Entity from '../Entity.js';
import vec2 from '../utils/vec2.js';
export default class Sprite extends Entity {
    constructor(engine, name, image) {
        super(engine);
        this.offset = new vec2(0, 0);
        this.pos = new vec2(0, 0);
        this.frames = [];
        this.duration = 1000;
        this.time = 0;
        this.frame = 0;
        this.animated = false;
        this.size = new vec2(0, 0);
        this.image = image;
        this.name = name;
        this.width = image.width;
        this.height = image.height;
        this.aspecеRatio = image.height / image.width;
        this.size = new vec2(this.width, this.height);
        Sprite.all.set(this.name, this);
    }
    draw() {
        this.engine.ctx.drawImage(this.image, this.offset.x, this.offset.y, this.width, this.height, this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
    update(utime) {
        if (utime - this.time > this.duration) {
            this.time = utime;
            if (this.animated) {
                if (this.frame > this.frames.length) {
                    this.frame = 0;
                }
                const frame = this.frames[this.frame++];
                if (!frame)
                    return;
                this.offset.x = frame[0];
                this.offset.y = frame[1];
                this.width = frame[2];
                this.height = frame[3];
                this.size = new vec2(this.width, this.height);
            }
        }
    }
    anim(frames, duration) {
        this.animated = true;
        this.time = 0;
        this.frame = 0;
        this.frames.push(...frames);
        this.duration = duration;
    }
}
Sprite.all = new Map();
