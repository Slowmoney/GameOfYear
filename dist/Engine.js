import EventEmmiter from "./utils/eventEmmiter.js";
export default class Engine extends EventEmmiter {
    constructor(id, width, height) {
        super();
        this.el = document.getElementById(id);
        this.ctx = this.el.getContext('2d');
        this.el.width = width ? width : window.innerWidth;
        this.el.height = height ? height : window.innerHeight;
        this.el.addEventListener("click", (ev) => this.emit("click", ev));
        this.el.addEventListener("mousemove", (ev) => this.emit("mousemove", ev));
    }
}
