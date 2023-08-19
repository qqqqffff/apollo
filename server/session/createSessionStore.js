const createRedisClient = require('./createRedisClient');
const debug = require('debug')('server:createSessionStore.js');

function createSessionStore(session) {
  const redisClient = createRedisClient();

  if(!redisClient){
    debug('Local env detected, using memorystore for session storage');
    return null;
  }

  const RedisStore = require('connect-redis')(session);

  return new RedisStore({
    client: redisClient
  });
}

module.exports = createSessionStore;