"use client"
import {
  ResponsiveContainer,
  Pie,
  Cell,
  Tooltip,
  Legend,
  PieChart,
} from "recharts";
import React from "react";
import { TotalByCategory } from "../types/Data";

interface PieCategoryChartProps {
  data: TotalByCategory[];
}

const PieCategoryChart: React.FC<PieCategoryChartProps> = ({ data }) => {
  return (
    <>
      <ResponsiveContainer width={"100%"} height={500}>
        <PieChart>
          <Pie dataKey="value" data={data} cx="50%" cy="50%" outerRadius={80}>
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default PieCategoryChart;
