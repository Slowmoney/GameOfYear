import { Utils } from "../utils/utils.js";
import Anim from "./Anim.js";
import { Formula } from "./Formula.js";
export class PopUp extends Anim {
    constructor(maxStep) {
        super(maxStep);
        this.defaultTimingFunc = (t) => Formula.sin(t, (t) => Formula.cubicBezier(t, 0.1, -0.6, 0.2, 0));
        this.timingFunc = this.defaultTimingFunc;
    }
    render(entity, time) {
        if (!this.isRun)
            return true;
        if (this.firstRun) {
            this.step = time;
            this.firstRun = false;
        }
        let t = Utils.clamp(time - this.step, 0, this.maxStep) / this.maxStep;
        t = this.timingFunc(t);
        entity.scale.x = t;
        entity.scale.y = t;
        if (time - this.step > this.maxStep) {
            if (this.isRun)
                this.step = time;
            this.setRun(false);
            this.emit("end", this);
            entity.scale.x = 1;
            entity.scale.y = 1;
            entity.translate.x = 0;
            entity.translate.y = 0;
        }
        return false;
    }
}
