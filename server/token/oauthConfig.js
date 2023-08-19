const config = {
  client: {
    id: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET
  },
  auth: {
    tokenHost: process.env.IDP_TOKEN_HOST,
    authorizePath: 'oath2/v2.0/authorize',
    tokenPath: 'oauth2/v2.0/token',
  }
}

module.exports = config;