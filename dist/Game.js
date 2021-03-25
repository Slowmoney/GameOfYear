import Card from './Elements/Card.js';
import Player from './Elements/Player.js';
import Sprite from './Elements/Sprite.js';
import EventEmmiter from './utils/eventEmmiter.js';
import { spriteLoader } from './utils/spriteLoader.js';
import vec2 from './utils/vec2.js';
import Layout from './views/Layout.js';
import { MainMenu } from './views/MainMenu.js';
export default class Game extends EventEmmiter {
    constructor(engine) {
        super();
        this.sprites = [];
        this.spriteUrls = [];
        this.views = [];
        this.selectedView = "Layout";
        this.selectedViewIndex = 1;
        this.engine = engine;
        this.spriteUrls = [
            { name: 'homeBtn', url: './sprites/buttons/1598981465112.png' },
            { name: 'test', url: './sprites/test.jpg' },
            { name: 'test2', url: './sprites/test2.png' },
            { name: 'mega', url: './sprites/mega.png' },
            { name: 'poo', url: './sprites/heroes/1598971053539.png' },
            { name: 'shield', url: './sprites/shield/Overall.png' },
            { name: 'swords', url: './sprites/sword.png' },
            { name: 'health', url: './sprites/health.png' },
        ];
        this.changeView = this.changeView.bind(this);
        this.views.push(new MainMenu(this.engine));
        this.views.push(new Layout(this.engine, 3, 3).setGap(10, 10));
        this.views.forEach(view => {
            view.on("toView", this.changeView);
        });
        this.update = this.update.bind(this);
        spriteLoader.load(this.spriteUrls).then((imgs) => {
            console.log(imgs.map((e) => {
                return new Sprite(this.engine, e.name, e.img);
            }));
            this.main();
        });
    }
    update(utime) {
        this.engine.ctx.clearRect(0, 0, this.engine.el.width, this.engine.el.height);
        this.views[this.selectedViewIndex].draw();
        this.views[this.selectedViewIndex].update(utime);
        this.prevTime = utime;
        requestAnimationFrame(this.update);
    }
    main() {
        const cardSize = new vec2(9 * 10, 16 * 10);
        const elemLayout = [
            new Card(this.engine, cardSize),
            new Card(this.engine, cardSize),
            new Card(this.engine, cardSize),
            new Player(this.engine, cardSize),
            new Card(this.engine, cardSize),
            new Card(this.engine, cardSize),
            new Card(this.engine, cardSize),
            new Card(this.engine, cardSize),
            new Card(this.engine, cardSize),
        ];
        this.views.find(e => e.name == "Layout").push(elemLayout);
        requestAnimationFrame(this.update);
    }
    changeView(name) {
        console.log(this, name);
        this.selectedView = name;
        this.selectedViewIndex = this.views.findIndex(e => e.name == name);
        if (this.selectedViewIndex == -1) {
            this.selectedViewIndex = 0;
            console.error("NOT VIEW FOUND", name);
        }
    }
}
