import React from "react";
import prisma from "@/lib/db/prisma";
import { Expense } from "@prisma/client";
import Table, {
  TableHeaderItem,
  TableItems,
  TableProps,
} from "../../components/Table/Table";

const fetchExpenses = async (): Promise<Expense[]> => {
  const expenses = await prisma.expense.findMany();
  return expenses;
};

const transformExprenses = async(): Promise<TableItems[]> => {
  const expensesFromDb = await fetchExpenses();
  const expenses: TableItems[] = expensesFromDb.map((expense) => ({
    id: expense.id.toString(),
    name: String(expense.name),
    purchaseAmount: String(expense.amount.toString()),
    purchaseDate: String(expense.date),
    purchaseType: String(expense.type),
  }));
  return expenses;
};

const Expenses: React.FC<TableProps> = async () => {
  const expensesData = await transformExprenses();

  const header: TableHeaderItem[] = [
    { name: "Nombre" },
    { name: "Dinero" },
    { name: "Fecha" },
    { name: "Tipo" },
  ];

  return (
    <>
      <Table headers={header} items={expensesData} />
    </>
  );
};
export default Expenses;
