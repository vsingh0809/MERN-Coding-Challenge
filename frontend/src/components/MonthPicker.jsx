import React from "react";
import { useQueryClient } from "@tanstack/react-query";

const months = [
  { value: 1, name: "January" },
  { value: 2, name: "February" },
  { value: 3, name: "March" },
  { value: 4, name: "April" },
  { value: 5, name: "May" },
  { value: 6, name: "June" },
  { value: 7, name: "July" },
  { value: 8, name: "August" },
  { value: 9, name: "September" },
  { value: 10, name: "October" },
  { value: 11, name: "November" },
  { value: 12, name: "December" },
];

export default function MonthPicker({ selectedMonth, setSelectedMonth }) {
  const queryClient = useQueryClient();

  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
    queryClient.invalidateQueries(["combined", month]);
  };

  return (
    <select
      value={selectedMonth}
      onChange={handleMonthChange}
      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    >
      {months.map((month) => (
        <option key={month.value} value={month.value}>
          {month.name}
        </option>
      ))}
    </select>
  );
}
