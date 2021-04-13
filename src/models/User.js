const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");

const User = sequelize.define('User', {
	email: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;
