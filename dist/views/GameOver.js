import Sprite from '../Elements/Sprite.js';
import EventEmmiter from '../utils/eventEmmiter.js';
export class GameOver extends EventEmmiter {
    constructor(engine) {
        super();
        this.elements = [];
        this.name = 'GameOver';
        this.engine = engine;
        this.click = this.click.bind(this);
        this.engine.on('click', this.click);
    }
    push(items) {
        items.forEach((e) => e.on('click', this.click));
        this.elements.push(...items);
        return this.elements.length;
    }
    draw() {
        this.engine.ctx.save();
        Sprite.all.get('restart').draw();
        this.engine.ctx.restore();
    }
    update() { }
    click(e) {
        if (this.engine.ctx.isPointInPath(Sprite.all.get('health').collsionBox, e.offsetX, e.offsetY)) {
            this.emit('toView', "Layout");
        }
    }
    destroy() { }
}
