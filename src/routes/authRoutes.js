const { Router } = require('express');
const { model } = require('../config/sequelize.js');
const UserController = require('../controllers/UserController.js');
const AuthController = require('../controllers/AuthController');
const bodyParser = require('body-parser');
const urlEncodeParser = bodyParser.urlencoded({ extended: false });
const passport = require('passport');
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

// Rotas de Autenticacao
router.post('/register', urlEncodeParser , AuthController.register);
router.post('/login', AuthController.login);
router.get('/getDetails', passport.authenticate('jwt', { session: false }), AuthController.getDetails);

// Rotas de Usuario
router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', UserController.create);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.destroy);

module.exports = router;


module.exports = router;
