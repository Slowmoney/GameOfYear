import Anim from "./Animation/Anim.js";
import { Formula } from "./Animation/Formula.js";
import { Move } from "./Animation/Move.js";
import { PopUp } from "./Animation/PopUp.js";
import { AnimationType, IAnimated, IEngine } from "./types";
import EventEmmiter from "./utils/eventEmmiter.js";
import vec2 from "./utils/vec2.js";

export default class Entity extends EventEmmiter implements IAnimated
{
    protected engine: IEngine;
    protected x: number = 0;
    protected y: number = 0;
    protected width: number;
    protected height: number;

    translate = new vec2(0,0)
    scale = new vec2(1,1)

    health = 30

    armor = 15

    time = 10
    duration = 100
    animation = new Map<string, Anim>()
    
    collsionBox: Path2D = new Path2D();
    constructor(engine: IEngine)
    {
        super()
        this.engine = engine;
        

        this.animation.set("move", new Move(100))

        this.animation.set("popup", new PopUp(500))
    }
    setPos (x: number, y: number)
    {
        this.x = x;
        this.y = y;
        this.updateCollisionBox()
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
        this.updateCollisionBox()
    }
    getHeight ()
    {
        return this.height
    }
    setHeight (height: number)
    {
        this.height = height
        this.updateCollisionBox()
    }
    action (to: Entity)
    {
        to
        return true
    }
    destroy ()
    {
        console.log("destroy", this);
        
    }
    anim (name: string, duration: number)
    {
        console.log(name, duration);
    }
    updateCollisionBox ()
    {
        this.collsionBox = new Path2D();
		this.collsionBox.rect(this.x, this.y, this.width, this.height);
    }
}
