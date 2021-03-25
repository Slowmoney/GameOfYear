import Entity from '../Entity.js';
import { Utils } from '../utils/utils.js';
import vec2 from '../utils/vec2.js';
export default class Layout extends Entity {
    constructor(engine, width, height, elements = []) {
        super(engine);
        this.gap = new vec2(0, 0);
        this.name = 'Layout';
        this.width = width;
        this.height = height;
        this.elements = elements;
        this.click = this.click.bind(this);
        this.updateLayout();
        this.push(elements);
    }
    setGap(x, y) {
        this.gap = new vec2(x, y);
        this.updateLayout();
        return this;
    }
    updateLayout() {
        this.elements.forEach((el, x) => {
            if (!el)
                return;
            const coord = Utils.indexToCoord(x, this.width);
            let pos = el.getPos();
            el.animation.get("move").run();
            el.animation.get("move").setFrames([[pos.x, pos.y, coord.x * el.getWidth() + coord.x * this.gap.x, coord.y * el.getHeight() + coord.y * this.gap.y]]);
            if (x >= this.width * this.height)
                el.hide = true;
        });
    }
    draw() {
        this.engine.ctx.save();
        this.elements.forEach((elm) => elm && elm.draw());
        this.engine.ctx.resetTransform();
        this.engine.ctx.restore();
    }
    update(utime) {
        this.elements.forEach((elm) => elm && elm.update(utime));
    }
    click(target) {
        const index = this.elements.findIndex(p => p == target);
        const playerIndex = this.elements.findIndex(e => e && e.name == "Player");
        const player = this.elements[playerIndex];
        const clickCoord = Utils.indexToCoord(index, this.width);
        const playerCoord = Utils.indexToCoord(playerIndex, this.width);
        const dir = clickCoord.sub(playerCoord);
        if (!dir.x && !dir.y || dir.x > 1 || dir.y > 1 || dir.x == 1 && dir.y == 1 || dir.x == 1 && dir.y == -1 || dir.x == -1 && dir.y == -1 || dir.x == -1 && dir.y == 1)
            return this.playAnim("popup");
        const attackTo = this.elements[Utils.coordToIndex(playerCoord.x + dir.x, playerCoord.y + dir.y, this.width)];
        this.move(player, attackTo);
    }
    push(items) {
        items.map((e) => e.on("click", this.click));
        this.elements.push(...items);
        this.updateLayout();
        return this.elements.length;
    }
    get matrix() {
        return Utils.reshape(this.elements, this.width, this.height);
    }
    move(target, to) {
        const actionResult = target.action(to);
        if (actionResult) {
            const index = this.elements.findIndex(p => p == to);
            const playerIndex = this.elements.findIndex(e => e == target);
            this.elements[index].destroy();
            this.elements[index] = target;
            this.elements[playerIndex] = null;
            this.updateLayout();
        }
        else {
            //this.move(target, to)
            console.log('check');
            this.emit("toView", "GameOver");
        }
    }
    playAnim(animName) {
        if (animName = "popup") {
            const playerIndex = this.elements.findIndex(e => e && e.name == "Player");
            const playerCoord = Utils.indexToCoord(playerIndex, this.width);
            const fourCard = [
                new vec2(0, -1).add(playerCoord),
                new vec2(1, 0).add(playerCoord),
                new vec2(0, 1).add(playerCoord),
                new vec2(-1, 0).add(playerCoord),
            ].filter(e => e.x >= 0 && e.y >= 0).map(e => Utils.coordToIndex(e.x, e.y, this.width));
            console.log(fourCard);
            fourCard.forEach(e => this.elements[e] && this.elements[e].anim(animName, 10));
        }
    }
    destroy() {
        this.elements.forEach(e => e && e.destroy());
        this.elements = [];
    }
}
