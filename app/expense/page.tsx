import { columns } from "./columns";
import { DataTable } from "@/app/components/data-table";
import React from "react";
import { useExpenses } from "../hooks/hooks";
import { Expense } from "../types/Expense";

async function ExpensePage() {
  const data: Expense[] = await useExpenses();

  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  );
}

export default ExpensePage;
