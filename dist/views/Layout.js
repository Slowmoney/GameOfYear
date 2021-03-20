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
        this.elements.forEach((el, x, xa) => {
            const prevElx = xa[x - 1];
            const newLine = !!(x % this.width);
            const lineNum = Math.floor(x / this.width);
            el.setPos(newLine ? (prevElx && prevElx.getWidth() ? prevElx.getWidth() + prevElx.getPos().x + this.gap.x : 0) : 0, el.getPos().y);
            if (lineNum) {
                const elementsPrevLine = this.elements.slice((lineNum - 1) * this.width, lineNum * this.width);
                const max = Math.max(...elementsPrevLine.map((e) => e.getHeight()));
                const maxo = Math.max(...elementsPrevLine.map((e) => e.getPos().y));
                el.setPos(el.getPos().x, max + maxo + this.gap.y);
            }
            if (x >= this.width * this.height)
                el.hide = true;
        });
    }
    draw() {
        this.engine.ctx.save();
        this.elements.forEach((elm) => elm.draw());
        this.engine.ctx.resetTransform();
        this.engine.ctx.restore();
    }
    update(utime) {
        this.elements.forEach((elm) => elm.update(utime));
        this.updateLayout();
    }
    click(e) {
        console.log(this.elements);
        console.log(this.matrix);
        console.log(e);
        console.log(this.elements.findIndex(p => p == e));
        let index = this.elements.findIndex(p => p == e);
        let x = index % this.width;
        let y = Math.floor((index / this.width));
        console.log(x, y);
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
}
