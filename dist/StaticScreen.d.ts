export declare class StaticScreen {
    protected promise: any;
    protected promiseResolver: any;
    protected currentCursorLeft: number;
    protected onKeyHandler?: (key: any) => void;
    protected lines: number;
    protected closed: boolean;
    constructor();
    attachKeyHandler: (onKeyHandler?: (key: any) => void) => void;
    setContent(content: string): void;
    close(): void;
    await(): Promise<any>;
    protected resolve(value: any): void;
    protected clear(): void;
    protected onKeyPress: (data: any, key: any) => void;
}
