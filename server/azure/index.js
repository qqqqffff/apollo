const oidc = require();
const ensureAuthenticated = require('./ensureAuthenticated');
const redirectCallback = require('./redirectCallback');
const verifyCallback = require('./verifyCallback');

exports.setup = setup;
exports.ensureAuthenticated = ensureAuthenticated;

const options = {
  strategyType: 'azure',
  strategyOptions: {
    passReqToCallback: true,
    allowHttpForRedirectUrl: process.env.NODE_ENV === 'local',
    scope: [
      'profile',
      'offline_access',
      'email',
      `${process.env.API_CLIENT_ID}/.default`,
    ],
  },
  verifyCallback
}

function setup(app){
  oidc.setup(app, options, redirectCallback);
}