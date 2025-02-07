const Transaction = require('../models/Transaction');

const getCombinedData = async (req, res) => {
  try {
    const { month } = req.query;
    console.log('Received month:', month);

    if (!month) {
      return res.status(400).json({ error: 'Month parameter is required' });
    }

    const monthNumber = parseInt(month);
    if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
      return res.status(400).json({ error: 'Invalid month value' });
    }

    // Get statistics
    const statistics = await Transaction.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: { $toDate: '$dateOfSale' } }, monthNumber]
          }
        }
      },
      {
        $group: {
          _id: null,
          totalSaleAmount: {
            $sum: {
              $cond: [
                '$sold',
                { $convert: { input: '$price', to: 'double', onError: 0 } },
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

    // Get bar chart data
    const barData = await Transaction.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: { $toDate: '$dateOfSale' } }, monthNumber]
          }
        }
      },
      {
        $bucket: {
          groupBy: { $convert: { input: '$price', to: 'double', onError: 0 } },
          boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900],
          default: "901-above",
          output: { count: { $sum: 1 } }
        }
      }
    ]);

    // Get pie chart data
    const pieData = await Transaction.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: { $toDate: '$dateOfSale' } }, monthNumber]
          }
        }
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    console.log('Statistics:', statistics);
    console.log('Bar Data:', barData);
    console.log('Pie Data:', pieData);

    res.json({
      statistics: statistics[0] || { totalSaleAmount: 0, totalSold: 0, totalNotSold: 0 },
      barChart: barData,
      pieChart: pieData
    });

  } catch (error) {
    console.error('Error in getCombinedData:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getCombinedData
};