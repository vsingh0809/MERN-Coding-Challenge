const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  id: Number,
  title: { type: String, index: true },
  price: Number,
  description: { type: String, index: true },
  category: String,
  image: String,
  sold: Boolean,
  dateOfSale: Date
});

module.exports = mongoose.model('Transaction', transactionSchema);