import Entity from "../Entity.js";
import { Formula } from "./Formula.js";


export default class Anim
{
    step = 0
    startStep: number = 0
    maxStep: number;
    protected loop: boolean = false
    isRun = false
    protected frames: [prevX: number, prevY: number, toX: number, toY: number][] = []
    firstRun = false
    timingFunc: (t:number) => number = Formula.linear
    constructor(maxStep: number)
    {
        this.maxStep = maxStep
        this.step = this.startStep
    }
    setFrames (frames: [prevX: number, prevY: number, toX: number, toY: number][])
    {
        this.frames = frames
    }
    render (entity: Entity, time: number)
    {
        entity;
        time;
        if (!this.isRun) return true
        this.isRun = true
        return false
    }
    run (maxStep?: number)
    {
        if (this.isRun) return
        this.firstRun = true
        this.isRun = true
        if (maxStep) {
            this.maxStep = maxStep
        }
    }
    setDuration (maxStep: number)
    {
        this.maxStep = maxStep
    }
    setTimingFunc (timingFunc:(t:number)=>number)
    {
        this.timingFunc = timingFunc
    }
}
