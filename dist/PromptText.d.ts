/// <reference types="node" />
import { StaticScreen } from './StaticScreen';
export declare class PromptText extends StaticScreen {
    readonly title: string;
    readonly pattern?: RegExp;
    static prompt(title: string, pattern?: RegExp): Promise<any>;
    constructor(title: string, pattern?: RegExp);
    prompt(): Promise<any>;
    protected print(): void;
    protected onDatahandler: (data: Buffer) => void;
}
