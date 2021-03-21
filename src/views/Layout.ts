
import Entity from '../Entity.js';
import { IContainer, IElement, IEngine, IMenu } from '../types';
import { Utils } from '../utils/utils.js';
import vec2 from '../utils/vec2.js';


export default class Layout extends Entity implements IMenu
{
    elements: IElement[];
    engine: IEngine;
    gap: vec2 = new vec2(0, 0);

    constructor(engine: IEngine, width: number, height: number, elements: IElement[] = [])
    {
        super(engine);
        this.width = width;
        this.height = height;
        this.elements = elements;
        this.updateLayout();
        this.push(elements)
    }
    setGap (x: number, y: number)
    {
        this.gap = new vec2(x, y);
        this.updateLayout();
        return this;
    }
    updateLayout ()
    {
        this.elements.forEach((el, x, xa) =>
        {
            const prevElx = xa[x - 1];
            const newLine = !!(x % this.width);
            const lineNum = Math.floor(x / this.width);
            el.setPos(newLine ? (prevElx && prevElx.getWidth() ? prevElx.getWidth() + prevElx.getPos().x + this.gap.x : 0) : 0, el.getPos().y)
            if (lineNum)
            {
                const elementsPrevLine = this.elements.slice((lineNum - 1) * this.width, lineNum * this.width);
                const max = Math.max(...elementsPrevLine.map((e) => e.getHeight()));
                const maxo = Math.max(...elementsPrevLine.map((e) => e.getPos().y));
                el.setPos(el.getPos().x, max + maxo + this.gap.y)
            }
            if (x >= this.width * this.height) el.hide = true;
        });
    }
    draw ()
    {
        this.engine.ctx.save()
        this.elements.forEach((elm) => elm.draw());
        this.engine.ctx.resetTransform();
        this.engine.ctx.restore();
    }
    update (utime: number)
    {
        this.elements.forEach((elm) => elm.update(utime));
        this.updateLayout()
    }
    protected click (target: Entity)
    {
        const index = this.elements.findIndex(p => p == target)
        const playerIndex = this.elements.findIndex(e => e.name == "Player")
        const player = this.elements[playerIndex]
        const clickCoord = Utils.indexToCoord(index, this.width)
        const playerCoord = Utils.indexToCoord(playerIndex, this.width)

        console.log(this.elements);
        console.log(this.matrix);
        console.log(target);

        console.log(playerCoord, clickCoord);

        console.log(clickCoord.x - playerCoord.x, clickCoord.y - playerCoord.y);


        const dir = clickCoord.sub(playerCoord)
        console.log(dir);
        if (dir.y < 0)
        {
            console.log("UP");
            return
        }
        if (dir.x < 0)
        {
            console.log("LEFT");
            return
        }
        if (dir.y > 0)
        {
            console.log("DOWN");
            return
        }
        if (dir.x > 0)
        {
            console.log("RIGHT", playerCoord);
            const attackTo = this.elements[Utils.coordToIndex(playerCoord.x + 1, playerCoord.y, this.width)]
            this.move(player, attackTo)
            return
        }
    }
    push (items: IElement[])
    {

        items.forEach((e) =>
        {
            e.on("click", this.click.bind(this))
        })
        return this.elements.push(...items)
    }

    get matrix ()
    {
        return Utils.reshape(this.elements, this.width, this.height)
    }

    move (target: Entity, to: Entity)
    {
        const actionResult = target.action(to)
        console.log('actionResult', actionResult);
        if (actionResult)
        {
            console.log("move", target, to);
            const index = this.elements.findIndex(p => p == to)
            this.elements[index] = <IElement>target
            
        } else
        {
            console.log('check');

        }
    }
}

