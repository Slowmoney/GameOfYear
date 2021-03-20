import { IEngine } from "./types";
import EventEmmiter from "./utils/eventEmmiter.js";
import vec2 from "./utils/vec2";

export default class Entity extends EventEmmiter
{
    protected engine: IEngine;
    protected x: number = 0;
    protected y: number = 0;
    protected width: number;
    protected height: number;
    constructor(engine: IEngine)
    {
        super()
        this.engine = engine;
        
    }
    setPos (x: number, y: number)
    {
        //console.log('setPos');
        
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
}
