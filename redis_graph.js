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
const ioredis_1 = require("ioredis");
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
    return __awaiter(this, void 0, void 0, function* () {
        //   const lua = ` 
        //   redis.call('set','i','sud')
        //   local v = redis.call('get','i')
        //   return v
        // `;
        const lua = ` 
  redis.call('set', 'i', 'sud')
  -- redis.call('sadd', KEYS[1], ARGV[1])
  -- redis.call('sadd', KEYS[1], 's4ss3')
  -- redis.call('expire', KEYS[1], ARGV[2])
  local members = redis.call('keys', '*')
  -- redis.call('flushall')
  return members
`;
        const redis = new ioredis_1.default();
        const commandName = 'saddex';
        redis.defineCommand(commandName, { lua });
        const result = yield redis[commandName](1, ['1a', '2b'], (err) => {
            if (err)
                console.log(`lua script error: ${commandName}`, err);
        });
        console.log(result);
    });
}
void main();
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
//# sourceMappingURL=redis_graph.js.map