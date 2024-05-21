import PieCategoryChart from "./PieCategoryChart";
import MonthExpenseChart from "./MonthExpenseChart";
import { Data } from "../types/Data";
import { Expense } from "@/app/types/Expense";

export const Charts = ({
  data,
  expenses,
}: {
  data: Data;
  expenses: Expense[];
}) => {
  return (
    <div className="flex flex-1 flex-row items-center gap-2">
      <div className="flex-1">
        <PieCategoryChart data={data.totalByCategory} />
      </div>
      <div className="flex-1">
        <MonthExpenseChart
          expenses={expenses}
          totalByMonth={data.totalByMonth}
        />
      </div>
    </div>
  );
};
