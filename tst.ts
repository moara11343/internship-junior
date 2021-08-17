import IORedis from 'ioredis';
import LuaParams from './LuaParams';
  
  let redis: IORedis.Redis;
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
  
  export default {
    upload: (_redis: IORedis.Redis) => {
      redis = _redis;
      redis.defineCommand(commandName, { lua });
    },
  
    run: async (key: string, member: string, seconds: number) => {
      const luaParams = new LuaParams();
      luaParams.add({
        key,
        argv: member,
      });
      luaParams.add({
        key: 'ex',
        argv: seconds.toString(),
      });
  
      const result = await (redis as any)[commandName](
        luaParams.argvCount(),
        luaParams.argvList(),
        (err: any) => {
          if (err) console.log(`lua script error: ${commandName}`, err);
        },
      );
      return result;
    },
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
