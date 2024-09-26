import { StaticScreen } from './StaticScreen';
export declare class PromptSelect extends StaticScreen {
    readonly title: string;
    readonly options: {
        value: string;
        text: string;
    }[];
    readonly multiselect?: boolean;
    static prompt(title: string, options: {
        value: string;
        text: string;
    }[], preselected?: string[], multiselect?: boolean): Promise<any>;
    protected pointer: any;
    protected selected: string[];
    constructor(title: string, options: {
        value: string;
        text: string;
    }[], preselected?: string[], multiselect?: boolean);
    prompt(): Promise<any>;
    protected printOptions(): void;
    protected handleKeys(key: any): void;
}
