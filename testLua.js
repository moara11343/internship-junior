"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var ioredis_1 = require("ioredis");
var LuaParams_1 = require("./LuaParams");
// import loadmpoint, * from '../redis-graph/loadmpoint';
// import { upload, load } from '../redis-graph/loadmpoint';
// upload();
// load();
var xPoint = [8, 2, 11, 6, 5, 4, 12, 9, 6, 1];
var yPoint = [3, 10, 3, 6, 8, 12, 1, 4, 9, 14];
var xyPoint = [
    [8, 2, 11, 6, 5, 4, 12, 9, 6, 1],
    [3, 10, 3, 6, 8, 12, 1, 4, 9, 14],
];
var xyPointtest = [
    [8, 3],
    [2, 10],
    [6, 6],
    [5, 8],
    [4, 12],
    [12, 1],
    [9, 4],
    [6, 9],
    [1, 14]
];
// import loadmpoint = require("./loadmpoint");
// import { METHODS } from 'http';
//   const lua = `
//   redis.call('set', 'i', 'sud')
//   redis.call('sadd', KEYS[1], ARGV[1])
//   redis.call('sadd', KEYS[1], 's4ss3')
//   redis.call('expire', KEYS[1], ARGV[2])
//   local members = redis.call('smembers', KEYS[1])
//   redis.call('flushall')
//   return members
// `;
//   const lua = `
//   redis.call('set',KEYS[1],ARGV[1])
//   local v = redis.call('get',KEY[1])
//   return v
// `;
//   const lua = `
//   redis.call('set',KEY[i],ARGV[i])
//   local v = redis.call('get',KEY[1])
//   return v
// `;
function main() {
    return __awaiter(this, void 0, void 0, function () {
        //[8, 2, 11, 6, 5, 4, 12, 9, 6, 1],[3, 10, 3, 6, 8, 12, 1, 4, 9, 14 ]
        //   const result = await (redis as any)[commandName](
        //     10,
        //     ['8','2','11','6','5','4','12','9','6','1','3','10','3','6','8','12','1','4','9','14'],
        //     (err: any) => {
        //       if (err) console.log(`lua script error: ${commandName}`, err);
        //     },
        //   );
        //   console.log(result);
        function load(points) {
            return __awaiter(this, void 0, void 0, function () {
                var luaParams, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            luaParams = new LuaParams_1["default"]();
                            points.forEach(function (e) {
                                var a;
                                var b;
                                for (var i = 0; i < points.length; i++) {
                                    console.log("e1 :", e);
                                    for (var _i = 0, _a = Object.entries(e); _i < _a.length; _i++) {
                                        var _b = _a[_i], q = _b[0], v = _b[1];
                                        console.log("v :", v);
                                        // v.forEach((e) => {
                                        //   a = +e
                                        //   b = +e
                                        //   console.log("e2 :", e," ", a," ",b)
                                        // })
                                        luaParams.add({
                                            key: String(v[0]),
                                            argv: Number(v[1])
                                        });
                                    }
                                }
                            });
                            console.log("Point:" + JSON.stringify(points));
                            return [4 /*yield*/, redis[commandName](luaParams.argvCount(), luaParams.argvList(), function (err) {
                                    if (err)
                                        console.log("lua script error: " + commandName, err);
                                })];
                        case 1:
                            result = _a.sent();
                            console.log("Result: " + result);
                            return [2 /*return*/, result];
                    }
                });
            });
        }
        var lua, redis, commandName, i;
        return __generator(this, function (_a) {
            lua = "\n\n  redis.call('set', 'i', 1)\n\n  for i=1,#KEYS,1 do \n    redis.call('rpush', 'points', KEYS[i])\n    redis.call('rpush', 'points', ARGV[i])\n  end\n \n  redis.call('set', 'j', 'sud')\n\n  local data = redis.call('lrange', 'points')\n  -- data[1] => x point 0\n  -- data[2] => y point 0\n  -- data[3] => x point 1\n  -- data[4] => y point 1\n\n  for i=1,#data,2 do\n    x = data[i]\n    y = data[i+1]\n    if (typeof y === \"number\") || (typeof x === \"number\"){\n      redis.call('keys', '*' )\n    }\n    local a = x + y\n    redis.call('set', 'answer', '1')\n    redis.call('set', 'i', 'sud')\n    -- calculate for avg or whatever\n  end\n\n  redis.call('set', 'u', 'sud')\n\n  return a\n";
            redis = new ioredis_1["default"]();
            commandName = "multiple";
            redis.defineCommand(commandName, { lua: lua });
            // Load Data
            for (i = 0; i < xyPointtest.length; i++) {
                load([{ xy: xyPointtest[i] }]);
            }
            return [2 /*return*/];
        });
    });
}
void main();
console.log("----------------------------------------------------------------");
console.log(xyPointtest[0][0]);
console.log(xyPointtest[0][1]);
console.log(xyPointtest[1][0]);
console.log(xyPointtest[1][1]);
console.log(xyPointtest[2][0]);
console.log(xyPointtest[2][1]);
// loadmpoint.default.load([]);
// Utility to handle graph information with complex methods for public use.
// Point (x,y)
// Line
// Graph X Y
// METHODS
// points 100 point
// query sort by x | y | time
// avgPoint
// maxX minX maxY minY
// bestFitLine => nil |  a, b
