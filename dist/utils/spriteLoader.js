export var spriteLoader;
(function (spriteLoader) {
    function load(data) {
        function load(data) {
            return new Promise((resolve) => {
                let img = new Image();
                img.onload = () => {
                    resolve({ name: data.name, img: img });
                };
                img.src = data.url;
            });
        }
        if (Array.isArray(data)) {
            return Promise.all(data.map((u) => load(u)));
        }
        else {
            return load(data);
        }
    }
    spriteLoader.load = load;
})(spriteLoader || (spriteLoader = {}));
