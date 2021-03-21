import Entity from '../Entity.js';
import vec2 from '../utils/vec2.js';
import Sprite from './Sprite.js';
export default class Player extends Entity {
    constructor(engine, width, height) {
        super(engine);
        this.name = "Player";
        this.hide = false;
        this.time = 0;
        this.duration = 100;
        this.counter = 99;
        this.attack = 40;
        this.health = 130;
        this.card = new Path2D();
        if (typeof width == "number")
            this.width = width;
        if (typeof height == "number")
            this.height = height;
        if (typeof width == "object") {
            this.width = width.x;
            this.height = width.y;
        }
        //this.card.rect(this.x, this.y, this.width, this.height)
        this.loadBackGround();
        /* this.engine.on('mousemove', this.mousemove.bind(this)) */
        this.click = this.click.bind(this);
        this.engine.on("click", this.click);
    }
    draw() {
        this.engine.ctx.save();
        if (!this.hide) {
            //this.card.rect(this.x + this.offset.x, this.y + this.offset.y, this.width, this.height)
            this.engine.ctx.stroke(this.card);
            //health circle stat
            const radius = 10;
            const healthPos = new vec2(this.x + this.width - radius, this.y + this.height - radius);
            this.engine.ctx.beginPath();
            this.engine.ctx.fillStyle = "#f44336";
            this.engine.ctx.arc(healthPos.x, healthPos.y, radius, 0, 2 * Math.PI);
            this.engine.ctx.fill();
            this.engine.ctx.fillStyle = "#eee";
            this.engine.ctx.textAlign = "center";
            this.engine.ctx.fillText(this.health + "", healthPos.x, healthPos.y + 4);
            //attack circle stat
            const attackPos = new vec2(this.x + radius, this.y + this.height - radius);
            this.engine.ctx.beginPath();
            this.engine.ctx.fillStyle = "#9e9e9e";
            this.engine.ctx.arc(attackPos.x, attackPos.y, radius, 0, 2 * Math.PI);
            this.engine.ctx.fill();
            this.engine.ctx.fillStyle = "#555";
            this.engine.ctx.textAlign = "center";
            this.engine.ctx.fillText(this.attack + "", attackPos.x, attackPos.y + 4);
            //armor circle stat
            const armorPos = new vec2(this.x + this.width - 10, this.y + 10);
            this.engine.ctx.fillText(this.armor + "", armorPos.x, armorPos.y);
            const playerSprite = Sprite.all.get('poo');
            playerSprite.draw();
            playerSprite.pos.y = this.y + 30;
            playerSprite.size.x = 9 * 10 - 30;
            playerSprite.size.y = playerSprite.aspecеRatio * playerSprite.size.x;
            playerSprite.pos.x = (this.x) + (this.width - playerSprite.size.x) / 2;
        }
        //this.engine.ctx.translate(100-(this.width/2*this.counter), 0);
        //this.engine.ctx.scale(this.counter,1);
        this.backGround && this.drawBackGround();
        this.engine.ctx.restore();
    }
    update(utime) {
        if (this.backGround)
            this.backGround.update(utime);
        if (utime - this.time > this.duration) {
            this.card = new Path2D();
            this.card.rect(this.x, this.y, this.width, this.height);
            this.time = utime;
            this.counter += 1;
            if (this.counter >= 100) {
                this.card = new Path2D();
                this.card.rect(this.x, this.y, this.width, this.height);
                this.counter = -1;
            }
        }
    }
    drawBackGround() {
        this.backGround.pos.x = this.x;
        this.backGround.pos.y = this.y;
        this.backGround.draw();
    }
    loadBackGround() {
        if (!this.backGround) {
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
    anim(name, duration) {
        console.log(name, duration);
    }
    click(e) {
        if (this.engine.ctx.isPointInPath(this.card, e.offsetX, e.offsetY))
            this.emit('click', this);
    }
    mousemove(e) {
        e;
        //this.hide = this.engine.ctx.isPointInPath(this.card, e.offsetX, e.offsetY)
    }
    action(to) {
        if (!to)
            return true;
        let tempAttack = this.attack;
        to.armor -= tempAttack;
        tempAttack = to.armor < 0 ? Math.abs(to.armor) : 0;
        if (to.armor < 0)
            to.armor = 0;
        to.health -= tempAttack;
        if (to.health < 0) {
            to.health = 0;
            to.destroy();
        }
        tempAttack = to.attack;
        this.armor -= tempAttack;
        tempAttack = this.armor < 0 ? Math.abs(this.armor) : 0;
        if (this.armor < 0)
            this.armor = 0;
        this.health -= tempAttack;
        if (this.health < 0) {
            this.health = 0;
            this.destroy();
        }
        if (to.health > 0 || this.health <= 0)
            return false;
        return true;
    }
    destroy() {
        this.engine.off("click", this.click);
    }
}
