"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressBar = void 0;
const StaticScreen_1 = require("./StaticScreen");
class ProgressBar extends StaticScreen_1.StaticScreen {
    constructor(title) {
        super();
        this.title = title;
        this.internalValue = 0;
        this.renderHandler = () => {
            let content = `${this.title} [\x1b[36m`;
            for (let i = 0; i < 50; i++) {
                if (this.internalValue / 2 > i) {
                    content += '=';
                }
                else {
                    content += ' ';
                }
            }
            content += `\x1b[0m] \x1b[1m${Math.floor(this.internalValue)}%\x1b[0m\n`;
            this.setContent(content);
        };
    }
    get value() {
        return this.internalValue;
    }
    set value(value) {
        this.internalValue = Math.max(Math.min(value, 100), 0);
        this.renderHandler();
    }
}
exports.ProgressBar = ProgressBar;
