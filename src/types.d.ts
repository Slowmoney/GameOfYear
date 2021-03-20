import Entity from './Entity.js';
import vec2 from "./utils/vec2.js";

export interface IEngine {
    el: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
}
export interface IMenu {
    draw: () => void;
    update: (utime: number) => void;
    elements: IElement[];
}
export interface IContainer {
    width: number;
    height: number;
}
export interface IElement extends Entity, IContainer {
    offset: vec2;
    draw: () => void;
    update: (utime: number) => void;
    pos: vec2;
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