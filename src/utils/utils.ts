import vec2 from "./vec2.js";

export namespace Utils
{
    export function reshape(array:any[],rows:number, cols:number)
    {
        let n = []
        let copy = array.slice(0); 


        for (let r = 0; r < rows; r++)
        {
            let row = [];
            for (let c = 0; c < cols; c++)
            {
                let i = r * cols + c;
                if (i < copy.length)
                {
                    row.push(copy[i]);
                }
            }
            n.push(row);
        }
        return n
    };
    export function indexToCoord (index:number,width:number)
    {
        let x = index % width
        let y = Math.floor((index / width))
        return new vec2(x,y)
    }
    export function coordToIndex (x:number,y:number, width:number)
    {
        return x+y*width
    }
    export function clamp (val:number,min:number,max:number)
    {
        return Math.max(min,Math.min(max,val));
    }
}

