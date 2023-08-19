const debug = require('debug')('server:gettAccessToken.js');
const createAccessTokenInstance = require('./createAccessTokenInstance');

const EXPIRATION_WINDOW_IN_SECONDS = 300;

async function getAccessToken(req, tokenKey = 'service') {
  if(req.user){
    debug(`Checking storage for ${tokenKey} access token...`);
    const storedTokenSet = req.session.tokens[tokenKey];

    if(storedTokenSet) {
      const tokenInstance = await createAccessTokenInstance(storedTokenSet);
      const isExpired = tokenInstance.expired(EXPIRATION_WINDOW_IN_SECONDS);

      debug(`Stored token found. Expired: ${isExpired}`);
      if(isExpired){
        debug('Attempting to refresh access token...');
        try{
          const newToken = await tokenInstance.refresh();

          req.session.tokens[tokenKey] = newToken.token;
          debug(`Token refreshed. expires_in: ${newToken.token.expires_in} (expires_at: ${newToken.token.expires_at})`);
          return newToken.token.access_token;
        } catch(err){
          debug('ERROR: token expired but unable to refresh, err');
          throw err;
        }
      }
      return storedTokenSet.access_token;
    }
    else{
      debug(`Access token with key '${tokenKey} was NOT found.`);
      throw new Error('ACCESS TOKEN NOT FOUND');
    }
  }
  debug('ERROR: access_token not found');
}

module.exports = getAccessToken;