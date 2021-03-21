var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _events;
export default class EventEmmiter {
    constructor() {
        _events.set(this, new Map());
    }
    emit(eventName, ...args) {
        if (__classPrivateFieldGet(this, _events).has(eventName))
            __classPrivateFieldGet(this, _events).get(eventName).forEach((l) => l.apply(this, args));
    }
    on(eventName, listener) {
        if (__classPrivateFieldGet(this, _events).has(eventName))
            __classPrivateFieldGet(this, _events).get(eventName).push(listener);
        else
            __classPrivateFieldGet(this, _events).set(eventName, [listener]);
    }
    off(eventName, listener) {
        if (__classPrivateFieldGet(this, _events).has(eventName)) {
            const index = __classPrivateFieldGet(this, _events).get(eventName).indexOf(listener);
            if (index > 0)
                __classPrivateFieldGet(this, _events).get(eventName).splice(index, 1);
        }
    }
}
_events = new WeakMap();
