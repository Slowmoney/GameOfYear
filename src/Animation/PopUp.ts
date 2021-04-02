import Entity from "../Entity";
import { Utils } from "../utils/utils.js";
import Anim from "./Anim.js";
import { Formula } from "./Formula.js";

export class PopUp extends Anim
{
    constructor(maxStep: number)
    {
        super(maxStep)
    }
    render (entity: Entity, time: number)
    {
        if (!this.isRun) return true
        if (this.firstRun)
        {
            this.step = time
            this.firstRun = false
        }
        let t = Utils.clamp(time - this.step, 0, this.maxStep) / this.maxStep

        t = Formula.cubicBezier(t,0.1, -0.6, 0.2, 0)

        
        let scale = Math.sin(t * Math.PI)/(10) + 1
        entity.scale.x = scale
        entity.scale.y = scale

        if (time - this.step > this.maxStep)
        {
            if (this.isRun) this.step = time
            this.isRun = false
            entity.scale.x = 1
            entity.scale.y = 1
            entity.translate.x = 0
            entity.translate.y = 0

        }
        return false
    }
}
