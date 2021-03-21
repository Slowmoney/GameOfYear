import Entity from '../Entity.js';
import { Utils } from '../utils/utils.js';
import vec2 from '../utils/vec2.js';
export default class Layout extends Entity {
    constructor(engine, width, height, elements = []) {
        super(engine);
        this.gap = new vec2(0, 0);
        this.width = width;
        this.height = height;
        this.elements = elements;
        this.updateLayout();
        this.push(elements);
    }
    setGap(x, y) {
        this.gap = new vec2(x, y);
        this.updateLayout();
        return this;
    }
    updateLayout() {
        this.elements.forEach((el, x) => {
            if (!el)
                return;
            const coord = Utils.indexToCoord(x, this.width);
            el.setPos(coord.x * el.getWidth() + coord.x * this.gap.x, coord.y * el.getHeight() + coord.y * this.gap.y);
            if (x >= this.width * this.height)
                el.hide = true;
        });
    }
    draw() {
        this.engine.ctx.save();
        this.elements.forEach((elm) => elm && elm.draw());
        this.engine.ctx.resetTransform();
        this.engine.ctx.restore();
    }
    update(utime) {
        this.elements.forEach((elm) => elm && elm.update(utime));
        this.updateLayout();
    }
    click(target) {
        const index = this.elements.findIndex(p => p == target);
        const playerIndex = this.elements.findIndex(e => e && e.name == "Player");
        const player = this.elements[playerIndex];
        const clickCoord = Utils.indexToCoord(index, this.width);
        const playerCoord = Utils.indexToCoord(playerIndex, this.width);
        const dir = clickCoord.sub(playerCoord).clamp(-1, 1);
        const attackTo = this.elements[Utils.coordToIndex(playerCoord.x + dir.x, playerCoord.y + dir.y, this.width)];
        this.move(player, attackTo);
    }
    push(items) {
        items.forEach((e) => {
            e.on("click", this.click.bind(this));
        });
        return this.elements.push(...items);
    }
    get matrix() {
        return Utils.reshape(this.elements, this.width, this.height);
    }
    move(target, to) {
        const actionResult = target.action(to);
        if (actionResult) {
            //console.log("move", target, to);
            const index = this.elements.findIndex(p => p == to);
            const playerIndex = this.elements.findIndex(e => e == target);
            this.elements[index] = target;
            console.log(index, playerIndex);
            this.elements[playerIndex] = null;
        }
        else {
            console.log('check');
        }
    }
}
