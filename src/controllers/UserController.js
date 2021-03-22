const User = require('../models/User');
const sequelize = require("../config/sequelize");
const Auth = require('../config/auth');

const index = async(req,res) => {
    try {
        const user = await User.findAll();
        return res.status(200).json({user});
    } catch(err) {
        return res.status(500).json({err});
    }
};

const show = async(req,res) => {
    const {id} = req.params;
    try {
        const user = await User.findByPk(id);
        return res.status(200).json({user});
    } catch(err) {
        return res.status(500).json({err});
    }
};

const create = async(req,res) => {
    const generateHash = Auth.generateHash(req.body.password);
    const salt = generateHash.salt;
    const hash = generateHash.hash;

    const newUserData = {
        email: req.body.email,
        salt: salt,
        hash: hash,
    }

    try {
        const user = await User.create(newUserData);
        res.render('profile', { user: user });
    }catch(err){
        return res.status(500).json({err});
    }
};

const update = async(req,res) => {
    const {id} = req.params;
    try {
        const [updated] = await User.update(req.body, { where: { id: id } });

        if(updated) {
            const user = await User.findByPk(id);
            console.log('UDPATED');
            return res.status(200).send(user);
        }

        throw new Error('Usuário não encontrado.');
    } catch(err) {
        return res.status(500).json({err});
    }
};

const destroy = async(req,res) => {
    const {id} = req.params;
    try {
        const deleted = await User.destroy({ where: { id: id } });

        if(deleted) {
            return res.status(200).json("Usuario deletado com sucesso.");
        }

        throw new Error ("Usuario nao encontrado.");
    } catch(err) {
        return res.status(500).json({err});
    }
};

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
}
