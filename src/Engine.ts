import { IEngine } from "./types";

export default class Engine implements IEngine
{
    #events = new Map<string,[(...args:any)=>any]>()
    el: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    constructor(id: string, width?: number, height?: number) {
        this.el = <HTMLCanvasElement>document.getElementById(id);
        this.ctx = this.el.getContext('2d');
        this.el.width = width ? width : window.innerWidth;
        this.el.height = height ? height : window.innerHeight;
        this.el.addEventListener("click", ()=>this.emit("click"))
    }
    emit (eventName:string,...args:any)
    {
        if (this.#events.has(eventName))this.#events.get(eventName).forEach((l) =>l(args))
    }

    on (eventName: string, listener: (...args:any) => any)
    {
        if (this.#events.has(eventName))this.#events.get(eventName).push(listener)    
        else this.#events.set(eventName, [listener])
    }
}
