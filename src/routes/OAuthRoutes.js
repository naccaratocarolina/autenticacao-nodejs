const { Router } = require('express');
const { model } = require('../config/sequelize.js');
const AuthController = require('../controllers/AuthController');
const passport = require('passport');
const router = Router();

router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/register', (req, res) => {
    res.render('register', { user: req.user });
});

router.get('/error', (req, res) => {
    res.render('error');
});

// Google
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile');
});

// Facebook
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email']
}));

router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
    res.redirect('/profile');
});

module.exports = router;
