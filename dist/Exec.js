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
exports.Exec = void 0;
const child_process_1 = require("child_process");
class Exec {
    static cmd(command, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const cmd = child_process_1.spawn(command, args);
                let result = null;
                let error = null;
                cmd.stdout.on('data', data => {
                    if (!result) {
                        result = data;
                    }
                    else {
                        result = Buffer.concat([result, data]);
                    }
                });
                cmd.stderr.on('data', data => {
                    if (!error) {
                        error = data;
                    }
                    else {
                        error = Buffer.concat([error, data]);
                    }
                });
                cmd.on('close', () => {
                    if (error) {
                        reject(error.toString('utf-8'));
                    }
                    else {
                        resolve(result.toString('utf-8'));
                    }
                });
            });
        });
    }
}
exports.Exec = Exec;
