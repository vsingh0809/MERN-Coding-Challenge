// const Transaction = require('../models/Transaction');
// /*const { getTransactions } = require('../services/transactionService');

// const listTransactions = async (req, res) => {
//   try {
//     const { month, page = 1, perPage = 10, search = '' } = req.query;
//     const result = await getTransactions(month, page, perPage, search);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = { listTransactions }; */

// const listTransactions = async (req, res) => {
//   try {
//     const { month, page = 1, perPage = 10, search } = req.query;
//     const query = {};

//     if (month) {
//       query.$expr = { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] };
//     }

//     if (search) {
//       query.$or = [
//         { title: { $regex: search, $options: 'i' } },
//         { description: { $regex: search, $options: 'i' } },
//         { price: isNaN(search) ? null : Number(search) },
//       ].filter(Boolean);
//     }

//     const transactions = await Transaction.find(query)
//       .skip((page - 1) * perPage)
//       .limit(Number(perPage));

//     const total = await Transaction.countDocuments(query);

//     res.json({
//       data: transactions,
//       meta: {
//         page: Number(page),
//         perPage: Number(perPage),
//         total,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = { listTransactions };
const Transaction = require('../models/Transaction');

const listTransactions = async (req, res) => {
  try {
    const { month, page = 1, perPage = 10, search } = req.query;
    const query = {};

    if (month) {
      const monthNumber = parseInt(month, 10);
      if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
        return res.status(400).json({ error: 'Invalid month value' });
      }
      query.$expr = { $eq: [{ $month: '$dateOfSale' }, monthNumber] };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { price: isNaN(Number(search)) ? null : Number(search) },
      ].filter(Boolean);
    }

    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(Number(perPage));

    const total = await Transaction.countDocuments(query);

    res.json({
      data: transactions,
      meta: {
        page: Number(page),
        perPage: Number(perPage),
        total,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { listTransactions };