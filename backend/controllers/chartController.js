const Transaction = require('../models/Transaction');

const getBarChartData = async (req, res) => {
  try {
    const { month } = req.query;
    const ranges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity },
    ];

    const barData = await Promise.all(
      ranges.map(async ({ min, max }) => {
        const count = await Transaction.countDocuments({
          $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] },
          price: { $gte: min, $lte: max },
        });
        return { range: `${min}-${max === Infinity ? 'above' : max}`, count };
      })
    );

    res.json(barData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPieChartData = async (req, res) => {
  try {
    const { month } = req.query;
    const pieData = await Transaction.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] },
        },
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(pieData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getBarChartData, getPieChartData };