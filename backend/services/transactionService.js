const Transaction = require('../models/Transaction');

// Fetch transactions with search and pagination
const getTransactions = async (month, page = 1, perPage = 10, search = '') => {
  try {
    const query = {};

    // Filter by month
    if (month) {
      query.$expr = { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] };
    }

    // Search by title, description, or price
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { price: isNaN(search) ? null : Number(search) },
      ].filter(Boolean);
    }

    // Fetch paginated transactions
    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(Number(perPage));

    // Get total count for pagination
    const total = await Transaction.countDocuments(query);

    return {
      data: transactions,
      meta: {
        page: Number(page),
        perPage: Number(perPage),
        total,
      },
    };
  } catch (error) {
    throw new Error(`Error fetching transactions: ${error.message}`);
  }
};

module.exports = { getTransactions };