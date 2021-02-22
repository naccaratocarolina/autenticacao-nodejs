const GoogleStrategy = require('passport-google-oauth20');

const options = {
	clientID: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	callbackURL: 'google/redirect'
};

module.exports = (passport) => {
	passport.use(new GoogleStrategy(options, async () => {
		// Callback function
	}))
};
