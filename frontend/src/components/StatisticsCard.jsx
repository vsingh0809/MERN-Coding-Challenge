import React from "react";

const stats = [
  { name: "Total Sale Amount", key: "totalSaleAmount", isCurrency: true },
  { name: "Total Sold Items", key: "totalSold" },
  { name: "Total Unsold Items", key: "totalNotSold" },
];

export default function StatisticsCard({ data, loading }) {
  if (loading) {
    return <div className="text-center">Loading statistics...</div>;
  }

  if (!data) {
    return (
      <div className="text-center text-red-500">No statistics available</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {stats.map((stat) => (
        <div
          key={stat.key}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          <h3 className="text-gray-500 text-lg font-medium mb-4">
            {stat.name}
          </h3>
          <p className="text-2xl font-bold text-indigo-600">
            {stat.isCurrency
              ? `$${(data[stat.key] || 0).toFixed(2)}`
              : data[stat.key] || 0}
          </p>
        </div>
      ))}
    </div>
  );
}
