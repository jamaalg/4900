var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
});

// take password and hash it, generates salt returns encrypted password
userSchema.methods.encryptPassword = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

// Validate password using bcrypt
userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

// Specify name of model and schema
module.exports = mongoose.model('User', userSchema);
