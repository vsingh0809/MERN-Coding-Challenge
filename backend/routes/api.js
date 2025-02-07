const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const statisticsController = require('../controllers/statisticsController');
const chartController = require('../controllers/chartController');
const combinedController = require('../controllers/combinedController');

// Transaction Routes
router.get('/transactions', transactionController.listTransactions);

// Statistics Routes
router.get('/statistics', statisticsController.getStatistics);

// Chart Routes
router.get('/bar-chart', chartController.getBarChartData);
router.get('/pie-chart', chartController.getPieChartData);

//Combined Data Route
router.get('/combined', combinedController.getCombinedData);
router.get('/debug', async (req, res) => {
  try {
    const transactions = await Transaction.find().limit(5);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;