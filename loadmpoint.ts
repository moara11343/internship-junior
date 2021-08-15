import IORedis from 'ioredis';
import LuaParams from '../redis-graph/LuaParams';

let redis: IORedis.Redis;

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

export default {
  upload: (_redis: IORedis.Redis) => {
    redis = _redis;
    redis.defineCommand(commandName, { lua });
  },

  load: async (points: { x: number; y: number }[]) => {
    const luaParams = new LuaParams();

    points.forEach((e) => {
      luaParams.add({
        key: String(e.x),
        argv: String(e.y),
      });
    });
    console.log("Point:" + points);

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
