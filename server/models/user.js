const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken')
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
        message: '{Value} is not a valid email'
    }
  },
  password: {
      type: String,
      required: true,
      minlength: 6
  },
  tokens : [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'emaio']);
};

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString() //using ES6 property to avoid typing the following access: user.access

  user.tokens.push({access, token});

  // user.save().then(() => {
  //   return token;
  // }).then((token) => {
  //   return token;
  // })
  // above is more clearly read when written the following way
  return user.save().then(() => {
    return token
  });
};

UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,     //using quotes to keep all 3 lines consistent
    'tokens.token': token,  // using quotes becuase there is a `.` in the name of the attribute, view schema to see in detail
    'tokens.access': 'auth'
  });
};

var User = mongoose.model('User', UserSchema);

module.exports = {User};