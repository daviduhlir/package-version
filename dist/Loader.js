"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loader = exports.SLIDING_ANIMATION = exports.ROTARY_ANIMATION = void 0;
const StaticScreen_1 = require("./StaticScreen");
exports.ROTARY_ANIMATION = ['-', '/', '|', '\\'];
exports.SLIDING_ANIMATION = ['[=   ]', '[ =  ]', '[  = ]', '[   =]', '[  = ]', '[ =  ]'];
class Loader extends StaticScreen_1.StaticScreen {
    constructor(title, animation = exports.SLIDING_ANIMATION, speed = 100) {
        super();
        this.title = title;
        this.animation = animation;
        this.interval = null;
        this.step = 0;
        this.renderHandler = () => {
            this.setContent(`\x1b[1m${this.animation[this.step]}\x1b[0m ${this.title}\n`);
            this.step = (this.step + 1) % this.animation.length;
        };
        this.interval = setInterval(this.renderHandler, speed);
    }
    close() {
        clearInterval(this.interval);
        super.close();
    }
}
exports.Loader = Loader;
