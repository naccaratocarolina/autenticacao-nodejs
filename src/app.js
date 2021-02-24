require('./config/dotenv')();
require('./config/sequelize');
const path = require('path');
const cors = require('cors');
const express = require('express');
const routes = require('./routes/routes');
const app = express();
const port = process.env.PORT;

// Setup JWT Strategy
const passport = require('passport');
require('./strategies/jwtStrategy')(passport);
app.use(passport.initialize());

// Setup OAuth Google Strategy
require('./strategies/googleOAuthStrategy')(passport);

// Setup das views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/'));

app.get('/', (req, res) => {
    res.render('home');
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.listen(port, () => {
  console.log(`${process.env.APP_NAME} app listening at ${process.env.APP_URL}`);
});
