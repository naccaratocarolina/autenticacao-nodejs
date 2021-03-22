const { Router } = require('express');
const { model } = require('../config/sequelize.js');
const passport = require('passport');
const bodyParser = require('body-parser');
const urlEncodeParser = bodyParser.urlencoded({ extended: false });
const router = Router();

router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile');
});

router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email']
}));

router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
    res.redirect('/profile');
});

router.get('/register', (req, res) => {
    res.render('register', { user: req.user });
});

router.post('/register', urlEncodeParser, (req, res) => {
  console.log(req.body);
  res.redirect('/auth/register');
});

module.exports = router;
