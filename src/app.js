require('./config/dotenv')();
require('./config/sequelize');
const User = require('./models/User');
const path = require('path');
const express = require('express');
const { check, validationResult } = require('express-validator');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const app = express();
const port = process.env.PORT;

// Setup das views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/'));
app.use(express.static(path.join(__dirname, 'public')));

// Setup Cookie-Session Authentication
const cookieSession = require('cookie-session');
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000, // 1 dia em milisegundos
  keys: [process.env.COOKIE_KEY], // chave para encriptar e decriptar um cookie
}));

// Importando o Passport globalmente
const passport = require('passport');

//Setup JWT Strategy
require('./strategies/jwtStrategy')(passport);

// Setup OAuth Google Strategy
require('./strategies/googleOAuthStrategy')(passport);

// Setup OAuth Facebook Strategy
require('./strategies/facebookOauthStrategy')(passport);

// Serializando e deserializando usuarios
passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  User.findByPk(id).then((user) => {
    done(null, user);
  });
});

// Inicializando o Passport
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.listen(port, () => {
  console.log(`${process.env.APP_NAME} app listening at ${process.env.APP_URL}`);
});
