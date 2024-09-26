import { StaticScreen } from './StaticScreen';
export declare const ROTARY_ANIMATION: string[];
export declare const SLIDING_ANIMATION: string[];
export declare class Loader extends StaticScreen {
    readonly title: string;
    readonly animation: string[];
    protected interval: any;
    protected step: number;
    constructor(title: string, animation?: string[], speed?: number);
    close(): void;
    protected renderHandler: () => void;
}
