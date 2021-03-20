import Entity from '../Entity.js';
import { IAnimated, IContainer, IElement, IEngine } from '../types';
import vec2 from '../utils/vec2.js';
import Sprite from './Sprite.js';

export default class Card extends Entity implements IElement, IContainer, IAnimated
{
    width: number;
    height: number;
    engine: IEngine;
    offset: vec2 = new vec2(0, 0);
    hide: boolean = false;
    pos: vec2 = new vec2(0, 0);
    backGround: Sprite;
    time: number = 0;
    duration: number = 100;
    counter = 0;
    health = 0
    attack = 0
    armor = 0
    constructor(engine: IEngine, size: vec2);
    constructor(engine: IEngine, width: number | vec2, height?: number)
    {
        super(engine);
        if (typeof width == "number") this.width = width;
        if (typeof height == "number") this.height = height;
        if (typeof width == "object")
        {
            this.width = width.x;
            this.height = width.y;
        }
        this.loadBackGround();
    }
    draw ()
    {
        this.engine.ctx.save()
        if (!this.hide)
        {

            //health circle stat
            const radius = 10

            const healthPos = new vec2(this.x + this.offset.x + this.width - radius / 2, this.y + this.offset.y + this.height - radius)
            this.engine.ctx.beginPath();
            this.engine.ctx.fillStyle = "#f44336"
            this.engine.ctx.arc(healthPos.x, healthPos.y, radius, 0, 2 * Math.PI);
            this.engine.ctx.fill()
            this.engine.ctx.fillStyle = "#eee"
            this.engine.ctx.textAlign = "center"
            this.engine.ctx.fillText(this.health + "", healthPos.x, healthPos.y + 4)

            //attack circle stat
            const attckPos = new vec2(this.x + this.offset.x + radius, this.y + this.offset.y + this.height - radius)
            this.engine.ctx.beginPath();
            this.engine.ctx.fillStyle = "#9e9e9e"
            this.engine.ctx.arc(attckPos.x, attckPos.y, radius, 0, 2 * Math.PI);
            this.engine.ctx.fill()

            this.engine.ctx.fillStyle = "#555"
            this.engine.ctx.textAlign = "center"
            this.engine.ctx.fillText(this.attack + "", attckPos.x, attckPos.y + 4)

            //armor circle stat
            const armorPos = new vec2(this.x + this.offset.x + this.width, this.y + this.offset.y+5)
            this.engine.ctx.fillText(this.armor + "", armorPos.x, armorPos.y + 4)

        }
        //this.engine.ctx.translate(100-(this.width/2*this.counter), 0);
        //this.engine.ctx.scale(this.counter,1);

        this.backGround && this.drawBackGround();
        this.engine.ctx.restore()
    }
    update (utime: number)
    {
        if (this.backGround) this.backGround.update(utime);

        if (utime - this.time > this.duration)
        {
            this.time = utime;
            this.counter += 1;
            if (this.counter >= 100)
            {
                this.counter = -1
            }
        }
    }
    drawBackGround ()
    {
        this.backGround.pos.x = this.offset.x;
        this.backGround.pos.y = this.offset.y;
        this.backGround.draw();
    }
    loadBackGround ()
    {
        if (!this.backGround)
        {
            const frames: [sx: number, sy: number, w: number, h: number][] = [];
            frames.push([0, 295, 32, 32]);
            frames.push([32, 295, 34, 32]);
            frames.push([65, 295, 32, 31]);
            frames.push([96, 295, 32, 32]);
            frames.push([125, 295, 32, 32]);
            frames.push([156, 295, 34, 32]);
            frames.push([190, 295, 32, 32]);
            frames.push([223, 295, 31, 32]);
            frames.push([253, 295, 32, 32]);
            this.backGround = Sprite.all.get('mega');
            this.backGround.anim(frames, 88);
        }
    }
    anim (name: string, duration: number)
    {
        console.log(name, duration);
    }
}
