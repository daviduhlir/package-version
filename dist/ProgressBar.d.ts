import { StaticScreen } from './StaticScreen';
export declare class ProgressBar extends StaticScreen {
    readonly title: string;
    protected internalValue: number;
    constructor(title: string);
    get value(): number;
    set value(value: number);
    protected renderHandler: () => void;
}
