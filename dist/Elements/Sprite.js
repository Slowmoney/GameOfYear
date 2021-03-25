import Entity from '../Entity.js';
import vec2 from '../utils/vec2.js';
export default class Sprite extends Entity {
    constructor(engine, name, image) {
        super(engine);
        this.offset = new vec2(0, 0);
        this.frames = [];
        this.duration = 1000;
        this.time = 0;
        this.frame = 0;
        this.animated = false;
        this.size = new vec2(0, 0);
        this.image = image;
        this.name = name;
        this.setWidth(image.width);
        this.setHeight(image.height);
        this.aspecеRatio = image.height / image.width;
        this.size = new vec2(this.width, this.height);
        Sprite.all.set(this.name, this);
    }
    draw() {
        this.engine.ctx.stroke(this.collsionBox);
        this.engine.ctx.drawImage(this.image, this.offset.x, this.offset.y, this.size.x, this.size.y, this.x, this.y, this.width, this.height);
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
                this.size = new vec2(frame[2], frame[3]);
                this.width = frame[2];
                this.height = frame[3];
            }
        }
    }
    play(frames, duration) {
        this.animated = true;
        this.time = 0;
        this.frame = 0;
        this.frames.push(...frames);
        this.duration = duration;
    }
}
Sprite.all = new Map();
