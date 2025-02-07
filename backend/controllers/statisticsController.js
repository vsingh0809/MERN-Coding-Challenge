const Transaction = require('../models/Transaction');

const getStatistics = async (req, res) => {
  try {
    const { month } = req.query;
    console.log('Received month:', month);

    if (!month) {
      return res.status(400).json({ error: 'Month parameter is required' });
    }

    // Convert month to number (1-12)
    const monthNumber = parseInt(month);
    if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
      return res.status(400).json({ error: 'Invalid month value' });
    }

    const matchStage = {
      $match: {
        $expr: {
          $eq: [
            { $month: { $toDate: '$dateOfSale' } },
            monthNumber
          ]
        }
      }
    };

    const aggregation = await Transaction.aggregate([
      matchStage,
      {
        $group: {
          _id: null,
          totalSaleAmount: {
            $sum: {
              $cond: [
                '$sold',
                { $toDouble: '$price' },
                0
              ]
            }
          },
          totalSold: {
            $sum: { $cond: [{ $eq: ['$sold', true] }, 1, 0] }
          },
          totalNotSold: {
            $sum: { $cond: [{ $eq: ['$sold', false] }, 1, 0] }
          }
        }
      }
    ]);

    console.log('Aggregation results:', JSON.stringify(aggregation, null, 2));

    const result = aggregation[0] || {
      totalSaleAmount: 0,
      totalSold: 0,
      totalNotSold: 0
    };

    res.json(result);
  } catch (error) {
    console.error('Error in getStatistics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getStatistics
};