var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
});

// Specify name of model and schema
module.exports = mongoose.model('User', userSchema);
