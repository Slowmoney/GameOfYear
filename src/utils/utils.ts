export namespace Utils
{
    export function reshape(array:any[],rows:number, cols:number)
    {
        let n = []
        var copy = array.slice(0); 


        for (var r = 0; r < rows; r++)
        {
            var row = [];
            for (var c = 0; c < cols; c++)
            {
                var i = r * cols + c;
                if (i < copy.length)
                {
                    row.push(copy[i]);
                }
            }
            n.push(row);
        }
        return n
    };
}

