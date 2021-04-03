import { Formula } from "./Formula.js";
export default class Anim {
    constructor(maxStep) {
        this.step = 0;
        this.startStep = 0;
        this.loop = false;
        this.isRun = false;
        this.frames = [];
        this.firstRun = false;
        this.timingFunc = Formula.linear;
        this.maxStep = maxStep;
        this.step = this.startStep;
    }
    setFrames(frames) {
        this.frames = frames;
    }
    render(entity, time) {
        entity;
        time;
        if (!this.isRun)
            return true;
        this.isRun = true;
        return false;
    }
    run(maxStep) {
        if (this.isRun)
            return;
        this.firstRun = true;
        this.isRun = true;
        if (maxStep) {
            this.maxStep = maxStep;
        }
    }
    setDuration(maxStep) {
        this.maxStep = maxStep;
    }
    setTimingFunc(timingFunc) {
        this.timingFunc = timingFunc;
    }
}
