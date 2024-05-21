import { DataTable } from "../components/data-table";
import { columns } from "../expense/columns";
import { useExpenses } from "../hooks/hooks";
import { Expense } from "../types/Expense";
import { Charts } from "./components/Chart";
import { FinanceCards } from "./components/FinanceCards";
import { useMetrics } from "./hooks/useMetrics";

export default async function Dashboard() {
  const metricsData = await useMetrics();
  const expenseData: Expense[] = await useExpenses();

  return (
    <div className="flex flex-col space-y-4">
      <FinanceCards />
      <Charts data={metricsData} expenses={expenseData} />
      <DataTable
        className="flex-grow rounded-md border p-4 "
        columns={columns}
        data={expenseData}
      />
    </div>
  );
}
