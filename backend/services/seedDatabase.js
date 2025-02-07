const axios = require('axios');
const Transaction = require('../models/Transaction');

const seedDatabase = async () => {
  try {
    // Check if the database is already seeded
    const count = await Transaction.countDocuments();
    if (count > 0) {
      console.log('Database already seeded.');
      return;
    }

    // Fetch data from the third-party API
    const { data } = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');

    // Transform and insert data into the database
    const transactions = data.map((item) => ({
      ...item,
      dateOfSale: new Date(item.dateOfSale),
    }));

    await Transaction.insertMany(transactions);
    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = { seedDatabase };