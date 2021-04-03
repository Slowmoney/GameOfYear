import Card from "./Elements/Card.js";
import { IElement } from "./types.js";

export namespace LevelGenerator {
    export function* gen (diffucaly: number)
    {
        const length = diffucaly*3
        let i = 0
        while(true)
        {
            if (i++==length-1) {
                console.log('boss');
            }
            yield Card
        }
        
    }

}