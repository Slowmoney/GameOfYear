import { IEngine } from "./types";
import EventEmmiter from "./utils/eventEmmiter.js";
import vec2 from "./utils/vec2";

export default class Entity extends EventEmmiter
{
    private animInterval:number
    protected engine: IEngine;
    protected x: number = 0;
    protected y: number = 0;
    protected width: number;
    protected height: number;
    health = 30
    attack = 20
    armor = 15
    constructor(engine: IEngine)
    {
        super()
        this.engine = engine;
        
    }
    setPos (x: number, y: number)
    {
        let prevX = this.x
        let prevY = this.y
        console.log(prevX, prevY);
        console.log(x, y);

        let steps = 100;
        let i = 0
        clearInterval(this.animInterval)
        this.animInterval = setInterval(() =>
        {
            let t = i / steps
            this.x = prevX + t * (x - prevX)
            this.y = prevY + t * (y - prevY)
            if (++i>steps) {
                clearInterval(this.animInterval)
            }
            
        },1)

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
