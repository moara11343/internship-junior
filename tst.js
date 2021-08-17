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
const LuaParams_1 = require("./LuaParams");
let redis;
const commandName = 'grp';
const lua = ` 
  -- redis.call('set', KEYS[1], ARGV[3])
  -- redis.call('sadd', KEYS[1], ARGV[1])
  -- redis.call('sadd', KEYS[1], 'aß')
  -- redis.call('expire', KEYS[1], ARGV[2])
  -- local members = redis.call('get', KEYS[1])
  local members = redis.call('set', KEYS[1], ARGV[1])
  redis.call('KEYS','*')

  -- redis.call('flushall')
  return members
`;
exports.default = {
    upload: (_redis) => {
        redis = _redis;
        redis.defineCommand(commandName, { lua });
    },
    run: (key, member, seconds) => __awaiter(void 0, void 0, void 0, function* () {
        const luaParams = new LuaParams_1.default();
        luaParams.add({
            key,
            argv: member,
        });
        luaParams.add({
            key: 'ex',
            argv: seconds.toString(),
        });
        const result = yield redis[commandName](luaParams.argvCount(), luaParams.argvList(), (err) => {
            if (err)
                console.log(`lua script error: ${commandName}`, err);
        });
        return result;
    }),
};
//   const redis = new IORedis();
//   const commandName = 'rdg';
//   redis.defineCommand(commandName, { lua });
//   const result = await (redis as any)[commandName](
//     3,
//     ["i","ii","iii","1","11","111"],
//     (err: any) => {
//       if (err) console.log(`lua script error: ${commandName}`, err);
//     },
//   );
//   console.log(result);
// }
// void main();
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
//# sourceMappingURL=tst.js.map