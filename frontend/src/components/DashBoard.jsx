import React from "react";
import { useCombinedData, useTransactions } from "../hooks/useApi";
import StatisticsCard from "../components/StatisticsCard";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import TransactionsTable from "../components/TransactionTables";
import MonthPicker from "../components/MonthPicker";

export default function Dashboard() {
  const [selectedMonth, setSelectedMonth] = React.useState(5);
  const {
    data: combinedData,
    isLoading,
    isError,
  } = useCombinedData(selectedMonth);
  const { data: transactions } = useTransactions();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="space-y-8">
      <div className="w-48">
        <MonthPicker
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
      </div>

      <StatisticsCard data={combinedData?.statistics} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <BarChart data={combinedData?.barChart} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <PieChart data={combinedData?.pieChart} />
        </div>
      </div>

      <TransactionsTable transactions={transactions} />
    </div>
  );
}
