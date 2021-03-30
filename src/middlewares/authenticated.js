const Auth = require('../config/auth');

const authenticatedMiddleware = (req, res, next) => {
  if(!req.user) res.redirect('auth/login');
  else next();
}

module.exports = authenticatedMiddleware;
