"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class default_1 {
    constructor(params) {
        this.rawParams = [];
        if (params !== undefined) {
            this.add(params);
        }
    }
    add(params) {
        if (Array.isArray(params)) {
            for (const p of params) {
                this.rawParams.push(p);
            }
        }
        else {
            this.rawParams.push(params);
        }
    }
    argvCount() {
        return this.rawParams.length;
    }
    // { [key: string]: number }[]
    argvList() {
        const list = [];
        for (const p of this.rawParams) {
            list.push(p.key);
        }
        for (const p of this.rawParams) {
            list.push(p.argv);
        }
        return list;
    }
}
exports.default = default_1;
//# sourceMappingURL=LuaParams.js.map