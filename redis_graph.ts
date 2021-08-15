import IORedis from 'ioredis';
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

  const redis = new IORedis();

  const commandName = 'saddex';
  redis.defineCommand(commandName, { lua });

  const result = await (redis as any)[commandName](
    1,
    ['1a','2b'],
    (err: any) => {
      if (err) console.log(`lua script error: ${commandName}`, err);
    },
  );
  console.log(result);
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
