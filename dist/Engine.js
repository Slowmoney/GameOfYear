var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _events;
export default class Engine {
    constructor(id, width, height) {
        _events.set(this, new Map());
        this.el = document.getElementById(id);
        this.ctx = this.el.getContext('2d');
        this.el.width = width ? width : window.innerWidth;
        this.el.height = height ? height : window.innerHeight;
        this.el.addEventListener("click", () => this.emit("click"));
    }
    emit(eventName, ...args) {
        if (__classPrivateFieldGet(this, _events).has(eventName))
            __classPrivateFieldGet(this, _events).get(eventName).forEach((l) => l(args));
    }
    on(eventName, listener) {
        if (__classPrivateFieldGet(this, _events).has(eventName))
            __classPrivateFieldGet(this, _events).get(eventName).push(listener);
        else
            __classPrivateFieldGet(this, _events).set(eventName, [listener]);
    }
}
_events = new WeakMap();
