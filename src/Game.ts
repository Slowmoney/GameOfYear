import Card from './Elements/Card.js';
import Player from './Elements/Player.js';
import Sprite from './Elements/Sprite.js';
import Engine from './Engine.js';
import { IMenu, ISpriteUrl } from './types.js';
import { spriteLoader } from './utils/spriteLoader.js';
import vec2 from './utils/vec2.js';
import Layout from './views/Layout.js';

export default class Game
{
    prevTime: number;
    view: IMenu;
    engine: Engine;
    sprites: string[] = [];
    spriteUrls: ISpriteUrl[] = [];

    constructor(engine: Engine)
    {
        this.engine = engine;
        this.engine.on("click",this.click)
        this.spriteUrls = [
            { name: 'homeBtn', url: './sprites/buttons/1598981465112.png' },
            { name: 'test', url: './sprites/test.jpg' },
            { name: 'test2', url: './sprites/test2.png' },
            { name: 'mega', url: './sprites/mega.png' },
            { name: 'poo', url: './sprites/heroes/1598971053539.png' },
        ];
        this.view = new Layout(this.engine, 3, 3).setGap(10, 10);
        this.update = this.update.bind(this);
        console.log(this.view);

        //this.engine.ctx.createPattern;
        spriteLoader.load(this.spriteUrls).then((imgs) =>
        {
            console.log(
                imgs.map((e) =>
                {
                    return new Sprite(this.engine, e.name, e.img);
                })
            );
            this.main()
        });
    }
    update (utime: number)
    {
        this.engine.ctx.clearRect(0, 0, this.engine.el.width, this.engine.el.height);
        let homeBtn = Sprite.all.get('homeBtn');

        //this.engine.ctx.fillStyle = homeBtn.sprite;
        //this.engine.ctx.fillRect(0, 0, homeBtn.width, homeBtn.height);

        // this.engine.ctx.fillStyle = homeBtn.sprite;
        //this.engine.ctx.fillRect(50, 0, homeBtn.width, homeBtn.height);

        //console.log(utime - this.prevTime);
        this.view.draw();
        this.view.update(utime);

        this.prevTime = utime;
        requestAnimationFrame(this.update);
    }

    main ()
    {
        

        const cardSize = new vec2(9 * 10, 16 * 10)
        this.view.elements.push(new Card(this.engine, cardSize));
        this.view.elements.push(new Card(this.engine, cardSize));
        this.view.elements.push(new Card(this.engine, cardSize));
        this.view.elements.push(new Player(this.engine, cardSize));
        this.view.elements.push(new Card(this.engine, cardSize));
        this.view.elements.push(new Card(this.engine, cardSize));
        this.view.elements.push(new Card(this.engine, cardSize));
        this.view.update(0);

        requestAnimationFrame(this.update);
    }
    click (e:MouseEvent)
    {
        console.log(e, this);

    }

    
}
