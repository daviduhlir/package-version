"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.StaticScreen = void 0;
const readline = __importStar(require("readline"));
class StaticScreen {
    constructor() {
        this.promise = null;
        this.promiseResolver = null;
        this.currentCursorLeft = 0;
        this.closed = false;
        this.attachKeyHandler = (onKeyHandler) => {
            this.onKeyHandler = onKeyHandler;
            readline.emitKeypressEvents(process.stdin);
            process.stdin.setRawMode(true);
            process.stdin.addListener('keypress', this.onKeyPress);
        };
        this.onKeyPress = (data, key) => {
            if (key.name === 'c' && key.ctrl) {
                process.exit();
            }
            if (this.onKeyHandler) {
                this.onKeyHandler(key);
            }
        };
        this.promise = new Promise(resolve => (this.promiseResolver = resolve));
    }
    setContent(content) {
        if (this.closed) {
            return;
        }
        this.clear();
        process.stdout.write(content);
        this.lines = content.split('\n').length;
    }
    close() {
        this.clear();
        if (this.onKeyHandler) {
            process.stdin.setRawMode(false);
            process.stdin.removeListener('keypress', this.onKeyPress);
            readline.emitKeypressEvents(process.stdout);
        }
        this.promiseResolver();
        this.closed = true;
    }
    await() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.promise;
        });
    }
    resolve(value) {
        this.promiseResolver(value);
        this.close();
    }
    clear() {
        process.stdout.moveCursor(-this.currentCursorLeft, -(this.lines - 1));
        process.stdout.clearScreenDown();
        this.currentCursorLeft = 0;
    }
}
exports.StaticScreen = StaticScreen;
