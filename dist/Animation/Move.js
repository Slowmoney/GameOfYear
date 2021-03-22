import { Utils } from "../utils/utils.js";
import Anim from "./Anim.js";
export class Move extends Anim {
    constructor(maxStep) {
        super(maxStep);
    }
    render(entity, time) {
        if (!this.isRun)
            return true;
        if (this.firstRun) {
            this.step = time;
            this.firstRun = false;
        }
        let t = Utils.clamp(time - this.step, 0, this.maxStep) / this.maxStep;
        entity.setPos(this.frames[0][0] + t * (this.frames[0][2] - this.frames[0][0]), this.frames[0][1] + t * (this.frames[0][3] - this.frames[0][1]));
        if (time - this.step > this.maxStep) {
            if (this.isRun)
                this.step = time;
            this.isRun = false;
        }
        return false;
    }
}
