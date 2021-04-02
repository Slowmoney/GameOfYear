import { UnitBezier } from "../utils/Bezier.js";
export var Formula;
(function (Formula) {
    const bz = new UnitBezier(0, 0, 1, 1);
    function linear(t) {
        return t;
    }
    Formula.linear = linear;
    function ease(t) {
        return cubicBezier(t, 0.25, 0.1, 0.25, 1);
    }
    Formula.ease = ease;
    function easeIn(t) { return cubicBezier(t, 0.42, 0, 1, 1); }
    Formula.easeIn = easeIn;
    function easeOut(t) { return cubicBezier(t, 0, 0, 0.58, 1); }
    Formula.easeOut = easeOut;
    function easeInOut(t) { return cubicBezier(t, 0.42, 0, 0.58, 1); }
    Formula.easeInOut = easeInOut;
    function cubicBezier(t, p1x, p1y, p2x, p2y) {
        bz.calc(p1x, p1y, p2x, p2y);
        return bz.solve(t, 0.000001);
    }
    Formula.cubicBezier = cubicBezier;
})(Formula || (Formula = {}));
