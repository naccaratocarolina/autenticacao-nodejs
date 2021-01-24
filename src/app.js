require('./config/dotenv')();
require('./config/sequelize');

const express = require('express');
const routes = require('./routes/routes');
const app = express();
const port = process.env.PORT;
const passport = require('passport');

require('./middlewares/passport')(passport);
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(routes);
app.use(cors());

app.listen(port, () => {
  console.log(`${process.env.APP_NAME} app listening at ${process.env.APP_URL}`);
});

