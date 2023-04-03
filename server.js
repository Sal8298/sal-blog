const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helper = require('./utils/helper');

const app = express();
const PORT = process.env.PORT || 3001;


const hbs = exphbs.create({ helper });

//Creates Session parameters.
const sess = {
  secret: 'Super secret secret',
  cookie: {
    // 150 Mins
    maxAge: 9000000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false, alter: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening Now Listening on port '+ PORT + ' http://localhost:3001' ));
});