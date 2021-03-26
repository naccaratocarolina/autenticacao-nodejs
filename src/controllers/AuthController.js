const Auth = require('../config/auth');
const User = require('../models/User');

const register = async (req, res) => {
  const generateHash = Auth.generateHash(req.body.password);
  const salt = generateHash.salt;
  const hash = generateHash.hash;

  const newUserData = {
      name: req.body.name? req.body.name : null,
      email: req.body.email,
      thumbnail: req.body.thumbnail? req.body.thumbnail : "/assets/kelly_key_thumbnail.png",
      salt: salt,
      hash: hash,
  }

  try {
      const user = await User.create(newUserData);
      const isValid = Auth.verifyPassword(req.body.password, user.dataValues.salt, user.dataValues.hash);
      if (isValid) {
          const token = Auth.generateJsonWebToken(user);
          res.status(200).render('profile', { user: user, token: token });
      }

      res.render('profile', { user: user, token: token });
  } catch(err){
      return res.status(500).render('error', { user: null, message: err});
  }
};

const login = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });

        const isValid = Auth.verifyPassword(req.body.password, user.dataValues.salt, user.dataValues.hash);
        if (isValid) {
            const token = Auth.generateJsonWebToken(user);
            res.status(200).render('profile', { user: user, token: token });
        }
        else {
            res.status(401).render('error', { user: null, message: "Voce entrou com a senha incorreta." });
        }
    } catch (err) {
        res.status(401).render('error', { user: null, message: "Esse usuário não existe." });
    }
};

const getDetails = (req, res) => {
	const token = Auth.getToken(req);
	const loggedUser = Auth.user(token);
  req.user = loggedUser;
	return res.status(201).render('details', { user: loggedUser, token: token });
};

module.exports = {
    register,
    login,
    getDetails
}
