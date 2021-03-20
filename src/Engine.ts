import { IEngine } from "./types";
import EventEmmiter from "./utils/eventEmmiter.js";

export default class Engine extends EventEmmiter implements IEngine
{
    el: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    constructor(id: string, width?: number, height?: number)
    {
        super()
        this.el = <HTMLCanvasElement>document.getElementById(id);
        this.ctx = this.el.getContext('2d');
        this.el.width = width ? width : window.innerWidth;
        this.el.height = height ? height : window.innerHeight;
        this.el.addEventListener("click", (ev: MouseEvent) => this.emit("click", ev))
        this.el.addEventListener("mousemove", (ev: MouseEvent) => this.emit("mousemove", ev))
    }
}
