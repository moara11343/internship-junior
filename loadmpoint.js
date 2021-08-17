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
const LuaParams_1 = require("../redis-graph/LuaParams");
let redis;
const commandName = 'loadMultiplePoint';
const lua = `
  for i=1,#KEYS,1 do 
    redis.call('rpush', 'points', KEYS[i])
    redis.call('rpush', 'points', ARGV[i])
  end
 
  local data = redis.call('lrange', 'points')
  -- data[1] => x point 0
  -- data[2] => y point 0
  -- data[3] => x point 1
  -- data[4] => y point 1
  for i=1,#data,2 do
    x = data[i] 
    y = data[i+1] 
    -- calculate for avg or whatever
  end

  return true
`;
exports.default = {
    upload: (_redis) => {
        redis = _redis;
        redis.defineCommand(commandName, { lua });
    },
    load: (points) => __awaiter(void 0, void 0, void 0, function* () {
        const luaParams = new LuaParams_1.default();
        points.forEach((e) => {
            luaParams.add({
                key: String(e.x),
                argv: String(e.y),
            });
        });
        console.log("Point:" + points);
        const result = yield redis[commandName](luaParams.argvCount(), luaParams.argvList(), (err) => {
            if (err)
                console.log(`lua script error: ${commandName}`, err);
        });
        return result;
    }),
};
//# sourceMappingURL=loadmpoint.js.map