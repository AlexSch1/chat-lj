const util = require('util');
const async = require('async');
const mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;
const crypto = require('crypto');

const User = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  hashPassword: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  }
});

User.methods.enctyptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

User.virtual('password')
    .get(function() {
        return this._plainPassword;
    })
    .set(function(password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashPassword = this.enctyptPassword(password)
    
    });

User.methods.checkPassword = function(password) {
    return this.enctyptPassword(password) === this.hashPassword;
};

User.statics.auth = function(username, password, cb) {
    const User = this;
    async.waterfall([
        function (cb) {
            User.findOne({username}, cb)
        },
        function (user, cb) {
            if (user) {
                if (user.checkPassword(password)) {
                    cb(null, user);
                } else {
                    cb(new AuthError('пароль не верный'));
                }
            } else {
                const user = new User({username, password});
                user.save(function (err) {
                    if (err) return cb(err);
                    cb(null, err);
                })
            }
        }
    ], cb)
}

exports.User = mongoose.model('User', User);

function AuthError( message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, AuthError);

    this.message = message;
}

util.inherits(AuthError, Error);
AuthError.prototype.name = 'AuthError';

exports.AuthError = AuthError;
