import { Utils } from "../utils/utils.js";
export class Anim {
    constructor(maxStep) {
        this.step = 0;
        this.startStep = 0;
        this.loop = false;
        this.isRun = false;
        this.frames = [];
        this.maxStep = maxStep;
        this.step = this.startStep;
    }
    setFrames(frames) {
        this.frames = frames;
    }
    render(entity, time) {
        if (!this.isRun)
            return true;
        let t = Utils.clamp(time - this.step, 0, this.maxStep) / this.maxStep;
        entity.setPos(this.frames[0][0] + t * (this.frames[0][2] - this.frames[0][0]), this.frames[0][1] + t * (this.frames[0][3] - this.frames[0][1]));
        if (time - this.step > this.maxStep) {
            if (this.isRun)
                this.step = time;
            this.isRun = false;
        }
        return false;
    }
    run() {
        this.isRun = true;
    }
}
