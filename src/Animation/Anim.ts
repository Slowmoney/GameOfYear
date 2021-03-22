import Entity from "../Entity";


export default class Anim
{
    step = 0
    startStep: number = 0
    maxStep: number;
    protected loop: boolean = false
    protected isRun = false
    protected frames: [prevX: number, prevY: number, toX: number, toY: number][] = []
    firstRun = false
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
    run ()
    {
        this.firstRun = true
        this.isRun = true
    }
}
