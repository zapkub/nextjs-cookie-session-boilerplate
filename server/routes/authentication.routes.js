const router = require('express').Router();
const AuthenticationController = require('../controller/authentication.controller');
const passport = require('passport');

router.post('/register', AuthenticationController.register);
router.post('/login',passport.authenticate('local'), AuthenticationController.login);

module.exports = router;