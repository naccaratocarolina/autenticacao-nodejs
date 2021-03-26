const Auth = require('../config/auth');

const setAuthorizationHeader = (req, res, next) => {
  const token = req.query.token;
  req.headers.authorization = "Bearer " + token;
  next();
}

module.exports = setAuthorizationHeader;
