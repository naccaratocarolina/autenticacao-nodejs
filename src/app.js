require('./config/dotenv')();
require('./config/sequelize');
const cors = require('cors');
const express = require('express');
const routes = require('./routes/routes');
const app = express();
const port = process.env.PORT;

const passport = require('passport');
require('./strategies/jwtStrategy')(passport);
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(routes);
app.use(cors());

app.listen(port, () => {
  console.log(`${process.env.APP_NAME} app listening at ${process.env.APP_URL}`);
});
