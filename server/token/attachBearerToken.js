const debug = require('debug')('server:attachBearerToken.js');
const getAccessToken = require('./getAccessToken');

const attachBearerToken = (pathIncludes, tokenKey) =>
  async (req, res, next) => {
  if(req.path.includes(pathIncludes)) {
    debug('Request for service intercepted, attempting to attach access token...');
    try {
      const accessToken = await getAccessToken(req, tokenKey);
      if (accessToken) {
        req.headers['Authorization'] = `Bearer ${accessToken}`
        debug('Access token attached. Length: ', accessToken.length);
      }
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
};

module.exports = attachBearerToken;