import { UnitBezier } from "../utils/Bezier.js"

export type AnimationFormula = (t:number, min:number, max:number)=>number
export namespace Formula
{
    const bz = new UnitBezier(0, 0, 1, 1)
    export function linear (t:number)
    {
        return t
    }
    export function ease (t: number)
    {
        return cubicBezier(t, 0.25,0.1,0.25,1)
    }
    export function easeIn(t:number){return cubicBezier(t, 0.42,0,1,1)}
    export function easeOut(t:number){return cubicBezier(t, 0,0,0.58,1)}
    export function easeInOut(t:number){return cubicBezier(t, 0.42,0,0.58,1)}
    export function cubicBezier (t: number, p1x:number,  p1y:number,  p2x:number,  p2y:number)
    {
        bz.calc(p1x, p1y, p2x, p2y)
        return bz.solve(t, 0.000001)
    }
}
