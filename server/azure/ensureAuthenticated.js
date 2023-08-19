const debug = require('debug')('server:ensureAuthenticated');
const url = require('url');

function ensureAuthenticated(req, res, next) {
  debug('Checking if user is already logged in...');
  if(req.isAuthenticated()){
    debug('User is authenticated');
    return next();
  }

  const loginPath = process.env.LOGIN_PATH || '/auth';

  if(req.originalUrl !== loginPath){
    req.session.returnTo = req.originalUrl;
    if(req.xhr || req.headers.accept.indexOf('json') > -1) {
      debug('User session has expired or does not exist.');

      res.status(403).json({
        message: 'User session has expired or dne',
        location: url.format({
          protocol: req.protocol,
          host: req.get('host'),
          port: process.env.PORT || '3001',
          pathname: loginPath,
        }),
      });
    } else {
      debug(`Redirecting user to ${loginPath}`);
      res.redirect(loginPath);
    }
  }
  else{
    next();
  }
}

module.exports = ensureAuthenticated();