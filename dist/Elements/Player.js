import { Formula } from '../Animation/Formula.js';
import Entity from '../Entity.js';
import vec2 from '../utils/vec2.js';
import Sprite from './Sprite.js';
export default class Player extends Entity {
    constructor(engine, width, height) {
        super(engine);
        this.name = 'Player';
        this.hide = false;
        this.time = 0;
        this.counter = 99;
        this.health = 140;
        this.card = new Path2D();
        if (typeof width == 'number')
            this.width = width;
        if (typeof height == 'number')
            this.height = height;
        if (typeof width == 'object') {
            this.width = width.x;
            this.height = width.y;
        }
        //this.card.rect(this.x, this.y, this.width, this.height)
        this.loadBackGround();
        /* this.engine.on('mousemove', this.mousemove.bind(this)) */
        this.click = this.click.bind(this);
        this.engine.on('click', this.click);
        this.animation.get("move").setTimingFunc((t) => Formula.ease(t));
    }
    draw() {
        this.engine.ctx.save();
        if (!this.hide) {
            //this.engine.ctx.scale(this.scale.x, this.scale.y)
            //this.card.rect(this.x + this.offset.x, this.y + this.offset.y, this.width, this.height)
            this.engine.ctx.stroke(this.card);
            this.engine.ctx.beginPath();
            const healthSprite = Sprite.all.get('health');
            healthSprite.offset.x = 0;
            healthSprite.offset.y = 0;
            healthSprite.setWidth(24);
            healthSprite.setHeight(24);
            healthSprite.size = new vec2(254, 254);
            healthSprite.setPos(this.x + this.getWidth() - healthSprite.getWidth(), this.y + this.getHeight() - healthSprite.getHeight());
            healthSprite.draw();
            this.engine.ctx.fillStyle = '#fff';
            this.engine.ctx.textAlign = 'center';
            this.engine.ctx.fillText(this.health + '', this.x + this.width - healthSprite.getWidth() / 2, this.y + this.height - healthSprite.getHeight() / 2 + 2);
            this.engine.ctx.closePath();
            //armor circle stat
            const armorPos = new vec2(this.x + this.width, this.y);
            this.engine.ctx.beginPath();
            const shieldSprite = Sprite.all.get('shield');
            shieldSprite.offset.x = 0;
            shieldSprite.offset.y = 0;
            shieldSprite.setWidth(24);
            shieldSprite.setHeight(24);
            shieldSprite.size = new vec2(24, 24);
            shieldSprite.setPos(this.x + this.width - shieldSprite.getWidth(), this.y);
            shieldSprite.draw();
            this.engine.ctx.fillStyle = '#fff';
            this.engine.ctx.textAlign = 'center';
            this.engine.ctx.fillText(this.armor + '', armorPos.x - shieldSprite.size.x / 2, armorPos.y + shieldSprite.size.y / 2 + 3);
            const playerSprite = Sprite.all.get('poo');
            playerSprite.setWidth(9 * 10 - 30);
            playerSprite.setHeight(playerSprite.aspecеRatio * playerSprite.getWidth());
            playerSprite.setPos(this.x + (this.getWidth() - playerSprite.getWidth()) / 2, this.y + 30);
            playerSprite.draw();
            this.engine.ctx.closePath();
        }
        //this.engine.ctx.translate(100-(this.width/2*this.counter), 0);
        //this.engine.ctx.scale(this.counter,1);
        this.backGround && this.drawBackGround();
        this.engine.ctx.scale(1, 1);
        this.engine.ctx.restore();
    }
    update(utime) {
        if (this.backGround)
            this.backGround.update(utime);
        this.card = new Path2D();
        this.card.rect(this.x, this.y, this.width, this.height);
        this.animation.forEach((e) => e.render(this, utime));
    }
    drawBackGround() {
        this.backGround.setPos(this.x, this.y);
        this.backGround.draw();
    }
    loadBackGround() {
        if (!this.backGround) {
        }
    }
    anim(name, duration) {
        console.log(name, duration);
        if (name == 'popup') {
            this.animation;
        }
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
        let tempAttack = this.health + this.armor;
        let tempHealth = to.health;
        let tempArmor = to.armor;
        to.armor -= tempAttack;
        tempAttack = to.armor < 0 ? Math.abs(to.armor) : 0;
        if (to.armor < 0)
            to.armor = 0;
        to.health -= tempAttack;
        if (to.health < 0) {
            to.health = 0;
            to.destroy();
        }
        tempAttack = tempHealth + tempArmor;
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
        this.engine.off('click', this.click);
    }
}
