import IORedis from "ioredis";
import LuaParams from "./LuaParams";
// import 'core-js/es/object/from-entries';

// import loadmpoint, * from '../redis-graph/loadmpoint';

// import { upload, load } from '../redis-graph/loadmpoint';
// upload();
// load();

const xPoint: number[] = [8, 2, 11, 6, 5, 4, 12, 9, 6, 1];
const yPoint: number[] = [3, 10, 3, 6, 8, 12, 1, 4, 9, 14];

const xyPoint: number[][] = [
  [8, 2, 11, 6, 5, 4, 12, 9, 6, 1],
  [3, 10, 3, 6, 8, 12, 1, 4, 9, 14],
];

const xyPointtest: number[][] = [
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

async function main() {
  const lua = `

  redis.call('set', 'i', 1)

  for i=1,#KEYS,1 do 
    redis.call('rpush', 'points', KEYS[i])
    redis.call('rpush', 'points', ARGV[i])
  end
 
  redis.call('set', 'j', 'sud')

  local data = redis.call('lrange', 'points')
  -- data[1] => x point 0
  -- data[2] => y point 0
  -- data[3] => x point 1
  -- data[4] => y point 1

  for i=1,#data,2 do
    x = data[i]
    y = data[i+1]
 --   if (typeof y === "number") || (typeof x === "number"){
 --     redis.call('keys', '*' )
 --   }
    local a = x + y
    redis.call('set', 'answer', '1')
    redis.call('set', 'i', 'sud')
    -- calculate for avg or whatever
  end

  redis.call('set', 'u', 'sud')

  return a
`;

  const redis = new IORedis();

  const commandName = "multiple";
  redis.defineCommand(commandName, { lua });
  //[8, 2, 11, 6, 5, 4, 12, 9, 6, 1],[3, 10, 3, 6, 8, 12, 1, 4, 9, 14 ]
  //   const result = await (redis as any)[commandName](
  //     10,
  //     ['8','2','11','6','5','4','12','9','6','1','3','10','3','6','8','12','1','4','9','14'],
  //     (err: any) => {
  //       if (err) console.log(`lua script error: ${commandName}`, err);
  //     },
  //   );
  //   console.log(result);

  async function load(points: { xy: number[] }[]) {
    const luaParams = new LuaParams();

    points.forEach((e) => {
      var a: number 
      var b: number

      for (let i = 0; i < points.length; i++) {
        console.log("e1 :", e);
        for (const [q, v] of Object.entries(e)) {
          console.log("v :", v);
          // v.forEach((e) => {
          //   a = +e
          //   b = +e
          //   console.log("e2 :", e," ", a," ",b)
          // })
          luaParams.add({
            key: String(v[0]),
            argv: Number(v[1]),
          });
        }
      }
    });
    console.log("Point:" + JSON.stringify(points));

    const result = await (redis as any)[commandName](
      luaParams.argvCount(),
      luaParams.argvList(),
      (err: any) => {
        if (err) console.log(`lua script error: ${commandName}`, err);
      }
    );
    console.log(`Result: ` + result);
    return result;
  }

  // Load Data
  for (let i = 0; i < xyPointtest.length; i++) {
    load([{ xy: xyPointtest[i] }]);
  }
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
