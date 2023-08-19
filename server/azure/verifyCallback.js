const debug = require('debug')('server:verifyCallback.js');
const createAccessTokenInstance = require('../token/createAccessTokenInstance');

async function verifyCallback(
  req,
  _iss,
  _sub,
  profile,
  accessToken,
  _refreshToken,
  params,
  done
){
  if(!profile.oid){
    return done(new Error('No oid found'), null);
  }

  try{
    if(process.env.NODE_ENV === 'local'){
      debug(`API ACCESS TOKEN: ${accessToken}`);
    }

    const tokenInstance = await createAccessTokenInstance(params);

    req.sesion.tokens = {
      service: tokenInstance.token,
    }

    debug('API token set saved in user session');

    const { _json: json, displayName } = profile;

    const { email, name, roles = []} = json;
    const [lastName, firstName] = name.split(', ');

    const user = {
      displayName,
      email,
      name,
      roles,
      firstName,
      lastName,
    };

    debug(`User session being created for user ${user.displayName}...`);

    return done(null, user);
  }catch(error){
    return done(error);
  }
}

module.exports = verifyCallback;