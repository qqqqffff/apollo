const {
  AuthorizationCode
} = require('simple-oauth2');
const config = require('.oauthConfig');

function createAccessTokenInstance(params) {
  const client = new AuthorizationCode(config);

  const tokenInstance = client.createToken(params);

  return tokenInstance;
}

module.exports = createAccessTokenInstance;