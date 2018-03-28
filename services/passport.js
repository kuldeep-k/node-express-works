const passport = require('passport');
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');
const config = require('../config/config');
const extractJwt = passportJWT.ExtractJwt;

const localStrategy = require('passport-local').Strategy;
const jwtStrategy = require('passport-jwt').Strategy;
const userModel = require('../models/User');

passport.use('local', new localStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, callback) {
  return userModel.findOne({email: email}).then(user => {
    if(!user) {
      return callback(true, false, {msg: 'Incorrect email'})
    }

    return user.comparePassword(password, function (err, isMatch) {
      if (isMatch && !err) {
      // if user is found and password is right create a token
        // return the information including token as JSON
        // res.json({success: true, token: token});
        return callback(false, user, {msg: 'Success'})
      } else {
        return callback(true, false, {msg: 'Authentication failed. Wrong password.'});
      }
    });
  });
}));


passport.use('jwt', new jwtStrategy({
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secret
}, function(jwtPayload, callback) {
  return userModel.findById(jwtPayload.id)
    .then(user => {
      return callback(null, user)
    })
    .catch(err => {
      return callback(err);
    })
}));