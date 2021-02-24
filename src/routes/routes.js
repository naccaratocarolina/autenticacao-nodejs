const {  Router } = require('express');
const { model } = require('../config/sequelize.js');
const passport = require('passport');
const router = Router();

router.get('/oauth_login', (req, res) => {
    res.render('login', { user: req.user });
});

router.get('/oauth_logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send('you reached the redirect URI');
});

module.exports = router;
