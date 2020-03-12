const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CustomerSchema = new Schema({
  shopify_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    default: 500
  }
});

module.exports = Customer = mongoose.model('customer', CustomerSchema);
