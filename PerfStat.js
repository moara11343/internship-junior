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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Perf = exports.perfReport = exports.getPerfStat = exports.clearPerfReport = exports.perfReportUpload = void 0;
const LuaParams_1 = require("./LuaParams");
let redis;
const commandName = 'reportPerfStat';
const lua = `  
redis.call('hincrby', 'perf_stat', string.format('%s:%s:count',ARGV[1],ARGV[2]), '1')
redis.call('hincrby', 'perf_stat', string.format('%s:%s:sum',ARGV[1],ARGV[2]), ARGV[3])
redis.call('hincrby', 'perf_stat', string.format('%s:%s:min',ARGV[1],ARGV[2]), '0')
redis.call('hincrby', 'perf_stat', string.format('%s:%s:max',ARGV[1],ARGV[2]), '0')

local min = redis.call('hget', 'perf_stat', string.format('%s:%s:min',ARGV[1],ARGV[2]))
local max = redis.call('hget', 'perf_stat', string.format('%s:%s:max',ARGV[1],ARGV[2]))
if tonumber(ARGV[3])<tonumber(min) or min=='0' then
  redis.call('hset', 'perf_stat', string.format('%s:%s:min',ARGV[1],ARGV[2]), ARGV[3])
end
if tonumber(ARGV[3])>tonumber(max) then
    redis.call('hset', 'perf_stat', string.format('%s:%s:max',ARGV[1],ARGV[2],ARGV[3]), ARGV[3])
end
`;
const perfReportUpload = (_redis) => {
    redis = _redis;
    redis.defineCommand(commandName, { lua });
};
exports.perfReportUpload = perfReportUpload;
const clearPerfReport = () => __awaiter(void 0, void 0, void 0, function* () {
    yield redis.del('perf_stat');
});
exports.clearPerfReport = clearPerfReport;
const getPerfStat = () => __awaiter(void 0, void 0, void 0, function* () { return redis.hgetall('perf_stat'); });
exports.getPerfStat = getPerfStat;
const perfReport = (topic, source, ms) => __awaiter(void 0, void 0, void 0, function* () {
    const luaParams = new LuaParams_1.default();
    luaParams.add({
        key: 'topic',
        argv: topic,
    });
    luaParams.add({
        key: 'source',
        argv: source,
    });
    luaParams.add({
        key: 'ms',
        argv: ms.toString(),
    });
    const result = yield redis[commandName](luaParams.argvCount(), luaParams.argvList(), (err) => {
        if (err)
            console.log(`lua script error: ${commandName}`, err);
    });
    return result;
});
exports.perfReport = perfReport;
class Perf {
    constructor(topic, source) {
        this.topic = topic;
        this.source = source;
        this.start = Date.now();
    }
    report(x) {
        const ms = Date.now() - this.start;
        void exports.perfReport(this.topic, this.source, ms);
        return x;
    }
}
exports.Perf = Perf;
//# sourceMappingURL=PerfStat.js.map