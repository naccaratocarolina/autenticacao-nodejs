const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");

const User = sequelize.define('User', {
	email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    salt: {
        type: DataTypes.STRING
    },

    hash: {
        type: DataTypes.STRING
    },
});

module.exports = User;
