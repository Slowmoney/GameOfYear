import Entity from '../Entity.js';
import { IAnimated, IContainer, IElement, IEngine } from '../types';
import vec2 from '../utils/vec2.js';
import Sprite from './Sprite.js';

export default class Player extends Entity implements IElement, IAnimated
{
    name = "Player"
    width: number;
    height: number;
    engine: IEngine;
    hide: boolean = false;
    backGround: Sprite
    time: number = 0;
    counter = 99;

    health = 130
    card: Path2D = new Path2D()

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
        //this.card.rect(this.x, this.y, this.width, this.height)
        this.loadBackGround();
        /* this.engine.on('mousemove', this.mousemove.bind(this)) */
        this.click = this.click.bind(this)
        this.engine.on("click", this.click)
    }
    draw ()
    {
        this.engine.ctx.save()
        if (!this.hide)
        {
            //this.card.rect(this.x + this.offset.x, this.y + this.offset.y, this.width, this.height)
            this.engine.ctx.stroke(this.card)

            this.engine.ctx.beginPath();
            const healthSprite = Sprite.all.get('health')
            healthSprite.offset.x = 0
            healthSprite.offset.y = 0
            healthSprite.setWidth(254)
            healthSprite.setHeight(254)
            healthSprite.size = new vec2(24, 24)
            healthSprite.setPos(this.x + this.width - healthSprite.size.x, this.y + this.height - healthSprite.size.y)
            healthSprite.draw()

            this.engine.ctx.fillStyle = "#fff"
            this.engine.ctx.textAlign = "center"
            this.engine.ctx.fillText(this.health + "", this.x + this.width - healthSprite.size.x / 2, this.y + this.height - healthSprite.size.y / 2 + 2)

            this.engine.ctx.closePath();


            //attck circle stat
            /*             this.engine.ctx.beginPath();
                        const swordSprite = Sprite.all.get('swords')
                        swordSprite.offset.x = 0
                        swordSprite.offset.y = 0
                        swordSprite.setWidth(24)
                        swordSprite.setHeight(24)
                        swordSprite.size = new vec2(24, 24)
                        swordSprite.setPos(this.x,this.y+this.height-swordSprite.size.y-10)
                        swordSprite.draw()
                        this.engine.ctx.fillStyle = "#000"
                        this.engine.ctx.textAlign = "center"
                        this.engine.ctx.fillText(this.attack + "",this.x+swordSprite.size.x/3,this.y+this.height)
                        this.engine.ctx.closePath(); */

            //armor circle stat
            const armorPos = new vec2(this.x + this.width, this.y)
            this.engine.ctx.beginPath();
            const shieldSprite = Sprite.all.get('shield')
            shieldSprite.offset.x = 0
            shieldSprite.offset.y = 0
            shieldSprite.setWidth(24)
            shieldSprite.setHeight(24)
            shieldSprite.size = new vec2(24, 24)
            shieldSprite.setPos(this.x + this.width - shieldSprite.getWidth(), this.y)
            shieldSprite.draw()

            this.engine.ctx.fillStyle = "#fff"
            this.engine.ctx.textAlign = "center"
            this.engine.ctx.fillText(this.armor + "", armorPos.x - shieldSprite.size.x / 2, armorPos.y + shieldSprite.size.y / 2 + 3)

            const playerSprite = Sprite.all.get('poo')
            playerSprite.draw();
            this.engine.ctx.closePath();

            playerSprite.size.x = 9 * 10 - 30
            playerSprite.size.y = playerSprite.aspecеRatio * playerSprite.size.x


            playerSprite.setPos((this.x) + (this.width - playerSprite.size.x) / 2, this.y + 30)
        }
        //this.engine.ctx.translate(100-(this.width/2*this.counter), 0);
        //this.engine.ctx.scale(this.counter,1);

        this.backGround && this.drawBackGround();
        this.engine.ctx.restore()
    }
    update (utime: number)
    {
        if (this.backGround) this.backGround.update(utime);
        this.card = new Path2D()
        this.card.rect(this.x, this.y, this.width, this.height)
        this.animation.render(this, utime)
        if (utime - this.time > this.duration)
        {

            this.time = utime;
            this.counter += 1;
            if (this.counter >= 100)
            {


                this.card = new Path2D()
                this.card.rect(this.x, this.y, this.width, this.height)
                this.counter = -1
            }
        }
    }
    protected drawBackGround ()
    {
        this.backGround.setPos(this.x, this.y)
        this.backGround.draw();
    }
    protected loadBackGround ()
    {
        if (!this.backGround)
        {
            /*             const frames: [sx: number, sy: number, w: number, h: number][] = [];
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
                        this.backGround.anim(frames, 88); */
        }
    }
    protected anim (name: string, duration: number)
    {
        console.log(name, duration);
    }
    protected click (e: MouseEvent)
    {
        if (this.engine.ctx.isPointInPath(this.card, e.offsetX, e.offsetY)) this.emit('click', this)
    }
    protected mousemove (e: MouseEvent)
    {
        e;
        //this.hide = this.engine.ctx.isPointInPath(this.card, e.offsetX, e.offsetY)
    }
    action (to: Entity)
    {
        if (!to) return true

        let tempAttack = this.health + this.armor

        let tempHealth = to.health
        let tempArmor = to.armor

        to.armor -= tempAttack
        tempAttack = to.armor < 0 ? Math.abs(to.armor) : 0
        if (to.armor < 0) to.armor = 0
        to.health -= tempAttack
        if (to.health < 0)
        {
            to.health = 0
            to.destroy()
        }

        tempAttack = tempHealth+tempArmor

        this.armor -= tempAttack
        tempAttack = this.armor < 0 ? Math.abs(this.armor) : 0
        if (this.armor < 0) this.armor = 0
        this.health -= tempAttack
        if (this.health < 0)
        {
            this.health = 0
            this.destroy()
        }

        if (to.health > 0 || this.health <= 0) return false




        return true
    }
    destroy ()
    {
        this.engine.off("click", this.click)

    }
}
