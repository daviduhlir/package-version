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
exports.Args = exports.ArgOptionType = exports.readPackage = void 0;
const path = __importStar(require("path"));
const fs_1 = require("fs");
function readPackage() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const packageJson = JSON.parse(yield fs_1.promises.readFile(path.resolve('./package.json'), 'utf-8'));
            return {
                version: packageJson.version,
                name: packageJson.name,
            };
        }
        catch (e) {
            throw new Error('Unable to read package.json');
        }
    });
}
exports.readPackage = readPackage;
var ArgOptionType;
(function (ArgOptionType) {
    ArgOptionType["Any"] = "any";
    ArgOptionType["Boolean"] = "Boolean";
    ArgOptionType["Number"] = "Number";
    ArgOptionType["String"] = "String";
})(ArgOptionType = exports.ArgOptionType || (exports.ArgOptionType = {}));
class Args {
    static parse(options) {
        const allArgs = Args.getAllArgs();
        const keys = Object.keys(options);
        if (Object.keys(allArgs).length === 1 && allArgs['help']) {
            Args.dump(options).then(() => process.exit());
        }
        const result = {};
        for (const key of keys) {
            const definition = options[key];
            let value;
            let usedKey;
            if (definition.long && typeof allArgs[definition.long] !== 'undefined') {
                value = allArgs[definition.long];
                usedKey = definition.long;
            }
            else if (definition.short && typeof allArgs[definition.short] !== 'undefined') {
                value = allArgs[definition.short];
                usedKey = definition.short;
            }
            else if (typeof allArgs[key] !== 'undefined') {
                value = allArgs[key];
                usedKey = key;
            }
            if (definition.required && typeof value === 'undefined') {
                throw new Error(`Argument ${definition.long ? definition.long : definition.short ? definition.short : key} is required.`);
            }
            if (typeof value !== 'undefined') {
                if (definition.type === ArgOptionType.Number && typeof value !== 'number') {
                    throw new Error(`Argument ${usedKey} should be number.`);
                }
                if (definition.type === ArgOptionType.String) {
                    value = value.toString();
                }
                if (definition.type === ArgOptionType.Boolean) {
                    const valueString = value.toString();
                    if (valueString.toLowerCase() === 'false' || valueString === '0') {
                        value = false;
                    }
                    else {
                        value = true;
                    }
                }
            }
            result[key] = value;
        }
        return result;
    }
    static dump(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const packageJon = yield readPackage();
            console.log(`${packageJon.name}@${packageJon.version}\n`);
            console.log('Arguments:');
            const keys = Object.keys(options);
            for (const key of keys) {
                const definition = options[key];
                const defs = [
                    definition.short ? `-${definition.short}` : undefined,
                    definition.long ? `--${definition.long}` : undefined,
                    !definition.long && !definition.short ? `--${key}` : undefined,
                ]
                    .filter(Boolean)
                    .join(', ');
                console.log(` ${definition.required ? '*' : ' '}${defs} [${definition.type}] ${definition.description}`);
            }
        });
    }
    static parseQuotes(input) {
        const match = input.match(/("([^"]*)")|('([^']*)')|(.*)/);
        return match[2] || match[4] || match[5];
    }
    static getAllArgs() {
        const argsArray = process.argv.slice(2);
        const args = {};
        let currentVar = null;
        while (argsArray.length) {
            const value = argsArray.shift();
            if (!currentVar) {
                if (value.startsWith('--')) {
                    currentVar = value.slice(2);
                }
                else if (value.startsWith('-')) {
                    currentVar = value.slice(1);
                }
                else {
                    currentVar = value;
                }
                if (currentVar) {
                    args[currentVar] = true;
                }
            }
            else if (currentVar) {
                const float = parseFloat(value);
                if (!isNaN(float) && float.toString().length === value.length) {
                    args[currentVar] = float;
                }
                else {
                    args[currentVar] = Args.parseQuotes(value.trim());
                }
                currentVar = null;
            }
        }
        return args;
    }
}
exports.Args = Args;
