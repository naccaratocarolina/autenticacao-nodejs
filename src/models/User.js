const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");

const User = sequelize.define('User', {
		googleId: {
			 type: DataTypes.STRING
    },

		facebookId: {
			 type: DataTypes.STRING
    },

		name: {
			 type: DataTypes.STRING
     },

		 email: {
			 type: DataTypes.STRING
		 },

     thumbnail: {
			 type: DataTypes.STRING
     },
});

module.exports = User;
