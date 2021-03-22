import { Anim } from "./Animation/Animation.js";
import { AnimationType, IAnimated, IEngine } from "./types";
import EventEmmiter from "./utils/eventEmmiter.js";
import vec2 from "./utils/vec2";

export default class Entity extends EventEmmiter implements IAnimated
{
    protected engine: IEngine;
    protected x: number = 0;
    protected y: number = 0;
    protected width: number;
    protected height: number;
    health = 30

    armor = 15

    time = 10
    duration = 100
    animation = new Anim(100)
    constructor(engine: IEngine)
    {
        super()
        this.engine = engine;
        
    }
    setPos (x: number, y: number)
    {
        this.x = x;
        this.y = y;
    }
    getPos ()
    {
        return { x: this.x, y: this.y } as vec2
    }
    getWidth ()
    {
        return this.width
    }
    setWidth (width: number)
    {
        this.width = width
    }
    getHeight ()
    {
        return this.height
    }
    setHeight (height: number)
    {
        this.height = height
    }
    action (to: Entity)
    {
        to
        return true
    }
    destroy ()
    {
        
    }
}
