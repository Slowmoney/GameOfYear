import { ISpriteImg, ISpriteUrl } from "../types";

export namespace spriteLoader {
    export function load(data: ISpriteUrl[]): Promise<ISpriteImg[]>;
    export function load(data: ISpriteUrl): Promise<ISpriteImg>;
    export function load(data: ISpriteUrl | ISpriteUrl[]): Promise<ISpriteImg | ISpriteImg[]> {
        function load(data: ISpriteUrl) {
            return new Promise<ISpriteImg>((resolve) => {
                let img = new Image();
                img.onload = () => {
                    resolve({name:data.name,img:img});
                };
                img.src = data.url;
            });
        }
        if (Array.isArray(data)) {
            return Promise.all(data.map((u) => load(u)));
        } else {
            return load(data);
        }
    }
}

