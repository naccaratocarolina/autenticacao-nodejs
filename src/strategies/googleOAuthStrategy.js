const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/User');

const options = {
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: '/auth/google/redirect'
};

module.exports = (passport) => {
	passport.serializeUser((user, done) => {
		done(null, user.id)
	});

	passport.deserializeUser((id, done) => {
		User.findByPk(id).then((user) => {
			done(null, user);
		});
	});

	passport.use(new GoogleStrategy(options, async (accessToken, refreshToken, profile, done) => {
    console.log(profile);

		await User.findOne({ where: { googleId: profile.id } }).then((currentUser) => {
			if (currentUser) {
				// Ja temos esse usuario na database
				console.log("O usuario eh: ", currentUser);
				done(null, currentUser);
			}

			else {
				// Se nao, criamos um novo usuario na nossa database
				User.create({
					googleId: profile.id,
					name: profile.displayName,
					thumbnail: profile._json.picture
				}).then((newUser) => {
					console.log("Usuario criado: ", newUser);
					done(null, newUser);
				});
			}
		});

	}));
};
