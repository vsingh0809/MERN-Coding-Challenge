const Transaction = require('../models/Transaction');
const axios = require('axios');

const seedDatabase = async () => {
  const count = await Transaction.countDocuments();
  if (count === 0) {
    const { data } = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    await Transaction.insertMany(data.map(item => ({
      ...item,
      dateOfSale: new Date(item.dateOfSale)
    })));
  }
};

module.exports = { seedDatabase };