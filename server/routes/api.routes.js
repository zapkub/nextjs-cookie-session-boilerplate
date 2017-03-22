const router = require('express').Router();
const passport = require('passport');

router.post('/user/login', passport.authenticate('local'), (req, res) => {
  if (!req.user) {
    res.status(401).end();
  } else {
    res.json({ msg: 'Login successful.' });
    res.status(200).end();
  }
});

router.route('/user/logout')
.get(function (req, res) {
  req.logout();
  res.json({ msg: 'Logout successful.' });
  res.status(200).end();
})
.post(function (req, res) {
  req.logout();
  res.json({ msg: 'Logout successful.' });
  res.status(200).end();
})

router.route('/user')
  .get(function (req, res) {
    if (!req.user) {
      res.status(401).end();
    }
    else {
      delete req.user.password;
      res.json(req.user);
      res.status(200).end();
    }
  })
  .post(function (req, res) {
    res.send('Create user ( No session needed )')
  })
  .put(function (req, res) {
    res.send('Update user info by session info')
  })
  .delete(function (req, res) {
    const user = new req.context.User();
    if (!req.user) {
      res.status(401).end();
    } else {
      user.findOneAndRemove({_id: req.user.id}, function (err, todo) {
        console.log("delete successful.")
      });
    }
    res.send('remove user by session info')
  });

module.exports = router;
