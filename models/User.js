var mongoose = require('mongoose');
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
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
