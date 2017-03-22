const router = require('express').Router();
const passport = require('passport');
const User = require('../models/User.model');
const validator = require("email-validator");

router.post('/user/login', passport.authenticate('local'), (req, res) => {
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized.' }).end();
  } else {
    res.json({ msg: 'Login successful.' }).status(200).end();
  }
});

router.route('/user/logout')
.get(function (req, res) {
  req.logout();
  res.json({ msg: 'Logout successful.' }).status(200).end();
})
.post(function (req, res) {
  req.logout();
  res.json({ msg: 'Logout successful.' }).status(200).end();
})

router.route('/user')
  .get(function (req, res) {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized.' }).end();
    }
    else {
      delete req.user.password;
      res.json(req.user).status(200).end();
    }
  })
  .post(async function (req, res) {
    if(!req.body.email || !req.body.password || !req.body.confirmpassword) {
      res.status(400).json({ error: 'Invalid parameter.' }).end();
    }

    // validate email
    if(validator.validate(req.body.email) === false) {
      res.status(400).json({ error: 'Invalid Email.' }).end();
    }

    // password must contain at least 6 charactor
    if(req.body.password.length < 6){
      res.status(400).json({ error: 'Password must contain at least 6 charactor.' }).end();
    }

    // Password does not match confirm password.
    if(req.body.password != req.body.confirmpassword){
      res.status(400).json({ error: 'Password does not match confirm password.' }).end();
    }

    let firstName = req.body.firstName ? req.body.firstName : "";
    let lastName =  req.body.lastName ? req.body.lastName : "";
    let data_user = {
      email: req.body.email,
      password: req.body.password,
      firstName,
      lastName
    }

    try {
        const user = new req.context.User();
        const result = await user.createUser(data_user);
        res.status(201).json({ msg: 'create user successful.' }).end();
    } catch (e) {
        res.status(400).json({ error: 'Email is already been used'}).end();
    }
  })
  .put(function (req, res) {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized.' }).end();
    }
    else {
      if(!req.body.firstName && !req.body.lastName) {
        res.status(400).json({ error: 'Invalid parameter.' }).end();
      }

      let data_update = {};

      if(req.body.firstName) {
        data_update.firstName = req.body.firstName;
      }

      if(req.body.lastName) {
        data_update.lastName = req.body.lastName;
      }

      User.model.update({email: req.user.email}, {$set:data_update}, async function() {
        await res.json({ msg: 'Update user successful.' }).status(200).end();
      });
    }
  })
  .delete(function (req, res) {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized.' }).end();
    }
    else {
      User.model.remove({email: req.user.email}, async function(err, userResult) {
        await res.json({ msg: 'Delete user successful.' });
        res.status(200).end();
      });
    }
  });

module.exports = router;
