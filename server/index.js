// @flow
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportLocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const sessionMiddleware = require('./middlewares/session.middleware');

require('dotenv').config();

module.exports = function (context) {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());

  app.use((req, res, next) => {
    req.context = context;
    next();
  });


  app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new passportLocalStrategy({ usernameField: 'email' }, sessionMiddleware.LocalStrategyHandler(context)));
  passport.deserializeUser(sessionMiddleware.deserializeSession(context));
  passport.serializeUser(sessionMiddleware.serializeSession(context));


  app.use('/auth', require('./routes/authentication.routes'));
  app.use(require('./routes/graphql.routes'));

  app.get('/handshake', (req, res) => {
    console.log(req.user);
    if (!req.user) {
      res.status(401).end();
    } else {
      res.json(req.user);
    }
  });
  return app;
};

