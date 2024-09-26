"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptText = void 0;
const StaticScreen_1 = require("./StaticScreen");
class PromptText extends StaticScreen_1.StaticScreen {
    constructor(title, pattern) {
        super();
        this.title = title;
        this.pattern = pattern;
        this.onDatahandler = (data) => {
            let value = data.toString();
            value = value.substring(0, value.length - 1);
            process.stdout.moveCursor(0, -1);
            process.stdout.clearLine(0);
            if (this.pattern && !this.pattern.test(value)) {
                this.prompt();
            }
            else {
                this.resolve(value);
            }
        };
    }
    static prompt(title, pattern) {
        return __awaiter(this, void 0, void 0, function* () {
            return new PromptText(title, pattern).prompt();
        });
    }
    prompt() {
        return __awaiter(this, void 0, void 0, function* () {
            this.print();
            process.stdin.once('data', this.onDatahandler);
            return this.await();
        });
    }
    print() {
        let content = `\x1b[1m${this.title}\x1b[0m\n`;
        this.setContent(content);
    }
}
exports.PromptText = PromptText;
