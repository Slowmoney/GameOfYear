import Entity from "../Entity";
import { AnimationType } from "../types";
import { Utils } from "../utils/utils.js";

export class Anim
{
    step = 0
    startStep: number = 0
    maxStep: number;
    loop: boolean = false
    private isRun = false
    private frames: [prevX: number, prevY: number, toX: number, toY: number][] = []
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
        if (!this.isRun) return true
        let t = Utils.clamp(time - this.step,0,this.maxStep) / this.maxStep
        entity.setPos(this.frames[0][0] + t * (this.frames[0][2] - this.frames[0][0]), this.frames[0][1] + t * (this.frames[0][3] - this.frames[0][1]))
        if (time - this.step > this.maxStep)
        {
            if (this.isRun) this.step = time
            this.isRun = false
        }
        return false
    }
    run ()
    {
        this.isRun = true
    }
}
