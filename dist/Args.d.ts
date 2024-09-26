export declare function readPackage(): Promise<{
    version: any;
    name: any;
}>;
export declare enum ArgOptionType {
    Any = "any",
    Boolean = "Boolean",
    Number = "Number",
    String = "String"
}
export interface ArgOption {
    long?: string;
    short?: string;
    description?: string;
    type: ArgOptionType;
    required?: boolean;
}
export interface ArgOptionsCollection {
    [name: string]: ArgOption;
}
interface Types {
    [ArgOptionType.Any]: any;
    [ArgOptionType.Boolean]: boolean;
    [ArgOptionType.Number]: number;
    [ArgOptionType.String]: string;
}
export declare class Args {
    static parse<T extends ArgOptionsCollection>(options: T): {
        [K in keyof T]: Types[T[K]['type']];
    };
    static dump(options: ArgOptionsCollection): Promise<void>;
    protected static parseQuotes(input: any): any;
    protected static getAllArgs(): {};
}
export {};
