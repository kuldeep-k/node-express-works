var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var UserSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  dob: { type: Date, default: Date.now },
  education: { type: String },
  occupation: { type: String },
  currentLocation: { type: String },
  permLocation: { type: String }
});
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
