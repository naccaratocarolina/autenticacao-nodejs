const Auth = require('../config/auth');
const User = require('../models/User');
const UserController = require('../controllers/UserController');

const register = (req, res) => {
  UserController.create(req, res);
};

const login = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });

        const isValid = Auth.verifyPassword(req.body.password, user.dataValues.salt, user.dataValues.hash);
        if (isValid) {
            const token = Auth.generateJsonWebToken(user);
            res.status(200).json({
                message: "Usuário logado com sucesso.",
                token: token
            });
        }
        else {
            res.status(401).json({ message: "Voce entrou com a senha incorreta." });
        }
    } catch (err) {
        res.status(401).json({ message: "Esse usuário não existe." });
    }
};

const getDetails = (req, res) => {
	const token = Auth.getToken(req);
	const loggedUser = Auth.user(token);
	return res.status(201).json({ user: loggedUser});
};

module.exports = {
    register,
    login,
    getDetails
}
