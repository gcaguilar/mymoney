"use client";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  BarChart,
} from "recharts";
import React from "react";
import { TotalByMonth } from "../types/Data";
import { Expense } from "@/app/types/Expense";

interface MonthCategoryChartProps {
  totalByMonth: TotalByMonth[];
  expenses: Expense[];
}

const categories = (totalByMonth: TotalByMonth[]): string[] => {
  return [...new Set(totalByMonth.map((item) => item.categoryName))];
};

const adaptDatedData = (dataItems: Expense[]) => {
  return dataItems.reduce((acc: any[], curr: Expense) => {
    let existingIndex = acc.findIndex(
      (item) => item.date === curr.transactionDate
    );
    if (existingIndex === -1) {
      acc.push({
        date: curr.transactionDate,
        [curr.category.name]: curr.amount,
      });
    } else {
      acc[existingIndex][curr.category.name] = curr.amount;
    }
    return acc;
  }, []);
};

const MonthExpenseChart: React.FC<MonthCategoryChartProps> = ({ totalByMonth, expenses }) => {
  return (
    <>
      <ResponsiveContainer width={"100%"} height={500}>
        <BarChart data={adaptDatedData(expenses)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          {categories(totalByMonth).map((category) => (
            <Bar
              key={category}
              dataKey={category}
              stackId="a"
              fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default MonthExpenseChart;
