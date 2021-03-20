import Entity from './Entity.js';
import EventEmmiter from './utils/eventEmmiter.js';
import vec2 from "./utils/vec2.js";

export interface IEngine extends EventEmmiter {
    el: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
}
export interface IMenu extends EventEmmiter
{
    push:(items: IElement[])=>number
    draw: () => void;
    update: (utime: number) => void;
    elements: IElement[];
}
export interface IContainer {
    getWidth: () => number
    setWidth: () => number
    getHeight: () => number
    setHeight: () => number
}
export interface IElement extends Entity {
    draw: () => void;
    update: (utime: number) => void;
    setPos: (x: number, y: number) => void;
    hide: boolean;
}
export interface ISpriteUrl {
    name: string;
    url: string;
}
export interface ISpriteImg {
    name: string;
    img: HTMLImageElement;
}
export interface IAnimated
{
    time: number
    duration: number
}