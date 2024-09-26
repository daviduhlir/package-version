#!/usr/bin/env node
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
const terminal_ui_1 = require("@david.uhlir/terminal-ui");
const path = __importStar(require("path"));
const fs_1 = require("fs");
const args = terminal_ui_1.Args.parse({
    version: {
        short: 'v',
        long: 'version',
        type: terminal_ui_1.ArgOptionType.String,
        description: 'Type of version incrementation, or custom version',
    },
});
function promptVersion() {
    return __awaiter(this, void 0, void 0, function* () {
        let version;
        const options = [
            { value: 'prerelease', text: 'Prerelease' },
            { value: 'prepatch', text: 'Prepatch' },
            { value: 'preminor', text: 'Preminor' },
            { value: 'premajor', text: 'Premajor' },
            { value: 'patch', text: 'Patch (\x1b[33mDefault\x1b[0m)' },
            { value: 'minor', text: 'Minor' },
            { value: 'major', text: 'Major' },
            { value: 'custom', text: 'Custom' },
        ];
        version = yield terminal_ui_1.PromptSelect.prompt('Please select version:', options, ['patch']);
        if (version === 'custom') {
            version = yield terminal_ui_1.PromptText.prompt('Enter custom version:', /^([0-9]{1,2})\.([0-9]{1,2})\.([0-9]{1,2})(-([0-9A-Za-z-_.]{1,}))?$/);
        }
        return version;
    });
}
function error(text) {
    console.error('Error', text);
    process.exit();
}
function readVersion() {
    return __awaiter(this, void 0, void 0, function* () {
        let version;
        try {
            version = JSON.parse(yield fs_1.promises.readFile(path.resolve('./package.json'), 'utf-8')).version;
        }
        catch (e) {
            error('Previous version can not be loaded from package.json');
        }
        return version;
    });
}
;
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Previous version:', yield readVersion());
            const version = args.version ? args.version : yield promptVersion();
            yield terminal_ui_1.Exec.cmd('npm', 'version', version);
            console.log('New version:', yield readVersion());
            process.exit();
        }
        catch (e) {
            console.log(e);
            error(`Failed to change version: ${e.message}`);
        }
    });
})();
