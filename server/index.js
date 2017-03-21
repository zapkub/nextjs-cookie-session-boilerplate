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

  app.get('/handshake', (req, res) => {
    console.log(req.user);
    if (!req.user) {
      res.status(401).end();
    } else {
      res.json(req.user);
    }
  });

  app.post('/api/user/login', (req, res) => {
    res.send('Login with session');
  });

  app.route('/api/user/logout')
  .get(function (req, res) {
    req.logout();
    res.status(200).end();
  })
  .post(function (req, res) {
    req.logout();
    res.status(200).end();
  })

  app.route('/api/user')
    .get(function (req, res) {
      res.send('Get user info by session info')
    })
    .post(function (req, res) {
      res.send('Create user ( No session needed )')
    })
    .put(function (req, res) {
      res.send('Update user info by session info')
    })
    .delete(function (req, res) {
      res.send('remove user by session info')
    });

    return app;
};
