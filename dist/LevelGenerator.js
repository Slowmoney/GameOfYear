import Card from "./Elements/Card.js";
export var LevelGenerator;
(function (LevelGenerator) {
    function* gen(diffucaly) {
        const length = diffucaly * 3;
        let i = 0;
        while (true) {
            if (i++ == length - 1) {
                console.log('boss');
            }
            yield Card;
        }
    }
    LevelGenerator.gen = gen;
})(LevelGenerator || (LevelGenerator = {}));
