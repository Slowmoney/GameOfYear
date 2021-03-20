import Entity from '../Entity.js';
import { IContainer, IElement, IEngine } from '../types';
import vec2 from '../utils/vec2.js';

export default class Sprite extends Entity implements IElement, IContainer {
    image: ImageBitmap | HTMLImageElement;
    offset: vec2 = new vec2(0, 0);
    hide: boolean;
    width: number;
    height: number;
    pos: vec2 = new vec2(0, 0);
    name: string;
    static all = new Map<string, Sprite>();
    frames: [sx: number, sy: number, w: number, h: number][] = [];
    duration: number = 1000;
    time: number = 0;
    frame: number = 0;
    animated: boolean = false;
    size = new vec2(0,0)
    aspecеRatio: number;
    constructor(engine: IEngine, name: string, image: ImageBitmap | HTMLImageElement) {
        super(engine);
        this.image = image;
        this.name = name;
        this.width = image.width;
        this.height = image.height;
        this.aspecеRatio = image.height/image.width
        this.size = new vec2(this.width,this.height)
        Sprite.all.set(this.name, this);
    }
    draw ()
    {
        this.engine.ctx.drawImage(this.image, this.offset.x, this.offset.y, this.width, this.height, this.pos.x, this.pos.y,this.size.x,this.size.y);
    }
    update(utime: number) {
        if (utime - this.time > this.duration) {
            this.time = utime;
            if (this.animated) {
                if (this.frame > this.frames.length) {
                    this.frame = 0;
                }
                const frame = this.frames[this.frame++];
                if (!frame) return;
                this.offset.x = frame[0];
                this.offset.y = frame[1];
                this.width = frame[2];
                this.height = frame[3];
                this.size = new vec2(this.width,this.height)
            }
        }
    }
    anim(frames: [sx: number, sy: number, w: number, h: number][], duration: number) {
        this.animated = true;
        this.time = 0;
        this.frame = 0;
        this.frames.push(...frames);
        this.duration = duration;
    }
}
