"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
class Table {
    constructor(headers, data, minColumnWidth = 0) {
        this.headers = headers;
        this.data = data;
        this.minColumnWidth = minColumnWidth;
    }
    static print(headers, data, minColumnWidth = 0) {
        return new Table(headers, data, minColumnWidth).print();
    }
    print() {
        const data = this.headers.reduce((acc, header, index) => {
            const values = this.data.map(row => (Array.isArray(row) ? row[index] : row[header]).toString());
            return Object.assign(Object.assign({}, acc), { [header]: {
                    values,
                    length: values.reduce((acc, value) => (value.length > acc ? value.length : acc), 0),
                } });
        }, {});
        let content = '\x1b[100m\x1b[4m\x1b[1m';
        for (let i = 0; i < this.headers.length; i++) {
            const header = this.headers[i];
            const len = Math.max(data[header].length, this.minColumnWidth);
            content += i === 0 ? `${Table.fixedLenText(header, len, 2)}` : `| ${Table.fixedLenText(header, len, 2)} `;
        }
        content += '\x1b[0m\n\x1b[4m';
        for (let j = 0; j < this.data.length; j++) {
            for (let i = 0; i < this.headers.length; i++) {
                const header = this.headers[i];
                const len = Math.max(data[header].length, this.minColumnWidth);
                content += i === 0 ? `${Table.fixedLenText(data[header].values[j], len, 2)}` : `| ${Table.fixedLenText(data[header].values[j], len, 2)} `;
            }
            content += '\n';
        }
        content += '\x1b[0m';
        console.log(content);
    }
    static fixedLenText(text, length, addPadding = 0) {
        const padding = (length - text.length) / 2 + addPadding;
        return `${new Array(Math.floor(padding) + 1).join(' ')}${text}${new Array(Math.ceil(padding) + 1).join(' ')}`;
    }
    static fill(length, fill) {
        return new Array(length + 1).join(fill);
    }
}
exports.Table = Table;
