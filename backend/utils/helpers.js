// Convert month name to month number (e.g., "March" -> 3)
const getMonthNumber = (monthName) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return months.indexOf(monthName) + 1;
};

// Format price ranges for the bar chart
const formatPriceRanges = (data) => {
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

  return ranges.map(({ min, max }) => {
    const count = data.filter(
      (item) => item.price >= min && item.price <= max
    ).length;
    return { range: `${min}-${max === Infinity ? 'above' : max}`, count };
  });
};

module.exports = { getMonthNumber, formatPriceRanges };