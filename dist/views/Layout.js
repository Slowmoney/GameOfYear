import Entity from '../Entity.js';
import vec2 from '../utils/vec2.js';
export default class Layout extends Entity {
    constructor(engine, width, height, elements = []) {
        super(engine);
        this.gap = new vec2(0, 0);
        this.width = width;
        this.height = height;
        this.elements = elements;
        this.updateLayout();
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
            el.offset.x = newLine ? (prevElx && prevElx.width ? prevElx.width + prevElx.offset.x + this.gap.x : 0) : 0;
            if (lineNum) {
                const elementsPrevLine = this.elements.slice((lineNum - 1) * this.width, lineNum * this.width);
                const max = Math.max(...elementsPrevLine.map((e) => e.height));
                const maxo = Math.max(...elementsPrevLine.map((e) => e.offset.y));
                el.offset.y = max + maxo + this.gap.y;
            }
            if (x >= this.width * this.height)
                el.hide = true;
        });
    }
    draw() {
        this.engine.ctx.save();
        this.elements.forEach((elm) => {
            elm.draw();
        });
        this.engine.ctx.resetTransform();
        this.engine.ctx.restore();
    }
    update(utime) {
        this.elements.forEach((elm) => {
            elm.update(utime);
        });
        this.updateLayout();
    }
}
