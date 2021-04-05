var express = require('express');
var router = express.Router();
const User = require('../models/User').User;
const AuthError = require('../models/User').AuthError;
const HttpError = require('../error/index').HttpError;

router.get('/', function(req, res, next) {
  res.render('login')
});
router.post('/', function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, password)

  User.auth(username, password, function (err, user) {
    console.log(err, user)
    req.session.user = null;
    if (err) {
      if (err instanceof AuthError) {
        return next(new HttpError(403, res.message))
      } else {
        return next(err);
      }

    }

    req.session.user = user._id;
    res.send({});
  })
});


module.exports = router;
