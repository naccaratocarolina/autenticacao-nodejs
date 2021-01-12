const {  Router } = require('express');
const { model } = require('../config/sequelize.js');

const UserController = require('../controllers/UserController.js');

const router = Router();

// Rotas de Usuario
router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', UserController.create);
router.put('/ users/:id', UserController.update);
router.delete('users/:id', UserController.destroy);

module.exports = router;
