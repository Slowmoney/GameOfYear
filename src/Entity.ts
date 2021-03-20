import { IEngine } from "./types";

export default class Entity {
    engine: IEngine;
    x: number = 0;
    y: number = 0;
    
    constructor(engine: IEngine) {
        this.engine = engine;
    }
    setPos (x: number, y: number)
    {
        this.x = x;
        this.y = y;
    }
}
