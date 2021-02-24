const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");

const User = sequelize.define('User', {
	 googleId: {
        type: DataTypes.STRING
    },

		name: {
         type: DataTypes.STRING
     },

     thumbnail: {
         type: DataTypes.STRING
     },
});

module.exports = User;
