import EventEmmiter from "../utils/eventEmmiter.js";
import { Formula } from "./Formula.js";
export default class Anim extends EventEmmiter {
    constructor(maxStep) {
        super();
        this.step = 0;
        this.startStep = 0;
        this.loop = false;
        this.isRun = false;
        this.frames = [];
        this.firstRun = false;
        this.defaultTimingFunc = Formula.linear;
        this.timingFunc = this.defaultTimingFunc;
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
        this.setRun(true);
        return false;
    }
    run(maxStep) {
        if (this.isRun)
            return;
        this.firstRun = true;
        this.setRun(true);
        if (maxStep) {
            this.maxStep = maxStep;
        }
    }
    setRun(value) {
        this.isRun = value;
    }
    setDuration(maxStep) {
        this.maxStep = maxStep;
    }
    setTimingFunc(timingFunc) {
        this.timingFunc = timingFunc;
    }
    setDefault() {
        this.timingFunc = this.defaultTimingFunc;
    }
}
