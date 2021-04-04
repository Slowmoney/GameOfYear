import Entity from "../Entity.js";
import EventEmmiter from "../utils/eventEmmiter.js";
import { Formula } from "./Formula.js";

export default class Anim extends EventEmmiter
{
    step = 0
    startStep: number = 0
    maxStep: number;
    protected loop: boolean = false
    isRun = false
    protected frames: [prevX: number, prevY: number, toX: number, toY: number][] = []
    firstRun = false
    protected readonly defaultTimingFunc: (t: number) => number = Formula.linear
    protected timingFunc = this.defaultTimingFunc
    constructor(maxStep: number)
    {
        super()
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
        this.setRun(true)
        return false
    }
    run (maxStep?: number)
    {
        if (this.isRun) return
        this.firstRun = true
        this.setRun(true)
        if (maxStep) {
            this.maxStep = maxStep
        }
    }
    protected setRun (value:boolean)
    {
        this.isRun = value
    }
    setDuration (maxStep: number)
    {
        this.maxStep = maxStep
    }
    setTimingFunc (timingFunc:(t:number)=>number)
    {
        this.timingFunc = timingFunc
    }
    setDefault ()
    {
        this.timingFunc = this.defaultTimingFunc
    }
}
