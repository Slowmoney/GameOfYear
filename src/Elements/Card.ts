import { Formula } from '../Animation/Formula.js';
import Entity from '../Entity.js';
import { IAnimated, IContainer, IElement, IEngine } from '../types';
import vec2 from '../utils/vec2.js';
import Sprite from './Sprite.js';

export default class Card extends Entity implements IElement, IAnimated {
	name = 'Card';
	hide: boolean = false;
	backGround: Sprite;
	time: number = 0;
	counter = 99;

	constructor(engine: IEngine, size: vec2);
	constructor(engine: IEngine, width: number | vec2, height?: number) {
		super(engine);
		if (typeof width == 'number') this.width = width;
		if (typeof height == 'number') this.height = height;
		if (typeof width == 'object') {
			this.width = width.x;
			this.height = width.y;
		}
		this.loadBackGround();
		this.click = this.click.bind(this);
        this.engine.on('click', this.click);
        /* this.animation.get("popup").setTimingFunc((t:number)=>Formula.cubicBezier(t,0.1, -0.6, 0.2, 0)) */
	}
	draw() {
		this.engine.ctx.save();
        if(!this.hide)
        {
            //centered translate
			this.engine.ctx.translate(
				this.translate.x +
					this.width -
					this.x * this.scale.x +
					this.x -
					(this.width * this.scale.x) / 2 -
					this.width / 2,
				this.translate.y +
					this.height -
					this.y * this.scale.y +
					this.y -
					(this.height * this.scale.y) / 2 -
					this.height / 2
			);
			this.engine.ctx.scale(this.scale.x, this.scale.y);

			this.engine.ctx.stroke(this.collsionBox);
			this.engine.ctx.beginPath();
			const healthSprite = Sprite.all.get('health');
			healthSprite.offset.x = 0;
			healthSprite.offset.y = 0;
			healthSprite.setWidth(24);
			healthSprite.setHeight(24);
			healthSprite.size = new vec2(254, 254);
			healthSprite.setPos(
				this.x + this.getWidth() - healthSprite.getWidth(),
				this.y + this.getHeight() - healthSprite.getHeight()
			);
			healthSprite.draw();

			this.engine.ctx.fillStyle = '#fff';
			this.engine.ctx.textAlign = 'center';
			this.engine.ctx.fillText(
				this.health + '',
				this.x + this.width - healthSprite.getWidth() / 2,
				this.y + this.height - healthSprite.getHeight() / 2 + 2
			);

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
			shieldSprite.setPos(this.x + this.width - shieldSprite.width, this.y);
			shieldSprite.draw();

			this.engine.ctx.fillStyle = '#fff';
			this.engine.ctx.textAlign = 'center';
			this.engine.ctx.fillText(
				this.armor + '',
				armorPos.x - shieldSprite.size.x / 2,
				armorPos.y + shieldSprite.size.y / 2 + 3
			);

			this.engine.ctx.closePath();
		}
		//this.engine.ctx.translate(100-(this.width/2*this.counter), 0);

		this.backGround && this.drawBackGround();
		this.engine.ctx.scale(1, 1);
		this.engine.ctx.restore();
	}
	update(utime: number) {
		if (this.backGround) this.backGround.update(utime);
		this.animation.forEach((e) => e.render(this, utime));
	}
	drawBackGround() {
		this.updateCollisionBox()

       /*  this.backGround.setWidth(this.getWidth() / 3)
        this.backGround.setHeight(this.backGround.aspecеRatio * this.backGround.getWidth()); */
		this.backGround.setPos(
			this.x + this.width / 2 - this.backGround.width / 2,
			this.y + this.height / 2 - this.backGround.height / 2
		);
		this.backGround.draw();
	}
	loadBackGround() {
		if (!this.backGround) {
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
			this.backGround.play(frames, 88);
		}
	}
	anim(name: "move"|"popup", duration?: number) {
		this.animation.get(name).run(duration);
	}
	protected click(e: MouseEvent) {
		if (this.engine.ctx.isPointInPath(this.collsionBox, e.offsetX, e.offsetY)) this.emit('click', this);
	}
	destroy() {
		this.engine.off('click', this.click);
	}
}
