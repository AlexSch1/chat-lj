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

exports.User = mongoose.model('User', User);