const redis = require('redis');
const cfenv = require('cfenv');
const debug = require('debug')('server:createRedisClient.js');

function createRedisClient() {
  const appEnv = cfenv.getAppEnv();

  if(appEnv.isLocal) {
    return null;
  }

  const redisConfig = {
    url: `rediss://:${process.env.REDIS_PASS}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    legacyMode: true,
  }

  const client = redis.createClient(redisConfig);

  client.on('connect', function () {
    debug('---> connected to redis');
  });

  client.on('ready', function () {
    debug('---> ready to redis');
  })

  client.on('error', function (error) {
    debug(error);
  })

  return client;
}

module.exports = createRedisClient;