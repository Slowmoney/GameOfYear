import { Formula } from './Animation/Formula.js';
import Player from './Elements/Player.js';
import Sprite from './Elements/Sprite.js';
import { LevelGenerator } from './LevelGenerator.js';
import EventEmmiter from './utils/eventEmmiter.js';
import { spriteLoader } from './utils/spriteLoader.js';
import { Utils } from './utils/utils.js';
import vec2 from './utils/vec2.js';
import { GameOver } from './views/GameOver.js';
import Layout from './views/Layout.js';
import { MainMenu } from './views/MainMenu.js';
export default class Game extends EventEmmiter {
    constructor(engine) {
        super();
        this.sprites = [];
        this.spriteUrls = [];
        this.views = [];
        this.selectedView = 'Layout';
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
            { name: 'restart', url: './sprites/buttons/restart.png' },
        ];
        this.changeView = this.changeView.bind(this);
        this.views.push(new MainMenu(this.engine));
        this.views.push(new Layout(this.engine, 3, 3).setGap(10, 10));
        this.views.push(new GameOver(this.engine));
        this.views.forEach((view) => {
            view.on('toView', this.changeView);
        });
        this.update = this.update.bind(this);
        this.toView = this.toView.bind(this);
        this.on('toView', this.toView);
        this.resize = this.resize.bind(this);
        this.engine.on('resize', this.resize);
        spriteLoader.load(this.spriteUrls).then((imgs) => {
            console.log(imgs.map((e) => {
                return new Sprite(this.engine, e.name, e.img);
            }));
            this.main();
        });
    }
    update(utime) {
        this.engine.ctx.clearRect(0, 0, this.engine.el.width, this.engine.el.height);
        this.engine.ctx.fillText(this.selectedView, 10, 10);
        this.views[this.selectedViewIndex].draw();
        this.views[this.selectedViewIndex].update(utime);
        this.prevTime = utime;
        requestAnimationFrame(this.update);
    }
    main() {
        let lvlGen = LevelGenerator.gen(3);
        const layout = this.getView('Layout');
        this.getView('Layout').on('start', (diffucaly) => {
            lvlGen = LevelGenerator.gen(diffucaly);
            this.getView('Layout').destroy();
            const elemLayout = Array(9).fill(null);
            elemLayout[5] = new Player(this.engine, this.getSize());
            /* this.getView('Layout').push(elemLayout); */
            layout.emit("fill", elemLayout);
        });
        this.getView('Layout').on('update', (layout) => {
            if (!layout.elements.every(Boolean)) {
                console.log('addd');
                const nullable = layout.elements.reduce((acc, c, i) => {
                    if (c == null)
                        acc.push(i);
                    return acc;
                }, []);
                let el = layout.elements.find((e) => e && e.name == 'Player');
                if (el) {
                    el.animation.get('move').once('end', (a) => {
                        nullable.forEach((i) => {
                            const coord = Utils.indexToCoord(i, layout.getWidth());
                            const newCard = lvlGen.next().value;
                            if (newCard) {
                                const card = new newCard(this.engine, this.getSize());
                                card.setPos(coord.x * el.getWidth() + coord.x * layout.gap.x, coord.y * el.getHeight() + coord.y * layout.gap.y);
                                card.scale.x = 0;
                                card.scale.y = 0;
                                card.anim('popup');
                                card.animation.get('popup').setTimingFunc((t) => Formula.ease(t - 0.15));
                                card.animation.get('popup').once('end', () => card.animation.get('popup').setDefault());
                                layout.push([card]);
                            }
                        });
                    });
                }
            }
        });
        layout.on("fill", (elements) => {
            console.log("fill", elements);
            let el = elements.find((e) => e && e.name == 'Player');
            elements.map((e, i) => {
                const coord = Utils.indexToCoord(i, layout.getWidth());
                if (e == null) {
                    const newCard = lvlGen.next().value;
                    if (newCard) {
                        const card = new newCard(this.engine, this.getSize());
                        card.setPos(coord.x * el.getWidth() + coord.x * layout.gap.x, coord.y * el.getHeight() + coord.y * layout.gap.y);
                        card.scale.x = 0;
                        card.scale.y = 0;
                        card.anim('popup');
                        card.animation.get('popup').setTimingFunc((t) => Formula.ease(t - 0.15));
                        card.animation.get('popup').once('end', () => card.animation.get('popup').setDefault());
                        layout.push([card]);
                    }
                }
                else {
                    e.setPos(coord.x * el.getWidth() + coord.x * layout.gap.x, coord.y * el.getHeight() + coord.y * layout.gap.y);
                    e.scale.x = 0;
                    e.scale.y = 0;
                    e.anim('popup', 500);
                    e.animation.get('popup').setTimingFunc((t) => Formula.easeInOut(t - 0.15));
                    e.animation.get('popup').once('end', () => e.animation.get('popup').setDefault());
                    layout.push([e]);
                }
            });
        });
        this.getView('Layout').emit("start", 0);
        requestAnimationFrame(this.update);
    }
    changeView(name) {
        this.views[this.selectedViewIndex].destroy();
        this.selectedView = name;
        this.selectedViewIndex = this.views.findIndex((e) => e.name == name);
        if (this.selectedViewIndex == -1) {
            this.selectedViewIndex = 0;
            console.error('NOT VIEW FOUND', name);
        }
        this.emit("toView", name);
    }
    toView(name) {
        if (name == 'Layout') {
            this.getView('Layout').emit("start", 0);
        }
    }
    getView(name) {
        return this.views.find((e) => e.name == name);
    }
    resize() {
        const size = this.getSize();
        console.log(size);
        this.getView('Layout').elements.forEach(e => {
            e.setWidth(size.x);
            e.setHeight(size.y);
        });
        this.getView('Layout').push([]);
    }
    getSize() {
        const size = Math.floor(Math.min(this.engine.el.height / 3 / 16, this.engine.el.width / 3 / 9)) - 2;
        return new vec2(9 * size, 16 * size);
    }
}
