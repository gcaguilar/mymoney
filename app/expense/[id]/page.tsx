"use client";

import * as z from "zod";
import ExpenseForm from "@/app/expense/components/ExpenseForm";
import { formSchema } from "../Validations";
import { useCategories, useExpense } from "@/app/hooks";

function EditExpensePage({ params }: { params: { id: string } }) {
  const {
    data: categories,
    error: categoriesError,
    isLoading: isCategoriesLoading,
  } = useCategories();
  const {
    data: expense,
    error: expenseError,
    isLoading: isExpenseLoading,
  } = useExpense(params.id);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = { data: values };
    const jsonData = JSON.stringify(data);
    fetch(`api/expenses/${params.id}`, {
      method: "PUT",
      body: jsonData,
    })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  if (categoriesError || expenseError) return <div>Failed to load</div>;
  if (isCategoriesLoading || isExpenseLoading) return <div>Loading...</div>;
  if (!categories || categories.data.length === 0 || !expense) return null;

  return (
    <ExpenseForm
      expense={expense.data}
      categories={categories.data}
      onSubmit={onSubmit}
    />
  );
}

export default EditExpensePage;
