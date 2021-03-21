const FacebookStrategy = require('passport-facebook');
const User = require('../models/User');

const options = {
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: '/auth/facebook/redirect',
  profileFields: ['id', 'displayName', 'picture.type(normal)', 'email']
};

module.exports = (passport) => {
  passport.use(new FacebookStrategy(options, async (accessToken, refreshToken, profile, done) => {
    console.log(profile);

    await User.findOne({ where: { facebookId: profile.id } }).then((currentUser) => {
			if (currentUser) {
				// Ja temos esse usuario na database
				console.log("O usuario eh: ", currentUser);
				done(null, currentUser);
			}

			else {
				// Se nao, criamos um novo usuario na nossa database
				User.create({
					facebookId: profile.id,
					name: profile.displayName,
          email: profile.email,
					thumbnail: profile._json.picture.data.url
				}).then((newUser) => {
					console.log("Usuario criado: ", newUser);
					done(null, newUser);
				});
			}
		});

  }));
}
