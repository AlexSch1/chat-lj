var express = require('express');
var router = express.Router();
const User = require("../models/User").User;
const HttpError = require('../error');
const ObjectID = require('mongodb').ObjectID;
/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, (err, users) => {
    if (err) {
      return next(err);
    }
    res.json(users);

  })
});
router.get('/:id', function(req, res, next) {
  let id;
  try {
    id = new ObjectID(req.params.id);

  } catch (e) {
    return next(404);
  }
  User.findById(req.params.id, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      next(new HttpError(404, 'User not found'))
    }
    res.json(user);

  })
});

module.exports = router;
