
import Entity from '../Entity.js';
import { IContainer, IElement, IEngine, IMenu } from '../types';
import vec2 from '../utils/vec2.js';


export default class Layout extends Entity implements IMenu {
    elements: IElement[];
    engine: IEngine;
    gap: vec2 = new vec2(0, 0);
    
    constructor(engine: IEngine, width: number, height: number, elements: IElement[] = []) {
        super(engine);
        this.width = width;
        this.height = height;
        this.elements = elements;
        this.updateLayout();
        this.push(elements)
    }
    setGap(x: number, y: number) {
        this.gap = new vec2(x, y);
        this.updateLayout();
        return this;
    }
    updateLayout() {
        this.elements.forEach((el, x, xa) => {
            const prevElx = xa[x - 1];
            const newLine = !!(x % this.width);
            const lineNum = Math.floor(x / this.width);
            el.setPos( newLine ? (prevElx && prevElx.getWidth() ? prevElx.getWidth() + prevElx.getPos().x + this.gap.x : 0) : 0, el.getPos().y)
            /* el.offset.x = */
            if (lineNum) {
                const elementsPrevLine = this.elements.slice((lineNum - 1) * this.width, lineNum * this.width);
                const max = Math.max(...elementsPrevLine.map((e) => e.getHeight()));
                const maxo = Math.max(...elementsPrevLine.map((e) => e.getPos().y));
                el.setPos(el.getPos().x,max + maxo + this.gap.y)
                /* el.offset.y = max + maxo + this.gap.y; */
            }
            if (x >= this.width * this.height) el.hide = true;
        });
    }
    draw ()
    {
        this.engine.ctx.save()
        this.elements.forEach((elm) => {
            elm.draw();
        });
        this.engine.ctx.resetTransform();
        this.engine.ctx.restore();
    }
    update(utime: number) {
        this.elements.forEach((elm) => {
            elm.update(utime);
        });
        this.updateLayout()
    }
    protected click (e:Entity)
    {

        console.log(e);
        
    }
    push (items: IElement[])
    {
        
        items.forEach((e) =>
        {
            e.on("click", this.click)
        })
        return this.elements.push(...items)
    }
}

