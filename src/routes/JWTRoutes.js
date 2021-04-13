const { Router } = require('express');
const { model } = require('../config/sequelize.js');
const AuthController = require('../controllers/AuthController');
const setAuthorizationHeader = require('../middlewares/token');
const bodyParser = require('body-parser');
const urlEncodeParser = bodyParser.urlencoded({ extended: false });
const passport = require('passport');
const router = Router();

// Rotas de Autenticacao JWT
router.post('/register', urlEncodeParser , AuthController.register);
router.post('/login', AuthController.login);
router.get('/getDetails', setAuthorizationHeader, passport.authenticate('jwt', { session: false }), AuthController.getDetails);

module.exports = router;
