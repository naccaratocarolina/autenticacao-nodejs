const { Router } = require('express');
const { model } = require('../config/sequelize.js');
const UserController = require('../controllers/UserController.js');
const AuthController = require('../controllers/AuthController');
const passport = require('passport');
const router = Router();

// Rotas de Autenticacao
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/getDetails', passport.authenticate('jwt', { session: false }), AuthController.getDetails);

// Rotas de Usuario
router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', UserController.create);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.destroy);

module.exports = router;
