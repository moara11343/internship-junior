"use strict";
exports.__esModule = true;
var default_1 = /** @class */ (function () {
    function default_1(params) {
        this.rawParams = [];
        if (params !== undefined) {
            this.add(params);
        }
    }
    default_1.prototype.add = function (params) {
        if (Array.isArray(params)) {
            for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
                var p = params_1[_i];
                this.rawParams.push(p);
            }
        }
        else {
            this.rawParams.push(params);
        }
    };
    default_1.prototype.argvCount = function () {
        return this.rawParams.length;
    };
    // { [key: string]: number }[]
    default_1.prototype.argvList = function () {
        var list = [];
        for (var _i = 0, _a = this.rawParams; _i < _a.length; _i++) {
            var p = _a[_i];
            list.push(p.key);
        }
        for (var _b = 0, _c = this.rawParams; _b < _c.length; _b++) {
            var p = _c[_b];
            list.push(p.argv);
        }
        return list;
    };
    return default_1;
}());
exports["default"] = default_1;
