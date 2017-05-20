var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// schema for products in database
var schema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  cart: {type: Object, required: true},
  address: {type: String, required: true},
  name: {type: String, required: true},
  // This is genrated from Stripe.js
  paymentId: {type: String, required: true}
});

// Specify name of model and schema
module.exports = mongoose.model('Order', schema);
