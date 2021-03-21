import vec2 from "./vec2.js";
export var Utils;
(function (Utils) {
    function reshape(array, rows, cols) {
        let n = [];
        let copy = array.slice(0);
        for (let r = 0; r < rows; r++) {
            let row = [];
            for (let c = 0; c < cols; c++) {
                let i = r * cols + c;
                if (i < copy.length) {
                    row.push(copy[i]);
                }
            }
            n.push(row);
        }
        return n;
    }
    Utils.reshape = reshape;
    ;
    function indexToCoord(index, width) {
        let x = index % width;
        let y = Math.floor((index / width));
        return new vec2(x, y);
    }
    Utils.indexToCoord = indexToCoord;
    function coordToIndex(x, y, width) {
        return x + y * width;
    }
    Utils.coordToIndex = coordToIndex;
})(Utils || (Utils = {}));
