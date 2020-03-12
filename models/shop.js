const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ShopSchema = new Schema({
  shop: {
    type: String,
    required: true
  },
  authToken: {
    type: String,
    required: true
  },
  scope: {
    type: String,
    required: true
  }
});

module.exports = Shop = mongoose.model('shop', ShopSchema);
