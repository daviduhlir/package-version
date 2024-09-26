export declare class Table<T extends string[]> {
    readonly headers: T;
    readonly data: (any[] | {
        [K in T[number]]: any;
    })[];
    readonly minColumnWidth: number;
    static print<T extends string[]>(headers: T, data: (any[] | {
        [K in T[number]]: any;
    })[], minColumnWidth?: number): void;
    constructor(headers: T, data: (any[] | {
        [K in T[number]]: any;
    })[], minColumnWidth?: number);
    print(): void;
    protected static fixedLenText(text: string, length: number, addPadding?: number): string;
    protected static fill(length: number, fill: string): string;
}
