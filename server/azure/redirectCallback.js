function redirectCallback(req, res) {
  const { NODE_ENV } = process.env;
  res.redirect(
    NODE_ENV === 'local' ? 'http://localhost:3000' : req.session.returnTo || '/'
  );
  delete req.session.returnTO;
}
module.export = redirectCallback;