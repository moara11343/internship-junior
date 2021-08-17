import IORedis from 'ioredis';
import LuaParams from './LuaParams';

export type PerfSource = 'redis' | 'db';

export type PerfStat = Record<
  string,
  Record<
    PerfSource,
    {
      count: number;
      min: number;
      max: number;
      avg: number; // round
    }
  >
>;

let redis: IORedis.Redis;

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

export const perfReportUpload = (_redis: IORedis.Redis) => {
  redis = _redis;
  redis.defineCommand(commandName, { lua });
};

export const clearPerfReport = async () => {
  await redis.del('perf_stat');
};
export const getPerfStat = async () => redis.hgetall('perf_stat');

export const perfReport = async (
  topic: string,
  source: PerfSource,
  ms: number,
) => {
  const luaParams = new LuaParams();
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
  const result = await (redis as any)[commandName](
    luaParams.argvCount(),
    luaParams.argvList(),
    (err: any) => {
      if (err) console.log(`lua script error: ${commandName}`, err);
    },
  );
  return result;
};

export class Perf {
  start: number;
  constructor(public topic: string, public source: PerfSource) {
    this.start = Date.now();
  }

  public report<T>(x: T): T {
    const ms = Date.now() - this.start;
    void perfReport(this.topic, this.source, ms);
    return x;
  }
}
