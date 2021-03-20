export default class Entity {
    constructor(engine) {
        this.x = 0;
        this.y = 0;
        this.engine = engine;
    }
    setPos(x, y) {
        this.x = x;
        this.y = y;
    }
}
