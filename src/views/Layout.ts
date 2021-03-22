
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
        this.elements.forEach((el, x) =>
        {
            if (!el) return
            const coord = Utils.indexToCoord(x, this.width)
            let pos = el.getPos()
            el.animation.run()
            el.animation.setFrames([[pos.x,pos.y,coord.x * el.getWidth() + coord.x * this.gap.x, coord.y * el.getHeight() + coord.y * this.gap.y]])
            
            if (x >= this.width * this.height) el.hide = true;
        });
    }
    draw ()
    {
        this.engine.ctx.save()
        this.elements.forEach((elm) => elm && elm.draw());
        this.engine.ctx.resetTransform();
        this.engine.ctx.restore();
    }
    update (utime: number)
    {
        this.elements.forEach((elm) => elm && elm.update(utime));
        
    }
    protected click (target: Entity)
    {
        console.log(target);
        
        const index = this.elements.findIndex(p => p == target)
        const playerIndex = this.elements.findIndex(e => e && e.name == "Player")
        const player = this.elements[playerIndex]
        const clickCoord = Utils.indexToCoord(index, this.width)
        const playerCoord = Utils.indexToCoord(playerIndex, this.width)

        const dir = clickCoord.sub(playerCoord)
        console.log(dir);
        if (!dir.x&&!dir.y) return
        if (dir.x>1) return
        if (dir.y>1) return
        if (dir.x == 1 && dir.y == 1 || dir.x == 1 && dir.y == -1 || dir.x == -1 && dir.y == -1 || dir.x == -1 && dir.y == 1) return
        
        const attackTo = this.elements[Utils.coordToIndex(playerCoord.x + dir.x, playerCoord.y + dir.y, this.width)]
        this.move(player, attackTo)
        
    }
    push (items: IElement[])
    {

        items.forEach((e) =>
        {
            e.on("click", this.click.bind(this))
        })
        this.elements.push(...items)
        this.updateLayout()
        return this.elements.length
    }

    get matrix ()
    {
        return Utils.reshape(this.elements, this.width, this.height)
    }

    move (target: Entity, to: Entity)
    {
        const actionResult = target.action(to)
        if (actionResult)
        {
            const index = this.elements.findIndex(p => p == to)
            const playerIndex = this.elements.findIndex(e => e == target)
            this.elements[index] = <IElement>target
            this.elements[playerIndex] = null
            this.updateLayout()
            //
        } else
        {
            //this.move(target, to)
            console.log('check');

        }
    }
}

