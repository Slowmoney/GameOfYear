import Engine from './Engine.js';
import Game from './Game.js';
console.log('start');
class main {
    constructor() {
        this.engine = new Engine('main');
        this.game = new Game(this.engine);
    }
}
new main();
