import { Utils } from "../utils/utils.js";
import Anim from "./Anim.js";
export class PopUp extends Anim {
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
        let scale = Math.sin(t * Math.PI);
        entity.scale.x = scale;
        entity.scale.y = scale;
        entity.translate.x = (entity.getWidth() - ((entity.getWidth()) * scale) / 2) - entity.getWidth() / 2 + entity.getPos().x;
        entity.translate.y = (entity.getHeight() - ((entity.getHeight()) * scale) / 2) - entity.getHeight() / 2 + entity.getPos().y;
        if (time - this.step > this.maxStep) {
            console.log(time, this.step);
            console.log(entity.scale);
            if (this.isRun)
                this.step = time;
            this.isRun = false;
            entity.scale.x = 1;
            entity.scale.y = 1;
            entity.translate.x = 0;
            entity.translate.y = 0;
        }
        return false;
    }
}
